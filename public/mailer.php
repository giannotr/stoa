<?php

date_default_timezone_set('Germany/Berlin');
$datetime = date('m/d/Y h:i:s a', time());

$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$body = $name
  . 'contacted stoa.berlin (' . $datetime '):' . '\r\n'
  . $message;

$header = 'From: webmaster@example.com' . '\r\n'
  . $email . '\r\n'
  . 'X-Mailer: PHP/' . phpversion();

mail('contact@stoa.berlin', $subject, $body, $header);

?>