/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
currentWorld = 2;
function goToMenu(x) {
    x.classList.toggle("change");
}


//canvas init
iniBack('world2Canvas');

var minusCharacter = createAnimatedSprite('assets/characters/minusCharSpr.png', 8400, 300, 600, 300, 14, 2);

playMusic(startMenuMusic);

//snowflake particles
iniBackgroundEffects(1);

//Lets draw the flakes
function draw() {
    backCtx.clearRect(0, 0, W, H);
    drawSpriteImage(backCtx, minusCharacter, 10, H/3, W/4, W/6);
    minusCharacter.updateFrame();
    updateBackgroundEffects(1);
}

//animation loop
animationLoop = setInterval(draw, 33);
