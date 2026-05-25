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
$html = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        <tr>
          <td style="background:#1d4ed8;padding:28px 36px;">
            <h1 style="color:#ffffff;margin:0;font-size:18px;font-weight:700;letter-spacing:0.5px;">
              New Institutional Enquiry — ISECC
            </h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:6px 0;font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;width:130px;">Name</td>
                <td style="padding:6px 0;font-size:15px;color:#1e293b;">{$firstName} {$lastName}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Reply-To</td>
                <td style="padding:6px 0;font-size:15px;"><a href="mailto:{$email}" style="color:#1d4ed8;text-decoration:none;">{$email}</a></td>
              </tr>
            </table>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;">
            <p style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin:0 0 10px;">Message</p>
            <p style="font-size:15px;color:#1e293b;line-height:1.75;margin:0;">{$msgHtml}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 36px;background:#f8fafc;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">
              Sent via the ISECC website contact form &nbsp;·&nbsp; isecc.in
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
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
