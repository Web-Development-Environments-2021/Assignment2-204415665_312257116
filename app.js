var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

var intervalGhost;
var intervalBitcoin;

var lives_left;

var bitcoin_img = new Image();
bitcoin_img.src = 'photos/bitcoin_icon.jpg';
var bitcoin_obj;

var pac_dir = "right"
var ghost_num = 4; // get from settings
var ghost_pos_board;
var ghost_obj;



$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});


////////////////////////* Start */ ///////////////////////


function Start() {

	board = new Array();
	ghost_pos_board = new Array();
	ghost_obj = new Array();
	bitcoin_obj = new Object();
	score = 0;
	lives_left = 5;

	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;

	// start_time = new Date();

	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		ghost_pos_board[i] = new Array();
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
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt && (
					!(i==0 && j==0) && !(i==0 && j==9) && !(i==9 && j==0) && !(i==9 && j==9) && !(i==5 && j==5))){
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
	//Add Pac-Man if Not Added Yet
	while(pacman_remain != 0){
		var emptyCell = findRandomEmptyCell(board);
		var i = emptyCell[0];
		var j = emptyCell[1];
		if(!(i==0 && j==0) && !(i==0 && j==9) && !(i==9 && j==0) && !(i==9 && j==9) && !(i==5 && j==5)){
			shape.i = i;
			shape.j = j;
			pacman_remain--;
			board[i][j] = 2;
		}
	}

	//Add Ghosts
	addGhosts();

	//Add bitcoin 50
	bitcoin_obj.i = 5;
	bitcoin_obj.j = 5;
	
	//Add Food Remain
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
	
}


////////////////////////* Draw */////////////////////////



function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblLives.value = lives_left - 1;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				if (pac_dir == "up"){
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				} else if (pac_dir == "down"){
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI,false); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				} else if (pac_dir == "left"){
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				} else if (pac_dir == "right"){
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}

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
			// Ghost
			if (ghost_pos_board[i][j] == 10){
				context.beginPath();
				context.arc(center.x, center.y, 20, 1 * Math.PI, 2 * Math.PI); // head
				context.fillStyle = "blue";
				context.fill();

				context.beginPath();
				context.arc(center.x + 10, center.y - 5 , 5, 0, 2 * Math.PI); // right eye
				context.fillStyle = "white"; 
				context.fill();

				context.beginPath();
				context.arc(center.x + 10, center.y - 5 , 2, 0, 2 * Math.PI); // in right eye
				context.fillStyle = "black";
				context.fill();

				context.beginPath();
				context.arc(center.x - 10, center.y - 5, 5, 0, 2 * Math.PI); // left eye
				context.fillStyle = "white"; 
				context.fill();

				context.beginPath();
				context.arc(center.x - 10, center.y - 5 , 2, 0, 2 * Math.PI); // in left eye
				context.fillStyle = "black"; 
				context.fill();

				context.beginPath(); // legs
				context.moveTo(center.x, center.y);

				context.lineTo(center.x + 20 , center.y);
				context.lineTo(center.x + 20 , center.y + 20);
				context.lineTo(center.x + 15 , center.y + 15);
				context.lineTo(center.x + 10 , center.y + 20);
				context.lineTo(center.x +  5 , center.y + 15);
				context.lineTo(center.x      , center.y + 20);
				context.lineTo(center.x -  5 , center.y + 15);
				context.lineTo(center.x - 10 , center.y + 20);
				context.lineTo(center.x - 15 , center.y + 15);
				context.lineTo(center.x - 20 , center.y + 20);
				context.lineTo(center.x - 20 , center.y);
				
				context.lineTo(center.x, center.y);
				context.fillStyle = "blue"; 
				context.fill();
			}
			// bitcoin img
			if (bitcoin_obj.i == i && bitcoin_obj.j == j){ 
				context.drawImage(bitcoin_img ,  i*(canvas.height/10) , j*(canvas.width/10), 55, 55 * (bitcoin_img.height / bitcoin_img.width))
			}
		}
	}
}



