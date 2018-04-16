/* 
 */



// variables for questions
var answer = selectWord();
var letterArray = answer.split("");
var mathAnswers = [];
var previousOperator = "/"; //variable to avoid too many similar questions

var operators = [{
        sign: "+",
        method: function(a,b){ return a + b; }
    },{
        sign: "-",
        method: function(a,b){ return a - b; }
    }, {
        sign: "x",
        method: function(a,b){ return a * b; }
    },  {
        sign: "/",
        method: function(a,b){ return a / b; }
    }
];

//canvas init
iniBack("world1Canvas");

var plussCharacter = createAnimatedSprite('assets/characters/plussCharSpr.png', 1200, 300, 300, 300, 4, 30);

//snowflake particles
iniBackgroundEffects(1);

//Lets draw the flakes
function draw()
{
    backCtx.clearRect(0, 0, W, H);
    plussCharacter.updateFrame();
    updateBackgroundEffects(1);
    backCtx.drawImage(plussCharacter.image, plussCharacter.srcX, plussCharacter.srcY, plussCharacter.spriteWidth,
        plussCharacter.spriteHeight, 160, 150, plussCharacter.spriteWidth, plussCharacter.spriteHeight);
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
        goToNewScreen('source/worldSource/world06/world06.html', 'source/worldSource/world06/world06.js');
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
    var randNumb = Math.floor(Math.random() * upTo) + 1;
    return randNumb;
}

//Selects a random word within the words array and returns it.
function selectWord() {    
    var words = ["apple", "ice", "orange", "car", "computer", 
                 "game", "math", "school", "juice", "soda", 
                 "carrot", "purple", "movie", "superhero"];
    var randNumb = randomNumber(words.length) - 1;
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
    //if diffrent symbol used
    if (guess === "*") {
        guess = "x";
    }
    
    if (guess.toString() === mathAnswers[i].toString()){
        document.getElementById('question' + i).innerHTML = '<p>Letter Number ' + (i+1) + ' = ' + letterArray[i].toUpperCase() + '</p>';
    } else {
        document.getElementById('answerOptionsTitle').innerHTML = '<p>WRONG, try again!</p>';
        setTimeout(function(){
            document.getElementById('answerOptionsTitle').innerHTML = '<p>Wich operation is needed to make this work? (Use +, -, / or x):</p>';
        }, 1500);
    }
} 

//builds and executes first question
function question1() {
    var generated = false;
    shuffle(operators);
    document.getElementById('stageTitle').innerHTML = 'Guess The Word!';
    document.getElementById('questionText').innerHTML = '</p>Enter your guess below!</p>';
    document.getElementById('answerOptionsTitle').innerHTML = '<p>Wich operation is needed to make this work? (Use +, -, / or x):</p>';

    
    while (generated === false) {
        for (i = 0; i < answer.length; i++) {
            var buttonId = "button" + i;
            var questionFieldId = "questionField" + i;
            var secondNumber = randomNumber(20);
            var firstNumber;
            var ans;   
            
            var selectedOperator =randomNumber(operators.length - 1);      //select random operator
            var answerOperator = operators[selectedOperator].sign;         //this will give you the sign / operator
            if(answerOperator === previousOperator) {
                shuffle(operators);
                selectedOperator = randomNumber(operators.length - 1);      //roll again if its the same as before
                answerOperator = operators[selectedOperator].sign;
            }

            //make sure to not get decimal numbers when dividing
            if (answerOperator === "/") {
                //if dividing
                ans = randomNumber(10);
                firstNumber = ans * secondNumber;
                } else {
                  //if not dividing
                  firstNumber = secondNumber + randomNumber(15);
                  ans = operators[selectedOperator].method(firstNumber, secondNumber); // calculates the answer based on operator
                }    
            
            mathAnswers.push(answerOperator);
            previousOperator = answerOperator;
            
            var div = document.createElement('div');
            var newId = 'question' + i;
            div.id = newId;
            div.innerHTML = '<p>' + firstNumber + ' <input type="text" name="guess" id=' + questionFieldId + '> ' + secondNumber + ' = ' + ans +' <button id=' + buttonId + ' onclick="checkAnswer(' + i + ')">Check Answer</button></p>';
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
    
    function shuffle(sourceArray) {
    for (var n = 0; n < sourceArray.length - 1; n++) {
        var k = n + Math.floor(Math.random() * (sourceArray.length - n));

        var temp = sourceArray[k];
        sourceArray[k] = sourceArray[n];
        sourceArray[n] = temp;
    }
}
}


