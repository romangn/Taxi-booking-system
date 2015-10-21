
//Access to php file, record and display those records
function getDetails() {
	document.getElementById("status").innerHTML = "Searching...";
    var xhr = new XMLHttpRequest();
	var bookingNumber;
	var customerName;
	var customerAddress;
	var suburb;
	var destination;
	var phoneNumber;
	var pickupDate;
	var pickupTime;
	var bookingDate;
	var bookingTime;
	
	var tempBookingNumber;
	var tempCustomerName;
	var tempCustomerAddress;
	var tempSuburb;
	var tempDestination;
	var tempPhoneNumber;
	var tempPickupDate;
	var tempPickupTime;
	var tempBookingDate;
	var tempBookingTime;
	var url = "showBookings.php";
	xhr.open("GET", url, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			var parser = new DOMParser();
			var doc = parser.parseFromString(xhr.responseText, "application/xml");
			tempBookingNumber = doc.getElementsByTagName("bookingNumber");
			tempCustomerName = doc.getElementsByTagName("customerName")
			tempCustomerAddress = doc.getElementsByTagName("pickupAddress");
			tempSuburb = doc.getElementsByTagName("suburb");
			tempDestination = doc.getElementsByTagName("destination");
			tempPhoneNumber = doc.getElementsByTagName("phoneNumber");
			tempPickupDate = doc.getElementsByTagName("pickUpDate");
			tempPickupTime = doc.getElementsByTagName("pickUpTime");
			tempBookingDate = doc.getElementsByTagName("bookingDate");
			tempBookingTime = doc.getElementsByTagName("bookingTime");
			document.getElementById("p1").innerHTML="";
			createTable();
			for (i=0;i< tempBookingNumber.length;i++) {
				bookingNumber = tempBookingNumber[i].childNodes[0].nodeValue;
				customerName = tempCustomerName[i].childNodes[0].nodeValue;
				customerAddress = tempCustomerAddress[i].childNodes[0].nodeValue;
				suburb = tempSuburb[i].childNodes[0].nodeValue;
				destination = tempDestination[i].childNodes[0].nodeValue;
				phoneNumber = tempPhoneNumber[i].childNodes[0].nodeValue;
				pickupDate = tempPickupDate[i].childNodes[0].nodeValue;
				pickupTime = tempPickupTime[i].childNodes[0].nodeValue;
				bookingDate = tempBookingDate[i].childNodes[0].nodeValue;
				bookingTime = tempBookingTime[i].childNodes[0].nodeValue;
				addRow(bookingNumber, customerName, customerAddress, suburb, destination, phoneNumber, pickupDate, pickupTime, bookingDate, bookingTime);
			}
			document.getElementById("status").innerHTML = tempBookingNumber.length + " bookings were found!";
		}
	}
	xhr.send(null);
	document.getElementById("status").innerHTML = "Preparing to display data..";
}
//This function creates a table for the records
function createTable() {
	removeTable();
	var table = document.getElementById("tbl");
	var row = document.createElement("tr");
	var col1 = document.createElement("td");
	var element1 = document.createTextNode("Booking Number");
	row.appendChild(col1);
	col1.appendChild(element1);
	var col2 = document.createElement("td");
	var element2 = document.createTextNode("Customer's name");
	row.appendChild(col2);
	col2.appendChild(element2);
	var col3= document.createElement("td");
	var element3 = document.createTextNode("Customer's address");
	row.appendChild(col3);
	col3.appendChild(element3);
	var col4 = document.createElement("td");
	var element4 = document.createTextNode("Suburb");
	row.appendChild(col4);
	col4.appendChild(element4);
	var col5 = document.createElement("td");
	var element5 = document.createTextNode("Destination");
	row.appendChild(col5);
	col5.appendChild(element5);
	var col6 = document.createElement("td");
	var element6 = document.createTextNode("Customer's phone number");
	row.appendChild(col6);
	col6.appendChild(element6);
	var col7 = document.createElement("td");
	var element7 = document.createTextNode("Customer's pick up date");
	row.appendChild(col7);
	col7.appendChild(element7);
	var col8 = document.createElement("td");
	var element8 = document.createTextNode("Customer's pick up time");
	row.appendChild(col8);
	col8.appendChild(element8);
	var col9 = document.createElement("td");
	var element9 = document.createTextNode("Booking date");
	row.appendChild(col9);
	col9.appendChild(element9);
	var col10 = document.createElement("td");
	var element10 = document.createTextNode("Booking time");
	row.appendChild(col10);
	col10.appendChild(element10);	
	table.appendChild(row);
}
//This function removes the tables contents
function removeTable() {
	var currentTable = document.getElementById('tbl');
	while ( currentTable.rows.length > 0 ) {
		currentTable.deleteRow(0);
	}
}
//Add information to row for further display
function addRow(bookingNumber, customerName, customerAddress, suburb, destination, phoneNumber, pickupDate, pickupTime, bookingDate, bookingTime) {
	var table = document.getElementById("tbl");
    var row = document.createElement("tr");
	var output = document.getElementById("p1").innerHTML;
	var counter  = 0;
	var rowContents = [bookingNumber, customerName, customerAddress, suburb, destination, phoneNumber, pickupDate, pickupTime, bookingDate, bookingTime];
	document.getElementById("status").innerHTML = "writing output";
	while(counter < rowContents.length) {		
		var col1 = document.createElement("td");
		var element1 = document.createTextNode(rowContents[counter]);
		row.appendChild(col1);
		col1.appendChild(element1);
		counter = counter +1;
		}
		table.appendChild(row);
}
//Check if the user input is empty
function checkForEmptyInput(input) {
	var empty = true;
	if(input == "" || input == " ") {
		empty = false; 
	}
	return empty;
}
//Access the php file and parse the form's input
function assignCar() {
	var chosenBookingNumber = document.getElementsByName("chosenBookingNumber")[0].value;
	if(checkForEmptyInput(chosenBookingNumber) == true) {
			var xhr = new XMLHttpRequest();
			var url = "showBookings.php";
			var data = "chosenBookingNumber="+chosenBookingNumber;  
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				var return_data = xhr.responseText;
				document.getElementById("status").innerHTML = return_data;
			}
		}
		xhr.send(data); 
		document.getElementById("status").innerHTML = "Assigning...";
		}
		else
			document.getElementById("status").innerHTML = "Enter the proper booking number";
}