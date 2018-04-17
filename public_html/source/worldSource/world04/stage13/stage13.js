/* 
 */

//canvas init

iniBack('world4Canvas');

var divisionCharacter = createAnimatedSprite('assets/characters/divisionCharSpr.png', 1200, 300, 300, 300, 22, 1);

//snowflake particles
iniBackgroundEffects(1);

//Lets draw the flakes
function draw()
{
    backCtx.clearRect(0, 0, W, H);

    divisionCharacter.updateFrame();


    updateBackgroundEffects(1);
    backCtx.drawImage(divisionCharacter.image, divisionCharacter.srcX, divisionCharacter.srcY, divisionCharacter.spriteWidth,
        divisionCharacter.spriteHeight, 160, 150, divisionCharacter.spriteWidth, divisionCharacter.spriteHeight);
}

//animation loop
animationLoop = setInterval(draw, 16);


/*
 * Math part
 * 
 */

// variables for questions
var firstGuess = "_";
var secondGuess = "_";
var guesses = [];
var answer;
var totalSum = "";

//run question1
question1();
//variable to save current question progress
var currentQuestion = 1;


//functions for math and questions below
function backToWorld() {
    goToNewScreen('source/worldSource/world04/world04.html', 'source/worldSource/world04/world04.js');
}

function victoryScreen() {
    var text = "<p>Correct!</p>";
    document.getElementById('questionText').innerHTML = text;
    setTimeout(function(){
        firstGuess = "_";
        secondGuess = "_";
        totalSum = "";
        guesses = [];
        
        currentQuestion++;
        var questionToLoad;
        if(currentQuestion === 2){
            questionToLoad = question2();
        } else if(currentQuestion === 3) {
            questionToLoad = question3();
        } else if(currentQuestion === 4) {
            if(currentStage < 13) {
                currentStage = 13;
            }
            creditsMoney += 50;
            questionToLoad = backToWorld();
        }  
    }, 1000);


}

//lets user know they pressed wrong
function sadnessScreen() {
    var text = "<p>Wrong</p>";
    document.getElementById('questionText').innerHTML = text;
   
    setTimeout(function(){   
        firstGuess = "_";
        secondGuess = "_";
        totalSum = "";
        guesses = [];
   
        document.getElementById('stageTitle').innerHTML = "Your guess: " + firstGuess + " / " + secondGuess + " = " + totalSum;
        document.getElementById('questionText').innerHTML ="This icecream is " + answer + " grams. Pick two numbers so that the quotient becomes " + answer + ".";
    }, 1000);
   

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


//shuffle array (like answer array) (Modern Fisher–Yates shuffle algorithm via 
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function question1() {
    question(50);
}
function question2() {
    question(80);
}
function question3() {
    question(120);
}

//builds and executes first question
//@param the max size of numbers used
function question(difficulty) {

    
    var decimalCheck = true;
           
    var firstNumber, secondNumber;
       
    while (decimalCheck) {
        firstNumber = randomNumber(difficulty);
        secondNumber = randomNumber(12);
        answer = firstNumber / secondNumber;
               
        if((countDecimals(answer) === 0) && (answer != 1) && (answer < 13)) {
            decimalCheck = false;
        }
    }
    
    totalSum = ""; //resets total sum every time question is loaded
    
    document.getElementById('stageTitle').innerHTML = "Your guess: " + firstGuess + " / " + secondGuess + " = " + totalSum;
    document.getElementById('questionText').innerHTML ="This icecream is " + answer + " grams. Pick two numbers so that the quotient becomes " + answer + ".";
   
   
    document.getElementById('questionPicture').innerHTML = "<img src='assets/world1/world1ice.png' class = '.centered' style = 'height: 200px;'>";
    
    
    
    var options = [firstNumber, secondNumber, randomNumber(difficulty), randomNumber(difficulty), randomNumber(difficulty)];
    shuffle(options);
    
    //add option text over pictures
    for(i = 0; i < options.length; i++) {
        var thisOption = document.getElementById('option' + i);
        //clears previous question nodes
        if(thisOption.value !== null) {
            thisOption.removeChild(thisOption.lastChild);
        }
        thisOption.appendChild(document.createTextNode(options[i]));
        thisOption.value = options[i];
    }
    
    if(totalSum === answer){
        victoryScreen();
    } else if(totalSum > answer) {
        sadnessScreen();
    }
    
}

//what happends when imagine is clicked
//@param ID of clicked element

function clikedPic(clickedId) {
   
    if (guesses.length < 2) {
        var value = document.getElementById(clickedId).value;
        
        if (guesses.length === 0){
            firstGuess = value;
            guesses.push("" + firstGuess);
            document.getElementById('stageTitle').innerHTML = "Your guess: " + firstGuess + " / " + secondGuess + " = " + totalSum;
        } else if (guesses.length === 1) {
            secondGuess = value;
            guesses.push("" + secondGuess);
            totalSum = firstGuess / secondGuess;
            document.getElementById('stageTitle').innerHTML = "Your guess: " + firstGuess + " / " + secondGuess + " = " + totalSum;        
            
            
            if(totalSum === answer){
                victoryScreen();
            } else if (totalSum !== answer) {    
                sadnessScreen();
            }
        }
    } else {
        sadnessScreen();
    }
}

function reload() {
    goToNewScreen('source/worldSource/world04/stage13/stage13.html', 'source/worldSource/world04/stage13/stage13.js');
}

