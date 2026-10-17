const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Enable CORS for API requests
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const {
            quoteId,
            customerDetails,
            styleLabel,
            services = [],
            addons = [],
            total = 0,
            totalFormatted = '₹0',
            adminEmail = 'swayamvaraphotos@gmail.com'
        } = req.body || {};

        if (!customerDetails || !customerDetails.email) {
            return res.status(400).json({ success: false, error: 'Customer email is required' });
        }

        const gmailUser = process.env.GMAIL_USER || 'swayamvaraphotos@gmail.com';
        const gmailPass = process.env.GMAIL_APP_PASSWORD || '';

        // If GMAIL_APP_PASSWORD is not configured yet, return clear simulated status
        if (!gmailPass) {
            console.log(`[Quotation Generated] Ref: ${quoteId} | Customer: ${customerDetails.email} | Admin: ${adminEmail}`);
            return res.status(200).json({
                success: false,
                simulated: true,
                message: `Quotation recorded for ${customerDetails.email} and ${adminEmail}. GMAIL_APP_PASSWORD is not configured in Vercel environment variables.`
            });
        }

        // Configure Nodemailer transporter with Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: gmailUser,
                pass: gmailPass.replace(/\s+/g, '') // remove any whitespace in the 16-character app password
            }
        });

        // Build HTML table rows for services
        let serviceRows = '';
        services.forEach((s, idx) => {
            serviceRows += `
                <tr style="border-bottom: 1px solid #ECE3D4;">
                    <td style="padding: 10px 12px; color: #777; font-size: 13px;">${idx + 1}</td>
                    <td style="padding: 10px 12px; color: #581D2B; font-weight: bold; font-size: 14px;">${s.ceremonyName}</td>
                    <td style="padding: 10px 12px; color: #333; font-size: 14px;">${s.name}</td>
                    <td style="padding: 10px 12px; color: #581D2B; font-weight: bold; font-size: 14px; text-align: right;">₹${Number(s.price).toLocaleString('en-IN')}</td>
                </tr>
            `;
        });

        // Add-ons rows
        addons.forEach((a, idx) => {
            serviceRows += `
                <tr style="border-bottom: 1px solid #ECE3D4; background: #FFFDF9;">
                    <td style="padding: 10px 12px; color: #777; font-size: 13px;">+</td>
                    <td style="padding: 10px 12px; color: #C4A36B; font-weight: bold; font-size: 14px;">Experience Add-on</td>
                    <td style="padding: 10px 12px; color: #333; font-size: 14px;">${a.name}</td>
                    <td style="padding: 10px 12px; color: #581D2B; font-weight: bold; font-size: 14px; text-align: right;">₹${Number(a.price).toLocaleString('en-IN')}</td>
                </tr>
            `;
        });

        // Branded luxury HTML email
        const htmlEmail = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Swayamvara Wedding Quotation - ${quoteId}</title>
            </head>
            <body style="margin: 0; padding: 24px; background: #FAF7F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2A2526;">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 650px; margin: 0 auto; background: #ffffff; border: 1.5px solid #C4A36B; border-radius: 10px; overflow: hidden; box-shadow: 0 8px 30px rgba(88,29,43,0.08);">
                    <!-- Header -->
                    <tr>
                        <td style="background: #581D2B; padding: 28px 32px; text-align: center; color: #ffffff;">
                            <div style="color: #DFC8A2; font-size: 13px; letter-spacing: 3px; margin-bottom: 6px;">✦ &nbsp; ✦ &nbsp; ✦</div>
                            <h1 style="margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 4px; color: #FAF7F2;">SWAYAMVARA</h1>
                            <div style="font-size: 11px; letter-spacing: 2px; color: #DFC8A2; margin-top: 6px;">LUXURY WEDDING PHOTOGRAPHY &bull; HYDERABAD</div>
                            <div style="display: inline-block; background: rgba(223, 200, 162, 0.2); border: 1px solid #DFC8A2; border-radius: 20px; padding: 4px 16px; margin-top: 14px; font-size: 12px; font-weight: 600; letter-spacing: 1px; color: #FAF7F2;">
                                OFFICIAL WEDDING QUOTATION: ${quoteId}
                            </div>
                        </td>
                    </tr>

                    <!-- Client Greeting & Overview -->
                    <tr>
                        <td style="padding: 24px 32px 16px;">
                            <p style="font-size: 16px; color: #581D2B; margin-top: 0; font-weight: 600;">
                                Dear ${customerDetails.fullName || 'Valued Couple'},
                            </p>
                            <p style="font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 20px;">
                                Thank you for choosing Swayamvara Wedding Photography. We have generated your customized luxury wedding coverage quotation with transparent pricing below.
                            </p>

                            <!-- Client Details Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: #FAF7F2; border: 1px solid #EDE6DC; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px;">
                                <tr>
                                    <td width="50%" style="padding: 6px 0; font-size: 13px;"><span style="color: #888;">Couple:</span> <strong style="color: #2A2526;">${customerDetails.fullName || '—'}</strong></td>
                                    <td width="50%" style="padding: 6px 0; font-size: 13px;"><span style="color: #888;">Wedding Date:</span> <strong style="color: #2A2526;">${customerDetails.weddingDate || '—'}</strong></td>
                                </tr>
                                <tr>
                                    <td style="padding: 6px 0; font-size: 13px;"><span style="color: #888;">Venue / City:</span> <strong style="color: #2A2526;">${customerDetails.venue || '—'}</strong></td>
                                    <td style="padding: 6px 0; font-size: 13px;"><span style="color: #888;">WhatsApp:</span> <strong style="color: #2A2526;">${customerDetails.phone || '—'}</strong></td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="padding: 6px 0; font-size: 13px;"><span style="color: #888;">Coverage Style:</span> <strong style="color: #581D2B;">${styleLabel || 'Candid & Traditional'}</strong></td>
                                </tr>
                                ${customerDetails.notes ? `<tr><td colspan="2" style="padding: 6px 0; font-size: 13px;"><span style="color: #888;">Special Requests:</span> <em>${customerDetails.notes}</em></td></tr>` : ''}
                            </table>
                        </td>
                    </tr>

                    <!-- Services Table -->
                    <tr>
                        <td style="padding: 0 32px 20px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                                <thead>
                                    <tr style="background: #581D2B; color: #ffffff;">
                                        <th style="padding: 9px 12px; font-size: 12px; text-align: left; width: 30px;">#</th>
                                        <th style="padding: 9px 12px; font-size: 12px; text-align: left;">Ceremony</th>
                                        <th style="padding: 9px 12px; font-size: 12px; text-align: left;">Service Scope</th>
                                        <th style="padding: 9px 12px; font-size: 12px; text-align: right; width: 110px;">Investment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${serviceRows || '<tr><td colspan="4" style="padding: 16px; text-align: center; color: #888;">No ceremonies selected.</td></tr>'}
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <!-- Grand Total Box -->
                    <tr>
                        <td style="padding: 0 32px 24px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: #FAF7F2; border: 1.5px solid #C4A36B; border-radius: 8px; padding: 18px 24px;">
                                <tr>
                                    <td style="vertical-align: middle;">
                                        <div style="font-size: 12px; font-weight: bold; color: #581D2B;">✓ HIGH-RES COLOR GRADING & DIGITAL GALLERY INCLUDED</div>
                                        <div style="font-size: 11px; color: #888; margin-top: 4px;">Valid for 15 days from issue date</div>
                                    </td>
                                    <td style="text-align: right; vertical-align: middle;">
                                        <div style="font-size: 11px; color: #777; letter-spacing: 1px; text-transform: uppercase;">Estimated Total</div>
                                        <div style="font-size: 26px; font-weight: 800; color: #581D2B; line-height: 1.1; margin-top: 4px;">${totalFormatted}</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Terms & Next Steps -->
                    <tr>
                        <td style="padding: 0 32px 28px;">
                            <div style="background: #FFFDF9; border: 1px solid #EDE6DC; border-radius: 8px; padding: 16px; font-size: 12px; color: #555; line-height: 1.6;">
                                <strong style="color: #581D2B;">Next Steps to Lock Dates:</strong><br>
                                • Reply to this email or contact us on WhatsApp at <strong>+91 79893 04874</strong> to confirm crew availability.<br>
                                • 25% booking deposit locks your dates exclusively on our master creative calendar.<br>
                                • Standard deliverables include Master High-Res Edited Photos, 4K Cinematic Highlights Film, and 1-Year Private Online Cloud Gallery access.
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: #581D2B; color: #FAF7F2; padding: 20px 32px; text-align: center; font-size: 12px;">
                            <strong style="color: #DFC8A2; font-size: 14px; letter-spacing: 1px;">Swayamvara Wedding Photography</strong><br>
                            Jubilee Hills & Banjara Hills, Hyderabad, Telangana<br>
                            Phone: +91 79893 04874 &bull; Email: ${adminEmail} &bull; Web: swayamvara.in
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `;

        // Send email to both Customer and Admin directly
        const mailOptions = {
            from: `"Swayamvara Wedding Photography" <${gmailUser}>`,
            to: customerDetails.email,
            bcc: adminEmail, // Admin automatically receives a direct copy
            replyTo: adminEmail,
            subject: `Swayamvara Wedding Quotation [${quoteId}] for ${customerDetails.fullName}`,
            html: htmlEmail
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`[Email Sent] MessageId: ${info.messageId} to: ${customerDetails.email}, bcc: ${adminEmail}`);

        return res.status(200).json({
            success: true,
            messageId: info.messageId,
            message: `Quotation sent successfully to ${customerDetails.email} and ${adminEmail}`
        });
    } catch (err) {
        console.error('[Email Error]:', err);
        return res.status(500).json({
            success: false,
            error: err.message || 'Failed to send quotation email'
        });
    }
};
