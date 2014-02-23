// ***********************************************
// 	Form Validation
//	This is some basic form validation, 
//	making sure fields are filled in and
//	the terms checkbox is checked.
//	When complete, package the data and send it
//	to a php script for processing
// ***********************************************

if (txt_name.text == "" || txt_addy.text == "" || txt_city.text == "" || 
	txt_state.text == "" || txt_zip.text == "" || txt_phone.text == "" || txt_age.text == "") {
	gotoAndStop(2);
}
else if (terms.selected == false) {
	gotoAndStop(3);
}
else {
	userData = new LoadVars();
	userData.txt_name = txt_name;
	userData.txt_addy = txt_addy;
	userData.txt_city = txt_city;
	userData.txt_state = txt_state;
	userData.txt_zip = txt_zip;
	userData.txt_phone = txt_phone;
	userData.txt_age = txt_age;
	userData.send("chocfrey.php", "_self", "POST");
	_parent.gotoAndPlay("finish");
}
