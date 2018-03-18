/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function goToMenu(x) {
    x.classList.toggle("change");
}


//canvas init
iniBack('world1Canvas');

var plussCharacter = createAnimatedSprite('assets/characters/plussCharSpr.png', 1200, 300, 300, 300, 4, 30);

playMusic(forestMusic);

//snowflake particles
iniBackgroundEffects(1);

//Lets draw the flakes
function draw() {
    backCtx.clearRect(0, 0, W, H);
    backCtx.drawImage(plussCharacter.image, plussCharacter.srcX, plussCharacter.srcY, plussCharacter.spriteWidth,
        plussCharacter.spriteHeight, 10, H / 3, W / 5, W / 4);
    plussCharacter.updateFrame();
    updateBackgroundEffects(1);
}

//animation loop
animationLoop = setInterval(draw, 33);
