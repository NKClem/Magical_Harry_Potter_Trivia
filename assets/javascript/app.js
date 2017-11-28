$(document).ready(function() {

//timer variable
var time = 15;
var quizTimer;
var nextQuestion;
   
//wins and losses variables
var numOfWins = 0;
var numOfLosses = 0;
   
//variable to cycle through questions
var currentQuestion = 0;
   
//user's guess and correct answer variables
var userGuess;
var currentQuestionObject;
   
//question variables
var questionOne = {
	name: "1. What is Harry Potter's cousin's name?",
	answer: "Dudley",
	options: ["Dudley", "Samwise", "The Mountain", "Fred"],
	picture: '../../assets/images/dudley.gif'
};

var questionTwo = {
	name: "2. What is the language that Harry Potter is able to speak and understand that not many other wizards are able to?",
	answer: "Parseltongue",
	options: ["Muggle", "Marauder", "Parseltongue", "Latin"],
	picture: '../images/parseltongue.gif'
};

var questionThree = {
	name: "3. What is the name of the Weasleys' Great Grey Owl?",
	answer: "Errol",
	options: ["Peter Pettigrew", "Errol", "Crookshanks", "Grey Wind"],
	picture: '../images/errol.gif'
};

var questionFour = {
	name: "4. What is the name of the wizarding bank in Diagon Alley?",
	answer: "Gringotts Wizarding Bank",
	options: ["Gringotts Bank and Trust", "Wizarding Credit Union", "Regions", "Gringotts Wizarding Bank"],
	picture: '../images/gringotts.gif'
};

var questionFive = {
	name: "5. Who guards the wizarding prison Azkaban?",
	answer: "Dementors",
	options: ["Dementors", "Goblins", "Giants", "Voldemort"],
	picture: '../images/dementors.gif'
};

var questionSix = {
	name: "6. What was the type of dragon that Harry Potter had to get by in the Triwizard Tournament?",	
	answer: "Hungarian Horntail",
	options: ["Hungarian Horntail", "Norwegian Ridgeback", "Swedish Shortsnout", "Common Welsh Green"],
	picture: '../images/horntail.gif'
};

var questionSeven = {
	name: "7. What was the name of the group founded by Albus Dumbledore to combat Lord Voldemort during his rise in 1970?",
	answer: "The Order of the Phoenix",
	options: ["The Patronus Speakers", "The Fellowship of the Phoenix", "Dumbledore's Army", "The Order of the Phoenix"],
	picture: '../images/orderofthephoenix.gif'
};

var questionEight = {
	name: "8. How many horcruxes did Lord Voldemort create?  (Hint:  It is considered the most magical number.)",
	answer: "Seven",
	options: ["Seven", "Six", "Four", "One"],
	picture: '../images/horcrux.gif'
};

var questionNine = {
	name: "9. What is the name of the Black family's house-elf?",
	answer: "Kreacher",
	options: ["Dobby", "Kreacher", "Norbert", "Bill"],
	picture: '../images/kreacher.gif'
};

var questionTen = {
	name: "10. Which constellation contains the star system that is Harry Potter's godfather's namesake?",
	answer: "Canis Major",
	options: ["Ursa Major", "Andromeda", "Orion", "Canis Major"],
	picture: '../images/sirius.gif'	
};

var questionArr = [questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, questionEight, questionNine, questionTen];




//click function to start game
$('#start-button').click(function() {
	$('#start-button').hide('fast', startGame());
	
});

$('.answers').click(function() {
	userGuess = $(this).data('value');
	clearInterval(quizTimer);
	checkForCorrectAnswer();
});



function startGame() {
	if (currentQuestion <= questionArr.length) {
		var object = questionArr[currentQuestion];
		answer = object.answer;
		setQuestions(object);
		quizTimer = setInterval(quizCountdown, 1000);
		console.log('Wins: ' + numOfWins);
		console.log('Losses: ' + numOfLosses);
	} else {
		//game over
	}
}



//quiz timer function
function quizCountdown() {
	$('#timer').text(time);
	time--;
	if (time < 0) {
		clearInterval(quizTimer);
		switchToGif();
		$('#question').text('Time is up! The answer is ' + questionArr[currentQuestion].answer + '!');
		$('#gif-here').html($('<img>', {src: questionArr[currentQuestion].picture}));
	}
	//setTimeout to startGame()
}

//reset quiz timer function
function resetQuizCountdown() {
	time = 20;
	$('#timer').text(time);
}

//function to populate questions in html
function setQuestions(obj) {
	$('#question').text(obj.name);
	$('#button-1').data('value', obj.options[0]).text(obj.options[0]);
	$('#button-2').data('value', obj.options[1]).text(obj.options[1]);
	$('#button-3').data('value', obj.options[2]).text(obj.options[2]);
	$('#button-4').data('value', obj.options[3]).text(obj.options[3]);
}

//function to check for correct answer
function checkForCorrectAnswer(guess) {
	if (userGuess == answer) {
		numOfWins++;
		console.log('Wins: ' + numOfWins);
		switchToGif();
		$('#question').text('Correct! The answer is ' + questionArr[currentQuestion].answer + '!');
		$('#gif-here').show('fast').html($('<img>', {src: questionArr[currentQuestion].picture}));
		
	} else {
		numOfLosses++;
		console.log('Losses: ' + numOfLosses);
		switchToGif();
		$('#question').text('Nope... The correct answer is ' + questionArr[currentQuestion].answer + '.');
		$('#gif-here').html($('<img>', {src: questionArr[currentQuestion].picture}));
	}
}

//reset timer
//nextQuestion = setTimeout(function() {
//	currentQuestion++;
//	switchToAnswers();
//	startGame();
//}, 8000)

//functions to call depending on win or loss
function switchToGif() {
	$('.answers').hide('fast');
	$('#gif-here').show('fast');
}

function switchToAnswers() {
	$('.answers').show('fast');
	$('#gif-here').hide('fast');
}






});