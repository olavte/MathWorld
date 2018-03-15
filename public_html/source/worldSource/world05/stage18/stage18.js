/* 
 */
//document.getElementById('myModal').style.display = "block";
//document.getElementById('stage2StartModalContent').style.display = "block";

//canvas init

iniBack("world5Canvas");

iniMiddle("middleCanvas");

iniFront("frontCanvas");

//Music
playMusic(fightMusic);
var roundingChar = createAnimatedSprite('assets/characters/roundingChar.png', 1800, 300, 300, 300, 6, 15);

var gameState = 0;
setBeforeGame();


iniBackgroundEffects(5);

// Game variables

var firstNumber = 0;
var secondNumber = 0;
var questionAnswer = 0;
var gameScore = 10;
var currentCorrect = 0;

//Hinder Object
var hinder = {
    hinderX: W + ((Math.random() * (W / 2))),
    hinderY: 0,
    hinderWidth: W / 10,
    hinderHeight: H / 8,
    hinderGoalX: Math.random() * W,
    hinderGoalY: Math.random() * H
};

//Math Objects
var mathObjects = [];
for(var i = 0; i < 8; i++) {
    mathObjects.push({
        name:"math" + (i + 1),
        mathX:W + ((Math.random() * (W / 2))),
        mathY:Math.random() * H,
        mathW:Math.random() * W,
        mathNumber:0});
}

//PlayerVariables
var player = {
    playerX: W / 2,
    playerY: H - (H/8),
    playerHeight: H / 8,
    playerWidth: W / 10
};

var userInputX = 0;
var userInputY = 0;

// Player Controll
var timer = 0;

mouseMove = window.addEventListener("mousemove", function (event) {
    userInputX = (event.x - middleCanvas.offsetLeft) * 1.4;
    userInputY = (event.y - middleCanvas.offsetTop) * 1.4;
    event.preventDefault();
});

touchMove = window.addEventListener("touchmove", function (event) {
    userInputX = (event.touches[0].clientX - middleCanvas.offsetLeft) * 1.4;
    userInputY = (event.touches[0].clientY - middleCanvas.offsetTop) * 1.4;
}, false);

touchStart = window.addEventListener("touchstart", function () {
    if (timer === 0) {
        timer = setInterval(movePlayer, 20);
    }
}, false);

touchEnd = window.addEventListener("touchend", function () {
    clearInterval(timer);
    timer = 0;
}, false);

mouseDown = window.addEventListener("mousedown", function () {
    if (timer === 0) {
        timer = setInterval(movePlayer, 20);
    }
}, false);

mouseUp = window.addEventListener("mouseup", function () {
    clearInterval(timer);
    timer = 0;
}, false);

function movePlayer() {
    if (userInputX < ((player.playerX + ((player.playerWidth) / 2)) - 24) && (player.playerX > 0)) {
        player.playerX -= 10;
    } else if (userInputX > ((player.playerX + (player.playerWidth / 2)) + 24) && player.playerX < (W - (player.playerWidth))) {
        player.playerX += 10;
    }
    if (userInputY < ((player.playerY + ((player.playerHeight) / 2)) - 24) && (player.playerY > 0)) {
        player.playerY -= 10;
    } else if (userInputY > ((player.playerY + (player.playerHeight / 2)) + 24) && player.playerY < (H - (player.playerHeight))) {
        player.playerY += 10;
    }
}


//Lets draw the flakes
function draw()
{
    backCtx.clearRect(0, 0, W, H);
    middleCtx.clearRect(0, 0, W, H);
    frontCtx.clearRect(0, 0, W, H);

    drawBack();
    drawMiddle();
    drawFront();

    function drawBack() {
        updateBackgroundEffects(5);
    }

    function drawMiddle() {

        middleCtx.fillStyle = "rgba(0, 0, 0, 0.8)";
        middleCtx.beginPath();
        middleCtx.rect(0, 0, W, H);
        middleCtx.fill();

        middleCtx.fillStyle = "rgba(255, 255, 255, 1)";
        middleCtx.beginPath();
        middleCtx.rect(player.playerX, player.playerY, player.playerWidth, player.playerHeight);
        middleCtx.fill();
        middleCtx.stroke();

        if (gameState === 1) {

            updateGame();

            middleCtx.fillStyle = "rgba(0, 20, 0, 1)";
            middleCtx.beginPath();
            middleCtx.rect(hinder.hinderX, hinder.hinderY, hinder.hinderWidth, hinder.hinderHeight);
            middleCtx.fill();

            mathObjects.forEach(function(mathObject) {
                middleCtx.fillStyle = "rgba(255, 200, 200, 0.6)";
                middleCtx.beginPath();
                middleCtx.arc(mathObject.mathX, mathObject.mathY, mathObject.mathW, 0, 2 * Math.PI);
                middleCtx.fill();
                middleCtx.fillStyle = "rgba(0, 0, 0, 1)";
                middleCtx.font = "30px Arial";
                middleCtx.fillText(mathObject.mathNumber, mathObject.mathX
                    - (mathObject.mathW/2), mathObject.mathY
                    + (mathObject.mathW/2));
            });
        }
    }

    function drawFront() {
        drawSpriteImage(frontCtx, roundingChar, 0, 100, W/4, H/2);
        roundingChar.updateFrame();
    }
}

