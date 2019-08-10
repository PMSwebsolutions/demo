<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "demo";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  echo("Connection failed: " . $conn->connect_error);
}

function submit($conn,$request)
{
  $title = $request->title;
  $details = $request->details;
  $sql = "INSERT INTO blog (title,details) VALUES ('$title','$details')";
  $result = $conn->query($sql);
  echo mysqli_error($conn);
}

function view($conn)
{
  $sql = "SELECT * from blog";
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
      $arr = [];
      $count = 0;
      while($row = $result->fetch_assoc()) {
        $obj = new stdClass();
        $obj->id = $row['id'];
        $obj->title = $row['title'];
        $obj->details = $row['details'];
        $arr[$count] = $obj;
        $count = $count + 1;
        }
        echo json_encode($arr);
      }
  // echo "success";
  exit();
}

function del($conn,$request)
{
  $id = $request->id;
  $sql = "DELETE FROM blog WHERE id=$id";
  $result = $conn->query($sql);
  echo mysqli_error($conn);
}

$post = file_get_contents('php://input');
$request = json_decode($post);
$fun = $request->fun;

if ($fun == "sub") {
  submit($conn,$request);
}elseif ($fun == "view") {
  view($conn);
}elseif ($fun == "del") {
  del($conn,$request);
}


 ?>
