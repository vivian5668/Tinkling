
//list all ids of notes in an array, i.e. [n1, n2, n3, n4]
var allNotes = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8'];
// allNotes = allNotes.toArray();
var notesGiven = [];
var notesPlayed = [];
var level = 1;
var winNum = 0;
var totalLevel = 5;

// var n8Audio = new Audio('sounds/n1.mp3');
var loadMusic = new Audio('sounds/opening.mp3');

var time = 900;
var element = null;
var noteId = '';
var id = '';

var makeTimeoutFunction = function(id) {
	return function() {
		$('#' + id).addClass('dotjump');
		var removeDotJump = function() {$('#' + id).removeClass('dotjump')};
		setTimeout(removeDotJump, 900);
		document.getElementById('s' + id).play();
	}
};

var giveNotes = function (levelNum) {
	var rand;
	var newArray = Array.from(allNotes); 
	for (var i = 0; i < 2 + levelNum; i++) {
		rand = Math.floor(Math.random()*8);
		temp = newArray.splice(rand-i, 1);
		notesGiven.push(temp);
	}

	time = 900;

	notesGiven.forEach(function(index) {
		setTimeout(makeTimeoutFunction(index), time);
		time += 900;
	});
}



var clearAnimationClass = function () {
	for (var i = 0; i < 9; i++) {
		$('#n' + i).removeClass('dotjump');
	}
}



var dotClicked = function () {
	notesPlayed.push(this.id);
	document.getElementById('s' + this.id).play(); //to grab audio id
	this.classList.add('dotjump');
	//every time a note is played, check if the note is correct. 
	checkNote();
}

var checkNote = function () {
	//check  for match once a note is played, stop the game if there is an un-match
	if (notesGiven.length >= notesPlayed.length) {	
		for (var i = 0; i < notesPlayed.length; i++) {
			if (notesPlayed[i] !== notesGiven[i].toString()) { //toString is important!! somehow after array.splice or other methods, array elements become objects. but push 'id's gives strings in the array! 
				fail();
				return;
				
			} 
		} 
	}
	//if all previous tests pass, check for final match
	if (notesGiven.length === notesPlayed.length) {
		var matchCount = 0;
		for (var i = 0; i < notesGiven.length; i++) {
			if (notesPlayed[i] === notesGiven[i].toString()) {
				matchCount ++;
		} 
	}
		if (matchCount === level + 2) {
			win();
		}		  
	}
}

var levelUp = function () {
	notesGiven = [];
	notesPlayed = [];
	$('#next').removeClass('disabled');
	$('#next').removeClass('pulse');
	$('#next').addClass('disabled');
	if (winNum > 0 && winNum < totalLevel) {
		level ++;
		startGame();
	}
}


var fail = function () {
	level = 1;
	winNum = 0;
	setTimeout(function() {
		document.getElementById('sadsound').play();
	}, 1000)
	$('#catsad').remove(); // remove gif and re-add to make gif start at beginning each time
	$('#catimg').append('<img class="responsive-img" id="catsad" src="img/sad.gif">'); // reload it

	for (var i = 0; i <= allNotes.length; i++) {
			$('#' + allNotes[i]).off('click', dotClicked);
		}

	setTimeout(function() {
		$('#catsad').remove();
		$('#start').removeClass('disabled');
		$('#start').addClass('pulse');
		$('#start').removeClass('hide');
		$('#next').addClass('hide');	
	},5200)
}

var win = function () {
	setTimeout(function() {
		document.getElementById('happysound').play();
	}, 1000);
	$('#cathappy').removeClass('hide');
	setTimeout(function() {
		$('#cathappy').addClass('hide');
	},3000)

	winNum ++;
	for (var i = 0; i <= allNotes.length; i++) {
			$('#' + allNotes[i]).off('click', dotClicked);
		}

	if (winNum < totalLevel) {
		$('#start').addClass('hide');
		$('#next').removeClass('hide');
		$('#next').removeClass('disabled');
		$('#next').addClass('pulse');

	} 
	if (winNum >= totalLevel) {

		$('#cathappy').addClass('hide');
		$('#finalbg').addClass('falling');
		setTimeout(function() {
			$('#finalbg').removeClass('falling');
		},3000);

		$('#congrats').removeClass('hide');
		setTimeout(function() {
			$('#congrats').addClass('hide');
		},3000);

		level = 1;
		winNum = 0;

		

		for (var i = 0; i <= allNotes.length; i++) {
			$('#' + allNotes[i]).off('click', dotClicked);
		}

		setTimeout(function() {

			$('#start').removeClass('disabled');
			$('#start').addClass('pulse');
			$('#start').removeClass('hide');
			$('#next').addClass('hide');
		},3000)
	}
}

var startGame = function () {
	loadMusic.pause();
	notesGiven = [];
	notesPlayed = [];
	$('#start').removeClass('pulse')
	clearAnimationClass();
	giveNotes(level);
}

var addEventListnerToDot = function () {
	for (var i = 0; i <= allNotes.length; i++) {
			$('#' + allNotes[i]).on('click', dotClicked);
		}
}

$(document).ready(function() {
	
	setTimeout(function(){  //delay the start button function for 2 secs to prevent user to activate game before instructions
		$('#start').on('click', function () {
			addEventListnerToDot();
			startGame();
			$('#start').addClass('disabled');
		})	
	}, 2000) 

	$('#next').on('click', function() {
		addEventListnerToDot();
		levelUp();
	});

	loadMusic.play();
	setTimeout(function() {$('#n1').addClass('dotjump');}, 100);
	setTimeout(function() {$('#n2').addClass('dotjump');}, 200);
	setTimeout(function() {$('#n3').addClass('dotjump');}, 300);
	setTimeout(function() {$('#n4').addClass('dotjump');}, 400);
	setTimeout(function() {$('#n5').addClass('dotjump');}, 500);
	setTimeout(function() {$('#n6').addClass('dotjump');}, 700);
	setTimeout(function() {$('#n7').addClass('dotjump');}, 800);
	setTimeout(function() {$('#n8').addClass('dotjump');}, 900);
 	$('.slider').slider({
 		height: 300,
 		interval: 3000,
 	});
 	$('.modal').modal({
 		inDuration: 800, // Transition in duration
        outDuration: 200, // Transition out duration
        complete: function() { $('#start').addClass('pulse') }
 	});
 	setTimeout(function() {$('#modal1').modal('open');}, 2000);
})
