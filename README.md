# samverse

Portfolio website of **Sameer Gupta**, freelance WordPress developer: https://samverse.space

Static HTML/CSS/JS site deployed on Netlify, with a Netlify Function (`netlify/functions/send-quote.js`)
that emails contact-form submissions to Gmail via nodemailer.

## Netlify environment variables (never commit these)
- `GMAIL_USER`: Gmail address that sends the email
- `GMAIL_APP_PASSWORD`: 16-character Google App Password
- `MAIL_TO` (optional): inbox that receives submissions; defaults to `GMAIL_USER`

Trigger a new deploy after changing environment variables.

## Analytics / AdSense
Set `GA_ID` and `ADSENSE_ID` in the `SITE_CONFIG` block at the top of `index.html`.

## Portfolio projects
Edit the `PROJECTS` list at the top of `script.js`.
