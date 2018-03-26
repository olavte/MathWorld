/* 
 */

//canvas init

iniBack('world2Canvas');

var minusCharacter = createAnimatedSprite('assets/characters/minusCharSpr.png', 8400, 300, 600, 300, 14, 2);

//snowflake particles
iniBackgroundEffects(1);

//Lets draw the flakes
function draw()
{
    backCtx.clearRect(0, 0, W, H);

    minusCharacter.updateFrame();


    updateBackgroundEffects(1);
    backCtx.drawImage(minusCharacter.image, minusCharacter.srcX, minusCharacter.srcY, minusCharacter.spriteWidth,
        minusCharacter.spriteHeight, 60, 50, minusCharacter.spriteWidth, minusCharacter.spriteHeight);
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

//run question1
question1();
//variable to save current question progress
var currentQuestion = 1;


//functions for math and questions below
function backToWorld() {
    goToNewScreen('source/worldSource/world02/world02.html', 'source/worldSource/world02/world02.js');
}

function victoryScreen() {
    currentQuestion++;
    var questionToLoad;
    if(currentQuestion === 2){
        questionToLoad = question2();
    } else if(currentQuestion === 3) {
        questionToLoad = question3();
    } else if(currentQuestion === 4) {
        if(currentStage < 5) {
            currentStage = 5;
        }
        questionToLoad = backToWorld();
    }

}

//lets user know they pressed wrong
function sadnessScreen() {
    var text = "<p>Wrong</p>";
   document.getElementById('questionText').innerHTML = text;
   document.getElementById('answerOptions').innerHTML = "";
   

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
    question(75);
}
function question2() {
    question(100);
}
function question3() {
    question(150);
}

//builds and executes first question
//@param the max size of numbers used
function question(dificulty) {
    var firstNumber = randomNumber(dificulty);
    var secondNumber = randomNumber(dificulty);
    var thirdNumber = randomNumber(dificulty);
    answer = firstNumber + secondNumber + thirdNumber;
    totalSum = answer; //resets total sum every time question is loaded
    
    document.getElementById('stageTitle').innerHTML = "Total left:" + totalSum;
    document.getElementById('questionText').innerHTML ="This icecream is " + answer + " grams, you can take max 3 bites to eat it all, wich bites can you take, to eat exactly this weight ??";
   
   
    document.getElementById('questionPicture').innerHTML = "<img src='assets/world1/world1ice.png' class = '.centered' style = 'height: 200px;'>";
    
    
    
    var options = [firstNumber, secondNumber, thirdNumber, randomNumber(dificulty - 50), randomNumber(dificulty - 25)];
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
   totalSum = totalSum - value;
   document.getElementById('stageTitle').innerHTML = "Total left:" + totalSum;
   
    if(totalSum === 0){
        victoryScreen();
    } else if(totalSum < 0) {
        sadnessScreen();
    }
}

function reload() {
    goToNewScreen('source/worldSource/world02/stage05/stage05.html', 'source/worldSource/world02/stage05/stage05.js');
}

