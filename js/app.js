
//list all ids of notes in an array, i.e. [n1, n2, n3, n4]
var allNotes = $('.circle').map(function() {return this.id;}).toArray();
var notesGiven = [];
var notesPlayed = [];
var level = 1;

var giveNotes = function () {
	var rand = Math.floor(Math.random() * 8);
	notesGiven = allNotes;
	for (var i = 0; i <= level + 3; i++) {
		notesGiven.splice(rand - i, 1);
	}
}


var startGame = function () {
	giveNotes();
	console.log('notesGiven: ' + notesGiven)
}

var dotClicked = function () {
	//dot jump
	notesPlayed.push(this.id);
	console.log('notesPlayed: ' + notesPlayed);
	checkNote();
}

var checkNote = function () {
	//check  for match once a note is played, stop the game if there is an un-match
	if (notesGiven.length > notesPlayed.length) {	
		for (var i = 0; i < notesPlayed.length; i++) {
			if (notesPlayed[i] !== notesGiven[i]) {
				fail();
				console.log('fail');
				return;
			} 
		} 
	}
	//if all previous tests pass, check for final match
	if (notesGiven.length === notesPlayed.length) {
		for (var i = 0; i < notesGiven.length; i++) {
			if (notesPlayed[i] === notesGiven[i]) {
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


})
