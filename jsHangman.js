// Hangman

$(document).ready(function() {
	var words = ["orange", "graph", "easy", "logical", "eerie", "feelers", "starfish"];
	var chances = 8;
	var previousLetters = [];
	var word = "easy";
	var letter = "";
	var board = "";
	var counter = 0;

	function drawBoard(word) {
		for (i = 0; i < word.length; i++){
			board += "_ ";
		};
		$("#board").text(board);

		$("#chancesleft").text("Chances Left: " + chances);
	};

	drawBoard(word);

	function checkValidInput(letter) {
		if (letter.length != 1) { //return false for inputs <1 or >1
			return false;
		} else if (!/^[a-zA-Z]*$/.test(letter)) { //return false for non-letter inputs
			return false;
		}	else {
			return true;	
		};
	};

	function correctLetter(letter) {
		// returns true if letter is in the word (does not return -1)
		if (word.indexOf(letter) == -1) {
			chances -= 1;
			return false;
		} else {
			return true;
		}
	};

	function putLetterOnBoard(letter) {

	};

	function evaluateLetter(letter) {

	};

	function yourGuess() {
		letter = prompt("Please guess a letter\n(One letter at a time, lowercase)", "");
		// letter may be null or empty string at this point
		if (letter == null || letter == "") {
			alert("You did not type in a guess");
			yourGuess();
		};
		// once you're sure you have a guess entered, then make sure it's valid
		if (checkValidInput(letter) === false) {
			alert("Invalid input! Please type in just one letter");
			yourGuess();
		};
		letter = letter.toLowerCase();
		previousLetters.push(letter);
		$("#previousGuesses").text(previousLetters.join(", "));
	};

	function playGame() {
		if (chances == 0) {
			alert("You're a failure and you've always been a failure");
		} else if (board.indexOf("_") == -1) {
			alert("Success! The money and hoes are on the way!");
		} else {
			yourGuess();
			evaluateLetter(letter);
		}
	};

});