////////////////////////* Update Positions */ ///////////////////////

  
function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	var ateByGhost = false;
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			pac_dir = "up"
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			pac_dir = "down"
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			pac_dir = "left"
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			pac_dir = "right"
		}
	}

	// check if Pac-Man Hit By Ghost
	for (var i = 0 ; i < ghost_obj.length ; i++)
	{
		if ((ghost_obj[i].i == shape.i && ghost_obj[i].j == shape.j ) || ghost_pos_board[shape.i][shape.j] == 10)
		{
			GhostEatPacman();
			ateByGhost = true;
			break;
		}
	}

	if(!ateByGhost){
		// bitcoin points
		if (shape.i == bitcoin_obj.i && shape.j == bitcoin_obj.j){
			PacmanEatBitcoin();
		}
		// regular points
		if (board[shape.i][shape.j] == 1) {
			score++;
		}

		board[shape.i][shape.j] = 2;
		var currentTime = new Date();
		time_elapsed = (currentTime - start_time) / 1000;

		if (score >= 20 && time_elapsed <= 10) {
			pac_color = "green";
		}

		if (score == 1000) { // TODO : Game Finished
			clearAllIntervals();
			window.alert("Game completed");
		} else {
			Draw();
		}
	}
}


function updateGhosts() {

	for (var i = 0 ; i < ghost_obj.length ; i++){

		var row_dis = 0;
		var col_dis = 0;
		var ghost_row = ghost_obj[i].i;
		var ghost_col = ghost_obj[i].j;
		var changed_pos = false;

		if (board[ghost_row][ghost_col] == 2 || (ghost_row == shape.i && ghost_col == shape.j) || ghost_pos_board[shape.i][shape.j] == 10){
			GhostEatPacman();
			break;
		}

		row_dis = Math.abs(shape.i - ghost_row);
		col_dis = Math.abs(shape.j - ghost_col);
		if (row_dis > col_dis){ //left or right

			if(shape.i - ghost_row > 0 && ghost_row < 9 && board[ghost_row + 1][ghost_col] != 4 && ghost_pos_board[ghost_row + 1][ghost_col] != 10){ //right
				ghost_pos_board[ghost_row + 1][ghost_col] = 10;
				ghost_pos_board[ghost_row][ghost_col] = 0;
				ghost_obj[i].i++;
				ghost_row = ghost_obj[i].i;
				changed_pos = true;
			} else if(ghost_row > 0  && board[ghost_row - 1][ghost_col] != 4 && ghost_pos_board[ghost_row - 1][ghost_col] != 10) { // left
				ghost_pos_board[ghost_row - 1][ghost_col] = 10;
				ghost_pos_board[ghost_row][ghost_col] = 0;
				ghost_obj[i].i--;
				ghost_row = ghost_obj[i].i;
				changed_pos = true;
			}
		}
		if(!changed_pos) { //up or down
			if(shape.j - ghost_col > 0 && ghost_col < 9 && board[ghost_row][ghost_col + 1] !=4  && ghost_pos_board[ghost_row][ghost_col + 1] != 10){ //down
				ghost_pos_board[ghost_row][ghost_col + 1] = 10;
				ghost_pos_board[ghost_row][ghost_col] = 0;
				ghost_obj[i].j++;
			} else if(ghost_col > 0 && board[ghost_row][ghost_col - 1] !=4 && ghost_pos_board[ghost_row][ghost_col - 1] != 10){ //up
				ghost_pos_board[ghost_row][ghost_col - 1] = 10;
				ghost_pos_board[ghost_row][ghost_col] = 0;
				ghost_obj[i].j--;
			}
			ghost_col = ghost_obj[i].j;
		}

		if (board[ghost_row][ghost_col] == 2 || (ghost_row == shape.i && ghost_col == shape.j) || ghost_pos_board[shape.i][shape.j] == 10){
			GhostEatPacman();
			break;
		}
	}
}

