/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
currentWorld = 4;
if(worldProgression < 4) {
    worldProgression = 4;
}

if(currentStage < 13) {
    document.getElementById("level2").disabled = true;
}
if(currentStage < 14) {
    document.getElementById("level3").disabled = true;
}
if(currentStage < 15) {
    document.getElementById("level4").disabled = true;
}
if(currentStage < 16) {
    document.getElementById("World5Door").disabled = true;
}

updateCookies();

//canvas init
iniBack('world4Canvas');

var divisionCharacter = createAnimatedSprite('assets/characters/divisionCharSpr.png', 1200, 300, 300, 300, 22, 1);
var goldenKey = createAnimatedSprite('assets/goldenKey.png', 9600, 800, 800, 800, 23, 5);

playMusic(norwayMusic);

if(currentStage >= 16 && worldKeys < 4) {
    playSound('assets/sound/gotKey.mp3');
}

//snowflake particles
//iniBackgroundEffects(1);

//Lets draw the flakes
function draw() {
    backCtx.clearRect(0, 0, W, H);
    backCtx.drawImage(divisionCharacter.image, divisionCharacter.srcX, divisionCharacter.srcY, divisionCharacter.spriteWidth,
        divisionCharacter.spriteHeight, 10, H / 3, W / 5, W / 4);
    divisionCharacter.updateFrame();
    //updateBackgroundEffects(1);

    if(currentStage >= 16 && worldKeys < 4) {
        if(goldenKey.currentFrame === 22) {
            worldKeys = 4;
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