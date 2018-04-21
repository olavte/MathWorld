/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

currentWorld = 6;
if(worldProgression < 6) {
    worldProgression = 6;
}

if(currentStage < 21) {
    document.getElementById("level2").disabled = true;
}
if(currentStage < 22) {
    document.getElementById("level3").disabled = true;
}
if(currentStage < 23) {
    document.getElementById("level4").disabled = true;
}

updateCookies();

//canvas init
iniBack('world5Canvas');

var roundingChar = {
    animation: createAnimatedSprite('assets/characters/roundingChar.png', 1800, 300, 300, 300, 6, 15),
    x: 10,
    y: H/3,
    w: W/5,
    h: W/4
};

var planetImage = new Image();
planetImage.src = "assets/world5/planetPic.png";

var planet = {
    animation: planetImage,
    x: W + (W * (10/100)) - (W * (40/100)),
    y: H + (H * (10/100)) - (W * (40/100)),
    w: W * (40/100),
    h: W * (40/100)
};

var goldenKey = createAnimatedSprite('assets/goldenKey.png', 9600, 800, 800, 800, 23, 5);

var portalDoor = {
    animation: null,
    w: W/10,
    h: H/4,
    x: W - (W/10) + 10,
    y: H - (H/4) * 1.8
};

if(worldKeys < 5) {
    portalDoor.animation = createAnimatedSprite('assets/portalClosed.png', 5100, 600, 300, 600, 17, 5);
} else {
    portalDoor.animation = createAnimatedSprite('assets/portalOpen.png', 5100, 600, 300, 600, 17, 5);
}

if(currentMusic !== spaceMusic) {
    playMusic(spaceMusic);
}

if(currentStage >= 20 && worldKeys < 5) {
    playSound('assets/sound/gotKey.mp3');
}

//snowflake particles
iniBackgroundEffects(5);

var userInputX = 0;
var userInputY = 0;

// Player Controll
var timer = 0;
userInputGame = true;

window.addEventListener("mousemove", mouseMove);
function mouseMove(event) {
    userInputX = (event.x - backCanvas.offsetLeft);
    userInputY = (event.y - backCanvas.offsetTop);
}

window.addEventListener("touchmove", touchMove);
function touchMove(event) {
    userInputX = (event.touches[0].clientX - backCanvas.offsetLeft);
    userInputY = (event.touches[0].clientY - backCanvas.offsetTop);
    event.preventDefault();
}

window.addEventListener("touchstart", touchStart);
function touchStart(event) {
    userInputX = (event.touches[0].clientX - backCanvas.offsetLeft);
    userInputY = (event.touches[0].clientY - backCanvas.offsetTop);
    clickedScreen();
}

window.addEventListener("touchend", touchEnd);
function touchEnd() {

}

window.addEventListener("mousedown", mouseDown);
function mouseDown(event) {
    userInputX = (event.x - backCanvas.offsetLeft);
    userInputY = (event.y - backCanvas.offsetTop);
    clickedScreen();
}

window.addEventListener("mouseup", mouseUp);
function mouseUp() {
}

//Lets draw the flakes
function draw() {
    backCtx.clearRect(0, 0, W, H);

    updateBackgroundEffects(5);

    backCtx.drawImage(planet.animation, planet.x, planet.y, planet.w, planet.h);

    drawSpriteImage(backCtx, roundingChar.animation, roundingChar.x, roundingChar.y, roundingChar.w, roundingChar.h);
    roundingChar.animation.updateFrame();

    drawSpriteImage(backCtx, portalDoor.animation, portalDoor.x, portalDoor.y, portalDoor.w, portalDoor.h);
    portalDoor.animation.updateFrame();

    if(currentStage >= 20 && worldKeys < 5) {
        if(goldenKey.currentFrame === 22) {
            worldKeys = 5;
            document.getElementById("currentKeys").innerHTML = "Keys: " + worldKeys;
            portalDoor.animation = createAnimatedSprite('assets/portalOpen.png', 5100, 600, 300, 600, 17, 5);
        } else {
            drawSpriteImage(backCtx, goldenKey, W/2-(W/4), H/2-(H/3), W/2, H/2);
            goldenKey.updateFrame();
        }
    }
}

function clickedScreen() {
    if(checkCollision(userInputX, userInputY, 10, 10, portalDoor.x, portalDoor.y, portalDoor.w, portalDoor.h)) {
        if(worldKeys >= 5) {
            goToNewScreen('source/worldSource/world06/world06.html', 'source/worldSource/world06/world06.js');
        }
    }
}

updateCookies();

//animation loop
animationLoop = setInterval(draw, 33);

document.getElementById("currentStageScore").innerHTML = "Level: " + currentStage;
document.getElementById("currentKeys").innerHTML = "Keys: " + worldKeys;
document.getElementById("currentCredits").innerHTML = "Credits: " + creditsMoney;