function updateGame() {

    if (gameScore >= 20) {
        setWinGame();
    } else if (gameScore < 0) {
        setGameOver();
    }

    if(currentCorrect === 4) {
        restartGame();
    }

    if(checkCollision(player.playerX, player.playerY, player.playerWidth, player.playerHeight,
            hinder.hinderX, hinder.hinderY, hinder.hinderWidth, hinder.hinderHeight)) {
        setGameOver();
    }

    if(hinder.hinderX > hinder.hinderGoalX - 100 && hinder.hinderX < hinder.hinderGoalX + 100
        && hinder.hinderY > hinder.hinderGoalY - 100 && hinder.hinderY < hinder.hinderGoalY + 100) {
        hinder.hinderGoalX = Math.random() * W;
        hinder.hinderGoalY = Math.random() * H;
    }

    if(hinder.hinderY < hinder.hinderGoalY - 100) {
        hinder.hinderY += 3;
    } else if (hinder.hinderY > hinder.hinderGoalY + 100) {
        hinder.hinderY -= 3;
    }

    if(hinder.hinderX < hinder.hinderGoalX - 100) {
        hinder.hinderX += 3;
    } else if (hinder.hinderX > hinder.hinderGoalX + 100) {
        hinder.hinderX -= 3;
    }

    mathObjects.forEach(function(mathObject) {
       if(checkCollision(player.playerX, player.playerY, player.playerWidth, player.playerHeight,
               mathObject.mathX, mathObject.mathY, mathObject.mathW, mathObject.mathW)) {
           if (mathObject.mathNumber === questionAnswer) {
               gameScore += 2;
               mathObject.mathX = 99999;
               currentCorrect++;
               document.getElementById("questionBox").innerHTML
                   = firstNumber + " + " + secondNumber + " = ??     Score: "
                   + gameScore;
           } else {
               gameScore--;
               mathObject.mathX = 99999;
               document.getElementById("questionBox").innerHTML
                   = firstNumber + " + " + secondNumber + " = ??     Score: "
                   + gameScore;
           }
       }
    });
}

function setGameOver() {
    gameState = 0;
    document.getElementById('myModal').style.display = "block";
    document.getElementById("gameOverModalContent").style.display = "block";
    document.getElementById("startModalContent").style.display = "none";
    document.getElementById("winModalContent").style.display = "none";
    restartGame();
}

function setStartGame() {
    gameState = 1;
    gameSpeed = 5;
    document.getElementById('myModal').style.display = "none";
    document.getElementById("gameOverModalContent").style.display = "none";
    document.getElementById("startModalContent").style.display = "none";
    document.getElementById("winModalContent").style.display = "none";

    restartGame();
}

function setBeforeGame() {
    gameState = 0;
    gameScore = 10;
    document.getElementById('myModal').style.display = "block";
    document.getElementById("gameOverModalContent").style.display = "none";
    document.getElementById("startModalContent").style.display = "block";
    document.getElementById("winModalContent").style.display = "none";
}

function setWinGame() {
    gameState = 0;
    document.getElementById('myModal').style.display = "block";
    document.getElementById("gameOverModalContent").style.display = "none";
    document.getElementById("startModalContent").style.display = "none";
    document.getElementById("winModalContent").style.display = "block";
}

function restartGame() {
    // Game variables
    //Hinder Object

    firstNumber = Math.round(Math.random() * 10);
    secondNumber = Math.round(Math.random() * 10);
    questionAnswer = firstNumber + secondNumber;

    document.getElementById("questionBox").innerHTML 
            = firstNumber + " + " + secondNumber + " = ??     Score: " 
            + gameScore;

    hinder.hinderX = W + ((Math.random() * (W / 2)));
    hinder.hinderY = 0;
    hinder.hinderWidth = W / 10;
    hinder.hinderHeight = H / 8;

    currentCorrect = 0;

    //Math Object
    mathObjects.forEach(function(mathObject) {
        mathObject.mathX = Math.random() * (W - 24) + 24;
        mathObject.mathY = Math.random() * (H - 24) + 24;
        mathObject.mathW = W / 40;
        mathObject.mathNumber = Math.round(Math.random() * 20);
    });
    mathObjects[0].mathNumber = firstNumber + secondNumber;
    mathObjects[1].mathNumber = firstNumber + secondNumber;
    mathObjects[2].mathNumber = firstNumber + secondNumber;
    mathObjects[3].mathNumber = firstNumber + secondNumber;
}

//animation loop, 60 fps
animationLoop = setInterval(draw, 16);