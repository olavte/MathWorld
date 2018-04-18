/* 
 */

//canvas init

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

var plussCharacter = createAnimatedSprite('assets/characters/plussCharSpr.png', 1200, 300, 300, 300, 3, 30);

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
animationLoop = setInterval(draw, 16);


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
    
     
    document.getElementById('questionText').innerHTML ="This icecream is " + firstNumber + " ? " + secondNumber + " grams, wich of these operators must you pick to get " + ans + " ?";
   
   
    document.getElementById('questionPicture').innerHTML = "<img src='assets/world1/world1ice.png' class = '.centered' style = 'height: 200px;'>";
    
    
    
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

