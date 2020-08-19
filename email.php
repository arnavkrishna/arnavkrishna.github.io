<?php

if($_POST["message"]) {

mail("your@email.address", "Here is the subject line",

$_POST["insert your message here"]. "From: an@email.address");

}

?>

<!DOCTYPE html>
<html lang="en">
<head>
<title>email me</title>
<style>

</style>

</head>
<body>

<form method="post" action="subscriberform.php">
   
<textarea name="message"></textarea>

<input type="submit">

</form>

</body>

</html>