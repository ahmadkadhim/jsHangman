// Hangman

$(document).ready(function() {
	var words = ["orange", "graph", "easy", "logical", "eerie", "feelers", "starfish"];
	var chances = 8;
	var previousLetters = [];
	console.log(words);
	var word = words[Math.floor(Math.random()*words.length)];
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
		console.log(previousLetters.join().indexOf(letter))
		if (previousLetters.join().indexOf(letter) != -1) {
			console.log("test");
			$("#feedback").text("You've already guessed that, goldfish");
		} else if (correctLetter(letter)) {
			putLetterOnBoard(letter);
		} else {
			$("#feedback").text("Wrong Guess!");
			chances -= 1;
			$("#chancesleft").text("Chances Left: " + chances);
		};
		if (previousLetters.join().indexOf(letter) === -1) {
			previousLetters.push(letter);
			$("#previousguesses").text(previousLetters.join(", "));
		};
	};

	function yourGuess() {
		letter = $(":input").val();
		// letter may be null or empty string at this point
		if (letter == null || letter == "") {
			$("#feedback").text("You did not type in a guess");
		} else if (checkValidInput(letter) === false) {		// once you're sure you have a guess entered, then make sure it's valid
			$("#feedback").text("Invalid input! Please type in just one letter");;
		} else {
			letter = letter.toLowerCase();
			evaluateLetter(letter);
		};
	};

	function initGame() {
		drawBoard(word);
		$("#chancesleft").text("Chances Left: " + chances);
	};

	initGame();


	$("#letterinput").submit(function() {
				yourGuess();
				if (chances == 0) {
					$("#feedback").text("You're a failure and you've always been a failure");
				} else if ($("#board").text().indexOf("_") == -1) {
					$("#feedback").text("Success! The money and hoes are on the way!");
				};
		$("#inputarea").val("");
		return false;
	});

});