/* 
 */
var plussChar = createAnimatedSprite('assets/characters/plussCharSpr.png', 1200, 300, 300, 300, 4, 30);
var minusChar = createAnimatedSprite('assets/characters/minusCharSpr.png', 8400, 300, 600, 300, 14, 2);
var multiplicationChar = createAnimatedSprite('assets/characters/MultiplicationCharSpr.png', 1800, 300, 300, 300, 6, 25);
var divisionChar = createAnimatedSprite('assets/characters/divisionCharSpr.png',6600 , 300, 300, 300, 22, 2);
//var roundingChar = createAnimatedSprite('assets/characters/roundingChar.png', 1800, 300, 300, 300, 6, 2);
//snowflake particles
//iniBackgroundEffects(1);

//Lets draw the flakes
function draw()
{
    backCtx.clearRect(0, 0, W, H);
    drawSpriteImage(backCtx, plussChar, 10, 10, 150, 150);
    drawSpriteImage(backCtx, minusChar, 10, H-160, 150, 150);
    drawSpriteImage(backCtx, multiplicationChar, W - 160, 10, 150, 150);
    drawSpriteImage(backCtx, divisionChar, W - 160, H - 160, 150, 150);
    //drawSpriteImage(backCtx, roundingChar, 10 + 200, spriteStartYTemp + ((H/8) * 4), 150, 150);
    
    
    plussChar.updateFrame();
    minusChar.updateFrame();
    multiplicationChar.updateFrame();
    divisionChar.updateFrame();
    //roundingChar.updateFrame();
}

//animation loop
animationLoop = setInterval(draw, 33);

//canvas init
currentQuestion =1;
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
iniBack('world6Canvas');




/*
 * Math part
 * 
 */

// variables for questions
var answer;
var totalSum;
var previousOperator = "/"; //variable to avoid too many similar question
//run question1
question1();
//variable to save current question progress
var currentQuestion = 1;


//functions for math and questions below
function backToWorld() {
    goToNewScreen('source/worldSource/world06/world06.html', 'source/worldSource/world06/world06.js');
}

function victoryScreen() {
    currentQuestion++;
    var questionToLoad;
    if(currentQuestion === 2){
        questionToLoad = question2();
    } else if(currentQuestion === 3) {
        questionToLoad = question3();
    } else if(currentQuestion === 4) {
        if(currentStage < 21) {
            currentStage = 21;
        }
        creditsMoney += 50;
        questionToLoad = backToWorld();
    }

}

//lets user know they pressed wrong
function sadnessScreen() {
    var text = "<p>Wrong</p>";
   document.getElementById('questionText').innerHTML = text;
   

}




//få random nummer 
//@param opp til nummer upToo
//@return random nummer
function randomNumber(upToo) {
    var randNumb = Math.floor(Math.random() * upToo);
    return randNumb;
}


    function shuffle(sourceArray) {
    for (var n = 0; n < sourceArray.length - 1; n++) {
        var k = n + Math.floor(Math.random() * (sourceArray.length - n));

        var temp = sourceArray[k];
        sourceArray[k] = sourceArray[n];
        sourceArray[n] = temp;
    }
}


function question1() {
    question(15);
}
function question2() {
    question(20);
}
function question3() {
    question(25);
}

var selectedOperator;
var answerOperator;
//builds and executes first question
//@param the max size of numbers used
function question(difficulty) {
    document.getElementById('questionText2').innerHTML = "Question: " + currentQuestion + " / 3";
    shuffle(operators);
    var firstNumber = randomNumber(difficulty) +1;
    var secondNumber = randomNumber(difficulty) +1;
    
    selectedOperator = randomNumber(operators.length);
    answerOperator = operators[selectedOperator].sign; 
    
    
    
       if (answerOperator === "/") {
                //if dividing
                ans = randomNumber(10);
                firstNumber = ans * secondNumber;
                } else {
                  //if not dividing
                  firstNumber = secondNumber + randomNumber(15);
                  ans = operators[selectedOperator].method(firstNumber, secondNumber); // calculates the answer based on operator
                } 
    
     
    var ans = operators[selectedOperator].method(firstNumber, secondNumber);
    
     
    document.getElementById('questionText').innerHTML ="I did some math with this pencil: " + firstNumber + " _ " + secondNumber + " and suddenly my pencil weighed " + ans + " grams!" + "<br />"
    + "Which operand for " + firstNumber + " _ " + secondNumber + " = " + ans +" ?";
   
   
    document.getElementById('questionPicture').innerHTML = "<img src='assets/world6/pencil.png' class = '.centered' style = 'height: 130px;'>";
    
    
    
    var options = ["+","-","x","/"];
    
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
        
    
        var thisPicture = document.getElementById('pic' + i);
          
         if(options[i] ==="+"){
             thisPicture.src="assets/characters/plussChar.png";
         }if(options[i] ==="-"){
             thisPicture.src="assets/characters/minusChar.png";
         }if(options[i] ==="/"){
             thisPicture.src="assets/characters/divisionChar.png";
         }if(options[i] ==="x"){
             thisPicture.src="assets/characters/MultiplicationChar.png";
        
    }
    
     
         
         }
        
     
    
    
    
    
   
    
}
    


//what happends when imagine is clicked
//@param ID of clicked element

function clikedPic(clickedId) {
    
   var value = document.getElementById(clickedId).value;
 
   answerOperator = operators[selectedOperator].sign;  
  
    if(value.toString() === answerOperator.toString()){
        victoryScreen();
       // shuffle(operators);
    } else if(value.toString() !== answerOperator.toString()) {
        sadnessScreen();
    }
}

function reload() {
    goToNewScreen('source/worldSource/world06/stage21/stage21.html', 'source/worldSource/world06/stage21/stage21.js');
}

