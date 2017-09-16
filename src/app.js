// app.js

let app = require('./reversi.js');


console.log(app.algebraicToRowCol('C5'));
console.log(app.algebraicToRowCol('D4'));
console.log(app.algebraicToRowCol("A")); // undefined
console.log(app.algebraicToRowCol("2")); // undefined
console.log(app.algebraicToRowCol("2A")); // undefined
console.log(app.algebraicToRowCol(" ")); // undefined
console.log(app.algebraicToRowCol("A 2")); // undefined
console.log(app.algebraicToRowCol("A:2")); // undefined
console.log(app.algebraicToRowCol("**")); // undefined


let board = app.generateBoard(4, 4, " ");
board = app.placeLetters(board, 'X', "B3", "D4");

console.log(board);