/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

currentWorld = 5;
//canvas init
iniBack('world5Canvas');

var roundingChar = createAnimatedSprite('assets/characters/roundingChar.png', 1800, 300, 300, 300, 6, 15);

if(currentMusic !== spaceMusic) {
    playMusic(spaceMusic);
}

if(currentStage >= 4 && worldKeys < 1) {
    playSound('assets/sound/gotKey.mp3');
    worldKeys = 5;
}

//snowflake particles
iniBackgroundEffects(5);

//Lets draw the flakes
function draw() {
    backCtx.clearRect(0, 0, W, H);
    drawSpriteImage(backCtx, roundingChar, 10, H / 3, W / 5, W / 4);
    updateBackgroundEffects(5);
    roundingChar.updateFrame();
}

//animation loop
animationLoop = setInterval(draw, 33);
