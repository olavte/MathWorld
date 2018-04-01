/* 
 */



// variables for questions
var answer = selectWord();
var letterArray = answer.split("");
var mathAnswers = [];

//canvas init
iniBack("world4StageCanvas");

var divisionCharacter = createAnimatedSprite('assets/characters/divisionCharSpr.png', 1200, 300, 300, 300, 22, 1);

//snowflake particles
//iniBackgroundEffects(1);

//Lets draw the flakes
function draw()
{
    backCtx.clearRect(0, 0, W, H);
    divisionCharacter.updateFrame();
    //updateBackgroundEffects(1);
    backCtx.drawImage(divisionCharacter.image, divisionCharacter.srcX, divisionCharacter.srcY, divisionCharacter.spriteWidth,
        divisionCharacter.spriteHeight, 160, 150, divisionCharacter.spriteWidth, divisionCharacter.spriteHeight);
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
        goToNewScreen('source/worldSource/world04/world04.html', 'source/worldSource/world04/world04.js');
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
    var zeroCheck = true;
    while (zeroCheck) {
        var randNumb = Math.floor(Math.random() * upTo);
        
        if (randNumb != 0 && randNumb != 1) {
            zeroCheck = false;;
        }
    }
    return randNumb;
}

//Selects a random word within the words array and returns it.
function selectWord() {    
    var words = ["apple", "ice", "orange", "car", 
                 "game", "math", "school", "juice", "soda", 
                 "carrot", "purple", "movie"];
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

function countDecimals(number) {
  var match = (''+number).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) { return 0; }
  return Math.max(
       0,
       // Number of digits right of decimal point.
       (match[1] ? match[1].length : 0)
       // Adjust for scientific notation.
       - (match[2] ? +match[2] : 0));
}

function round(number, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(number * multiplier) / multiplier;
}

//builds and executes first question
function question1() {
    var generated = false;
    
    document.getElementById('stageTitle').innerHTML = 'Guess The Word!';
    document.getElementById('questionText').innerHTML = '</p>Enter your guess below!</p>';
    document.getElementById('answerOptionsTitle').innerHTML = '<p>Solve the math questions to reveal letters!</p><p>If there are decimals in your answer, round down to ONE decimal!</p>';

    
    while (generated === false) {
        for (i = 0; i < answer.length; i++) {
            var decimalCheck = true;
            var buttonId = "button" + i;
            var questionFieldId = "questionField" + i;
            
            var firstNumber, secondNumber, ans;
            
            while (decimalCheck) {
                firstNumber = randomNumber(12);
                secondNumber = randomNumber(12);
                ans = firstNumber / secondNumber;
                
                if(countDecimals(ans) === 0) {
                    decimalCheck = false;
                }
            }
            
            mathAnswers.push(ans);
            
            var div = document.createElement('div');
            var newId = 'question' + i;
            div.id = newId;
            div.innerHTML = '<p>' + firstNumber + ' / ' + secondNumber + ' = <input type="text" name="guess" id=' + questionFieldId + '><button id=' + buttonId + ' onclick="checkAnswer(' + i + ')">Check Answer</button></p>';
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
