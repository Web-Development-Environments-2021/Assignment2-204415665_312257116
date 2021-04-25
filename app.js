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

var chosen_key_up = "ArrowUp";
var chosen_key_down = "ArrowDown";
var chosen_key_right = "ArrowRight";
var chosen_key_left = "ArrowLeft";
var chosen_key_code_up = 38;
var chosen_key_code_down = 40;
var chosen_key_code_left = 37;
var chosen_key_code_right = 39;
var chosen_food_amount = 70;
var chosen_food_5_color;
var chosen_food_15_color;
var chosen_food_25_color;
var chosen_game_duration = 100;
var ghost_num = 2;

var Volslider;
var Voloutput;

var myAudio;

var enemslider;
var enemoutput;

var foodslider;
var foodoutput;

/*all modals declaration*/ 


$(document).ready(function() {

	context = canvas.getContext("2d");


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
				strongPassword: "your password must contain at least 6 character and least one letter and one number."
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
			game_username = document.getElementById("logIn_name_id").value;
			document.getElementById("NotLogIn").style.display = "none";
			UserScreenON();
			settingON();
			//reset form details
			let form = $("#logInForm");
			form[0].reset();
		}
		
	});
	$("#setting_form").validate({
		rules: {
			UP_name: {
			 	keyChange1: '#RIGHT',
				keyChange1: '#DOWN',
				keyChange1: '#LEFT'
			},
			DOWN_name: {
				keyChange1: '#UP',
				keyChange1: '#RIGHT',
				keyChange1: '#LEFT'
			},
			LEFT_name: {
				keyChange1: '#UP',
				keyChange1: '#DOWN',
				keyChange1: '#RIGHT'
			},
			RIGHT_name: {
				keyChange1: '#UP',
				keyChange1: '#DOWN',
				keyChange1: '#LEFT'
			},
			duration_name: {
				gameTimeMoreThen60: 60
			}
		},
		messages: {
			UP_name: {			
				keyChange1: "This key already taken by another action.",

			},
			DOWN_name: {
				keyChange1: "This key already taken by another action.",

					},
			LEFT_name: {
				keyChange1: "This key already taken by another action.",

						},
			RIGHT_name: {
				keyChange1: "This key already taken by another action.",

					},
			duration_name: {
				gameTimeMoreThen60: "Minimum game duration is 60 second."
			}
		},
		submitHandler: function () {
			Start();
			UserScreenConsoleON();
			
			// Start();

			//reset form details
			// let form = $("#setting");
			// form[0].reset();
		}
	});
/*-----------------------------------div setting--------------------------------------*/
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


	/*---------------------------slider-------------------------*/

		Volslider = document.getElementById("Volume");
		let Voloutput = document.getElementById("Volume_val");

		enemslider = document.getElementById("ghost_num_id");
		let enemoutput = document.getElementById("enem_val");

		foodslider = document.getElementById("foodNum");
		let lifeoutput = document.getElementById("food_val");

		Voloutput.innerHTML = Volslider.value; // Display the default slider value
		// Update the current slider value (each time you drag the slider handle)
		Volslider.oninput = function() {
		Voloutput.innerHTML = this.value;
		}
		
		enemoutput.innerHTML = enemslider.value; // Display the default slider value
		// Update the current slider value (each time you drag the slider handle)
		enemslider.oninput = function() {
		enemoutput.innerHTML = this.value;
		}

		lifeoutput.innerHTML = foodslider.value; // Display the default slider value
		// Update the current slider value (each time you drag the slider handle)
		foodslider.oninput = function() {
		lifeoutput.innerHTML = this.value;
		}
	}
});

