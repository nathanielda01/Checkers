I used an xml document to store data that could be used to set up the checker board
differently depending on the type of game a player wanted to play. The options are
three-row, two-row, or one-row checkers. This could also be used to set up positions
of the checkers all over the board with "1" representing a white piece and "2" 
representing a black piece. The information pulled from the xml document is displayed
on the game_grid.html page. The xml page is called checkersSetup.xml and the code
to draw on the xml page is in the js/model.js file starting at line 348.