function updateBitcoin(){

	var coin_row = bitcoin_obj.i;
	var coin_col = bitcoin_obj.j;
	var coin_dir = Math.floor(Math.random() * 4);// 0 - up | 1 - down | 2 - left | 3 - right 

	if (coin_dir == 0 && coin_col > 0 && board[coin_row][coin_col - 1] != 4){
		bitcoin_obj.j--;
	} else if(coin_dir == 1 && coin_col < 9 && board[coin_row][coin_col + 1] != 4){
		bitcoin_obj.j++;
	} else if(coin_dir == 2 && coin_row > 0 && board[coin_row - 1][coin_col] != 4){
		bitcoin_obj.i--;
	} else if(coin_dir == 3 && coin_row < 9 && board[coin_row + 1][coin_col] != 4){
		bitcoin_obj.i++;
	}

	if( (bitcoin_obj.i == shape.i && bitcoin_obj.j == shape.j) || board[bitcoin_obj.i][bitcoin_obj.j] == 2){
		PacmanEatBitcoin();
	}
	
}


////////////////////////* Help Funtions To The Game *////////////////////////

function startIntervals(){
	start_time = new Date();
	interval = setInterval(UpdatePosition, 150);
	intervalGhost = setInterval(updateGhosts, 300);
	intervalBitcoin = setInterval(updateBitcoin, 150);
}

function clearAllIntervals(){
	window.clearInterval(interval);
	window.clearInterval(intervalGhost);
	if (bitcoin_obj.i != -1 || bitcoin_obj.j != -1){
		window.clearInterval(intervalBitcoin);
	}
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

function addGhosts(){
	var cnt_loop = 0;
	while(cnt_loop != ghost_num)
	{
		var row = Math.floor(Math.random() * 10);
		var col = Math.floor(Math.random() * 10);
		if (row < 5){
			row = 0;
		} else{
			row = 9;
		}
		if (col < 5){
			col = 0;
		} else{
			col = 9;
		}
		if (ghost_pos_board[row][col] != 10){

			ghost_pos_board[row][col] = 10;

			ghost_obj[cnt_loop] = new Object();
			ghost_obj[cnt_loop].i = row;
			ghost_obj[cnt_loop].j = col;

			cnt_loop++;
		}
	}
}

function RebootGhosts(){
	for (var i=0 ; i < ghost_obj.length ; i++){
		ghost_pos_board[ghost_obj[i].i][ghost_obj[i].j] = 0;
	}
	ghost_obj = new Array();
	addGhosts();
}

function GhostEatPacman(){
	
	board[shape.i][shape.j] = 0;

	//decrease the Score
	if (score < 10){
		score = 0;
	} else{
		score -= 10;
	}

	lives_left--;
	if (lives_left == 0){
		clearAllIntervals();
		window.alert("Loser!");

	} else{
		//Reboot Ghosts
		RebootGhosts();
		//Reboot Pac-Man
		var emptyCell = findRandomEmptyCell(board);
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
		board[shape.i][shape.j] = 2;
		Draw();
	}
}

function PacmanEatBitcoin(){
	if (bitcoin_obj.i != -1 || bitcoin_obj.j != -1){
		window.clearInterval(intervalBitcoin);
	}
	score += 50;
	bitcoin_obj.i = -1;
	bitcoin_obj.j = -1;
}



////////////////////// Origin Code For Update ///////////////////////////////////////////

// //decrease the Score
// if (score < 10){
// 	score = 0;
// } else {
// 	score -= 10;
// }

// lives_left--;
// if (lives_left == 0){
// 	window.clearInterval(interval);
// 	window.clearInterval(intervalGhost);
// 	if (bitcoin_obj.i != -1){
// 		window.clearInterval(intervalBitcoin);
// 	}
// 	window.alert("Loser!");
// 	return;
// }

// //Reboot Ghosts
// RebootGhosts();
// //Reboot Pac-Man
// var emptyCell = findRandomEmptyCell(board);
// shape.i = emptyCell[0];
// shape.j = emptyCell[1];
// board[shape.i][shape.j] = 2;
// Draw();
// return;





////////////////////// Liad To Change Or Remove ///////////////////////////////////////////
/* Disable scrolling page with arrows*/ 
addEventListener(
	"keydown",
	function(e) {
	if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
		e.preventDefault();
	}
	},
	 false
);




