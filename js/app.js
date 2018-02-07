
//list all ids of notes in an array, i.e. [n1, n2, n3, n4]
var allNotes = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8'];
// allNotes = allNotes.toArray();
var notesGiven = [];
var notesPlayed = [];
var level = 1;
var winNum = 0;


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
		console.log('YO!')
		document.getElementById('s' + id).play();
	}
};

var giveNotes = function (levelNum) {
	var rand = Math.floor(Math.random() * 8);
	time = 900;
	notesGiven = Array.from(allNotes);

	//8 notes in total, level 1 takes out 5 and leave 3 in notesGiven, level 2 take out 4.....
	for (var i = 0; i <= 5 - levelNum; i++) {
		notesGiven.splice(rand - i, 1);
	}

	notesGiven.forEach(function(index) {
		setTimeout(makeTimeoutFunction(index), time);
		time += 900;
	});

	console.log("I am in defer")


	//make the givenNotes jump when notes are given, and play music
	// for (var i = 0; i < notesGiven.length; i++) {

	// 	setTimeout(function() {
	// 		id = 's' + notesGiven[noteId];
	// 		console.log('id: ' + id);
	// 		element = document.getElementById(id);
	// 		console.log(element);

	// 		$('#' + id).addClass('dotjump');
	// 		element.play();
	// 		noteId++;
	// 	}, time);
	// 	time += 1000;
	// 	// $('#' + notesGiven[i]).addClass('dotjump');
	// 	// document.getElementById('s' + notesGiven[i]).play();
	// }
}



var clearAnimationClass = function () {
	for (var i = 0; i < 9; i++) {
		console.log(i);
		$('#n' + i).removeClass('dotjump');
	}
	// console.log($('#n1').classList)
}



var dotClicked = function () {
	//dot jump
	notesPlayed.push(this.id);
	console.log('notesPlayed: ' + notesPlayed);
	document.getElementById('s' + this.id).play(); //to grab audio id
	this.classList.add('dotjump');
	//every time a note is played, check if the note is correct. 
	checkNote();
}

var checkNote = function () {
	//check  for match once a note is played, stop the game if there is an un-match
	if (notesGiven.length >= notesPlayed.length) {	
		for (var i = 0; i < notesPlayed.length; i++) {
			if (notesPlayed[i] !== notesGiven[i]) {
				fail();
				console.log('fail');
				// return;
			} 
		} 
	}
	//if all previous tests pass, check for final match
	if (notesGiven.length === notesPlayed.length) {
		var matchCount = 0;
		for (var i = 0; i < notesGiven.length; i++) {
			if (notesPlayed[i] === notesGiven[i]) {
				matchCount ++;
		} 
		if (matchCount === level + 2) {
			win();
			winNum ++;
			console.log('win');
		}	
	  } 
	}
}

var levelUp = function () {
	
	$('#next').removeClass('pulse');
	$('#next').addClass('disabled');
	if (winNum > 0 && winNum < 5) {
		
		notesGiven = [];
		notesPlayed = [];
		level ++;
		startGame();
		console.log('level: ' + level)
		console.log('new notes given: ' + notesGiven);
	}

	if (winNum >= 5) {
		//final Win banner
		//re-start the game !!!!this is not restarting the game!!! need work
		$('#start').addClass('hide');
		$('#next').removeClass('hide');
		notesGiven = [];
		notesPlayed = [];
		level ++;
		startGame();
	}
}


var fail = function () {
	level = 1;
	winNum = 0;
	alert('fail');
}

var win = function () {
	winNum ++;
	for (var i = 0; i <= allNotes.length; i++) {
			$('#' + allNotes[i]).off('click', dotClicked);
		}
	$('#start').addClass('hide');
	$('#next').removeClass('hide');
	$('#next').addClass('pulse');
	$('#next').removeClass('disabled');
}

var startGame = function () {
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
		for (var i = 0; i <= allNotes.length; i++) {
			$('#' + allNotes[i]).on('click', dotClicked);
		}
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
