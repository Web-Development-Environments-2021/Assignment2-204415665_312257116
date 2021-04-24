var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var userDic={};
userDic["k"]="k";
var game_username;
var ghost_num=2;

/*all modals declaration*/ 


$(document).ready(function() {

	context = canvas.getContext("2d");
	Start();

	//register
	$("#registerForm").validate({
		rules: {
			register_username: {
				required: true,
				isUserExists: true
			},
			register_password: {
				required: true,
				strongPassword: true
			},
			register_name: {
				required: true,
				lettersonly: true
			},
			register_email: {
				required: true,
				email: true
			},
			register_dates: {
				required: true
			}
		},
		messages: {
			register_username: {
				required: "Please enter valid username address.",
				isUserExists: "this Username already taken."
			},
			register_password: {
				required: "Please enter an password",
				strongPassword: "your password must contain at least one character and one number."
			},
			register_name: {
				required: "Please enter a name.",
				lettersonly: "your Full name can be only letters."
			},
			register_email: {
				required: "Please enter an email address.",
				email: "Please enter a valid email."
			},
			register_dates: {
				required: "Please enter a birth day."
			}
		},

		submitHandler: function() {
			//add user to users dic

			let username = document.getElementById("register_username_id").value;
			let password = document.getElementById("register_password_id").value;

			userDic[username] = password;
			let form = $("#registerForm");
			form[0].reset();
			welcomeON();

		}
	});

	$("#logInForm").validate({
		rules: {
			logIn_name: {
				required: true,
			},
			logIn_password: {
				required: true,
				validateUser: true
			}
		},
		messages: {
			logIn_name: {
				required: "Please enter username."
			},
			logIn_password: {
				required: "Please enter an password",
				validateUser: "Username or password is not valid."
			}
		},
		submitHandler: function () {

			document.getElementById("NotLogIn").style.display = "none";
			UserScreenON();

			//reset form details
			let form = $("#logInForm");
			form[0].reset();
		}
		
	});
	var logInmodal = document.getElementById('logIn');
	var signInmodal = document.getElementById('signIn');
	var settingmodal = document.getElementById('setting');
	var aboutmodal = document.getElementById('about');
	var UserScreenmodal = document.getElementById('UserScreen');
	window.onclick = function(event) {
		if (event.target == logInmodal) {
			logInmodal.style.display = "none";
			welcomeON();
		}
		if (event.target == signInmodal) {
			signInmodal.style.display = "none";
			welcomeON();
		}
		if (event.target == settingmodal) {
			settingmodal.style.display = "none";
			welcomeON();
		}
		if (event.target == aboutmodal) {
			// document.getElementById('aboutDialog').close();
			aboutmodal.style.display = "none";
			welcomeON();
		}
		if (event.target == UserScreenmodal) {
			UserScreenmodal.style.display = "none";
			welcomeON();
		}
}
});

$(function() {

	//Password must contain at least 6 digit and contain one number and one char.
	$.validator.addMethod('strongPassword', function (value, element) {
		return this.optional(element) ||
			value.length >= 6 &&
			/\d/.test(value) &&
			/[a-z]/i.test(value);
	});


    //check if username already exists
	$.validator.addMethod('isUserExists', function (users, element) {
		if(users in userDic) {
			return false;
		}
		else{
			return true;
		}
	});

	//check if password match user
	$.validator.addMethod('validateUser', function (password, element) {

		let user_input_username = document.getElementById("logIn_name_id").value;

		let user_logIn_password = userDic[user_input_username];

		if(!(user_input_username in userDic)) {
			return false;
		}
		else if(user_logIn_password === password) {
			return true;
		}

		return false;
	});

	});

const isUserExists = (users, key) => {

	let result = users in userDic;

	if(users in userDic) {
		if(userDic[users]==key){
			return true;
		}	
	}
	return false;
};
function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

  
function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}
function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
  }
function DIV_none() {
	var x = document.getElementById('DIV_none');
	ar = document.getElementsByTagName("code");
	for (i = 0; i < ar.length; ++i)
   	ar[i].style.display = "none";

	if (x.style.display === 'none') {
	  x.style.display = 'block';
	} else {
	  x.style.display = 'none';
	}
  }
function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}
function resetElement() {
	document.getElementById("welcome").style.display = "none";
    document.getElementById("logIn").style.display = "none";
	document.getElementById("signIn").style.display = "none";
	document.getElementById("setting").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("UserScreen").style.display = "none";

}
function welcomeON() {
	resetElement();
	document.getElementById("welcome").style.display = "block";
}
function logInON() {
	resetElement();
	document.getElementById("logIn").style.display = "block";
}
function signInON() {
	resetElement();
	document.getElementById("signIn").style.display = "block";
}
function settingON() {
	resetElement();
	document.getElementById("setting").style.display = "block";
}
function aboutON() {
	resetElement();
	document.getElementById("about").style.display = "block";
	document.getElementById("aboutDialog").showModal();
}
function UserScreenON() {
	resetElement();
	document.getElementById("UserScreen").style.display = "block";
}

function UserScreenON() {
	resetElement();
	document.getElementById("UserScreen").style.display = "block";
}

/*-------span Close------- */
function closeSpan(){
	document.getElementById('aboutDialog').close();
	document.getElementById('about').style.display = "none";
	welcomeON();
}

/*-------setVolume------- */
var Volslider = document.getElementById("Volume");
var Voloutput = document.getElementById("Volume_val");
Voloutput.innerHTML = Volslider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
Volslider.oninput = function() {
 Voloutput.innerHTML = this.value;
}
var x = document.getElementById("myAudio");

function setVolume() { 
  x.volume = Volslider.value/100;
}

var enemslider = document.getElementById("enemNum");
var enemoutput = document.getElementById("enem_val");
enemoutput.innerHTML = enemslider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
enemslider.oninput = function() {
 enemoutput.innerHTML = this.value;
}
var lifeslider = document.getElementById("lifeNum");
var lifeoutput = document.getElementById("life_val");
lifeoutput.innerHTML = lifeslider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
lifeslider.oninput = function() {
 lifeoutput.innerHTML = this.value;
}