////////////////////////* I Don't Know What Functions */ ///////////////////////



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




////////////////////////* Menu Functions */ ///////////////////////

function resetElement() {
	document.getElementById("welcome").style.display = "none";
    document.getElementById("logIn").style.display = "none";
	document.getElementById("signIn").style.display = "none";
	document.getElementById("setting").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("UserScreen").style.display = "none";

}
function welcomeON() {
resetElement()
	document.getElementById("welcome").style.display = "block";
}
function logInON() {
resetElement()
	document.getElementById("logIn").style.display = "block";
}
function signInON() {
resetElement()
	document.getElementById("signIn").style.display = "block";
}
function settingON() {
resetElement()
	document.getElementById("setting").style.display = "block";
}
function aboutON() {
resetElement()
	document.getElementById("about").style.display = "block";
	document.getElementById("aboutDialog").showModal();
}
function UserScreenON() {
resetElement()
	document.getElementById("UserScreen").style.display = "block";
	startIntervals();
}


var logInmodal = document.getElementById('logIn');
window.onclick = function(event) {
	if (event.target == logInmodal) {
		logInmodal.style.display = "none";
		welcomeON()
	}
}
var signInmodal = document.getElementById('signIn');
window.onclick = function(event) {
	if (event.target == signInmodal) {
		signInmodal.style.display = "none";
		welcomeON()
	}
}

var settingmodal = document.getElementById('setting');
window.onclick = function(event) {
	if (event.target == settingmodal) {
		settingmodal.style.display = "none";
		welcomeON()
	}
}

var aboutmodal = document.getElementById('about');
window.onclick = function(event) {
	if (event.target == aboutmodal) {
		document.getElementById('aboutDialog').close();
		aboutmodal.style.display = "none";
		welcomeON()
	}
}

var UserScreenmodal = document.getElementById('UserScreen');
window.onclick = function(event) {
	if (event.target == UserScreenmodal) {
		UserScreenmodal.style.display = "none";
		welcomeON()
	}
}
/*-------span Close------- */
function closeSpan(){
	document.getElementById('aboutDialog').close();
	document.getElementById('about').style.display = "none";
	welcomeON()
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



$(document).ready(function() {

    //register
    $("#signIn").validate({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true,
                minlength: 6,
                validPassword: true,
            },
            fullName: {
                required: true,
                validName: true,
            },
            email: {
                required: true,
                email: true,
            }
        },


        messages: {
            username: "Please enter username",
            password: {
                required: "Please enter a password",
                minlength: "Password must consist at least 6 characters",
                validPassword: "Please enter a valid password"
            },
            fullName: {
                required: "Please enter your full name",
                validName: "Name can only consist alphabetic chars"
            },
            email: {
                required: "Please enter your Email",
                email: "Please enter valid Email",
            },
        },

        submitHandler: function() {
            //add user to users array

            let username = $('#username').val();
            let password = $('#password').val();

            users.push([username, password]);

            switchDivs("loginPage");
            $('#registerForm')[0].reset();


        }


    });
});


$.validator.addMethod("validPassword", function(value) {
    return /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{6,}$/.test(value);
});

$.validator.addMethod("validName", function(value) {
    return /^[a-zA-Z ]+$/.test(value);
});

$.validator.addMethod("passwordMatch", function() {
    let username = $('#uname').val();
    let password = $('#pass').val();

    let validUserName = "";
    let validPassword = "";
    for (var i = 0; i < users.length; i++) {
        if (users[i][0] == username) {
            validUserName = users[i][0];

            if (users[i][1] == password) {
                validPassword = users[i][1];
                break;
            }
        }
    }
    if (validUserName != "") {
        if (password == "") {
            return false;

        } else if (validPassword == "") {
            return false;

        } else {
            return true;
        }
    } else {
        return false;
    }
});

