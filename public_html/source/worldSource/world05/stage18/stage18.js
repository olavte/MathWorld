/* 
 */
//document.getElementById('myModal').style.display = "block";
//document.getElementById('stage2StartModalContent').style.display = "block";

//canvas init

iniBack("world5Canvas");

iniMiddle("middleCanvas");

iniFront("frontCanvas");

//Music
playMusic(heartbeatMusic);
currentMusic.volume = musicVolume * globalVolume * 0.2;
var roundingChar = createAnimatedSprite('assets/characters/roundingChar.png', 1800, 300, 300, 300, 6, 15);
var playerShip = new Image ();
playerShip.src = "assets/characters/playerShip.png";

var enemyShip = new Image ();
enemyShip.src = "assets/characters/playerShip2.png";

var gameState = 0;
setBeforeGame();


iniBackgroundEffects(5);

// Game variables

var isAnswerFloor = true;
var gameScore = 10;
var currentCorrect = 0;

//Hinder Object
var hinder = {
    image: enemyShip,
    angle: 0,
    hinderX: W + ((Math.random() * (W / 2))),
    hinderY: 0,
    hinderWidth: W / 2,
    hinderHeight: H * (2/3),
    hinderGoalX: Math.random() * W,
    hinderGoalY: Math.random() * H,
    spd: 3 + (gameScore/6)
};

//Math Objects
var mathObjects = [];
for(var i = 0; i < 15; i++) {
    mathObjects.push({
        name:"math" + (i + 1),
        mathX:Math.random() * W,
        mathY:Math.random() * H,
        mathW:Math.random() * W / 60 + W/40,
        mathNumber:0});
}

