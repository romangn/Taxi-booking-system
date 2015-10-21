
//Sends form's detail to php file
function sendDetails() {
	var xhr = new XMLHttpRequest();
	var customerName = document.getElementsByName("customerName")[0].value;
	var streetName = document.getElementsByName("streetName")[0].value;
	var streetNumber = document.getElementsByName("streetNumber")[0].value;
	var unitNumber = document.getElementsByName("unitNumber")[0].value;
	var suburb = document.getElementsByName("suburb")[0].value;
	var destination = document.getElementsByName("destination")[0].value;
	var phoneNumber = document.getElementsByName("phoneNumber")[0].value;
	var pickupDate = document.getElementsByName("pickupDate")[0].value;
	var pickupTime = document.getElementsByName("pickupTime")[0].value;
	var data = "customerName="+customerName+"&streetName="+streetName+"&streetNumber="+streetNumber+"&unitNumber="+unitNumber+"&suburb="+suburb+"&destination="+destination+"&phoneNumber="+phoneNumber+"&pickupDate="+pickupDate+"&pickupTime="+pickupTime;
	var url = "processBooking.php";
	var btnHide = document.getElementById("btn");
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			var return_data = xhr.responseText;
			document.getElementById("status").innerHTML = return_data;
		}
	}
	xhr.send(data);
	console.log(data);
	document.getElementById("status").innerHTML = "Saving...";
	btnHide.style.display = 'none';
}


//Checks if the form is filled by the user
function isFormFilled() {
	var filled = true;
	var customerName = document.getElementsByName("customerName")[0].value;
	var streetName = document.getElementsByName("streetName")[0].value;
	var streetNumber = document.getElementsByName("streetNumber")[0].value;
	var unitNumber = document.getElementsByName("unitNumber")[0].value;
	var suburb = document.getElementsByName("suburb")[0].value;
	var destination = document.getElementsByName("destination")[0].value;
	var phoneNumber = document.getElementsByName("phoneNumber")[0].value;
	var pickupDate = document.getElementsByName("pickupDate")[0].value;
	var pickupTime = document.getElementsByName("pickupTime")[0].value;


	if(checkForEmptyInput(customerName) == false) 
		filled = false;
		
	if(checkForEmptyInput(streetName) == false) 
		filled = false;
		
	if(checkForEmptyInput(streetNumber) == false) 
		filled = false;
		
	if(checkForEmptyInput(unitNumber) == false) 
		filled = false;
		
	if(checkForEmptyInput(suburb) == false) 
		filled = false;
		
	if(checkForEmptyInput(destination) == false) 
		filled = false;
		
	if(checkForEmptyInput(phoneNumber) == false) 
		filled =false;
		
	if(checkForEmptyInput(pickupDate) == false) 
		filled =false;
		
	if(checkForEmptyInput(pickupTime) == false) 
		filled =false;
		
	return filled;
}
//Checks if the form is filled in, sends it to php if yes, otherwise asks to provide input
function checkFormInput() {
	document.getElementById("status").innerHTML = "Checking....";
	if(isFormFilled() == true)
		sendDetails();
	else
		document.getElementById("status").innerHTML = "Form not filled in...";
}
//Checks if the input field is empty or the user has inputted empty string
function checkForEmptyInput(input) {
	var empty = true;
	if(input == "" || input == " ") {
		empty = false; 
	}
	return empty;
}
