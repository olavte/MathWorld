/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

currentWorld = 5;

document.getElementById("currentStageScore").innerHTML = "Level: " + currentStage;
document.getElementById("currentKeys").innerHTML = "Keys: " + worldKeys;
document.getElementById("currentCredits").innerHTML = "Credits: " + creditsMoney;

//canvas init
iniBack('world5Canvas');

var roundingChar = createAnimatedSprite('assets/characters/roundingChar.png', 1800, 300, 300, 300, 6, 15);
var goldenKey = createAnimatedSprite('assets/goldenKey.png', 9600, 800, 800, 800, 23, 5);

if(currentMusic !== spaceMusic) {
    playMusic(spaceMusic);
}

if(currentStage >= 20 && worldKeys < 5) {
    playSound('assets/sound/gotKey.mp3');
}

//snowflake particles
iniBackgroundEffects(5);

//Lets draw the flakes
function draw() {
    backCtx.clearRect(0, 0, W, H);
    drawSpriteImage(backCtx, roundingChar, 10, H / 3, W / 5, W / 4);
    updateBackgroundEffects(5);
    roundingChar.updateFrame();

    if(currentStage >= 20 && worldKeys < 5) {
        drawSpriteImage(backCtx, goldenKey, W/2-(W/4), H/2-(H/3), W/2, H/2);
        goldenKey.updateFrame();
        if(goldenKey.currentFrame === 22) {
            worldKeys = 5;
        }
    }
}

//animation loop
animationLoop = setInterval(draw, 33);
