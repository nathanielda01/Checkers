
function init() {
	'use strict'
	
	logInHandler();
}

window.onload = init;





function logInHandler() {
	console.log("logInHandler fired")
	var btnClick = document.getElementById("logInBtn")
	btnClick.onclick = function() {
		var userName = document.getElementById("username").value;
		var password = document.getElementById("userPassword").value;
		loadSyncPost(userName, password);
	}
}


function loadSyncPost(userName, password) {
	var msgBox = document.getElementById("msgBox");
    var data = "userName=" + userName + '&password=' + password;
	console.log(data);
    var localRequest = new XMLHttpRequest();

    // PASSING false AS THE THIRD PARAMETER TO open SPECIFIES SYNCHRONOUS
    localRequest.open("POST", "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php", false);
    localRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    localRequest.send(data);

    // NOTE THAT THE status WILL NOT BE 200 IF THE REQUEST IS FOR A
    // LOCAL FILE.
    if (localRequest.status == 200) {
	var responseJson = JSON.parse(localRequest.responseText);
	console.log(responseJson["result"])
	if (responseJson["result"] == "invalid")
	{
		msgBox.value = "Username or Password Incorrect";
	}
	else if (responseJson["result"] == "valid")
	{
		location.assign("game_grid.html");
		var logInInfo = responseJson["userName"] + " " + responseJson["timestamp"];
		localStorage.setItem('cs2550timestamp', logInInfo);
	}
	msgBox.innerHTML = "Your password is: " + responseJson["password"];
    }
}