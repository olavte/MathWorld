/* 
 */

//canvas init

iniBack('world1Canvas');

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
        plussCharacter.spriteHeight, 10, 150, W/5, H/5);
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


//variable to save current question progress
var currentQuestion = 1;
//run question1
question1();


//functions for math and questions below
function backToWorld() {
    goToNewScreen('source/worldSource/world01/world01.html', 'source/worldSource/world01/world01.js');
}

function victoryScreen() {
    currentQuestion++;
    var questionToLoad;
    if(currentQuestion === 2){
        questionToLoad = question2();
    } else if(currentQuestion === 3) {
        questionToLoad = question3();
    } else if(currentQuestion === 4) {
        if(currentStage < 1) {
            currentStage = 1;
        }
        creditsMoney += 50;
        questionToLoad = backToWorld();
    }

}

//lets user know they pressed wrong
function sadnessScreen() {

    var text = "<p>Wrong</p>";
   document.getElementById('questionText').innerHTML = text;
    setTimeout(function(){
    var questionToLoad;
    if(currentQuestion === 1){
        questionToLoad = question1();
    }
    if(currentQuestion === 2){
        questionToLoad = question2();
    } else if(currentQuestion === 3) {
        questionToLoad = question3();
    }
    }, 1500);
   

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
    question(15);
}
function question2() {
    question(20);
}
function question3() {
    question(25);
}

//builds and executes first question
//@param the max size of numbers used
function question(dificulty) {
    totalSum = 0; //resets total sum every time question is loaded
    var firstNumber = randomNumber(dificulty);
    var secondNumber = randomNumber(dificulty);
    var thirdNumber = randomNumber(dificulty);
    answer = firstNumber + secondNumber + thirdNumber;
    
    document.getElementById('stageTitle').innerHTML = "Total:" + totalSum;
    document.getElementById('questionText2').innerHTML = "Question: " + currentQuestion + " / 3";
    document.getElementById('questionText').innerHTML ="This icecream is " + answer + " grams, wich of these icecream scoops must you pick to get the same weight?";
   
   
    document.getElementById('questionPicture').innerHTML = "<img src='assets/world1/world1ice.png' class = '.centered' style = 'height: 150px;'>";
    
    
    
    var options = [firstNumber, secondNumber, thirdNumber, randomNumber(dificulty-5), randomNumber(dificulty-10)];
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
    
   var value = document.getElementById(clickedId).value;
   totalSum = totalSum + value;
   document.getElementById('stageTitle').innerHTML = "Total:" + totalSum;
   
    if(totalSum === answer){
        victoryScreen();
    } else if(totalSum > answer) {
        sadnessScreen();
    }
}

function reload() {
    goToNewScreen('source/worldSource/world01/stage01/stage01.html', 'source/worldSource/world01/stage01/stage01.js');
}

