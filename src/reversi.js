// reversi.js


/*
	returns an array having each element as value repeated
	n times.
*/
function repeat(value, n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
    	arr.push(value);
    }
    return arr;
}


function generateBoard(rows, columns, initialCellValue = " ") {
	const boardArray = [];
	const eachRow = repeat(initialCellValue, columns);
	for(let i = 0; i < rows; i++) {
		boardArray.push(...eachRow);
	}
	return boardArray;
}

function rowColToIndex(board, rowNumber, columnNumber) {
	const boardEntries = board.length;
	const boardWidth = Math.sqrt(boardEntries);
	return (boardWidth*rowNumber)+columnNumber;
}


function indexToRowCol(board, i) {
	const boardEntries = board.length;
	const boardWidth = Math.sqrt(boardEntries);
	const row = Math.floor(i/boardWidth);
	const col = i - (boardWidth*row);
	return {
		row: row,
		col: col
	};
}


function setBoardCell(board, letter, row, col) {
	const setBoard = board.slice();
	const indexToSet = rowColToIndex(board, row, col);
	setBoard[indexToSet] = letter;
	return setBoard;
}

function algebraicToRowCol(algebraicNotation) {
	const letterToCol = {"A": 0, "B":1, "C":2,"D":3,"E":4,"F":5,"G":6,"H":7,"I":8,"J":9,"K":10,"L":11,"M":12,
						"N":13,"O":14,"P":15,"Q":16,"R":17,"S":18,"T":19,"U":20,"V":21,"W":22,"X":23,"Y":24,"Z":25,};
	if(algebraicNotation.length === 2 && isNaN(algebraicNotation.charAt(0)) && !isNaN(algebraicNotation.charAt(1))) {
		return {
			row: algebraicNotation.charAt(1) - 1,
			col: letterToCol[algebraicNotation.charAt(0)]
		};
	}
	return undefined;
}

function placeLetters(board, letter, ...algebraicNotation) {
	let newBoard = board.slice();
	const notations = algebraicNotation;
	for( let i = 0; i < notations.length; i++) {
		rowCol = algebraicToRowCol(notations[i]);
		if(rowCol === undefined) {
			console.log("Invalid Notation " + notation);
		} else {
			newBoard = setBoardCell(newBoard, letter, rowCol.row, rowCol.col);
		}
	}
	return newBoard;
}


function boardToString(board) {
	
}

module.exports = {
    repeat: repeat,
    generateBoard: generateBoard,
    rowColToIndex: rowColToIndex,
    indexToRowCol: indexToRowCol,
    
    setBoardCell: setBoardCell,
    algebraicToRowCol: algebraicToRowCol,
    placeLetters: placeLetters,
}