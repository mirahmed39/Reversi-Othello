// app.js
// importing modules.
const app = require('./reversi.js');
const readlineSync = require('readline-sync');
const fs = require('fs');

//varible declarations
let boardWidth, userLetter, botLetter;
// interactive game begins.
console.log("Hello!! Welcome to the world of REVERSI");

boardWidth = readlineSync.question("How wide the board should be? (must be an even number between 4 and 26): ");
while(true) {
	if(boardWidth % 2 === 0 && (boardWidth >=4 && boardWidth <= 26))
		break;
	else
		boardWidth = readlineSync.question("How wide the board should be? (must be an even number between 4 and 26): ");
}

userLetter = readlineSync.question("Which letter you want to choose? X for black and O for white: ");
while(true) {
	if(userLetter === 'X' || userLetter === 'O') {
		console.log("You picked " + userLetter);
		if(userLetter != 'X')
			botLetter = "X";
		else
			botLetter = "O";
		break;
	} else
		userLetter = readlineSync.question("Which letter you want to choose? X for black and O for white: ");
}

//construct board and place initial cells.
let board = app.generateBoard(boardWidth, boardWidth);
const initialCellIndices = app.getCenterIndices(boardWidth);

board = app.setBoardCell(board, userLetter, initialCellIndices.player1[0][0], initialCellIndices.player1[0][1]);
board = app.setBoardCell(board, userLetter, initialCellIndices.player1[1][0], initialCellIndices.player1[1][1]);
board = app.setBoardCell(board, botLetter, initialCellIndices.player2[0][0], initialCellIndices.player2[0][1]);
board = app.setBoardCell(board, botLetter, initialCellIndices.player2[1][0], initialCellIndices.player2[1][1]);

//display the board
console.log("Initial Board Setup");
console.log(app.boardToString(board));

//simulation prep
let player = false, computer = false, userPass = 0, computerPass = 0;
let score = app.getLetterCounts(board);
if(userLetter === "X") {
	player = true;
} else {
	computer = true;
}

while((player || computer) && !app.isBoardFull(board)) {
	if(player === true && userPass < 3) {
		let userMove = readlineSync.question("What is your move? ");
		while(true) {
			const hasValidMoves = app.getValidMoves(board, userLetter).length > 0 ? true : false;
			const isValidMove = app.isValidMoveAlgebraicNotation(board, userLetter, userMove);
			if(!isValidMove && !hasValidMoves) {
				console.log("No valid moves available for you.");
				readlineSync.question("Press <Enter> to pass your turn to computer (You are only allowed to pass twice)");
				userPass++;
				player = false;
				computer = true;
				break;
			} else if(!isValidMove) {
				console.log("INVALID MOVE. Your move should:\n" +
				"* be in a format \n* specify an existing empty cell" +
				"\n*flip at least one of your opponent's pieces.");
				userMove = readlineSync.question("What is your move? ");
			} else {
				userMoveRowCol = app.algebraicToRowCol(userMove);
				board = app.setBoardCell(board, userLetter, userMoveRowCol.row, userMoveRowCol.col);
				let cellsToFlip = app.getCellsToFlip(board, userMoveRowCol.row, userMoveRowCol.col); // returns arrays of row col pair grouped together.
				board = app.flipCells(board, cellsToFlip);
				score = app.getLetterCounts(board);
				console.log(app.boardToString(board));
				console.log("Score\n====");
				console.log("X :" + score.X);
				console.log("O :"+ score.O);
				readlineSync.question('Press <Enter> to show computer\'s move');
				player = false;
				computer = true;
				break;
			}
		}
	} 
	else if (computer === true && computerPass < 3) {
		const validMoves = app.getValidMoves(board, botLetter);
		const hasValidMoves = app.getValidMoves(board, botLetter).length > 0 ? true : false;
		const isBoardFull = app.isBoardFull(board);
		if (!hasValidMoves) {
			console.log("Computer does not have any valid moves.");
			console.log("Control passed to the player");
			computerPass++;
			computer = false;
			player = true;
		}
		else if(hasValidMoves) {
			let rowCol = validMoves[Math.floor(Math.random()* validMoves.length)];
			let algebraicNotation = app.rowColToAlgebraic(rowCol[0], rowCol[1]);
			board = app.setBoardCell(board, botLetter, rowCol[0], rowCol[1]);
			console.log("+----Computer has made a move at cell: " + algebraicNotation + "----+");
			let cellsToFlip = app.getCellsToFlip(board, rowCol[0], rowCol[1]); // returns arrays of row col pair grouped together.
			board = app.flipCells(board, cellsToFlip);
			console.log(app.boardToString(board));
			score = app.getLetterCounts(board);
			console.log("Score\n====");
			console.log("X :" + score.X);
			console.log("O :"+ score.O);
			computer = false;
			player = true;
		}
	}
}

let finalScore = app.getLetterCounts(board);
console.log("Final Score\n====");
console.log("X :" + finalScore.X);
console.log("O :"+ finalScore.O);

// announce the winner
console.log("Game is over");
if(app.isBoardFull)
	console.log("Board is full!!");
else if(userPass > 2)
	console.log("You have exceeded the pass limit");
else
	console.log("Computer has exceeded the pass limit");

if((userLetter === "X" && finalScore.X > finalScore.O) || (userLetter === "O" && finalScore.X < finalScore.O))
	console.log("You won. CHEERS!!!");
else if(finalScore.X === finalScore.O)
	console.log("Game Tied, You are as smart as the computer");
else
	console.log("Computer Won :( Better luck next time.")





