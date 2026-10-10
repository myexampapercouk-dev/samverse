<?php
/**
 * Emails website form submissions to Sameer (Hostinger version of netlify/functions/send-quote.js).
 *
 * Credentials are NEVER in this file or the repo. They live in a private file OUTSIDE public_html:
 *   /home/<hostinger-user>/samverse-private/mail-config.php
 * which returns an array like:
 *   <?php return [
 *     'mail_to'   => 'you@gmail.com',           // where enquiries go
 *     'smtp_host' => 'smtp.gmail.com',          // or smtp.hostinger.com for a samverse.space mailbox
 *     'smtp_port' => 465,                       // SSL
 *     'smtp_user' => 'you@gmail.com',
 *     'smtp_pass' => 'gmail app password',
 *   ];
 * Without smtp_user/smtp_pass it falls back to PHP mail() from website@<domain>.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

function reply($code, $body) {
	http_response_code($code);
	echo json_encode($body);
	exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
	reply(405, ['ok' => false, 'error' => 'Method not allowed']);
}

// Form-encoded (what script.js sends) or JSON
$data = $_POST;
if (!$data && stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== false) {
	$data = json_decode(file_get_contents('php://input'), true) ?: [];
}

if (!empty($data['bot-field'])) {
	reply(200, ['ok' => true]); // honeypot: silently drop bots
}

$clip = function ($key, $max) use ($data) {
	$v = isset($data[$key]) && is_string($data[$key]) ? trim($data[$key]) : '';
	return mb_substr($v, 0, $max, 'UTF-8');
};
$f = [
	'form'    => preg_replace('/[^\w -]/', '', $clip('form-name', 40)) ?: 'quote',
	'name'    => $clip('name', 120),
	'phone'   => $clip('phone', 40),
	'email'   => $clip('email', 160),
	'type'    => $clip('type', 60),
	'message' => $clip('message', 4000),
	'page'    => $clip('page', 200),
];
if ($f['name'] === '' || $f['phone'] === '') {
	reply(400, ['ok' => false, 'error' => 'Name and phone are required']);
}

// Simple flood protection: at most 5 messages per IP per 10 minutes
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/samverse-quote-' . md5($ip);
$hits = array_filter(explode(',', (string) @file_get_contents($rateFile)), function ($t) { return $t !== '' && (int) $t > time() - 600; });
if (count($hits) >= 5) {
	reply(429, ['ok' => false, 'error' => 'Too many requests, please try again later']);
}
$hits[] = time();
@file_put_contents($rateFile, implode(',', $hits));

$configFile = dirname(__DIR__, 2) . '/samverse-private/mail-config.php';
$cfg = is_readable($configFile) ? (include $configFile) : [];
if (!is_array($cfg) || empty($cfg['mail_to'])) {
	error_log('samverse send-quote: mail config missing at ' . $configFile);
	reply(500, ['ok' => false, 'error' => 'Email is not configured']);
}

$oneLine = function ($s) { return trim(preg_replace('/[\r\n]+/', ' ', $s)); };
$isEmail = function ($s) { return (bool) preg_match('/^[^\s@,;<>"]+@[^\s@,;<>"]+\.[^\s@,;<>"]+$/', $s); };

$rows = [['Name', $f['name']], ['Phone', $f['phone']], ['Email', $f['email']], ['Project type', $f['type']], ['Message', $f['message']], ['Sent from', $f['page']]];
$text = "New {$f['form']} request from samverse.space\n\n";
foreach ($rows as $r) {
	if ($r[1] !== '') {
		$text .= $r[0] . ': ' . $r[1] . "\n";
	}
}
$subject = $oneLine("New {$f['form']} request: {$f['name']} ({$f['phone']})");
$replyTo = $isEmail($f['email']) ? $f['email'] : '';
$to = $cfg['mail_to'];

if (!empty($cfg['smtp_user']) && !empty($cfg['smtp_pass'])) {
	$from = $cfg['smtp_user'];
	$ok = smtp_send(
		$cfg['smtp_host'] ?? 'smtp.gmail.com',
		(int) ($cfg['smtp_port'] ?? 465),
		$cfg['smtp_user'],
		preg_replace('/\s+/', '', $cfg['smtp_pass']),
		$from,
		$to,
		$subject,
		$text,
		$replyTo
	);
} else {
	$host = preg_replace('/^www\./', '', $_SERVER['HTTP_HOST'] ?? 'samverse.space');
	$from = 'website@' . preg_replace('/[^a-z0-9.-]/i', '', $host);
	$headers = "From: Samverse Website <{$from}>\r\nContent-Type: text/plain; charset=UTF-8\r\n" . ($replyTo ? "Reply-To: {$replyTo}\r\n" : '');
	$ok = mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $text, $headers, '-f' . $from);
}

reply($ok ? 200 : 502, $ok ? ['ok' => true] : ['ok' => false, 'error' => 'Could not send email']);

/**
 * Minimal SMTP client over implicit TLS (port 465) with AUTH LOGIN. Returns true on success.
 */
function smtp_send($host, $port, $user, $pass, $from, $to, $subject, $text, $replyTo) {
	$sock = @stream_socket_client("ssl://{$host}:{$port}", $errno, $errstr, 15);
	if (!$sock) {
		error_log("samverse send-quote: SMTP connect failed: {$errstr}");
		return false;
	}
	stream_set_timeout($sock, 15);
	$read = function () use ($sock) {
		$out = '';
		while (($line = fgets($sock, 515)) !== false) {
			$out .= $line;
			if (strlen($line) < 4 || $line[3] !== '-') {
				break;
			}
		}
		return $out;
	};
	$cmd = function ($line, $expect) use ($sock, $read) {
		if ($line !== null) {
			fwrite($sock, $line . "\r\n");
		}
		$resp = $read();
		if (strpos($resp, (string) $expect) !== 0) {
			error_log('samverse send-quote: SMTP unexpected reply: ' . trim($resp));
			return false;
		}
		return true;
	};

	$domain = preg_replace('/^.*@/', '', $from);
	$date = date('r');
	$msgId = '<' . bin2hex(random_bytes(12)) . '@' . $domain . '>';
	$headers = "Date: {$date}\r\nFrom: Samverse Website <{$from}>\r\nTo: <{$to}>\r\n" .
		($replyTo ? "Reply-To: <{$replyTo}>\r\n" : '') .
		'Subject: =?UTF-8?B?' . base64_encode($subject) . "?=\r\nMessage-ID: {$msgId}\r\nMIME-Version: 1.0\r\n" .
		"Content-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n";
	$body = chunk_split(base64_encode($text));

	$ok = $cmd(null, 220)
		&& $cmd('EHLO ' . $domain, 250)
		&& $cmd('AUTH LOGIN', 334)
		&& $cmd(base64_encode($user), 334)
		&& $cmd(base64_encode($pass), 235)
		&& $cmd("MAIL FROM:<{$from}>", 250)
		&& $cmd("RCPT TO:<{$to}>", 250)
		&& $cmd('DATA', 354)
		&& $cmd($headers . "\r\n" . $body . "\r\n.", 250);
	fwrite($sock, "QUIT\r\n");
	fclose($sock);
	return $ok;
}
