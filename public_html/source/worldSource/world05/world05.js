/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function goToMenu(x) {
    x.classList.toggle("change");
}


//canvas init
iniBack('world5Canvas');

var plussCharacter = createAnimatedSprite('assets/characters/roundingChar.png', 1800, 300, 300, 300, 6, 15);

playMusic(startMenuMusic);

//snowflake particles
iniBackgroundEffects(5);

//Lets draw the flakes
function draw() {
    backCtx.clearRect(0, 0, W, H);
    backCtx.drawImage(plussCharacter.image, plussCharacter.srcX, plussCharacter.srcY, plussCharacter.spriteWidth,
        plussCharacter.spriteHeight, 10, H / 3, W / 5, W / 4);
    plussCharacter.updateFrame();
    updateBackgroundEffects(5);
}

//animation loop
animationLoop = setInterval(draw, 33);
