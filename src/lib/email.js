// lib/email.js
import nodemailer from 'nodemailer';

/**
 * quickSendEmail replacement.
 *
 * Parameters:
 *  - mailBody: html body
 *  - replyObject: { replyEmail: replyName, ... }  (object or array)
 *  - fromObject: { fromEmail: fromName, ... }
 *  - toObject: { toEmail: toName, ... }
 *  - subject: string
 *  - altBody: text fallback
 *  - attachmentsArray: array of nodemailer attachment objects or file paths
 *
 * Returns:
 *   "1" on success (to match your PHP function), or error string on failure.
 */
export async function quickSendEmail(
  mailBody,
  replyObject = {},
  fromObject = {},
  toObject = {},
  subject = '',
  altBody = '',
  attachmentsArray = []
) {
  let transportConfig = {
    host: process.env.SMTP_HOST || 'mail.drfasasa.com',
    port: parseInt(process.env.SMTP_PORT || '25', 10),
    secure: process.env.SMTP_SECURE === 'true' || false, // false for port 25/587
  };

  // If credentials provided
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transportConfig.auth = {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    };
  }

  const transporter = nodemailer.createTransport(transportConfig);

  let error = '';

  // Build common from header (take first entry)
  const fromList = Object.entries(fromObject);
  const replyList = Object.entries(replyObject);

  // Iterate recipients to mimic PHP behavior
  for (const [toEmail, toName] of Object.entries(toObject)) {
    try {
      const mailOptions = {
        from:
          fromList.length > 0
            ? `"${fromList[0][1]}" <${fromList[0][0]}>`
            : process.env.DEFAULT_FROM || process.env.SMTP_USER,
        to: `"${toName}" <${toEmail}>`,
        subject,
        text: altBody || stripTags(mailBody),
        html: mailBody,
        attachments: attachmentsArray || [],
      };

      if (replyList.length > 0) {
        mailOptions.replyTo = `"${replyList[0][1]}" <${replyList[0][0]}>`;
      }

      await transporter.sendMail(mailOptions);
    } catch (e) {
      // Collect error but continue sending to other recipients
      console.error('mail error', e);
      error += `Mailer Error (to ${toEmail}): ${e.message || e}\n`;
    }
  }

  return error === '' ? '1' : error;
}

/**
 * Minimal HTML tag stripper used for alt text fallback.
 */
function stripTags(html = '') {
  return String(html).replace(/<\/?[^>]+(>|$)/g, '');
}
