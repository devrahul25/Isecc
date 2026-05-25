<?php
// ---------------------------------------------------------------------------
// ISECC Contact Form Handler
// Sends mail via SMTP using only built-in PHP stream functions (no Composer).
// ---------------------------------------------------------------------------

header('Content-Type: application/json; charset=UTF-8');

// ── Only accept POST ────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit;
}

// ── Parse JSON body ─────────────────────────────────────────────────────────
$input     = json_decode(file_get_contents('php://input'), true) ?? [];
$firstName = htmlspecialchars(trim($input['firstName'] ?? ''), ENT_QUOTES, 'UTF-8');
$lastName  = htmlspecialchars(trim($input['lastName']  ?? ''), ENT_QUOTES, 'UTF-8');
$email     = trim($input['email']   ?? '');
$message   = htmlspecialchars(trim($input['message']   ?? ''), ENT_QUOTES, 'UTF-8');

// ── Validate ────────────────────────────────────────────────────────────────
if (!$firstName || !$lastName || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['error' => 'All fields are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address.']);
    exit;
}

// ── SMTP config (loaded from server environment — see .htaccess) ──────────
$smtpHost = getenv('SMTP_HOST') ?: 'smtp.hostinger.com';
$smtpPort = (int)(getenv('SMTP_PORT') ?: 465);
$smtpUser = getenv('SMTP_USER');
$smtpPass = getenv('SMTP_PASS');
$mailTo   = getenv('MAIL_TO')   ?: 'syadav@isecc.in';
$mailBcc  = getenv('MAIL_BCC')  ?: 'venkat@jaiveeru.co.in';

if (!$smtpUser || !$smtpPass) {
    error_log('ISECC mailer: SMTP_USER or SMTP_PASS env var not set');
    http_response_code(500);
    echo json_encode(['error' => 'Mail service not configured. Please contact us directly at contact@isecc.in']);
    exit;
}

