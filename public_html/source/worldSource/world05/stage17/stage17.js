/* 
 */
//document.getElementById('myModal').style.display = "block";
//document.getElementById('stage2StartModalContent').style.display = "block";

//canvas init

iniBack("world5Canvas");

iniMiddle("middleCanvas");

iniFront("frontCanvas");

//Music
playMusic(rockMusic);
var roundingChar = createAnimatedSprite('assets/characters/roundingChar.png', 1800, 300, 300, 300, 6, 15);
var playerShip = new Image ();
playerShip.src = "assets/characters/playerShip.png";

var gameState = 0;
setBeforeGame();


iniBackgroundEffects(5);

// Game variables

var isAnswerFloor = true;
var gameScore = 0;

//Hinder Object
var enemyObjects = [];
for(var i = 0; i < 12; i++) {
    enemyObjects.push({
        enemyImage: null,
        name:"enemy" + (i + 1),
        enemyX:Math.random() * W,
        enemyY:Math.random() * H,
        enemyW:W/30,
        number:0,
    });
}

enemyObjects.forEach(function (enemy) {
    enemy.enemyImage = new Image ();
    enemy.enemyImage.src = "assets/characters/playerShip2.png";
});

var explosions = [];

//Math Objects
var maxAmmo = 25;
var currentAmmo = maxAmmo;
var reloadTimer = 0;
var pObjects = [];
for(var i = 0; i < maxAmmo; i++) {
    pObjects.push({
        name:"projectile" + (i + 1),
        pX:99999,
        pY:99999,
        pW:W/100,
        pSpdX:0,
        pSpdY:0,
        pFired:0
    });
}

//PlayerVariables
var player = {
    playerImage: playerShip,
    angle: 0,
    playerX: W / 2,
    playerY: H - (H/8),
    playerHeight: H / 8,
    playerWidth: W / 10,
    playerDestX: W/2,
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

    if(userInputY > (H - player.playerHeight)) {
        player.playerDestX = userInputX;
    } else {
        var playerDistanceX = userInputX - player.playerX - (player.playerWidth/2);;
        var playerDistanceY = userInputY - player.playerY;

        var rad = Math.atan2(playerDistanceY, playerDistanceX);

        player.angle = rad + (90 * Math.PI/180);
    }

    event.preventDefault();
}

window.addEventListener("touchmove", touchMove);
function touchMove(event) {
    userInputX = (event.touches[0].clientX - middleCanvas.offsetLeft) * 1.4;
    userInputY = (event.touches[0].clientY - middleCanvas.offsetTop) * 1.4;
}

window.addEventListener("touchstart", touchStart);
function touchStart() {
    playerShoot();
    if (timer === 0) {
        timer = setInterval(playerShoot, 200);
    }
}

window.addEventListener("touchend", touchEnd);
function touchEnd() {
    clearInterval(timer);
    timer = 0;
}

