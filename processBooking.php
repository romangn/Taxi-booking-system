<?php

	date_default_timezone_set('Pacific/Auckland');
	$host;
	$user;
	$pswd;
	$dbnm;
	$customerName = $_POST['customerName'];
    $streetName = $_POST['streetName'];
	$streetNumber = $_POST['streetNumber'];
	$unitNumber = $_POST['unitNumber'];
	$suburb = $_POST['suburb'];
	$destination = $_POST['destination'];
	$phoneNumber = $_POST['phoneNumber'];
	$pickupDate = $_POST['pickupDate'];
	$pickupTime = $_POST['pickupTime'];
	//Sets booking number to be random
	$bookingNumber = rand (0, 99999999);
	$dateFormat = date('Y-m-d');
	$timeFormat = date('H:i');
	$bookingExists = false;
	//Puts address input into one string
	$customerAddress = $streetName . ' '. $streetNumber . ' ' . $unitNumber;
	$connection = mysqli_connect($host, $user, $pswd, $dbnm) or die('Failed to connect.');
	$insertionQuery = "INSERT INTO bookings(bookingNumber,status,customerName,contactPhone,pickupAddress,suburb,destination,pickUpDate,pickUpTime,bookingTime,bookingDate) VALUES('$bookingNumber','unassigned','$customerName','$phoneNumber','$customerAddress','$suburb','$destination', '$pickupDate', '$pickupTime', '$timeFormat', '$dateFormat')";
	//Create new booking
	if(mysqli_query($connection, $insertionQuery)) {
		echo "Thanks for the booking. Your booking number is: $bookingNumber. You will be picked up in front of your provided address at $pickupTime on $pickupDate";				
	}	
	
?>