/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
currentWorld = 4;

document.getElementById("currentStageScore").innerHTML = "Level: " + currentStage;
document.getElementById("currentKeys").innerHTML = "Keys: " + worldKeys;
document.getElementById("currentCredits").innerHTML = "Credits: " + creditsMoney;

updateCookies();

//canvas init
iniBack('world4Canvas');

var divisionCharacter = createAnimatedSprite('assets/characters/divisionCharSpr.png', 1200, 300, 300, 300, 22, 1);

playMusic(norwayMusic);

//snowflake particles
//iniBackgroundEffects(1);

//Lets draw the flakes
function draw() {
    backCtx.clearRect(0, 0, W, H);
    backCtx.drawImage(divisionCharacter.image, divisionCharacter.srcX, divisionCharacter.srcY, divisionCharacter.spriteWidth,
        divisionCharacter.spriteHeight, 10, H / 3, W / 5, W / 4);
    divisionCharacter.updateFrame();
    //updateBackgroundEffects(1);
}

//animation loop
animationLoop = setInterval(draw, 33);
