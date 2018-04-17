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
if(currentStage < 4) {
} else {

}

updateCookies();


//canvas init
iniBack('world1Canvas');

var plussCharacter = createAnimatedSprite('assets/characters/plussCharSpr.png', 1200, 300, 300, 300, 4, 30);
var goldenKey = createAnimatedSprite('assets/goldenKey.png', 9600, 800, 800, 800, 23, 5);
if(currentMusic != candyMusic) {
    playMusic(candyMusic);
}

if(currentStage >= 4 && worldKeys < 1) {
    playSound('assets/sound/gotKey.mp3');
}

//snowflake particles
iniBackgroundEffects(1);

//Lets draw the flakes
function draw() {
    backCtx.clearRect(0, 0, W, H);
    backCtx.drawImage(plussCharacter.image, plussCharacter.srcX, plussCharacter.srcY, plussCharacter.spriteWidth,
        plussCharacter.spriteHeight, 10, H / 3, W / 5, W / 4);
    plussCharacter.updateFrame();
    updateBackgroundEffects(1);

    if(currentStage >= 4 && worldKeys < 1) {
        if(goldenKey.currentFrame === 22) {
            worldKeys = 1;
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
