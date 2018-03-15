/* 
 */



// variables for questions
var answer = selectWord();
var letterArray = answer.split("");
var mathAnswers = [];

//canvas init
iniBack("world5Canvas")

var roudningChar = createAnimatedSprite('assets/characters/roundingChar.png', 1800, 300, 300, 300, 6, 15);

//snowflake particles
iniBackgroundEffects(5);

//Lets draw the flakes
function draw()
{
    backCtx.clearRect(0, 0, W, H);
    roudningChar.updateFrame();
    updateBackgroundEffects(5);
    drawSpriteImage(backCtx, roundingChar, 10, H / 4, W / 5, W / 4);
}

//animation loop
animationLoop = setInterval(draw, 33);
question1();




//functions for math and questions below


function victoryScreen() {
    document.getElementById('questionText').innerHTML = '<p>Correct!</p>';
    document.getElementById('questionPicture').innerHTML = "";
    document.getElementById('answerOptions').innerHTML = "";
    setTimeout(function(){
        goToNewScreen('source/worldSource/world05/world05.html', 'source/worldSource/world05/world05.js');
    }, 1500);
}

//lets user know they pressed wrong
function loseScreen() {

    document.getElementById('questionText').innerHTML = "<p>WRONG! Try again:</p>";
    setTimeout(function(){
        document.getElementById('questionText').innerHTML = '</p>Enter your guess below!</p>';
    }, 1500);

}



//få random nummer 
//@param opp til nummer upToo
//@return random nummer
function randomNumber(upTo) {
    var randNumb = Math.floor(Math.random() * upTo);
    return randNumb;
}

//Selects a random word within the words array and returns it.
function selectWord() {    
    var words = ["apple", "ice", "orange", "car", "computer", 
                 "game", "math", "school", "juice", "soda", 
                 "carrot", "purple", "movie", "superhero"];
    var randNumb = randomNumber(words.length);
    return words[randNumb];
}

function guessWord() {
    var guess = document.getElementById("guessField").value;
    
    if (guess.toLowerCase() === answer) {
        victoryScreen();
    } else {
        loseScreen();
    } 
}

function checkAnswer(i) {
    var guess = document.getElementById('questionField' + i).value;
    
    if (guess.toString() === mathAnswers[i].toString()){
        document.getElementById('question' + i).innerHTML = '<p>Letter Number ' + (i+1) + ' = ' + letterArray[i].toUpperCase() + '</p>';
    } else {
        document.getElementById('answerOptionsTitle').innerHTML = '<p>WRONG, try again!</p>';
        setTimeout(function(){
            document.getElementById('answerOptionsTitle').innerHTML = '<p>Solve the math questions to reveal letters:</p>';
        }, 1500);
    }
} 

//builds and executes first question
function question1() {
    var generated = false;
    
    document.getElementById('stageTitle').innerHTML = 'Guess The Word!';
    document.getElementById('questionText').innerHTML = '</p>Enter your guess below!</p>';
    document.getElementById('answerOptionsTitle').innerHTML = '<p>Solve the math questions to reveal letters:</p>';

    
    while (generated === false) {
        for (i = 0; i < answer.length; i++) {
            var buttonId = "button" + i;
            var questionFieldId = "questionField" + i;
            var firstNumber = randomNumber(15);
            var secondNumber = randomNumber(15);
            var ans = firstNumber + secondNumber;
            mathAnswers.push(ans);
            
            var div = document.createElement('div');
            var newId = 'question' + i;
            div.id = newId;
            div.innerHTML = '<p>' + firstNumber + ' + ' + secondNumber + ' = <input type="text" name="guess" id=' + questionFieldId + '><button id=' + buttonId + ' onclick="checkAnswer(' + i + ')">Check Answer</button></p>';
            document.getElementById('answerOptions').appendChild(div);
            
            /* ENTER TO CHECK ANSWER DOES NOT WORK
             * 
            var input = document.getElementById(questionFieldId);
            input.addEventListener('keyup', function(event) {
                event.preventDefault();
                if (event.keyCode === 13) {
                    document.getElementById(buttonId).click();
                } 
            });*/
        }
        generated = true;
    }   
}


function question2() {
    document.getElementById('stageTitle').innerHTML = "TODO";
    document.getElementById('questionText').innerHTML ="TODO";
    document.getElementById('answerOptions').innerHTML ="TODO";
}
