/**
 *  @file view.js
 *  @brief Provides the variables and functions necessary to display the view 
 *  of a checker qpp
 */

/**
 *  @brief Grabs "tableDiv" and inserts cells into that table by calling 
 *  genTable()
 *  
 *  @return None
 *  
 *  @details None
 */
function showTable() {
	'use strict'
	
	var tableDiv = document.getElementById("tableDiv");
	tableDiv.innerHTML = genTable();
}

/**
 *  @brief Generates table, tr, and td elements where ever genTable is called
 *  
 *  @return tableHTML - a string for inner HTML to create a 8X8 table
 *  
 *  @details The table will have squares that have "b" and "w" classes for 
 *  styling in CSS	
 */
function genTable() {
	'use strict';
	
	var tableHTML = "<table id=\"checkerGrid\">";
	var i = 0;
	var j = 0;
	
	for (i = 0; i < 8; i++) {
		tableHTML += "<tr>";
		for (j = 0; j < 8; j++) {
			if (i % 2 == 0) {
				if (j % 2 == 0) {
					tableHTML += "<td class=\"b\"></td>";
				} else {
					tableHTML += "<td class=\"w\"></td>";
				}
			} else {
				if (j % 2 != 0) {
					tableHTML += "<td class=\"b\"></td>";
				} else {
					tableHTML += "<td class=\"w\"></td>";
				}
			}
		}
		tableHTML += "</tr>";
	}
	
	tableHTML += "</table>";
	
	return tableHTML;
}

/**
 *  @brief Generates the checker pieces on the board
 *  
 *  @return None
 *  
 *  @details Grabs all "td" elements into an array, runs piecesOnBoard 
 *  func (model.js, 60), and through two for loops creates spans to insert
 *  pieces into.
 */
function genPieces() {
	'use strict';
	
	var gameBoard = document.getElementsByTagName("td");
	var tdIndex = 0;
	piecesOnBoard();
	
	for (var i = 0; i < 8; i++) {
		for(var j = 0; j < 8; j++) {
			var squarePiece = getSquare(i, j);
			if (squarePiece != 0) {
				var piece = document.createElement("span");
				if (squarePiece.isWhite) {
					piece.className = "w_piece";
					piece.addEventListener("click", clickSquare);
				} else {
					piece.className = "r_piece";
					piece.addEventListener("click", clickSquare);
				}
				gameBoard[tdIndex].appendChild(piece);
			}
		tdIndex++;
		}
	}
}

/**
 *  @brief cellSelect(e) takes a cell object and changes its color
 *  
 *  @param [in] e - td object
 *  @return None
 *  
 *  @details changes a td's className to refer style to css file
 */
function cellSelect(e) {
	'use strict'
	
	var cells = document.getElementsByTagName('td');
	var max = cells.length;
	var darkColor = document.getElementById("darkSquares").value;
	if (e.className == "b") {
		e.className = "blue";
		for (var i = 0; i < max; i++) {
			if (cells[i].style.background == "blue" || cells[i].style.background == "darkgreen")
				cells[i].style.background = darkColor;
		}
		
		e.style.background = "blue";
	
	} else if (e.className == "blue") {
		e.className = "b";
		for (var i = 0; i < max; i++) {
			if (cells[i].style.background == "blue" || cells[i].style.background == "darkgreen")
				cells[i].style.background = darkColor;
		}
		e.style.background = darkColor;
		
	}
	e.className = "b";

}

/**
 *  @brief Displays the row and column of selected cell
 *  
 *  @param [in] row The row number
 *  @param [in] col The column number
 *  @return None
 *  
 *  @details Adds 1 to each number so row 0 col 0 would read as row 1 col 1
 *   
 */
function cellCoordinates(row, col) {
	'use strict'
	
	var display = document.getElementById("clickCoordinates");
	display.innerHTML = "Row: " + (row + 1) + " Column: " + (col + 1);
}

/**
 *  @brief resetButton is an event handler for a button to begin a new game
 *  
 *  @return None
 *  
 *  @details None
 */
function resetButton() {
	'use strict'
	
	var resetButton = document.getElementById("resetButton");
	resetButton.onclick = function() {
		newGame();
		if (document.getElementById("headerToVanish").style.display != "none") {
			vanishHeader();
		}
	}
}

/**
 *  @brief changeBoardColor is an onchange event handler to change the square
 *  colors of the checker board
 *  
 *  @return None
 *  
 *  @details None
 */
function changeBoardColor() {
	'use strict'
	
	var darkSquares = document.getElementById("darkSquares");
	var lightSquares = document.getElementById("lightSquares");
	
	var bSquares = document.getElementsByClassName("b");
	var bSquaresLength = bSquares.length;
	var wSquares = document.getElementsByClassName("w");
	var wSquaresLength = wSquares.length;
	
	darkSquares.onchange = function() {
		var darkSelected = darkSquares.options[darkSquares.selectedIndex].value;
		switch(darkSelected) {
			case 'black':
				for (var i = 0; i < bSquaresLength; i++)
					bSquares[i].style.background = "black";
				break;
			case 'green':
				for (var i = 0; i < bSquaresLength; i++)
					bSquares[i].style.background = "green";
				break;
			case 'red':
				for (var i = 0; i < bSquaresLength; i++)
					bSquares[i].style.background = "red";
				break;
			case 'purple':
				for (var i = 0; i < bSquaresLength; i++)
					bSquares[i].style.background = "purple";
				break;
		}
	}
	lightSquares.onchange = function() {
		var lightSelected = lightSquares.options[lightSquares.selectedIndex].value;
		
		switch(lightSelected) {
			case 'white':
				for (var i = 0; i < wSquaresLength; i++)
					wSquares[i].style.background = "white";
				break;
			case 'pink':
				for (var i = 0; i < wSquaresLength; i++)
					wSquares[i].style.background = "pink";
				break;
			case 'yellow':
				for (var i = 0; i < wSquaresLength; i++)
					wSquares[i].style.background = "yellow";
				break;
			case 'orange':
				for (var i = 0; i < wSquaresLength; i++)
					wSquares[i].style.background = "orange";
				break;
		}
	}
}

function getBoardDarkColor() {
	'use strict'
	
	var bSquares = document.getElementsByClassName('b');
	var bSquaresStyle = window.getComputedStyle(bSquares[0]);
	if (bSquaresStyle.getPropertyValue("background") == "blue") {
		bSquaresStyle = window.getComputedStyle(bSquares[1]);
	}
	var bSquaresColor = bSquaresStyle.getPropertyValue("background");
	return bSquaresColor;
}

function affirmMove(e) {
	'use strict'
	
	e.style.background = "darkgreen";
}

function kingVisual(e) {
	'use strict'
	alert("kingVisual");
	if (e.className == "r_piece") {
		e.style.background = "#4d0000";
		e.innerHTML = "K";
		console.log(e);
	} else if (e.className == "w_piece") {
		e.style.background = "#f8f8ff";
		e.innerHTML = "K";
		console.log(e);
	}
}

function vanishHeader() {
	'use strict'
	
	var headerToVanish = document.getElementById("headerToVanish");
	var newGameBtn = document.getElementById("resetButton"); 
	
	newGameBtn.onclick = headerToVanish.style.display = "none";
}

/**
 *  @brief init() function
 *  
 *  @return None
 *  
 *  @details Calls showTable and genPieces functions
 */
function init() {
	'use strict';
	
	showTable();
	genPieces();
	clickSquare();
	resetButton();
	changeBoardColor();
	
	
		
	displayLoggedIn();
	clearLocalStorage();
	setupBtnHandlers();
}

window.onload = init;