/*----------------------------------validator function---------------------------------------*/
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
		if(user_input_username in userDic) {
			if(userDic[user_input_username] === password) {
				return true;
			}
	
		}
		return false;
	});
	//chack if key already taken by another action
	$.validator.addMethod("keyChange1", function(value, element, param) {
		return value != $(param).val();
	});
	$.validator.addMethod("keyChange2", function(value, element, param) {
		return value != $(param).val();

	});
	$.validator.addMethod("keyChange3", function(value, element, param) {
		return value != $(param).val();
	});
	$.validator.addMethod('gameTimeMoreThen60', function (value, element, param) {
		return value >= param;
	});

});

	/*---------------------------configuration setting-----------------------------------*/
	function update_time(){
		chosen_game_duration=document.getElementById('duration_id').value;
	}
	function configurationUpdate(data)
	{
		//set pacman controls:
		let chosen_key_code;
		$(document).keydown(function(event){
				chosen_key_code = event.keyCode;
				if (data === "up")
				{
					chosen_key_up = checkChosenKey(chosen_key_code);
					chosen_key_code_up = chosen_key_code;
					document.getElementById("UP").value = chosen_key_up;
	
				}
				else if (data === "down")
				{
					chosen_key_down = checkChosenKey(chosen_key_code);
					chosen_key_code_down = chosen_key_code;
					document.getElementById("DOWN").value = chosen_key_down;
				}
				else if (data === "left")
				{
					chosen_key_left = checkChosenKey(chosen_key_code);
					chosen_key_code_left = chosen_key_code;
					document.getElementById("LEFT").value = chosen_key_left;
				}
				else if (data === "right")
				{
					chosen_key_right = checkChosenKey(chosen_key_code);
					chosen_key_code_right = chosen_key_code;
					document.getElementById("RIGHT").value = chosen_key_right;
				}
				$(document).unbind();
			}
		);
	}
	
	function update_color(food_value)
	{
		if(food_value === "5")
		{
			chosen_food_5_color = document.getElementById('5_Color_id').value;
		}
		else if(food_value === "15")
		{
			chosen_food_15_color = document.getElementById('15_Color_id').value;
		}
		else if(food_value === "25")
		{
			chosen_food_25_color = document.getElementById('25_Color_id').value;
		}
	}
	
	function checkChosenKey(key_code)
	{
		if(key_code == 38)
		{
			return "ArrowUp";
		}
		else if(key_code == 40)
		{
			return "ArrowDown";
		}
		else if(key_code == 39)
		{
			return "ArrowRight";
		}
		else if(key_code == 37)
		{
			return "ArrowLeft";
		}
		else {
			return String.fromCharCode(event.keyCode);
		}
	}
	
	
	function randomConfigurations()
	{
		//set pacman controls keys to thr arrows keys:
		chosen_key_up = "ArrowUp";
		chosen_key_down = "ArrowDown";
		chosen_key_left = "ArrowLeft";
		chosen_key_right = "ArrowRight";

		document.getElementById('UP').value = chosen_key_up;
		document.getElementById('DOWN').value = chosen_key_down;
		document.getElementById('LEFT').value = chosen_key_left;
		document.getElementById('RIGHT').value = chosen_key_right;
	

	
		//random food amount
		chosen_food_amount = Math.floor(Math.random() * (41) + 50);
		document.getElementById('foodNum').value = chosen_food_amount;
		// document.getElementById('chosen_food_amount').value = chosen_food_amount;
	
		//random food color
		chosen_food_5_color = "#" + Math.floor(Math.random()*16777215).toString(16);
		document.getElementById('5_Color_id').value =chosen_food_5_color;
		
		chosen_food_15_color = "#" + Math.floor(Math.random()*16777215).toString(16);
		document.getElementById('15_Color_id').value =chosen_food_15_color;
		
		chosen_food_25_color = "#" + Math.floor(Math.random()*16777215).toString(16);
		document.getElementById('25_Color_id').value = chosen_food_25_color;
		
		//random Game Duration
		chosen_game_duration =  Math.floor(Math.random() * (61) + 60);
		document.getElementById('duration_id').value = chosen_game_duration;
		
	
		//random amount of monsters
		ghost_num = Math.floor(Math.random() * (4) + 1);
		document.getElementById('ghost_num_id').value = ghost_num;

	}
	
	
	
function Start() {
	initialGameValues();
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
function initialGameValues() {

	start_time = new Date();
	ghost_num = parseInt(document.getElementById('ghost_num_id').value.substring(0,1));
	food_amount = chosen_food_amount;

	document.getElementById("game_username").value = game_username;

	chosen_game_duration = parseInt(document.getElementById('duration_id').value);

	//color
	chosen_food_5_color = document.getElementById('5_Color_id').value;
	chosen_food_15_color = document.getElementById('15_Color_id').value;
	chosen_food_25_color = document.getElementById('25_Color_id').value;
	destination = 0;

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
	document.getElementById("about").style.display = "none";
	document.getElementById("setting").style.display = "none";
	document.getElementById("UserScreenWelcome").style.display = "none";
	document.getElementById("UserScreenAbout").style.display = "none";
	document.getElementById("UserScreenConsole").style.display = "none";

}
/*-----------------------logout user screen-------------------------------- */
function logOutON(){
	game_username = "";
	resetElement();
	document.getElementById("UserScreen").style.display = "none";
	document.getElementById("NotLogIn").style.display = "block";
	welcomeON();
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

function aboutON() {
	resetElement();
	document.getElementById("about").style.display = "block";
	document.getElementById("aboutDialog").showModal();
}

/*-----------------------login user screen-------------------------------- */
function UserScreenON() {
	resetElement();
	document.getElementById("game_username").value = game_username;
	document.getElementById("NotLogIn").style.display = "none";
	document.getElementById("UserScreen").style.display = "block";
}

function settingON() {
	resetElement();
	document.getElementById("setting").style.display = "block";
}

function UserScreenWelcomeON() {
	resetElement();
	document.getElementById("UserScreenWelcome").style.display = "block";
}

function UserScreenAboutON() {
	resetElement();
	document.getElementById("UserScreenAbout").style.display = "block";
}

function UserScreenConsoleON() {
	resetElement();
	document.getElementById("UserScreenConsole").style.display = "block";
}

// /*-------span Close------- */
// function closeSpan(){
// 	document.getElementById('aboutDialog').close();
// 	document.getElementById('about').style.display = "none";
// 	welcomeON();
// }








