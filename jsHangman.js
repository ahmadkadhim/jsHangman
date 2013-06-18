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
	};

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
			return false;
		} else {
			return true;
		}
	};

	function putLetterOnBoard(letter) {
		for (var i = 0; i < word.length; i++) {
			if (letter == word[i]) {
				replacement = $("#board").text().substring(0,i*2) + word[i] + $("#board").text().substring(i*2+1);
				console.log(replacement);
				$("#board").text(replacement)
			};
		};
	};

	function evaluateLetter(letter) {
		if (correctLetter(letter)) {
			putLetterOnBoard(letter);
		} else if (previousLetters.join().indexOf(letter) != -1) {
			alert("You've already guessed that, goldfish");
		} else {
			alert("Wrong Guess!");
			chances -= 1;
			$("#chancesleft").text("Chances Left: " + chances);
		};
		if (previousLetters.join().indexOf(letter) === -1) {
			previousLetters.push(letter);
			$("#previousguesses").text(previousLetters.join(", "));
		};
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
	};

	function playGame() {
		drawBoard(word);
		$("#chancesleft").text("Chances Left: " + chances);
		while (chances !=0 && $("#board").text().indexOf("_") !== -1) {
				yourGuess();
				evaluateLetter(letter);
		}
		if (chances == 0) {
			alert("You're a failure and you've always been a failure");
		} else if ($("#board").text().indexOf("_") == -1) {
			alert("Success! The money and hoes are on the way!");
		};
	};

playGame();

});