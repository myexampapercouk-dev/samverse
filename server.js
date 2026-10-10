// Serves samverse.space as a Node.js app (Hostinger Node.js hosting).
// Static files work like Netlify (pretty URLs, 404 page, headers from netlify.toml);
// the contact form reuses netlify/functions/send-quote.js, which reads GMAIL_USER,
// GMAIL_APP_PASSWORD and MAIL_TO from the environment variables set in Hostinger.
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { handler: sendQuote } = require('./netlify/functions/send-quote.js');

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;
const CANONICAL_HOST = 'samverse.space';

const TYPES = {
	'.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
	'.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
	'.gif': 'image/gif', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.woff2': 'font/woff2',
	'.woff': 'font/woff', '.pdf': 'application/pdf', '.mp4': 'video/mp4',
};
const COMPRESS = new Set(['.html', '.css', '.js', '.json', '.xml', '.txt', '.svg', '.webmanifest']);
// Project files that must never be served (same list as netlify.toml)
const HIDDEN_DIRS = new Set(['node_modules', 'netlify', 'tools', 'docs', '.git', '.claude']);
const HIDDEN_FILES = new Set(['package.json', 'package-lock.json', 'netlify.toml', 'README.md', '.gitignore', '.gitattributes', 'server.js', '.htaccess']);
const FORM_PATHS = new Set(['/api/send-quote.php', '/.netlify/functions/send-quote']);

function securityHeaders(req) {
	const h = {
		'X-Content-Type-Options': 'nosniff',
		'X-Frame-Options': 'SAMEORIGIN',
		'Referrer-Policy': 'strict-origin-when-cross-origin',
		'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
	};
	if ((req.headers['x-forwarded-proto'] || '').includes('https')) {
		h['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains';
	}
	return h;
}

function send(req, res, status, headers, body) {
	res.writeHead(status, Object.assign(securityHeaders(req), headers));
	res.end(req.method === 'HEAD' ? undefined : body);
}

function serveFile(req, res, file, status) {
	const ext = path.extname(file).toLowerCase();
	fs.readFile(file, (err, data) => {
		if (err) return notFound(req, res);
		const headers = {
			'Content-Type': TYPES[ext] || 'application/octet-stream',
			'Cache-Control': req.url.startsWith('/assets/') ? 'public, max-age=604800' : 'public, max-age=0, must-revalidate',
			Vary: 'Accept-Encoding',
		};
		if (COMPRESS.has(ext) && /\bgzip\b/.test(req.headers['accept-encoding'] || '') && data.length > 1024) {
			headers['Content-Encoding'] = 'gzip';
			data = zlib.gzipSync(data);
		}
		send(req, res, status || 200, headers, data);
	});
}

function notFound(req, res) {
	fs.readFile(path.join(ROOT, '404.html'), (err, data) => {
		send(req, res, 404, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' }, err ? 'Not found' : data);
	});
}

function readBody(req, limit) {
	return new Promise((resolve, reject) => {
		let size = 0;
		const chunks = [];
		req.on('data', c => {
			size += c.length;
			if (size > limit) { reject(new Error('too large')); req.destroy(); return; }
			chunks.push(c);
		});
		req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
		req.on('error', reject);
	});
}

async function handleForm(req, res) {
	let body = '';
	if (req.method === 'POST') {
		try { body = await readBody(req, 64 * 1024); } catch (e) {
			return send(req, res, 413, { 'Content-Type': 'application/json' }, JSON.stringify({ ok: false, error: 'Request too large' }));
		}
	}
	const result = await sendQuote({ httpMethod: req.method, headers: req.headers, body, isBase64Encoded: false });
	send(req, res, result.statusCode, Object.assign({ 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' }, result.headers), result.body);
}

const server = http.createServer(async (req, res) => {
	try {
		const host = (req.headers['x-forwarded-host'] || req.headers.host || '').split(':')[0].toLowerCase();
		if (host === 'www.' + CANONICAL_HOST) {
			return send(req, res, 301, { Location: `https://${CANONICAL_HOST}${req.url}` }, '');
		}

		let pathname;
		try { pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch (e) { return notFound(req, res); }

		if (FORM_PATHS.has(pathname)) return handleForm(req, res);
		if (req.method !== 'GET' && req.method !== 'HEAD') {
			return send(req, res, 405, { 'Content-Type': 'text/plain', Allow: 'GET, HEAD' }, 'Method not allowed');
		}

		const parts = pathname.split('/').filter(Boolean);
		if (parts.some(p => p.startsWith('.') && p !== '.well-known') || (parts[0] && HIDDEN_DIRS.has(parts[0])) ||
			(parts.length === 1 && HIDDEN_FILES.has(parts[0])) || pathname.startsWith('/api/')) {
			return notFound(req, res);
		}

		const file = path.normalize(path.join(ROOT, pathname));
		if (!file.startsWith(ROOT)) return notFound(req, res);

		fs.stat(file, (err, stat) => {
			if (err) return notFound(req, res);
			if (stat.isDirectory()) {
				if (!pathname.endsWith('/')) {
					const q = req.url.indexOf('?');
					return send(req, res, 301, { Location: pathname + '/' + (q >= 0 ? req.url.slice(q) : '') }, '');
				}
				return serveFile(req, res, path.join(file, 'index.html'));
			}
			serveFile(req, res, file);
		});
	} catch (e) {
		console.error(e);
		if (!res.headersSent) send(req, res, 500, { 'Content-Type': 'text/plain' }, 'Server error');
	}
});

server.listen(PORT, () => console.log(`samverse.space running on port ${PORT}`));
