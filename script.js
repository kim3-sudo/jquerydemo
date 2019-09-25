$(document).ready(function() {

	var $wpmPrompt = $('#wpmPrompt');
	var $wpmPromptLog = [];
	var $wpmTest = $('#wpmTest');
	var $wpmTestLog = [];
	var $wpmError = $('#wpmError');
	var $wpmErrorAll = $('#wpmErrorAll');
	var position = -1;
	var keyCount = 0;
	var keyLog = [];
	var shiftMovesLeft = 0;
	var shiftMovesRight = 0;
	var timeStart;
	var errorCount = 0;

	$wpmPrompt.text("So she went into the garden to cut a cabbage leaf to make an apple pie; and at the same time a great she-bear coming up the street pops its head into the sho. "What! No soap? So he died, and she very imprudently married the barber; and there were present the Picninnies, and the Grand Panjandrum himself, with the little round button at the top, and they all fell to playing the game of catch as catch can, till the gunpowder ran out at the heels of their boots.");
	var $wpmPromptLength = $wpmPrompt.text().length;

	// configure accuracy forumla
	function accuracy() {
		var accRaw = 100 * ($wpmPromptLength / ($wpmPromptLength + errorCount));
		var acc = accRaw.toFixed(2);
		return acc + "%";
	};

	$wpmTest.keypress(function(e) {
		var keyValue = String.fromCharCode(e.which);

		// add e.keydown to log, if not enter
		if(!keyLog[13]) {
			position++;
			keyCount++;
			$wpmTestLog.splice(position, 0, keyValue);
			$wpmPromptLog.splice(position, 0, $wpmPrompt.text().charAt(position));
		};

		// any errors? true/false
		var correctAll = true;
		for (var i = 0; i <= position; i++) {
			if($wpmTestLog[i] !== $wpmPromptLog[i]) {
				correctAll = false;
				break;
			};
		};

		if($wpmTestLog[position] !== $wpmPromptLog[position]) {
			errorCount++;
		}

		// console.log("No errors present: " + correctAll);
		if(correctAll) {
			$wpmErrorAll.html("Good so far..." + "<br><br>" + "Total errors: + errorCount + "<br>" + "Accuracy: " + accuracy());
		} else if(!correctAll) {
			$wpmErrorAll.html("Oops! You've made an error somewhere!."  + "<br><br>" + "Total errors: " + errorCount + "<br>" + "Accuracy: " + accuracy());
		};
	});

	$wpmTest.keydown(function(e) {
		// is shift pressed?
		keyLog[e.which] = true;

		// backspace, delete "46"
		if(e.which === 8 && (position > -1) && (shiftMovesLeft === 0 && shiftMovesRight === 0)) {
			position--;
			$wpmTestLog.splice(position + 1, 1);
			$wpmPromptLog.splice(position + 1, 1);
		} else if(e.which === 8 && (position > -1) && (shiftMovesLeft > 0)) {
			$wpmTestLog.splice(position + 1, shiftMovesLeft);
			$wpmPromptLog.splice(position + 1, shiftMovesLeft);
			shiftMovesLeft = 0;
		} else if(e.which === 8 && (position > -1) && (shiftMovesRight > 0)) {
			$wpmTestLog.splice(position + 1, shiftMovesRight);
			$wpmPromptLog.splice(position + 1, shiftMovesRight);
			shiftMovesRight = 0;
		};

		// left arrow key: don't extend array
		if(e.which === 37 && (position >= -1)) {
			position--;
			shiftMovesRight = 0;
		};

		// right arrow key: don't extend array
		if(e.which === 39 && position < ($wpmTestLog.length - 1)) {
			position++;
			shiftMovesLeft = 0;
		};
	});
});
