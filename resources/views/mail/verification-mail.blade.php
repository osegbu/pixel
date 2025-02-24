<!DOCTYPE html>
<html>
<head>
    <title>Verify Your Email Address</title>
</head>
<body>
<h1>Verify Your Email Address</h1>
<p>Please click the link below to verify your email address:</p>
<a href="{{ url('/verify-email?token=' . $token) }}">Verify Email</a>
</body>
</html>
