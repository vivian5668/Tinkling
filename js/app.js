
//list all ids of notes in an array, i.e. [n1, n2, n3, n4]
var allNotes = $('.circle').map(function() {return this.id;}).toArray();
var notesGiven = [];
var notesPlayed = [];
var level = 1;


// var n8Audio = new Audio('sounds/n1.mp3');
var loadMusic = new Audio('sounds/opening.mp3');


var giveNotes = function (levelNum) {
	var rand = Math.floor(Math.random() * 8);
	notesGiven = allNotes;
	var levelNum = level;
	for (var i = 0; i <= levelNum + 3; i++) {
		notesGiven.splice(rand - i, 1);
	}
}

var startGame = function () {
	giveNotes();
	console.log('notesGiven: ' + notesGiven)
	for (var i = 0; i < 9; i++) {
		$('#n' + i).removeClass('dotjump');
	}
	console.log($('#n1').classList)
}

var dotClicked = function () {
	//dot jump
	notesPlayed.push(this.id);
	console.log('notesPlayed: ' + notesPlayed);
	document.getElementById('s' + this.id).play(); //to grab audio id
	this.classList.add('dotjump');
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
		if (matchCount === 3) {
			win();
			console.log('win');
		}	
	  } 
	}
}

var fail = function () {

}

var win = function () {

}



$(document).ready(function() {
	$('#n1').on('click', dotClicked);
	$('#n2').on('click', dotClicked);
	$('#n3').on('click', dotClicked);
	$('#n4').on('click', dotClicked);
	$('#n5').on('click', dotClicked);
	$('#n6').on('click', dotClicked);
	$('#n7').on('click', dotClicked);
	$('#n8').on('click', dotClicked);
	$('#start').on('click', startGame);
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
 		inDuration: 1000, // Transition in duration
        outDuration: 200, // Transition out duration
 	});
 	setTimeout(function() {$('#modal1').modal('open');}, 2000);
})
