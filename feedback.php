<?php

$dbc = mysqli_connect('localhost', 'poizonxmru', 'S5r8w2q7gz', 'poizonxmru');

$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];
$time = $data['time'];

$query = "INSERT INTO feedback (first_name, comment)
          VALUES ('$name', '$time')";

$result = mysqli_query($dbc, $query);

http_response_code('201');
header('Content-type: application/json');
print json_encode(array('message' => 'Feedback has been sent'));

mysqli_close($dbc);

?>

