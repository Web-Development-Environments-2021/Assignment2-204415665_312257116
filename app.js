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
var intervalClockObj;
var	intervalHeartObj;

var lives_left;
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
var chosen_game_duration = 60;
var ghost_num = 2;


// var Volslider;
// var s;

var myAudio;

var enemslider;
var enemoutput;

var foodslider;
var foodoutput;


/////////*  Images */////////

var bitcoin_img = new Image();
bitcoin_img.src = 'photos/bitcoin.png';
var bitcoin_obj;

var clock_img = new Image();
clock_img.src = 'photos/time+.png';
var clock_obj; // in board = 11

var heart_img = new Image();
heart_img.src = 'photos/heart+.png';
var heart_obj; // in board = 12

var timerOfHeart;
var timerOfClock;


var pac_dir = "right"
var ghost_pos_board;
var ghost_obj_arr;

var food_5_points_num; // in board = 5
var food_15_points_num; // in board = 15
var food_25_points_num; // in board = 25

var boardRow = 24;
var boardCol = 16;
	


function Start() {
	board = 
	[
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 4, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 4, 4, 0, 4],
		[0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0],
		[0, 4, 0, 4, 0, 4, 0, 0, 4, 0, 4, 4, 0, 4, 4, 0],
		[0, 4, 0, 4, 4, 4, 0, 0, 4, 0, 4, 0, 0, 4, 0, 0],
		[0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 4, 4, 0, 4],
		[0, 4, 4, 4, 4, 0, 0, 4, 4, 0, 4, 0, 0, 4, 0, 0],
		[0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0],
		[0, 4, 4, 0, 0, 0, 4, 0, 4, 4, 4, 4, 0, 4, 0, 0],
		[0, 4, 0, 0, 4, 0, 4, 0, 4, 0, 0, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 4, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0],
		[0, 4, 4, 4, 4, 0, 4, 0, 4, 0, 0, 4, 4, 4, 4, 0],
		[0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
		[0, 4, 4, 4, 4, 0, 4, 0, 4, 4, 0, 4, 4, 4, 4, 0],
		[0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 4, 0, 4, 4, 0, 4, 0, 4, 0, 4, 4, 4, 4, 4, 0],
		[0, 4, 0, 4, 0, 0, 4, 0, 4, 0, 4, 0, 0, 0, 0, 0],
		[0, 0, 0, 4, 0, 4, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0],
		[0, 4, 0, 4, 0, 0, 4, 0, 4, 0, 0, 0, 4, 0, 4, 0],
		[0, 4, 0, 4, 4, 0, 4, 0, 4, 0, 4, 0, 4, 4, 4, 0],
		[0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 4, 0, 0, 0, 0, 0],
		[0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	init_all();
	// board = new Array();
	ghost_pos_board = new Array();
	ghost_obj_arr = new Array();
	bitcoin_obj = new Object();
	clock_obj = new Object();
	heart_obj = new Object();
	score = 0;
	lives_left = 5;

	pac_color = "#f8be00";
	var cnt = boardRow*boardCol;
	var food_remain = chosen_food_amount;
	var pacman_remain = 1;

	for (var i = 0; i < boardRow ; i++) {
		// board[i] = new Array();
		ghost_pos_board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < boardCol ; j++) {
			if (
				board[i][j] == 4
			)
			{
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					randomNum = Math.floor(Math.random() * 3);
					if (randomNum == 0 && food_5_points_num != 0){
						food_5_points_num--;
						board[i][j] = 5;
					} else if(randomNum == 1 && food_15_points_num != 0){
						food_15_points_num--;
						board[i][j] = 15;
					} else if(randomNum == 2 && food_25_points_num != 0){
						food_25_points_num--;
						board[i][j] = 25;
					} else{
						food_remain++;
						board[i][j] = 0;
					}
					food_remain--;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt && (
					!(i==0 && j==0) && !(i==0 && j==boardCol -1) && !(i==boardRow - 1 && j==0) && !(i==boardRow -1  && j==boardCol -1) && !(i==Math.floor(boardRow/2) && j==Math.floor(boardCol/2)))){
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
			ghost_pos_board[i][j] = 0;
		}
	}
	//Add Pac-Man if Not Added Yet
	while(pacman_remain != 0){
		var emptyCell = findRandomEmptyCell(board);
		var i = emptyCell[0];
		var j = emptyCell[1];
		if(!(i==0 && j==0) && !(i==0 && j==boardCol -1) && !(i==boardRow - 1 && j==0) && !(i==boardRow -1  && j==boardCol -1) && !(i==Math.floor(boardRow/2) && j==Math.floor(boardCol/2))){
			shape.i = i;
			shape.j = j;
			pacman_remain--;
			board[i][j] = 2;
		}
	}
	//Add Food Remain
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		if (food_5_points_num != 0){
			food_5_points_num--;
			board[emptyCell[0]][emptyCell[1]] = 5;
		} else if(food_15_points_num != 0){
			food_15_points_num--;
			board[emptyCell[0]][emptyCell[1]] = 15;
		} else if(food_25_points_num != 0){
			food_25_points_num--;
			board[emptyCell[0]][emptyCell[1]] = 25;
		}
		food_remain--;
	}

	//Add Ghosts
	addGhosts();

	//Add bitcoin 50
	bitcoin_obj.i = Math.floor(boardRow/2);
	bitcoin_obj.j = Math.floor(boardCol/2);

	//Bonus Init
	heart_obj.onBorad = false;
	heart_obj.ate = false;
	clock_obj.onBorad = false; 
	clock_obj.ate = false;
	

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




function initialGameValues() {

	start_time = new Date();
	ghost_num = parseInt(document.getElementById('ghost_num_id').value.substring(0,1));
	chosen_food_amount= parseInt(document.getElementById('foodNum').value);
	// document.getElementById("game_username").value = game_username;
	document.getElementById("game_username_disply").value = game_username;
	chosen_game_duration = parseInt(document.getElementById('duration_id').value);

	//color
	chosen_food_5_color = document.getElementById('5_Color_id').value;
	chosen_food_15_color = document.getElementById('15_Color_id').value;
	chosen_food_25_color = document.getElementById('25_Color_id').value;

	//food numbers
	food_5_points_num = Math.floor(chosen_food_amount * 0.6);
	food_15_points_num = Math.floor(chosen_food_amount * 0.3);
	food_25_points_num = Math.floor(chosen_food_amount * 0.1);
	while ((food_5_points_num + food_15_points_num + food_25_points_num) != chosen_food_amount){
		food_5_points_num++;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblLives.value = lives_left - 1;
	for (var i = 0; i < boardRow; i++) {
		for (var j = 0; j < boardCol; j++) {
			var center = new Object();
			center.x = i * 30 + 15;
			center.y = j * 30 + 15;
			if (board[i][j] == 2) { // Pac-Man
				if (pac_dir == "up"){
					context.beginPath();
					context.arc(center.x, center.y, 15, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 7.5, center.y - 5, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				} else if (pac_dir == "down"){
					context.beginPath();
					context.arc(center.x, center.y, 15, 0.65 * Math.PI, 0.35 * Math.PI,false); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 7.5, center.y - 5, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				} else if (pac_dir == "left"){
					context.beginPath();
					context.arc(center.x, center.y, 15, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 2.5, center.y - 7.5, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				} else if (pac_dir == "right"){
					context.beginPath();
					context.arc(center.x, center.y, 15, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 2.5, center.y - 7.5, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}

			} else if (board[i][j] == 5) { // 5 Points Food
				context.beginPath();
				context.arc(center.x, center.y, 3.5, 0, 2 * Math.PI); // circle
				context.fillStyle = chosen_food_5_color; //color
				context.fill();
			} else if (board[i][j] == 15) { // 15 Points Food
				context.beginPath();
				context.arc(center.x, center.y, 5.5, 0, 2 * Math.PI); // circle
				context.fillStyle = chosen_food_15_color; //color
				context.fill();
			} else if (board[i][j] == 25) { // 25 Points Food
				context.beginPath();
				context.arc(center.x, center.y, 7.5, 0, 2 * Math.PI); // circle
				context.fillStyle = chosen_food_25_color; //color
				context.fill();
			} else if (board[i][j] == 4) { // Wall
				context.beginPath();
				context.rect(center.x - 15, center.y - 15, 30, 30);
				context.fillStyle = "#590083ab"; //color
				context.fill();
			} else if (board[i][j] == 11) { // Clock
				context.drawImage(clock_img ,  i*(canvas.height/boardCol) , j*(canvas.width/boardRow), 25, 25 * (clock_img.height / clock_img.width));
			} else if (board[i][j] == 12) { // Heart
				context.drawImage(heart_img ,  i*(canvas.height/boardCol) , j*(canvas.width/boardRow), 35, 35 * (heart_img.height / heart_img.width));
			}
			// Ghost
			if (ghost_pos_board[i][j] == 10){
				context.beginPath();
				context.arc(center.x, center.y, 10, 1 * Math.PI, 2 * Math.PI); // head
				context.fillStyle = GetGhostByLocation(i,j).color;
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 2.5 , 2.5, 0, 2 * Math.PI); // right eye
				context.fillStyle = "white"; 
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 2.5 , 1, 0, 2 * Math.PI); // in right eye
				context.fillStyle = "black";
				context.fill();
				context.beginPath();
				context.arc(center.x - 5, center.y - 2.5, 2.5, 0, 2 * Math.PI); // left eye
				context.fillStyle = "white"; 
				context.fill();
				context.beginPath();
				context.arc(center.x - 5, center.y - 2.5 , 1, 0, 2 * Math.PI); // in left eye
				context.fillStyle = "black"; 
				context.fill();
				context.beginPath(); // legs
				context.moveTo(center.x, center.y);
				context.lineTo(center.x + 10 , center.y);
				context.lineTo(center.x + 10 , center.y + 10);
				context.lineTo(center.x + 7.5 , center.y + 7.5);
				context.lineTo(center.x + 7.5 , center.y + 10);
				context.lineTo(center.x +  2.5 , center.y + 7.5);
				context.lineTo(center.x      , center.y + 10);
				context.lineTo(center.x -  2.5 , center.y + 7.5);
				context.lineTo(center.x - 5 , center.y + 10);
				context.lineTo(center.x - 7.5 , center.y + 7.5);
				context.lineTo(center.x - 10 , center.y + 10);
				context.lineTo(center.x - 10 , center.y);
				context.lineTo(center.x, center.y);
				context.fillStyle = GetGhostByLocation(i,j).color; 
				context.fill();
			}
			// bitcoin img
			if (bitcoin_obj.i == i && bitcoin_obj.j == j){ 
				context.drawImage(bitcoin_img ,  i*(canvas.height/boardCol) , j*(canvas.width/boardRow), 25, 25 * (bitcoin_img.height / bitcoin_img.width));
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
		if (shape.j < boardCol - 1 && board[shape.i][shape.j + 1] != 4) {
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
		if (shape.i < boardRow - 1 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			pac_dir = "right"
		} 
	}

	// check if Pac-Man Hit By Ghost
	for (var i = 0 ; i < ghost_obj_arr.length ; i++)
	{
		if ((ghost_obj_arr[i].i == shape.i && ghost_obj_arr[i].j == shape.j ) || ghost_pos_board[shape.i][shape.j] == 10)
		{
			GhostEatPacman( GetGhostByLocation(shape.i, shape.j) );
			ateByGhost = true;
			break;
		}
	}

	if(!ateByGhost){
		// Bitcoin Points
		if (shape.i == bitcoin_obj.i && shape.j == bitcoin_obj.j){
			PacmanEatBitcoin();
		}
		//  Points
		if (board[shape.i][shape.j] == 5) {// 5 Points
			score+=5;
		} else if (board[shape.i][shape.j] == 15) {// 15 Points
			score+=15;
		} else if (board[shape.i][shape.j] == 25) {// 25 Points
			score+=25;
		} else if (board[shape.i][shape.j] == 11) {// Clock Bonus
			if (!clock_obj.ate){
				chosen_game_duration+=15;
				clock_obj.ate = true;
				window.clearInterval(intervalClockObj);
			}
		} else if (board[shape.i][shape.j] == 12) {// Heart Bonus
			if ( !heart_obj.ate){
				lives_left++;
				heart_obj.ate = true;
				window.clearInterval(intervalHeartObj);
			}
		}

		board[shape.i][shape.j] = 2;
		var currentTime = new Date();
		time_elapsed = (currentTime - start_time) / 1000;

		if (score >= 2000 && time_elapsed <= 10) { //  TODO : What to do with this?
			pac_color = "green";
		}

		if (time_elapsed >= chosen_game_duration){
			if (score < 100){
				clearAllIntervals();
				window.alert("You are better than" + score + "points!");
			} else{
				clearAllIntervals();
				window.alert("Winner!!!");
			}
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

	for (var i = 0 ; i < ghost_obj_arr.length ; i++){

		var row_dis = 0;
		var col_dis = 0;
		var ghost_row = ghost_obj_arr[i].i;
		var ghost_col = ghost_obj_arr[i].j;
		var changed_pos = false;

		if (board[ghost_row][ghost_col] == 2 || (ghost_row == shape.i && ghost_col == shape.j) || ghost_pos_board[shape.i][shape.j] == 10){
			GhostEatPacman( GetGhostByLocation(shape.i, shape.j) );
			break;
		}

		row_dis = Math.abs(shape.i - ghost_row);
		col_dis = Math.abs(shape.j - ghost_col);
		if (row_dis > col_dis){ //left or right

			if(shape.i - ghost_row > 0 && ghost_row < boardRow - 1 && board[ghost_row + 1][ghost_col] != 4 && ghost_pos_board[ghost_row + 1][ghost_col] != 10){ //right
				ghost_pos_board[ghost_row + 1][ghost_col] = 10;
				ghost_pos_board[ghost_row][ghost_col] = 0;
				ghost_obj_arr[i].i++;
				changed_pos = true;
			} else if(ghost_row > 0  && board[ghost_row - 1][ghost_col] != 4 && ghost_pos_board[ghost_row - 1][ghost_col] != 10) { // left
				ghost_pos_board[ghost_row - 1][ghost_col] = 10;
				ghost_pos_board[ghost_row][ghost_col] = 0;
				ghost_obj_arr[i].i--;
				changed_pos = true;
			}
			ghost_row = ghost_obj_arr[i].i;
		}
		if(!changed_pos) { //up or down
			if(shape.j - ghost_col > 0 && ghost_col < boardCol - 1 && board[ghost_row][ghost_col + 1] !=4  && ghost_pos_board[ghost_row][ghost_col + 1] != 10){ //down
				ghost_pos_board[ghost_row][ghost_col + 1] = 10;
				ghost_pos_board[ghost_row][ghost_col] = 0;
				ghost_obj_arr[i].j++;
			} else if(ghost_col > 0 && board[ghost_row][ghost_col - 1] !=4 && ghost_pos_board[ghost_row][ghost_col - 1] != 10){ //up
				ghost_pos_board[ghost_row][ghost_col - 1] = 10;
				ghost_pos_board[ghost_row][ghost_col] = 0;
				ghost_obj_arr[i].j--;
			}
			ghost_col = ghost_obj_arr[i].j;
		}


		if (board[ghost_row][ghost_col] == 2 || (ghost_row == shape.i && ghost_col == shape.j) || ghost_pos_board[shape.i][shape.j] == 10){
			GhostEatPacman( GetGhostByLocation(shape.i, shape.j) );
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
	} else if(coin_dir == 1 && coin_col < boardCol - 1 && board[coin_row][coin_col + 1] != 4){
		bitcoin_obj.j++;
	} else if(coin_dir == 2 && coin_row > 0 && board[coin_row - 1][coin_col] != 4){
		bitcoin_obj.i--;
	} else if(coin_dir == 3 && coin_row < boardRow - 1 && board[coin_row + 1][coin_col] != 4){
		bitcoin_obj.i++;
	}

	if( (bitcoin_obj.i == shape.i && bitcoin_obj.j == shape.j) || board[bitcoin_obj.i][bitcoin_obj.j] == 2){
		PacmanEatBitcoin();
	}
	
}


////////////////////////* Help Funtions To The Game *////////////////////////

function startIntervals(){
	start_time = new Date();
	timerOfClock = new Date();
	timerOfHeart = new Date();
	interval = setInterval(UpdatePosition, 150);
	intervalGhost = setInterval(updateGhosts, 300);
	intervalBitcoin = setInterval(updateBitcoin, 150);
	intervalClockObj = setInterval(checkTimerOfClock, 200);
	intervalHeartObj = setInterval(checkTimerOfHeart, 200);
}

function clearAllIntervals(){
	window.clearInterval(interval);
	window.clearInterval(intervalGhost);
	if (bitcoin_obj.i != -1 || bitcoin_obj.j != -1){
		window.clearInterval(intervalBitcoin);
	}
	if ( !clock_obj.ate){
		window.clearInterval(intervalClockObj);
	}
	if ( !heart_obj.ate){
		window.clearInterval(intervalHeartObj);
	}
	stopMusic();
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * (boardRow - 1) + 1);
	var j = Math.floor(Math.random() * (boardCol - 1) + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * (boardRow - 1) + 1);
		j = Math.floor(Math.random() * (boardCol - 1) + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[chosen_key_code_up]) {
		return  1;
	}
	else if (keysDown[chosen_key_code_down]) {
		return 2;
	}
	else if (keysDown[chosen_key_code_left]) {
		return 3;
	}
	else if (keysDown[chosen_key_code_right]) {
		return 4;
	}
}
  

function addGhosts(){
	var cnt_loop = 0;
	while(cnt_loop != ghost_num)
	{
		var row = Math.floor(Math.random() * boardRow);
		var col = Math.floor(Math.random() * boardCol);
		if (row < boardRow/2){
			row = 0;
		} else{
			row = boardRow - 1;
		}
		if (col < boardCol/2){
			col = 0;
		} else{
			col = boardCol - 1;
		}
		if (ghost_pos_board[row][col] != 10){

			ghost_pos_board[row][col] = 10;

			ghost_obj_arr[cnt_loop] = new Object();
			ghost_obj_arr[cnt_loop].i = row;
			ghost_obj_arr[cnt_loop].j = col;

			if (cnt_loop % 2 == 0){
				ghost_obj_arr[cnt_loop].points = 10; // Ghost - Blue - 10 Points
				ghost_obj_arr[cnt_loop].color = "#1d58fa";
				ghost_obj_arr[cnt_loop].lives = 1;
			} else{
				ghost_obj_arr[cnt_loop].points = 20; // Ghost - Red - 20 Points
				ghost_obj_arr[cnt_loop].color = "#fd3c56";
				ghost_obj_arr[cnt_loop].lives = 2;
			}

			cnt_loop++;
		}
	}
}

function RebootGhosts(){
	for (var i=0 ; i < ghost_obj_arr.length ; i++){
		ghost_pos_board[ghost_obj_arr[i].i][ghost_obj_arr[i].j] = 0;
	}
	ghost_obj_arr = new Array();
	addGhosts();
}

function GhostEatPacman(whoEatPacman){
	
	board[shape.i][shape.j] = 0;

	//decrease the Score
	score-=whoEatPacman.points;
	if (score < 0){
		score = 0;
	}

	lives_left-=whoEatPacman.lives;

	if (lives_left <= 0){
		lives_left = 0;
		clearAllIntervals();
		window.alert("Loser!");

	} else{
		//Reboot Ghosts
		RebootGhosts();
		//Reboot Pac-Man
		var FoundRondomCell = false;
		while(!FoundRondomCell){
			var emptyCell = findRandomEmptyCell(board);
			var i = emptyCell[0];
			var j = emptyCell[1];
			if(!(i==0 && j==0) && !(i==0 && j==9) && !(i==9 && j==0) && !(i==9 && j==9) && !(i==5 && j==5)){
				shape.i = i;
				shape.j = j;
				board[i][j] = 2;
				FoundRondomCell = true;
			}
		}
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

function GetGhostByLocation(g_row, g_col){
	
	for (var i = 0 ; i < ghost_obj_arr.length ; i ++){
		if (ghost_obj_arr[i].i == g_row && ghost_obj_arr[i].j == g_col){
			return ghost_obj_arr[i];
		}
	}
}

function checkTimerOfClock(){
	var time_c_now = new Date();
	if (!clock_obj.ate){
		if (clock_obj.onBorad && (time_c_now - timerOfClock)/1000 >= 10){
			board[clock_obj.i][clock_obj.j] = 0;
			clock_obj.i = 0;
			clock_obj.j = 0;
			clock_obj.onBorad = false;
			timerOfClock = time_c_now;
		} else if  (!clock_obj.onBorad && (time_c_now - timerOfClock)/1000 >= 10){
			var emptyCell = findRandomEmptyCell(board);
			clock_obj.i = emptyCell[0];
			clock_obj.j = emptyCell[1];
			board[clock_obj.i][clock_obj.j] = 11; // in board = 11
			clock_obj.onBorad = true;
			timerOfClock = time_c_now;
		}
	}
}

function checkTimerOfHeart(){
	var time_h_now = new Date();
	if (!heart_obj.ate){
		if (heart_obj.onBorad && (time_h_now - timerOfHeart)/1000 >= 10){
			board[heart_obj.i][heart_obj.j] = 0;
			heart_obj.i = 0;
			heart_obj.j = 0;
			heart_obj.onBorad = false;
			timerOfHeart = time_h_now;
		} else if ( !heart_obj.onBorad && (time_h_now - timerOfHeart)/1000 >= 10){
			var emptyCell = findRandomEmptyCell(board);
			heart_obj.i = emptyCell[0];
			heart_obj.j = emptyCell[1];
			board[heart_obj.i][heart_obj.j] = 12; // in board = 12
			heart_obj.onBorad = true;
			timerOfHeart = time_h_now;
		}
	}
}




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
				keyChange2: "This key already taken by another action.",
				keyChange3: "This key already taken by another action.",
			},
			DOWN_name: {
				keyChange1: "This key already taken by another action.",
				keyChange2: "This key already taken by another action.",
				keyChange3: "This key already taken by another action.",
					},
			LEFT_name: {
				keyChange1: "This key already taken by another action.",
				keyChange2: "This key already taken by another action.",
				keyChange3: "This key already taken by another action.",

						},
			RIGHT_name: {
				keyChange1: "This key already taken by another action.",
				keyChange2: "This key already taken by another action.",
				keyChange3: "This key already taken by another action.",

					},
			duration_name: {
				gameTimeMoreThen60: "Minimum game duration is 60 second."
			}
		},
		submitHandler: function () {
			Start();
			UserScreenConsoleON();


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
	var UserScreenaboutmodal = document.getElementById('UserScreenAbout');

	window.onclick = function(event) {
		if (event.target == logInmodal) {
			logInmodal.style.display = "none";
			welcomeON();
		}
		if (event.target == signInmodal) {
			signInmodal.style.display = "none";
			welcomeON();
		}
		if (event.target == aboutmodal) {
			// document.getElementById('aboutDialog').close();
			aboutmodal.style.display = "none";
			welcomeON();
		}
		if (event.target == UserScreenmodal) {
			UserScreenmodal.style.display = "none";
			UserScreenWelcomeON();
		}
		if (event.target == UserScreenaboutmodal) {
			UserScreenaboutmodal.style.display = "none";
			UserScreenWelcomeON();
		}

		if (event.target == settingmodal) {
			settingmodal.style.display = "none";
			UserScreenWelcomeON();
		}

	/*---------------------------slider-------------------------*/


		enemslider = document.getElementById("ghost_num_id");
		let enemoutput = document.getElementById("enem_val");

		foodslider = document.getElementById("foodNum");
		let lifeoutput = document.getElementById("food_val");


		
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

	//check if password match
	$.validator.addMethod('validateUser', function (password, element) {

		let user_input_username = document.getElementById("logIn_name_id").value;
		if(user_input_username in userDic) {
			if(userDic[user_input_username] == password) {
				return true;
			}
	
		}
		return false;
	});
	//chack if key already taken by another action
	$.validator.addMethod("keyChange_up", function(value, element, param) {
		return value != $(param).val();
	});

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

function resetElement() {
	// document.getElementById("welcome").style.display = "none";
    document.getElementById("logIn").style.display = "none";
	document.getElementById("signIn").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("setting").style.display = "none";
	// document.getElementById("UserScreenWelcome").style.display = "none";
	document.getElementById("UserScreenAbout").style.display = "none";
	document.getElementById("UserScreenConsole").style.display = "none";

}
/*-----------------------logout user screen-------------------------------- */
function logOutON(){
	game_username = "";
	resetElement();
	document.getElementById("UserScreenWelcome").style.display = "none";
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
	// document.getElementById("aboutDialog").showModal();
}

/*-----------------------login user screen-------------------------------- */
function UserScreenON() {
	resetElement();
	document.getElementById("game_username_disply").value = game_username;
	document.getElementById("NotLogIn").style.display = "none";
	document.getElementById("UserScreen").style.display = "block";
	UserScreenWelcomeON();
}

function settingON() {
	resetElement();
	document.getElementById("setting").style.display = "block";
	// clearAllIntervals();
}

function UserScreenWelcomeON() {
	resetElement();
	document.getElementById("UserScreenWelcome").style.display = "block";
	// clearAllIntervals();
}

function UserScreenAboutON() {
	resetElement();
	document.getElementById("UserScreenAbout").style.display = "block";
	// clearAllIntervals();
}

function UserScreenConsoleON() {
	resetElement();
	document.getElementById("UserScreenWelcome").style.display = "none";
	document.getElementById("UserScreenConsole").style.display = "block";
	startIntervals();
}
function IntervalsCheck() {
	if(true){
		clearAllIntervals();

	}

}
function show_key() {

	document.getElementById('key_up_display').value = chosen_key_up;
	document.getElementById('key_down_display').value = chosen_key_down;
	document.getElementById('key_right_display').value = chosen_key_right;
	document.getElementById('key_left_display').value = chosen_key_left;

	document.getElementById('5_points_display').value = chosen_food_5_color;
	document.getElementById('15_points_display').value = chosen_food_15_color;
	document.getElementById('25_points_display').value = chosen_food_25_color;
	
	document.getElementById('duration_display').value = chosen_game_duration;
	document.getElementById('ghost_display').value = ghost_num;

	document.getElementById('food_amount_display').value = chosen_food_amount;


}
/*-----------------------Music Function---------------------- */
function playMusic() {
	document.getElementById("Background_Music_id").play();
	document.getElementById("Background_Music_id").volume = 0.2;
}

function stopMusic()
{
	document.getElementById("Background_Music_id").pause();
	document.getElementById("Background_Music_id").currentTime = 0;
}

function ChangeIconMusic()
 {
	 var music_icon = document.getElementById("music_box_icon");
	 if(document.getElementById("Background_Music_id").currentTime>0){
		$('#music_box_icon').find("i").toggleClass("fa-volume-up  fa-volume-mute");
		stopMusic();
	 }
	 else{
		$('#music_box_icon').find("i").toggleClass("fa-volume-mute fa-volume-up");
		playMusic();
	 }
 }
/*--------------------------------------------------------------------*/
// When the user clicks on ESC button, close the modal
$(document).on(
	'keydown', function(event) {
		var aboutmodal = document.getElementById('about');
		var UserScreenaboutmodal = document.getElementById('UserScreenAbout');
	  if (event.key == "Escape") {
		if (aboutmodal.style.display == "block") {
			aboutmodal.style.display = "none";
			welcomeON();
		}
		else if (UserScreenaboutmodal.style.display == "block") {
			UserScreenaboutmodal.style.display = "none";
			UserScreenWelcomeON();
		}
	  }
  });

/*------------------------------------------*/
function init_all() {
	initialGameValues();
	show_key();
	playMusic();
}


