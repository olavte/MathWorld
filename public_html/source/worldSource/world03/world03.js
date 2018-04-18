/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
currentWorld = 3;
if(worldProgression < 3) {
    worldProgression = 3;
}

if(currentStage < 9) {
    document.getElementById("level2").disabled = true;
}
if(currentStage < 10) {
    document.getElementById("level3").disabled = true;
}
if(currentStage < 11) {
    document.getElementById("level4").disabled = true;
}
if(currentStage < 12) {
    document.getElementById("World4Door").style.backgroundImage = "url('../public_html/assets/portalClosed.gif')";
} else {
    document.getElementById("World4Door").style.backgroundImage = "url('../public_html/assets/portalOpen.gif')";
    document.getElementById("World4Door").addEventListener("click", function () {
        goToNewScreen('source/worldSource/world04/world04.html', 'source/worldSource/world04/world04.js');
    });
}

updateCookies();

//canvas init
iniBack('world3Canvas');

var multiplicationCharacter = createAnimatedSprite('assets/characters/multiplicationCharSpr.png', 1200, 300, 300, 300, 4, 30);
var goldenKey = createAnimatedSprite('assets/goldenKey.png', 9600, 800, 800, 800, 23, 5);

playMusic(forestMusic);

if(currentStage >= 12 && worldKeys < 3) {
    playSound('assets/sound/gotKey.mp3');
}

//snowflake particles
iniBackgroundEffects(3);

//Lets draw the flakes
function draw() {
    backCtx.clearRect(0, 0, W, H);
    backCtx.drawImage(multiplicationCharacter.image, multiplicationCharacter.srcX, multiplicationCharacter.srcY, multiplicationCharacter.spriteWidth,
        multiplicationCharacter.spriteHeight, 10, H / 3, W / 5, W / 4);
    multiplicationCharacter.updateFrame();
    updateBackgroundEffects(3);

    if(currentStage >= 12 && worldKeys < 3) {
        if(goldenKey.currentFrame === 22) {
            worldKeys = 3;
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
