/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

currentWorld = 6;
if(worldProgression < 6) {
    worldProgression = 6;
}

updateCookies();

//canvas init
iniBack('world6Canvas');

var plussChar = createAnimatedSprite('assets/characters/plussCharSpr.png', 1200, 300, 300, 300, 4, 30);
var minusChar = createAnimatedSprite('assets/characters/minusCharSpr.png', 8400, 300, 600, 300, 14, 2);
var multiplicationChar = createAnimatedSprite('assets/characters/MultiplicationCharSpr.png', 1800, 300, 300, 300, 6, 30);
var divisionChar = createAnimatedSprite('assets/characters/divisionCharSpr.png', 1200, 300, 300, 300, 22, 1);
var roundingChar = createAnimatedSprite('assets/characters/roundingChar.png', 1800, 300, 300, 300, 6, 15);
var erlikChar = createAnimatedSprite('assets/characters/ErlikStanding.png', 300, 5400, 300, 300, 18, 10);

if(currentMusic != finalBossMusic) {
    playMusic(finalBossMusic);
}

if(currentStage >= 24 && worldKeys < 6) {
    playSound('assets/sound/gotKey.mp3');
}

//snowflake particles
iniBackgroundEffects(1);

//Lets draw the flakes
function draw() {
    backCtx.clearRect(0, 0, W, H);
    drawSpriteImage(backCtx, plussChar, 10, H / 3, W / 5, W / 4);
    drawSpriteImage(backCtx, minusChar, 10 + 200, H / 3 - 10, W / 6, W / 5);
    drawSpriteImage(backCtx, multiplicationChar, 10 + 400, H / 3 - 20, W / 6, W / 5);
    drawSpriteImage(backCtx, divisionChar, 10 + 600, H / 3 - 30, W / 6, W / 5);
    drawSpriteImage(backCtx, roundingChar, 10 + 800, H / 3 - 40, W / 6, W / 5);
    drawSpriteImage(backCtx, erlikChar, W - (W / 3), H - (W  / 2), W / 3, W  / 2);
    plussChar.updateFrame();
    minusChar.updateFrame();
    multiplicationChar.updateFrame();
    divisionChar.updateFrame();
    roundingChar.updateFrame();
    erlikChar.updateFrame();
    updateBackgroundEffects(1);

    if(currentStage >= 24 && worldKeys < 6) {
        if(goldenKey.currentFrame === 22) {
            worldKeys = 6;
        } else {
            drawSpriteImage(backCtx, goldenKey, W/2-(W/4), H/2-(H/3), W/2, H/2);
            goldenKey.updateFrame();
        }
    }
}

//animation loop
animationLoop = setInterval(draw, 33);

document.getElementById("currentStageScore").innerHTML = "Level: " + currentStage;
document.getElementById("currentKeys").innerHTML = "Keys: " + worldKeys;
document.getElementById("currentCredits").innerHTML = "Credits: " + creditsMoney;
