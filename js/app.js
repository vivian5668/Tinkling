
//list all ids of notes in an array, i.e. [n1, n2, n3, n4]
var allNotes = $('.circle').map(function() {return this.id;}).toArray();
var notesGiven = [];
var notesPlayed = [];
var level = 1;

var giveNotes = function () {
	var rand = Math.floor(Math.random() * 8);
	var notes = allNotes;
	for (var i = 0; i <= level + 3; i++) {
		notes.splice(rand - i, 1);
	}
	console.log(notes)
}

var dotClicked = function () {
	//dot jump
	notesPlayed.push(this.id);
	console.log(notesPlayed)
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


})
