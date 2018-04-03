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

var number = 0;
var questionAnswer = 0;
var gameScore = 0;

//Hinder Object
var hinder = {
    hinderX: 0,
    hinderY: 0,
    hinderWidth: W / 2,
    hinderHeight: H * 2

};

//Math Objects
var mathObjects = [];
for (var i = 0; i < 4; i++) {
    mathObjects.push({
        name: "math" + (i + 1),
        mathX: W + ((Math.random() * (W / 2))),
        mathY: Math.random() * (H - 1) + 1,
        mathW: (Math.random() * W / 80) + 5,
        mathNumber: 0
    });
}

//PlayerVariables
var player = {
    playerX: W / 2,
    playerY: H - ((H / 8) * 2),
    playerHeight: H / 8,
    playerWidth: W / 10,
    playerPlacement: 1
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
    if (userInputX < W / 2) {
        player.playerPlacement = 0;
    } else if (userInputX > W / 2) {
        player.playerPlacement = 1;
    }
}


//Lets draw the flakes
function draw() {
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

        middleCtx.fillStyle = "rgba(0, 0, 0, 0.7)";
        middleCtx.beginPath();
        middleCtx.rect(0, 0, W, H);
        middleCtx.fill();

        if (player.playerPlacement === 1 && player.playerX < W * (2 / 3)) {
            player.playerX += 10;
        } else if (player.playerPlacement === 0 && player.playerX > W / 4) {
            player.playerX -= 10;
        }

        middleCtx.fillStyle = "rgba(255, 255, 255, 1)";
        middleCtx.beginPath();
        middleCtx.rect(player.playerX, player.playerY, player.playerWidth, player.playerHeight);
        middleCtx.fill();
        middleCtx.stroke();

        if (gameState === 1) {

            updateGame();

            if (gameScore <= 5) {
                frontCtx.fillStyle = "rgba(0, 0, 0, 1)";
                frontCtx.font = "50px Arial";
                frontCtx.fillText("1", W / 4, H / 2, W / 8);

                frontCtx.fillStyle = "rgba(0, 0, 0, 1)";
                frontCtx.font = "50px Arial";
                frontCtx.fillText("2", W * (3 / 4), H / 2, W / 8);

                if (questionAnswer === 1) {
                    middleCtx.fillStyle = "rgba(200,255,200,0.3)";
                    middleCtx.beginPath();
                    middleCtx.rect(0, 0, W / 2, H);
                    middleCtx.fill();

                    middleCtx.fillStyle = "rgba(255,200,200,0.3)";
                    middleCtx.beginPath();
                    middleCtx.rect(W / 2, 0, W / 2, H);
                    middleCtx.fill();
                } else {
                    middleCtx.fillStyle = "rgba(255,200,200,0.3)";
                    middleCtx.beginPath();
                    middleCtx.rect(0, 0, W / 2, H);
                    middleCtx.fill();

                    middleCtx.fillStyle = "rgba(200,255,200,0.3)";
                    middleCtx.beginPath();
                    middleCtx.rect(W / 2, 0, W / 2, H);
                    middleCtx.fill();
                }
            }

            middleCtx.fillStyle = "rgba(55, 50, 50, 1)";
            middleCtx.beginPath();
            middleCtx.rect(hinder.hinderX, hinder.hinderY, hinder.hinderWidth, hinder.hinderHeight);
            middleCtx.fill();

            mathObjects.forEach(function (mathObject) {
                middleCtx.fillStyle = "rgba(0, 0, 0, 1)";
                middleCtx.beginPath();
                middleCtx.arc(mathObject.mathX, mathObject.mathY, mathObject.mathW, 0, 2 * Math.PI);
                middleCtx.fill();
            });
        }
    }

    function drawFront() {
        drawSpriteImage(frontCtx, roundingChar, 0, 100, W / 4, H / 2);
        roundingChar.updateFrame();
    }
}

function updateGame() {

    if (gameScore === 20) {
        setWinGame();
    }

    if (checkCollision(player.playerX, player.playerY, player.playerWidth, player.playerHeight,
            hinder.hinderX, hinder.hinderY, hinder.hinderWidth, hinder.hinderHeight)) {
        setGameOver();
    }

    mathObjects.forEach(function (mathObject) {
        mathObject.mathY += (Math.random() * 5) + 25 + (gameScore * 4);
        if (mathObject.mathY > H) {
            mathObject.mathY = -(Math.random() * H);
            mathObject.mathX = Math.random() * W;
            mathObject.mathW = (Math.random() * W / 80) + 5;
        }
    });

    hinder.hinderY += 40 + (gameScore * 3);

    if (hinder.hinderY > H + hinder.hinderHeight) {

        gameScore++;
        number = Math.round((Math.random() + 1) * 10) / 10;
        questionAnswer = Math.round(number);

        document.getElementById("questionBox").innerHTML
            = number + " rounded is?... Score: "
            + gameScore;

        hinder.hinderY = -12000;
        if (questionAnswer === 1) {
            hinder.hinderX = W / 2;
        } else {
            hinder.hinderX = 0;
        }
    }
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
    if(currentStage < 20) {
        currentStage = 20;
    }
    document.getElementById('myModal').style.display = "block";
    document.getElementById("gameOverModalContent").style.display = "none";
    document.getElementById("startModalContent").style.display = "none";
    document.getElementById("winModalContent").style.display = "block";
}

function restartGame() {
    // Game variables
    //Hinder Object
    number = Math.round(Math.random()) / 10 + 1;
    questionAnswer = Math.round(number);
    gameScore = 0;

    document.getElementById("questionBox").innerHTML
        = number + " rounded is?... Score: "
        + gameScore;

    hinder.hinderX = W / 2;
    hinder.hinderY = -12000;

    //Math Object
    mathObjects.forEach(function (mathObject) {
        mathObject.mathY = -(Math.random() * H);
        mathObject.mathX = Math.random() * W;
        mathObject.mathW = (Math.random() * W / 80) + 5;
    });
}

//animation loop, 60 fps
animationLoop = setInterval(draw, 16);