//PlayerVariables
var player = {
    image: playerShip,
    angle: 0,
    playerX: W / 2,
    playerY: H - (H/8),
    playerHeight: H / 12,
    playerWidth: W / 14
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
    clearInterval(timer);
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

function updatePlayerDestX() {
    var playerDistanceX = userInputX - player.playerX - (player.playerWidth/2);;
    var playerDistanceY = userInputY - player.playerY;

    var rad = Math.atan2(playerDistanceY, playerDistanceX);

    player.angle = rad + (90 * Math.PI/180);
}

function updateEnemyAngle() {
    var hinderDistanceX = hinder.hinderGoalX - hinder.hinderX - (hinder.hinderWidth/2);
    var hinderDistanceY = hinder.hinderGoalY - hinder.hinderY;

    var rad = Math.atan2(hinderDistanceY, hinderDistanceX);

    hinder.angle = rad + (90 * Math.PI/180);
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
        updateBackgroundEffects(5);
    }

    function drawMiddle() {

        middleCtx.fillStyle = "rgba(0, 0, 0, 0.8)";
        middleCtx.beginPath();
        middleCtx.rect(0, 0, W, H);
        middleCtx.fill();

        middleCtx.save();
        middleCtx.translate(player.playerX + (player.playerWidth/2), player.playerY + (player.playerHeight/2));
        middleCtx.rotate(player.angle);
        middleCtx.drawImage(player.image, -(player.playerWidth/2), -(player.playerHeight/2), player.playerWidth, player.playerHeight);
        middleCtx.restore();

        if (gameState === 1) {

            updateGame();

            middleCtx.save();
            middleCtx.translate(hinder.hinderX + (hinder.hinderWidth/2), hinder.hinderY + (hinder.hinderHeight/2));
            middleCtx.rotate(hinder.angle);
            middleCtx.drawImage(hinder.image, -(hinder.hinderWidth/2), -(hinder.hinderHeight/2), hinder.hinderWidth, hinder.hinderHeight);
            middleCtx.restore();

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

    updatePlayerDestX();
    updateEnemyAngle();

    if (gameScore >= 25) {
        setWinGame();
    } else if (gameScore < 0) {
        setGameOver();
    }

    if(currentCorrect === 4) {
        restartGame();
    }

    if(checkCollision(player.playerX, player.playerY, player.playerWidth, player.playerHeight,
            hinder.hinderX, hinder.hinderY, hinder.hinderWidth - 10, hinder.hinderHeight - 10)) {
        setGameOver();
    }

    if(checkCollision(player.playerX - 250, player.playerY - 250, player.playerWidth + 500, player.playerHeight + 500,
            hinder.hinderX, hinder.hinderY, hinder.hinderWidth, hinder.hinderHeight)) {
        currentMusic.volume = musicVolume * globalVolume * 1;
    } else {
        currentMusic.volume = musicVolume * globalVolume * 0.2;
    }

    if(hinder.hinderX > hinder.hinderGoalX - 100 && hinder.hinderX < hinder.hinderGoalX + 100
        && hinder.hinderY > hinder.hinderGoalY - 100 && hinder.hinderY < hinder.hinderGoalY + 100) {
        hinder.hinderGoalX = Math.random() * W;
        hinder.hinderGoalY = Math.random() * H;
        updateEnemyAngle();
    }

    if(hinder.hinderY < hinder.hinderGoalY - 100) {
        hinder.hinderY += hinder.spd;
    } else if (hinder.hinderY > hinder.hinderGoalY + 100) {
        hinder.hinderY -= hinder.spd;
    }

    if(hinder.hinderX < hinder.hinderGoalX - 100) {
        hinder.hinderX += hinder.spd;
    } else if (hinder.hinderX > hinder.hinderGoalX + 100) {
        hinder.hinderX -= hinder.spd;
    }

    mathObjects.forEach(function(mathObject) {
       if(checkCollision(player.playerX, player.playerY, player.playerWidth, player.playerHeight,
               mathObject.mathX, mathObject.mathY, mathObject.mathW, mathObject.mathW)) {
           if(isAnswerFloor) {
               if (mathObject.mathNumber > Math.round(mathObject.mathNumber)
                   || mathObject.mathNumber === Math.round(mathObject.mathNumber)) {
                   gameScore += 2;
                   mathObject.mathX = 99999;
                   currentCorrect++;
                   if(isAnswerFloor) {
                       document.getElementById("questionBox").innerHTML = "Round DOWN! Score: " + gameScore;
                   } else {
                       document.getElementById("questionBox").innerHTML = "Round UP! Score: " + gameScore;
                   }
               } else {
                   gameScore--;
                   currentCorrect++;
                   mathObject.mathX = 99999;
                   if(isAnswerFloor) {
                       document.getElementById("questionBox").innerHTML = "Round DOWN! Score: " + gameScore;
                   } else {
                       document.getElementById("questionBox").innerHTML = "Round UP! Score: " + gameScore;
                   }
               }
           } else {
               if (mathObject.mathNumber < Math.round(mathObject.mathNumber)
                   || mathObject.mathNumber === Math.round(mathObject.mathNumber)) {
                   gameScore += 2;
                   mathObject.mathX = 99999;
                   currentCorrect++;
                   if(isAnswerFloor) {
                       document.getElementById("questionBox").innerHTML = "Round DOWN! Score: " + gameScore;
                   } else {
                       document.getElementById("questionBox").innerHTML = "Round UP! Score: " + gameScore;
                   }
               } else {
                   gameScore--;
                   currentCorrect++;
                   mathObject.mathX = 99999;
                   if(isAnswerFloor) {
                       document.getElementById("questionBox").innerHTML = "Round DOWN! Score: " + gameScore;
                   } else {
                       document.getElementById("questionBox").innerHTML = "Round UP! Score: " + gameScore;
                   }
               }
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
    if(currentStage < 18) {
        currentStage = 18;
    }
    creditsMoney += 50;
    document.getElementById('myModal').style.display = "block";
    document.getElementById("gameOverModalContent").style.display = "none";
    document.getElementById("startModalContent").style.display = "none";
    document.getElementById("winModalContent").style.display = "block";
}

function restartGame() {
    // Game variables
    //Hinder Object

    if(isAnswerFloor) {
        document.getElementById("questionBox").innerHTML = "Round DOWN! Score: " + gameScore;
    } else {
        document.getElementById("questionBox").innerHTML = "Round UP! Score: " + gameScore;
    }

    hinder.hinderX = W + ((Math.random() * (W / 2)));
    hinder.hinderY = 0;
    hinder.hinderWidth = W / 5;
    hinder.hinderHeight = H / 3;

    currentCorrect = 0;

    //Math Object
    mathObjects.forEach(function(mathObject) {
        mathObject.mathX = Math.random() * (W - 24) + 24;
        mathObject.mathY = Math.random() * (H - 24) + 24;
        mathObject.mathW = Math.random() * W / 60 + W/40;
        mathObject.mathNumber = Math.round (((Math.random() * 10) + 1) * 10) / 10;
    });
}

//animation loop, 60 fps
animationLoop = setInterval(draw, 16);