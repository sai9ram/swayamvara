"""
Swayamvara Wedding Photography - Direct Python Email & Web Server
-----------------------------------------------------------------
No third-party tools required (uses standard Python library: http.server, smtplib, email).

Features:
- Serves the entire website (HTML, CSS, JS, Images) on http://localhost:8000
- Handles POST /api/send-quote directly without any external services or 3rd-party dependencies
- Direct SMTP email dispatch to both Customer and Admin (swayamvaraphotos@gmail.com)
- Cross-platform & zero-setup: Works immediately with standard Python 3

Usage:
    python server.py
    or with custom credentials:
    GMAIL_USER="swayamvaraphotos@gmail.com" GMAIL_APP_PASSWORD="xxxx xxxx xxxx xxxx" python server.py
"""

import os
import json
import smtplib
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from urllib.parse import urlparse

# Optional: load .env file if present (without external dependencies)
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
if os.path.exists(env_path):
    try:
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, val = line.split('=', 1)
                    key = key.strip()
                    val = val.strip().strip('"').strip("'")
                    if key and key not in os.environ:
                        os.environ[key] = val
    except Exception as e:
        print(f"[Notice] Could not read .env: {e}")

PORT = int(os.environ.get('PORT', 8000))
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'swayamvaraphotos@gmail.com')
GMAIL_USER = os.environ.get('GMAIL_USER', ADMIN_EMAIL)
GMAIL_APP_PASSWORD = os.environ.get('GMAIL_APP_PASSWORD', '').replace(' ', '')
SMTP_SERVER = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))

def build_html_email(data):
    quote_id = data.get('quoteId', 'SW-QUOTE')
    customer = data.get('customerDetails', {})
    style_label = data.get('styleLabel', 'Candid & Traditional')
    services = data.get('services', [])
    addons = data.get('addons', [])
    total_formatted = data.get('totalFormatted', '₹0')
    admin_email = data.get('adminEmail', ADMIN_EMAIL)

    full_name = customer.get('fullName', 'Valued Couple')
    wedding_date = customer.get('weddingDate', '—')
    venue = customer.get('venue', '—')
    phone = customer.get('phone', '—')
    notes = customer.get('notes', '')

    service_rows = ""
    for idx, s in enumerate(services):
        c_name = s.get('ceremonyName', 'Ceremony')
        s_name = s.get('name', 'Coverage')
        try:
            price_val = f"₹{int(s.get('price', 0)):,}"
        except Exception:
            price_val = f"₹{s.get('price', 0)}"
        service_rows += f"""
            <tr style="border-bottom: 1px solid #ECE3D4;">
                <td style="padding: 10px 12px; color: #777; font-size: 13px;">{idx + 1}</td>
                <td style="padding: 10px 12px; color: #581D2B; font-weight: bold; font-size: 14px;">{c_name}</td>
                <td style="padding: 10px 12px; color: #333; font-size: 14px;">{s_name}</td>
                <td style="padding: 10px 12px; color: #581D2B; font-weight: bold; font-size: 14px; text-align: right;">{price_val}</td>
            </tr>
        """

    for a in addons:
        a_name = a.get('name', 'Add-on')
        try:
            a_price = f"₹{int(a.get('price', 0)):,}"
        except Exception:
            a_price = f"₹{a.get('price', 0)}"
        service_rows += f"""
            <tr style="border-bottom: 1px solid #ECE3D4; background: #FFFDF9;">
                <td style="padding: 10px 12px; color: #777; font-size: 13px;">+</td>
                <td style="padding: 10px 12px; color: #C4A36B; font-weight: bold; font-size: 14px;">Experience Add-on</td>
                <td style="padding: 10px 12px; color: #333; font-size: 14px;">{a_name}</td>
                <td style="padding: 10px 12px; color: #581D2B; font-weight: bold; font-size: 14px; text-align: right;">{a_price}</td>
            </tr>
        """

    notes_html = ""
    if notes:
        notes_html = f"""
            <tr><td colspan="2" style="padding: 6px 0; font-size: 13px;"><span style="color: #888;">Special Requests:</span> <em>{notes}</em></td></tr>
        """

    return f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Swayamvara Wedding Quotation - {quote_id}</title>
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
                    OFFICIAL WEDDING QUOTATION: {quote_id}
                </div>
            </td>
        </tr>

        <!-- Greeting -->
        <tr>
            <td style="padding: 24px 32px 16px;">
                <p style="font-size: 16px; color: #581D2B; margin-top: 0; font-weight: 600;">
                    Dear {full_name},
                </p>
                <p style="font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 20px;">
                    Thank you for choosing Swayamvara Wedding Photography. We have generated your customized luxury wedding coverage quotation with transparent pricing below.
                </p>

                <!-- Client Details Table -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background: #FAF7F2; border: 1px solid #EDE6DC; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px;">
                    <tr>
                        <td width="50%" style="padding: 6px 0; font-size: 13px;"><span style="color: #888;">Couple:</span> <strong style="color: #2A2526;">{full_name}</strong></td>
                        <td width="50%" style="padding: 6px 0; font-size: 13px;"><span style="color: #888;">Wedding Date:</span> <strong style="color: #2A2526;">{wedding_date}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-size: 13px;"><span style="color: #888;">Venue / City:</span> <strong style="color: #2A2526;">{venue}</strong></td>
                        <td style="padding: 6px 0; font-size: 13px;"><span style="color: #888;">WhatsApp:</span> <strong style="color: #2A2526;">{phone}</strong></td>
                    </tr>
                    <tr>
                        <td colspan="2" style="padding: 6px 0; font-size: 13px;"><span style="color: #888;">Coverage Style:</span> <strong style="color: #581D2B;">{style_label}</strong></td>
                    </tr>
                    {notes_html}
                </table>
            </td>
        </tr>

        <!-- Services Breakdown -->
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
                        {service_rows or '<tr><td colspan="4" style="padding: 16px; text-align: center; color: #888;">No ceremonies selected.</td></tr>'}
                    </tbody>
                </table>
            </td>
        </tr>

        <!-- Grand Total -->
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
                            <div style="font-size: 26px; font-weight: 800; color: #581D2B; line-height: 1.1; margin-top: 4px;">{total_formatted}</div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Next Steps -->
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
                Phone: +91 79893 04874 &bull; Email: {admin_email} &bull; Web: swayamvara.in
            </td>
        </tr>
    </table>
