/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
currentWorld = 2;
if(worldProgression < 2) {
    worldProgression = 2;
}

if(currentStage < 5) {
    document.getElementById("level2").disabled = true;
}
if(currentStage < 6) {
    document.getElementById("level3").disabled = true;
}
if(currentStage < 7) {
    document.getElementById("level4").disabled = true;
}
if(currentStage < 8) {
    document.getElementById("World3Door").disabled = true;
}

updateCookies();

//canvas init
iniBack('world2Canvas');

var minusCharacter = createAnimatedSprite('assets/characters/minusCharSpr.png', 8400, 300, 600, 300, 14, 2);
var goldenKey = createAnimatedSprite('assets/goldenKey.png', 9600, 800, 800, 800, 23, 5);

playMusic(parisMusic);

if(currentStage >= 8 && worldKeys < 2) {
    playSound('assets/sound/gotKey.mp3');
}

//snowflake particles
iniBackgroundEffects(1);

//Lets draw the flakes
function draw() {
    backCtx.clearRect(0, 0, W, H);
    drawSpriteImage(backCtx, minusCharacter, 10, H/3, W/4, W/6);
    minusCharacter.updateFrame();
    updateBackgroundEffects(1);

    if(currentStage >= 8 && worldKeys < 2) {
        if(goldenKey.currentFrame === 22) {
            worldKeys = 2;
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
