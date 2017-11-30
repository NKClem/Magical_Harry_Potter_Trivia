$(document).ready(function() {

//timer variable
var time = 15;
var quizTimer;
var nextQuestion;
   
//wins and losses variables
var numOfWins = 0;
var numOfLosses = 0;
var numOfQuestionsMissed = 0;
   
//variable to cycle through questions
var currentQuestion = 0;
   
//user's guess and correct answer variables
var userGuess;
   
//question variables
var questionOne = {
	name: "1. What is the name of Harry Potter's cousin?",
	answer: "Dudley",
	options: ["Dudley", "Samwise", "The Mountain", "Fred"],
	picture: './assets/images/dudley.gif'
};

var questionTwo = {
	name: "2. What is the language that Harry Potter is able to speak and understand that not many other wizards are able to?",
	answer: "Parseltongue",
	options: ["Muggle", "Marauder", "Parseltongue", "Latin"],
	picture: './assets/images/parseltongue.gif'
};

var questionThree = {
	name: "3. What is the name of the Weasleys' Great Grey Owl?",
	answer: "Errol",
	options: ["Peter Pettigrew", "Errol", "Crookshanks", "Grey Wind"],
	picture: './assets/images/errol.gif'
};

var questionFour = {
	name: "4. What is the name of the wizarding bank in Diagon Alley?",
	answer: "Gringotts Wizarding Bank",
	options: ["Gringotts Bank and Trust", "Wizarding Credit Union", "Regions", "Gringotts Wizarding Bank"],
	picture: './assets/images/gringotts.gif'
};

var questionFive = {
	name: "5. Who guards the wizarding prison Azkaban?",
	answer: "Dementors",
	options: ["Dementors", "Goblins", "Giants", "Voldemort"],
	picture: './assets/images/dementors.gif'
};

var questionSix = {
	name: "6. What was the type of dragon that Harry Potter had to get by in the Triwizard Tournament?",	
	answer: "Hungarian Horntail",
	options: ["Hungarian Horntail", "Norwegian Ridgeback", "Swedish Shortsnout", "Common Welsh Green"],
	picture: './assets/images/horntail.gif'
};

var questionSeven = {
	name: "7. What was the name of the group founded by Albus Dumbledore to combat Lord Voldemort during his rise in 1970?",
	answer: "The Order of the Phoenix",
	options: ["The Patronus Speakers", "The Fellowship of the Phoenix", "Dumbledore's Army", "The Order of the Phoenix"],
	picture: './assets/images/orderofthephoenix.gif'
};

var questionEight = {
	name: "8. How many horcruxes did Lord Voldemort create?  (Hint:  It is considered the most magical number.)",
	answer: "Seven",
	options: ["Four", "Six", "Seven", "One"],
	picture: './assets/images/horcrux.gif'
};

var questionNine = {
	name: "9. What is the name of the Black family's house-elf?",
	answer: "Kreacher",
	options: ["Dobby", "Kreacher", "Norbert", "Bill"],
	picture: './assets/images/kreacher.gif'
};

var questionTen = {
	name: "10. Which constellation contains the star system that is Harry Potter's godfather's namesake?",
	answer: "Canis Major",
	options: ["Ursa Major", "Andromeda", "Orion", "Canis Major"],
	picture: './assets/images/sirius.gif'	
};

var questionArr = [questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, questionEight, questionNine, questionTen];




//click function to start game
$('#start-button').click(function () {
	$('#start-button').hide();
	setButtonEffects();
	runGame();
	
});

$('.answers').click(function() {
	userGuess = $(this).data('value');
	clearInterval(quizTimer);
	checkForCorrectAnswer();
});

function setButtonEffects() {
	$('.answers').hover(function() {
		$(this).addClass('hover-class');
	}, function() {
		$(this).removeClass('hover-class');
	});
}

function runGame() {
	if (currentQuestion <= questionArr.length) {
		var object = questionArr[currentQuestion];
		answer = object.answer;
		setQuestions(object);
		quizTimer = setInterval(quizCountdown, 1000);
	} 
}


//quiz timer function
function quizCountdown() {
	$('#timer').text('You have ' + time + ' seconds remaining!');
	time--;
	if (time < 5) {
		$('#timer').css('color', 'red');
	}
	if (time < 0) {
		numOfQuestionsMissed++;
		clearInterval(quizTimer);
		switchToGif();
		$('#question').text('Time is up! The answer is ' + questionArr[currentQuestion].answer + '!');
		$('#gif-here').html($('<img>', {src: questionArr[currentQuestion].picture}));
		setTimeout(moveToNextQuestion, 3000);
	}

}

//reset quiz timer function
function resetQuiz() {
	$('.new-div').remove();
	time = 15;
	numOfWins = 0;
	numOfLosses = 0;
	numOfQuestionsMissed = 0;
	currentQuestion = 0;
	switchToAnswers();
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
		switchToGif();
		$('#question').text('Correct! The answer is ' + questionArr[currentQuestion].answer + '!');
		$('#gif-here').html($('<img>', {src: questionArr[currentQuestion].picture}));
		setTimeout(moveToNextQuestion, 3000);
		
	} else {
		numOfLosses++;
		switchToGif();
		$('#question').text('Nope... The correct answer is ' + questionArr[currentQuestion].answer + '.');
		$('#gif-here').html($('<img>', {src: questionArr[currentQuestion].picture}));
		setTimeout(moveToNextQuestion, 3000);
	}
}


//function to move to next question
function moveToNextQuestion() {
	currentQuestion++;
	if (currentQuestion < questionArr.length){
		switchToAnswers();
		$('#timer').hide();
		time = 15;
		$('#timer').css('color', 'white').show();
		runGame();
	} else {
		endOfGame();
	}
}

//functions to call depending on win or loss
function switchToGif() {
	$('.answers').hide();
	$('#gif-here').show();
}

function switchToAnswers() {
	$('.answers').show();
	$('#gif-here').hide();
}

//function for end of game
function endOfGame() {
	$('#gif-here').hide();
	$('.answers').removeClass('hover-class');
	$('#question').text('Game Over!');
	$('#question').append($('<div></div>').addClass('new-div').text('Correct Responses: ' + numOfWins));
	$('#question').append($('<div></div>').addClass('new-div').text('Incorrect Responses: '+ numOfLosses));
	$('#question').append($('<div></div>').addClass('new-div').text('Questions Unanswered: '+ numOfQuestionsMissed));
	$('#start-button').show().text('Play again?');
	$('#start-button').off('click');
	$('#start-button').click(function() {
		$('#start-button').hide();
		resetQuiz();
		setButtonEffects();
		runGame();
	});
}



});