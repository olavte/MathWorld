/* 
 */

//canvas init

iniBack('world3Canvas');

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
var totalGrams;

//run question1
question1();
//variable to save current question progress
var currentQuestion = 1;


//functions for math and questions below
function backToWorld() {
    goToNewScreen('source/worldSource/world03/world03.html', 'source/worldSource/world03/world03.js');
}

function victoryScreen() {
    currentQuestion++;
    var questionToLoad;
    if(currentQuestion === 2){
        questionToLoad = question2();
    } else if(currentQuestion === 3) {
        questionToLoad = question3();
    } else if(currentQuestion === 4) {
        if(currentStage < 9) {
            currentStage = 9;
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
    question(7);
}
function question2() {
    question(8);
}
function question3() {
    question(9);
}

//builds and executes first question
//@param the max size of numbers used
function question(dificulty) {
    totalGrams = 0; //resets total sum every time question is loaded
    var firstNumber = randomNumber(dificulty)+1;
    var secondNumber = randomNumber(dificulty)+1;
    var thirdNumber = randomNumber(dificulty)+1;
    answer = firstNumber * secondNumber;
    firstValue = firstNumber;
    
   
    document.getElementById('questionText').innerHTML ="This pinecone is " + firstNumber + 
            
            " grams, how many of them can you have to reach " + firstNumber * secondNumber + " ?";
   
   
    document.getElementById('questionPicture').innerHTML = "<img src='assets/world3/pinecone.png' class = '.centered' style = 'height: 100px;'>";
    
    
    
    var options = [firstNumber, secondNumber, thirdNumber, randomNumber(dificulty), randomNumber(dificulty)];
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
    
   var secondValue = document.getElementById(clickedId).value;
   totalGrams = firstValue * secondValue;
   
    if(totalGrams === answer){
        victoryScreen();
    } else if(totalGrams !== answer) {
        sadnessScreen();
    }
}

function reload() {
    goToNewScreen('source/worldSource/world03/stage09/stage09.html', 'source/worldSource/world03/stage09/stage09.js');
}

