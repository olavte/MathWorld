/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

currentWorld = 1;
if(worldProgression < 1) {
    worldProgression = 1;
}

if(currentStage < 1) {
    document.getElementById("level2").disabled = true;
}
if(currentStage < 2) {
    document.getElementById("level3").disabled = true;
}
if(currentStage < 3) {
    document.getElementById("level4").disabled = true;
}

updateCookies();


//canvas init
iniBack('world1Canvas');

var plussCharacter = {
    animation: createAnimatedSprite('assets/characters/plussCharSpr.png', 1200, 300, 300, 300, 4, 30),
    x: 10,
    y: H / 3,
    w: W / 5,
    h: W / 4
};
var goldenKey = createAnimatedSprite('assets/goldenKey.png', 9600, 800, 800, 800, 23, 5);
var portalDoor = {
    animation: null,
    w: W/10,
    h: H/4,
    x: W - (W/10) + 10,
    y: H - (H/4) * 1.8
};

if(worldKeys < 1) {
    portalDoor.animation = createAnimatedSprite('assets/portalClosed.png', 5100, 600, 300, 600, 17, 5);
} else {
    portalDoor.animation = createAnimatedSprite('assets/portalOpen.png', 5100, 600, 300, 600, 17, 5);
}



if(currentMusic != candyMusic) {
    playMusic(candyMusic);
}

if(currentStage >= 4 && worldKeys < 1) {
    playSound('assets/sound/gotKey.mp3');
}

//snowflake particles
iniBackgroundEffects(1);

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
    drawSpriteImage(backCtx, plussCharacter.animation, plussCharacter.x, plussCharacter.y, plussCharacter.w, plussCharacter.h);
    plussCharacter.animation.updateFrame();

    drawSpriteImage(backCtx, portalDoor.animation, portalDoor.x, portalDoor.y, portalDoor.w, portalDoor.h);
    portalDoor.animation.updateFrame();

    updateBackgroundEffects(1);

    if(currentStage >= 4 && worldKeys < 1) {
        if(goldenKey.currentFrame === 22) {
            worldKeys = 1;
            document.getElementById("currentKeys").innerHTML = "Keys: " + worldKeys;
            portalDoor.animation = createAnimatedSprite('assets/portalOpen.png', 5100, 600, 300, 600, 17, 5);
        } else {
            drawSpriteImage(backCtx, goldenKey, W/2-(W/4), H/2-(H/3), W/2, H/2);
            goldenKey.updateFrame();
        }
    }
}

function clickedScreen() {
    if(checkCollision(userInputX - 5, userInputY - 5, 10, 10, portalDoor.x, portalDoor.y, portalDoor.w, portalDoor.h)) {
        if(worldKeys >= 1) {
            goToNewScreen('source/worldSource/world02/world02.html', 'source/worldSource/world02/world02.js');
        }
    }
}

//animation loop
animationLoop = setInterval(draw, 33);

document.getElementById("currentStageScore").innerHTML = "Level: " + currentStage;
document.getElementById("currentKeys").innerHTML = "Keys: " + worldKeys;
document.getElementById("currentCredits").innerHTML = "Credits: " + creditsMoney;