</body>
</html>"""

def send_smtp_email(payload):
    customer = payload.get('customerDetails', {})
    customer_email = customer.get('email')
    admin_email = payload.get('adminEmail', ADMIN_EMAIL)
    quote_id = payload.get('quoteId', 'SW-QUOTE')
    full_name = customer.get('fullName', 'Client')

    if not customer_email:
        raise ValueError("Customer email is required")

    # If no App Password is provided in environment, simulate safely with full logging
    if not GMAIL_APP_PASSWORD:
        print(f"[Direct Python Server] [INFO] Quotation generated: {quote_id}")
        print(f"                       Customer: {customer_email}")
        print(f"                       Admin: {admin_email}")
        print(f"                       Total: {payload.get('totalFormatted', 'INR 0')}")
        print("                       (To send real live emails via direct Python SMTP, run server with GMAIL_APP_PASSWORD='...')")
        return {
            "success": False,
            "simulated": True,
            "message": f"Quotation recorded directly for {customer_email} and {admin_email}. Gmail App Password missing."
        }

    # Direct SMTP dispatch using Python's standard smtplib
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f"Swayamvara Wedding Quotation [{quote_id}] for {full_name}"
    msg['From'] = f"Swayamvara Wedding Photography <{GMAIL_USER}>"
    msg['To'] = customer_email
    msg['Reply-To'] = admin_email

    html_content = build_html_email(payload)
    part = MIMEText(html_content, 'html', 'utf-8')
    msg.attach(part)

    recipients = [customer_email, admin_email]

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=15) as server:
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        server.sendmail(GMAIL_USER, recipients, msg.as_string())

    print(f"[Direct Python Server] [OK] Successfully dispatched email via direct SMTP to: {customer_email} & {admin_email}")
    return {
        "success": True,
        "simulated": False,
        "message": f"Quotation emailed directly to {customer_email} and {admin_email}"
    }

class SwayamvaraHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enterprise security headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_GET(self):
        # Security protection: Block access to backend code, credentials, and backups
        path_lower = self.path.lower().split('?')[0]
        blocked_suffixes = ('.py', '.env', '.bak', '.json', '.git', '.md')
        if any(path_lower.endswith(s) for s in blocked_suffixes) or '/.' in path_lower or 'package' in path_lower:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"404 Not Found")
            return
        super().do_GET()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == '/api/send-quote' or parsed.path == '/send-quote':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)

            try:
                payload = json.loads(post_data.decode('utf-8'))
                
                # Bot honeypot check
                if payload.get('website'):
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({"success": True, "simulated": True, "message": "Processed"}).encode('utf-8'))
                    return
                result = send_smtp_email(payload)
                response_bytes = json.dumps(result).encode('utf-8')
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(response_bytes)))
                self.end_headers()
                self.wfile.write(response_bytes)
            except Exception as e:
                print(f"[Direct Python Server Error] {e}")
                err_bytes = json.dumps({"success": False, "error": str(e)}).encode('utf-8')
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(err_bytes)))
                self.end_headers()
                self.wfile.write(err_bytes)
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)
    server_address = ('0.0.0.0', PORT)
    httpd = ThreadingHTTPServer(server_address, SwayamvaraHandler)
    print("=" * 70)
    print("  * SWAYAMVARA DIRECT PYTHON WEB & EMAIL SERVER *")
    print(f"  Serving website & direct SMTP API at: http://localhost:{PORT}")
    print(f"  Endpoint: http://localhost:{PORT}/api/send-quote (Direct Python)")
    print(f"  Admin Email: {ADMIN_EMAIL}")
    if GMAIL_APP_PASSWORD:
        print("  SMTP Mode: LIVE DIRECT GMAIL DISPATCH")
    else:
        print("  SMTP Mode: SIMULATED / DRY-RUN (Set GMAIL_APP_PASSWORD for live dispatch)")
    print("=" * 70)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server gracefully...")
        httpd.server_close()
