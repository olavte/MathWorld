/* 
 */
//document.getElementById('myModal').style.display = "block";
//document.getElementById('stage2StartModalContent').style.display = "block";

//canvas init

iniBack("world1Canvas");

iniMiddle("middleCanvas");

iniFront("frontCanvas");

//Music
playMusic(rockMusic);
var plussCharacter = createAnimatedSprite('assets/characters/plussCharSpr.png', 1200, 300, 300, 300, 4, 30);
var marshChar = createAnimatedSprite('assets/characters/marshmellowsSheet.png', 512, 128, 128, 128, 4, 15);

var gameState = 0;
setBeforeGame();


iniBackgroundEffects(1);

// Game variables

var firstNumber = 0;
var secondNumber = 0;
var questionAnswer = 0;
var gameSpeed = 5;

//Hinder Object
var hinder = {
    hinderX: W + ((Math.random() * (W / 2))),
    hinderY: 0,
    hinderWidth: W / 10,
    hinderHeight: H / 8

};

//Math Objects
var mathObjects = [];
for(var i = 0; i < 4; i++) {
    mathObjects.push({
        name:"math" + (i + 1),
        mathX:W + ((Math.random() * (W / 2))),
        mathY:Math.random() * (H - 1) + 1,
        mathW:W/40,
        mathNumber:0});
}

//PlayerVariables
var player = {
    playerX: W / 12,
    playerY: H / 2,
    playerHeight: H / 8,
    playerWidth: W / 10
};

var userInputX = 0;
var userInputY = 0;

// Player Controll
var timer = 0;
userInputGame = true;

window.addEventListener("mousemove", mouseMove);
function mouseMove(event) {
    userInputX = (event.x - middleCanvas.offsetLeft) * 1.4;
    userInputY = (event.y - middleCanvas.offsetTop) * 1.4;
    event.preventDefault();
}

window.addEventListener("touchmove", touchMove);
function touchMove(event) {
    userInputX = (event.touches[0].clientX - middleCanvas.offsetLeft) * 1.4;
    userInputY = (event.touches[0].clientY - middleCanvas.offsetTop) * 1.4;
}

window.addEventListener("touchstart", touchStart);
function touchStart() {
    movePlayer();
    if (timer === 0) {
        timer = setInterval(movePlayer, 20);
    }
}

window.addEventListener("touchend", touchEnd);
function touchEnd() {
    clearInterval(timer);
    timer = 0;
}

window.addEventListener("mousedown", mouseDown);
function mouseDown() {
    movePlayer();
    clearInterval(timer);
    if (timer === 0) {
        timer = setInterval(movePlayer, 20);
    }
}

window.addEventListener("mouseup", mouseUp);
function mouseUp() {
    clearInterval(timer);
    timer = 0;
}

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
        updateBackgroundEffects(1);
    }

    function drawMiddle() {

        middleCtx.fillStyle = "rgba(115, 77, 44, 1)";
        middleCtx.beginPath();
        middleCtx.rect(0, 0, W, H);
        middleCtx.fill();

        drawSpriteImage(middleCtx, marshChar, player.playerX, player.playerY, player.playerWidth, player.playerHeight);
        marshChar.updateFrame();

        if (gameState === 1) {

            updateGame();

            middleCtx.fillStyle = "rgba(0, 0, 0, 1)";
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
        frontCtx.drawImage(plussCharacter.image, plussCharacter.srcX, plussCharacter.srcY, plussCharacter.spriteWidth,
                plussCharacter.spriteHeight, 0, 100, W / 4, H / 2);
        plussCharacter.updateFrame();

    }
}

function updateGame() {

    if (gameSpeed === 10) {
        setWinGame();
    } else if (gameSpeed === 0) {
        setGameOver();
    }

    if(checkCollision(player.playerX, player.playerY, player.playerWidth - 16, player.playerHeight - 16,
            hinder.hinderX, hinder.hinderY, hinder.hinderWidth, hinder.hinderHeight)) {
        setGameOver();
    }

    hinder.hinderX -= gameSpeed + 1;
    if (hinder.hinderX < -hinder.hinderWidth) {
        hinder.hinderX = W + ((Math.random() * (W / 2)));
        hinder.hinderY = (Math.random() * (H - 1)) + 1;
    }

    mathObjects.forEach(function(mathObject) {
       if(checkCollision(player.playerX, player.playerY, player.playerWidth - 16, player.playerHeight - 16,
               mathObject.mathX, mathObject.mathY, mathObject.mathW, mathObject.mathW)) {
           if (mathObject.mathNumber === questionAnswer) {
               gameSpeed++;
               restartGame();
           } else {
               gameSpeed--;
               restartGame();
           }
       }
       mathObject.mathX -= gameSpeed;
        if (mathObject.mathX < -mathObject.mathW) {
            mathObject.mathX = W + ((Math.random() * (W / 2)));
            mathObject.mathY = (Math.random() * (H - 1)) + 1;
        }
    });
}

function setGameOver() {
    gameState = 0;
    playSound('assets/sound/lostGame.mp3');
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
    document.getElementById('myModal').style.display = "block";
    document.getElementById("gameOverModalContent").style.display = "none";
    document.getElementById("startModalContent").style.display = "block";
    document.getElementById("winModalContent").style.display = "none";
}

function setWinGame() {
    gameState = 0;
    if(currentStage < 4) {
        currentStage = 4;
    }
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
            + gameSpeed;

    hinder.hinderX = W + ((Math.random() * (W / 2)));
    hinder.hinderY = 0;
    hinder.hinderWidth = W / 10;
    hinder.hinderHeight = H / 8;

    //Math Object
    mathObjects.forEach(function(mathObject) {
        mathObject.mathX = W + ((Math.random() * (W / 2)));
        mathObject.mathY = Math.random() * (H - 1) + 1;
        mathObject.mathW = W / 40;
        mathObject.mathNumber = Math.round(Math.random() * 20);
    });
    mathObjects[0].mathNumber = firstNumber + secondNumber;
}

//animation loop, 60 fps
animationLoop = setInterval(draw, 16);