// ── Build HTML email ────────────────────────────────────────────────────────
$subject = "Institutional Enquiry from {$firstName} {$lastName}";
$msgHtml = nl2br($message);
$year    = date('Y');
$html = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Institutional Enquiry — ISECC</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background-color:#f1f5f9;padding:48px 16px;">
    <tr>
      <td align="center">

        <!-- ════════════════ CARD ════════════════ -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
               style="max-width:600px;width:100%;background:#ffffff;
                      border-radius:20px;overflow:hidden;
                      border:1px solid #e2e8f0;
                      box-shadow:0 8px 32px rgba(0,0,0,0.08);">

          <!-- ── HEADER ──────────────────────────────────────────────────── -->
          <tr>
            <td style="background:#1e3a8a;padding:0;">

              <!-- Blue gradient top strip -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 55%,#3b82f6 100%);
                              padding:32px 40px 28px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <!-- Logo -->
                        <td valign="middle" style="width:140px;">
                          <img src="https://www.isecc.in/ISECC.png"
                               alt="ISECC"
                               width="130"
                               style="display:block;height:auto;max-width:130px;
                                      filter:brightness(0) invert(1);
                                      -webkit-filter:brightness(0) invert(1);">
                        </td>
                        <!-- Badge -->
                        <td valign="middle" align="right">
                          <span style="display:inline-block;
                                       background:rgba(255,255,255,0.18);
                                       border:1px solid rgba(255,255,255,0.30);
                                       color:#bfdbfe;border-radius:30px;
                                       font-size:11px;font-weight:700;
                                       letter-spacing:1.5px;text-transform:uppercase;
                                       padding:6px 14px;">
                            New Enquiry
                          </span>
                        </td>
                      </tr>
                    </table>

                    <div style="margin-top:22px;padding-top:22px;
                                border-top:1px solid rgba(255,255,255,0.15);">
                      <p style="margin:0;color:#bfdbfe;
                                 font-size:11px;font-weight:700;
                                 letter-spacing:2px;text-transform:uppercase;">
                        Institutional Enquiry
                      </p>
                      <h1 style="margin:6px 0 0;color:#ffffff;
                                  font-size:24px;font-weight:700;
                                  letter-spacing:-0.5px;line-height:1.3;">
                        New message received
                      </h1>
                      <p style="margin:8px 0 0;color:#93c5fd;font-size:14px;line-height:1.5;">
                        Submitted via the ISECC website contact form
                      </p>
                    </div>
                  </td>
                </tr>
                <!-- Accent gradient bar -->
                <tr>
                  <td style="height:4px;
                              background:linear-gradient(90deg,#1d4ed8 0%,#60a5fa 50%,#1d4ed8 100%);">
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── SENDER DETAILS ──────────────────────────────────────────── -->
          <tr>
            <td style="padding:36px 40px 0 40px;">
              <p style="margin:0 0 14px;
                         font-size:11px;font-weight:700;
                         color:#94a3b8;text-transform:uppercase;letter-spacing:2px;">
                Sender Details
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="background:#f8fafc;border-radius:12px;
                             border:1px solid #e2e8f0;overflow:hidden;">
                <!-- Name row -->
                <tr>
                  <td style="padding:16px 20px;
                              border-bottom:1px solid #e2e8f0;
                              background:#f0f6ff;
                              font-size:11px;font-weight:700;
                              color:#64748b;text-transform:uppercase;
                              letter-spacing:1.2px;width:120px;
                              white-space:nowrap;vertical-align:middle;">
                    Full Name
                  </td>
                  <td style="padding:16px 20px;
                              border-bottom:1px solid #e2e8f0;
                              font-size:15px;font-weight:600;
                              color:#1e293b;vertical-align:middle;">
                    {$firstName} {$lastName}
                  </td>
                </tr>
                <!-- Email row -->
                <tr>
                  <td style="padding:16px 20px;
                              background:#f0f6ff;
                              font-size:11px;font-weight:700;
                              color:#64748b;text-transform:uppercase;
                              letter-spacing:1.2px;white-space:nowrap;
                              vertical-align:middle;">
                    Email
                  </td>
                  <td style="padding:16px 20px;
                              font-size:15px;vertical-align:middle;">
                    <a href="mailto:{$email}"
                       style="color:#1d4ed8;text-decoration:none;font-weight:500;">
                      {$email}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── MESSAGE ────────────────────────────────────────────────── -->
          <tr>
            <td style="padding:28px 40px 12px 40px;">
              <p style="margin:0 0 14px;
                         font-size:11px;font-weight:700;
                         color:#94a3b8;text-transform:uppercase;letter-spacing:2px;">
                Message
              </p>
              <div style="background:#f8fafc;border-radius:12px;
                           border:1px solid #e2e8f0;
                           border-left:5px solid #1d4ed8;
                           padding:22px 26px;">
                <p style="margin:0;font-size:15px;color:#334155;line-height:1.85;">
                  {$msgHtml}
                </p>
              </div>
            </td>
          </tr>

          <!-- ── REPLY CTA ──────────────────────────────────────────────── -->
          <tr>
            <td style="padding:24px 40px 40px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:10px;
                              background:linear-gradient(135deg,#1e3a8a,#1d4ed8);">
                    <a href="mailto:{$email}?subject=Re%3A%20Your%20Enquiry%20to%20ISECC"
                       style="display:inline-block;padding:14px 30px;
                              color:#ffffff;font-size:14px;font-weight:700;
                              text-decoration:none;letter-spacing:0.4px;">
                      &#10003;&nbsp;&nbsp;Reply to {$firstName}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── FOOTER ─────────────────────────────────────────────────── -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;
                        padding:24px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle">
                    <img src="https://www.isecc.in/ISECC.png"
                         alt="ISECC"
                         width="72"
                         style="display:block;height:auto;
                                opacity:0.35;filter:grayscale(100%);
                                -webkit-filter:grayscale(100%);">
                  </td>
                  <td valign="middle" align="right">
                    <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.7;text-align:right;">
                      India Strategic Economic Corridors Council<br>
                      <a href="https://www.isecc.in"
                         style="color:#1d4ed8;text-decoration:none;font-weight:500;">
                        www.isecc.in
                      </a>
                      &nbsp;&bull;&nbsp; &copy; {$year} ISECC. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- /CARD -->

      </td>
    </tr>
  </table>

</body>
</html>
HTML;

// ── Minimal SMTP sender (SSL, no external libs) ─────────────────────────────
function smtp_send(
    string $host, int $port,
    string $user, string $pass,
    string $from, string $to, string $bcc,
    string $replyTo, string $subject, string $html
): array {
    $ctx = stream_context_create([
        'ssl' => [
            'verify_peer'      => true,
            'verify_peer_name' => true,
        ],
    ]);

    $sock = @stream_socket_client(
        "ssl://{$host}:{$port}", $errno, $errstr, 30,
        STREAM_CLIENT_CONNECT, $ctx
    );

    if (!$sock) {
        return ['ok' => false, 'err' => "Connect failed: {$errstr} ({$errno})"];
    }

    // Helper: read until the last line of a multi-line reply
    $recv = function () use ($sock): string {
        $buf = '';
        while ($line = fgets($sock, 1024)) {
            $buf .= $line;
            if (isset($line[3]) && $line[3] === ' ') break; // "250 " vs "250-"
        }
        return $buf;
    };

    // Helper: send a command and return the server reply
    $cmd = function (string $c) use ($sock, $recv): string {
        fwrite($sock, $c . "\r\n");
        return $recv();
    };

    $recv();                                       // 220 greeting
    $cmd('EHLO ' . (gethostname() ?: 'localhost'));
    $cmd('AUTH LOGIN');
    $cmd(base64_encode($user));
    $authResp = $cmd(base64_encode($pass));

    if (substr(trim($authResp), 0, 3) !== '235') {
        fclose($sock);
        return ['ok' => false, 'err' => 'SMTP authentication failed'];
    }

    $cmd("MAIL FROM:<{$from}>");
    $cmd("RCPT TO:<{$to}>");
    if ($bcc) {
        $cmd("RCPT TO:<{$bcc}>");
    }
    $cmd('DATA');

    $msgId  = md5(uniqid((string) time(), true)) . '@isecc.in';
    $date   = date('r');
    $headers  = "Date: {$date}\r\n";
    $headers .= "From: \"ISECC Website\" <{$from}>\r\n";
    $headers .= "To: {$to}\r\n";
    if ($bcc)     $headers .= "Bcc: {$bcc}\r\n";
    if ($replyTo) $headers .= "Reply-To: {$replyTo}\r\n";
    $headers .= "Subject: {$subject}\r\n";
    $headers .= "Message-ID: <{$msgId}>\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: quoted-printable\r\n";

    $body    = quoted_printable_encode($html);
    $sendResp = $cmd($headers . "\r\n" . $body . "\r\n.");

    if (substr(trim($sendResp), 0, 3) !== '250') {
        fclose($sock);
        return ['ok' => false, 'err' => 'DATA send rejected: ' . trim($sendResp)];
    }

    $cmd('QUIT');
    fclose($sock);

    return ['ok' => true];
}

// ── Send the email ───────────────────────────────────────────────────────────
$result = smtp_send(
    $smtpHost, $smtpPort,
    $smtpUser, $smtpPass,
    $smtpUser,
    $mailTo, $mailBcc,
    $email,
    $subject, $html
);

if ($result['ok']) {
    echo json_encode(['success' => true]);
} else {
    error_log('ISECC contact mailer error: ' . $result['err']);
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send. Please email us directly at contact@isecc.in']);
}
