<?php
header('Content-Type: application/json');

$servername = "momfit.cxntn5wpxf9k.ap-southeast-2.rds.amazonaws.com";
$username = "root";
$password = "momfitadmindb";
$dbname = "momfit";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$gyms = getLocations($conn, "gymdata");
$pools = getLocations($conn, "swimmingpooldata");
$toilets = getLocations($conn, "toiletdata");

$conn->close();

echo json_encode([
  "womensgyms" => $gyms,
  "swimmingpools" => $pools,
  "publictoilets" => $toilets,
]);

function getLocations($conn, $table) {
  $locations = [];
  $sql = "SELECT * FROM $table";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      array_push($locations, [
        "name" => $row["Name"],
        "lat" => $row["Latitude"],
        "lng" => $row["Longitude"],
      ]);
    }
  }

  return $locations;
}
?>

