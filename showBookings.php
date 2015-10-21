<?php

	//Check for request method
	if($_SERVER['REQUEST_METHOD'] == 'POST') {
		assignCar();
	}
	else
		displayBookings();
//This function accesses databases and sends records as XML
function displayBookings() {
	$host;
	$user;
	$pswd;
	$dbnm;
	$connection = mysqli_connect($host, $user, $pswd, $dbnm) or die('Failed to connect.');
	$searchQuery = "SELECT * FROM bookings where status = 'unassigned'";
	$result = mysqli_query($connection, $searchQuery);
	$xml = new SimpleXMLElement('<xml/>');
	if(mysqli_num_rows($result)>0) {
		while($result_array = mysqli_fetch_array($result)) {
			$data = $xml->addChild('search');
			$data->addChild('bookingNumber',$result_array['bookingNumber']);
			$data->addChild('customerName',$result_array['customerName']);
			$data->addChild('pickupAddress',$result_array['pickupAddress']);
			$data->addChild('suburb',$result_array['suburb']);
			$data->addChild('destination',$result_array['destination']);
			$data->addChild('phoneNumber',$result_array['contactPhone']);
			$data->addChild('pickUpDate',$result_array['pickUpDate']);
			$data->addChild('pickUpTime',$result_array['pickUpTime']);
			$data->addChild('bookingDate',$result_array['bookingDate']);
			$data->addChild('bookingTime',$result_array['bookingTime']);
		}
	}
	echo $xml->asXML();
}
//This function assigns car to the booking
function assignCar() {
	$host;
	$user;
	$pswd;
	$dbnm;
	$chosenBookingNumber = $_POST['chosenBookingNumber'];
	$connection = mysqli_connect($host, $user, $pswd, $dbnm) or die('Failed to connect.');
	$searchQuery = "Select * FROM bookings where bookingNumber ='$chosenBookingNumber'";
	$search = mysqli_query($connection, $searchQuery);
	$updateQuery = "UPDATE bookings SET status ='assigned' where bookingNumber ='$chosenBookingNumber'";
	//Check if input exists in the datababase
	if(mysqli_num_rows($search) == 0) {
		echo "Booking number like this does not exist in the database!";
	}
	//Change record status to assigned
	else {
		$result = mysqli_query($connection, $updateQuery);
		echo "The car has been assigned to $chosenBookingNumber!";
	}
}

	





?>