window.addEventListener("mousedown", mouseDown);
function mouseDown() {
    playerShoot();
    clearInterval(timer);
    if (timer === 0) {
        timer = setInterval(playerShoot, 200);
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


function playerShoot() {

    if(currentAmmo > 0) {
        pObjects[currentAmmo-1].pX = player.playerX + (player.playerWidth/2);
        pObjects[currentAmmo-1].pY = player.playerY;

        var playerDistanceX = userInputX - pObjects[currentAmmo-1].pX;
        var playerDistanceY = userInputY - pObjects[currentAmmo-1].pY;

        var rad = Math.atan2(playerDistanceY, playerDistanceX);

        player.angle = rad + (90 * Math.PI/180);

        var sinus = Math.sin(rad);
        var cosinus = Math.cos(rad);

        var speed = -25;

        pObjects[currentAmmo-1].pSpdX = cosinus * speed;
        pObjects[currentAmmo-1].pSpdY = sinus * speed;
        pObjects[currentAmmo-1].pFired = true;
        currentAmmo--;
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
        middleCtx.drawImage(player.playerImage, -(player.playerWidth/2), -(player.playerHeight/2), player.playerWidth, player.playerHeight);
        middleCtx.restore();

        if (gameState === 1) {

            updateGame();

            enemyObjects.forEach(function(enemy) {
                middleCtx.save();
                middleCtx.translate(enemy.enemyX + (enemy.enemyW/2), enemy.enemyY) + (enemy.enemyW/2);
                middleCtx.rotate(Math.PI);
                middleCtx.drawImage(enemy.enemyImage, -(enemy.enemyW/2), -(enemy.enemyW/2), enemy.enemyW, enemy.enemyW);
                middleCtx.restore();

                middleCtx.fillStyle = "rgba(255, 255, 255, 1)";
                middleCtx.font = "30px Arial";
                middleCtx.fillText(enemy.number, enemy.enemyX - (enemy.enemyW/2), enemy.enemyY + (enemy.enemyW/2));
            });

            pObjects.forEach(function(p) {
                middleCtx.fillStyle = "rgba(255, 0, 0, 1)";
                middleCtx.beginPath();
                middleCtx.arc(p.pX, p.pY, p.pW, 0, 2 * Math.PI);
                middleCtx.fill();
            });

            for(var i = 0; i <= explosions.length -1; i++) {
                drawSpriteImage(middleCtx, explosions[i].animation, explosions[i].x - ((W/20)/2), explosions[i].y - ((W/20)/2), W/15, W/15);
                explosions[i].animation.updateFrame();
                if(explosions[i].animation.currentFrame > 30) {
                    explosions.splice(i, 1);
                }
            }
        }
    }

    function drawFront() {
        drawSpriteImage(frontCtx, roundingChar, 0, 100, W/4, H/2);
        roundingChar.updateFrame();
        frontCtx.fillStyle = "rgba(255, 255, 255, 1)";
        frontCtx.font = "30px Arial";
        frontCtx.fillText(currentAmmo, W*(3/4), H*(3/4), W/8);
    }
}

function updateGame() {

    updatePlayerDestX();

    if (gameScore >= 50) {
        setWinGame();
    }

    if(timer === 0 && currentAmmo < maxAmmo) {
        if(reloadTimer >= 60) {
            currentAmmo++;
        } else {
            reloadTimer++;
        }
    } else {
        reloadTimer = 0;
    }

    if(player.playerDestX - 10 > player.playerX) {
        player.playerX += 5;
    } else if (player.playerDestX + 10 < player.playerX) {
        player.playerX += -5;
    }

    enemyObjects.forEach(function (enemy) {

        enemy.enemyY += 3;

        if(enemy.enemyY > H + enemy.enemyW) {
            if(isAnswerFloor) {
                if(Math.round(enemy.number) <= enemy.number) {
                    gameScore += 5;
                } else if (Math.round(enemy.number) > enemy.number) {
                    gameScore -= 5;
                }
                document.getElementById("questionBox").innerHTML = "skyt de tallene som må rundes opp! Score: " + gameScore;
            } else {
                if(Math.round(enemy.number) >= enemy.number) {
                    gameScore += 5;
                } else if (Math.round(enemy.number) < enemy.number) {
                    gameScore -= 5;
                }
                document.getElementById("questionBox").innerHTML = "skyt de tallene som må rundes ned! Score: " + gameScore;
            }
            enemy.enemyX = Math.random() * W;
            enemy.enemyY = -(Math.random() * H + H);
            enemy.number = Math.round (((Math.random() * 10) + 1) * 10) / 10;
        }
        if(checkCollision(player.playerX, player.playerY, player.playerWidth, player.playerHeight,
                enemy.enemyX, enemy.enemyY, enemy.enemyW, enemy.enemyW)) {
            if(isAnswerFloor) {
                if(Math.round(enemy.number) <= enemy.number) {
                    gameScore += 5;
                    enemy.enemyX = Math.random() * W;
                    enemy.enemyY = -(Math.random() * H + H);
                    enemy.number = Math.round (((Math.random() * 10) + 1) * 10) / 10
                } else if (Math.round(enemy.number) > enemy.number) {
                    setGameOver();
                }
                document.getElementById("questionBox").innerHTML = "skyt de tallene som må rundes opp! Score: " + gameScore;
            } else {
                if(Math.round(enemy.number) >= enemy.number) {
                    gameScore += 5;
                    enemy.enemyX = Math.random() * W;
                    enemy.enemyY = -(Math.random() * H + H);
                    enemy.number = Math.round (((Math.random() * 10) + 1) * 10) / 10
                } else if (Math.round(enemy.number) < enemy.number) {
                    setGameOver();
                }
                document.getElementById("questionBox").innerHTML = "skyt de tallene som må rundes ned!.. Score: " + gameScore;
            }

        }
    });

    pObjects.forEach(function(p) {

        p.pX -= p.pSpdX;
        p.pY -= p.pSpdY;

       enemyObjects.forEach(function (enemy) {
           if (checkCollision(p.pX, p.pY, p.pW, p.pW, enemy.enemyX, enemy.enemyY, enemy.enemyW + 100, enemy.enemyW + 100)) {
               var explosion = {
                        animation: createAnimatedSprite('assets/effects/expl.png', 2048, 64, 64, 64, 32, 2),
                        x: null,
                        y: null,
               };
               explosion.x = enemy.enemyX;
               explosion.y = enemy.enemyY;
               explosions.push(explosion);
               if(isAnswerFloor) {
                   if(Math.round(enemy.number) > enemy.number) {
                       enemy.enemyX = Math.random() * W;
                       enemy.enemyY = -(Math.random() * H + H);
                       enemy.number = Math.round (((Math.random() * 10) + 1) * 10) / 10
                       gameScore++;
                   } else if (Math.round(enemy.number) < enemy.number) {
                       gameScore--;
                       enemy.enemyX = Math.random() * W;
                       enemy.enemyY = -(Math.random() * H + H);
                       enemy.number = Math.round (((Math.random() * 10) + 1) * 10) / 10
                   }
                   document.getElementById("questionBox").innerHTML = "skyt de tallene som må rundes opp! Score: " + gameScore;
               } else {
                   if(Math.round(enemy.number) < enemy.number) {
                       enemy.enemyX = Math.random() * W;
                       enemy.enemyY = -(Math.random() * H + H);
                       enemy.number = Math.round (((Math.random() * 10) + 1) * 10) / 10
                       gameScore++;
                   } else if (Math.round(enemy.number) > enemy.number) {
                       gameScore--;
                       enemy.enemyX = Math.random() * W;
                       enemy.enemyY = -(Math.random() * H + H);
                       enemy.number = Math.round (((Math.random() * 10) + 1) * 10) / 10
                   }
                   document.getElementById("questionBox").innerHTML = "skyt de tallene som må rundes ned! Score: " + gameScore;
               }
           }
       });

       if(p.pFired === true) {
           if(p.pX > W || p.pX < 0 || p.pY > H || p.pY < 0) {
               p.pX = 9999;
               p.pY = 9999;
               p.pSpdX = 0;
               p.pSpdY = 0;
               p.pFired = false;
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
    if(currentStage < 17) {
        currentStage = 17;
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
        document.getElementById("questionBox").innerHTML = "skyt de tallene som må rundes opp! Score: " + gameScore;
    } else {
        document.getElementById("questionBox").innerHTML = "skyt de tallene som må rundes ned! Score: " + gameScore;
    }

    enemyObjects.forEach(function (enemy) {
        enemy.enemyX = Math.random() * W;
        enemy.enemyY = -(Math.random() * H + H);
        enemy.number = Math.round (((Math.random() * 10) + 1) * 10) / 10;
    });

    //Math Object
    pObjects.forEach(function(p) {
        p.pX = 9999;
        p.pY = 9999;
        p.pSpdX = 0;
        p.pSpdY = 0;
        p.pFired = false;
    });
    currentAmmo = 12;
}

//animation loop, 60 fps
animationLoop = setInterval(draw, 16);