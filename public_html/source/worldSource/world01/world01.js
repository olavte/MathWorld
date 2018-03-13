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

playMusic(startMenuMusic);

//snowflake particles
var mp = 30; //max particles
var particles = [];
for (var i = 0; i < mp; i++) {
    particles.push({
        x: Math.random() * W, //x-coordinate
        y: Math.random() * H, //y-coordinate
        r: Math.random() * 4 + 1, //radius
        d: Math.random() * mp //density
    });
}

//Lets draw the flakes
function draw() {
    backCtx.clearRect(0, 0, W, H);
    backCtx.drawImage(plussCharacter.image, plussCharacter.srcX, plussCharacter.srcY, plussCharacter.spriteWidth,
        plussCharacter.spriteHeight, 10, H / 3, W / 5, W / 4);
    plussCharacter.updateFrame();


    backCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
    backCtx.beginPath();
    for (var i = 0; i < mp; i++) {
        var p = particles[i];
        backCtx.moveTo(p.x, p.y);
        backCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    backCtx.fill();
    update();
}

//Function to move the snowflakes
//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
var angle = 0;

function update() {
    angle += 0.01;
    for (var i = 0; i < mp; i++) {
        var p = particles[i];
        //Updating X and Y coordinates
        //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        //Every particle has its own density which can be used to make the downward movement different for each flake
        //Lets make it more random by adding in the radius
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 2;

        //Sending flakes back from the top when it exits
        //Lets make it a bit more organic and let flakes enter from the left and right also.
        if (p.x > W + 5 || p.x < -5 || p.y > H) {
            if (i % 3 > 0) //66.67% of the flakes
            {
                particles[i] = {x: Math.random() * W, y: -10, r: p.r, d: p.d};
            } else {
                //If the flake is exitting from the right
                if (Math.sin(angle) > 0) {
                    //Enter from the left
                    particles[i] = {x: -5, y: Math.random() * H, r: p.r, d: p.d};
                } else {
                    //Enter from the right
                    particles[i] = {x: W + 5, y: Math.random() * H, r: p.r, d: p.d};
                }
            }
        }
    }
}

//animation loop
animationLoop = setInterval(draw, 33);


//math JS testing atm
//legger sammen to random tall (opp til 100)
//skriver dynamisk matte spørsmål og knapper med 1 rett 2 feil svar
//i tilfelding rekkefølge

//saves the completed leves, no use atm
var completedLevel = [];
//saves the current level the user has clicked
var currentLevel;


//final level in world 1, for special assignement and timer function
function mathOneFinal() {

    //TODO
    alert("TODO");
}

function GetMath(clickedLevel) {
    var firstNumber = randomNumber(100);
    var secondNumber = randomNumber(100);
    var answer = firstNumber + secondNumber;
    var options1 = [answer, randomNumber(200), randomNumber(150)];
    var options2 = [answer, randomNumber(200), randomNumber(150), randomNumber(100)];
    var options3 = [answer, randomNumber(200), randomNumber(150), randomNumber(100), randomNumber(250), randomNumber(75)];

    var map = {
        'level1': options1,
        'level2': options2,
        'level3': options3
    };

    var picked = [];
    picked = map[clickedLevel].slice();

    shuffle(picked);

    document.getElementById('World1Question').innerHTML = "What is " + firstNumber + " + " + secondNumber + "?";
    var text = "<ul>";
    for (i = 0; i < picked.length; i++) {
        if (picked[i] === answer) {
            text += "<button onclick='victoryScreen()' style='height:50px;width:100px'>" + picked[i] + "</button>"; // rett svar knapp
        } else {
            text += "<button onclick='sadnessScreen()' style='height:50px;width:100px'>" + picked[i] + "</button>"; // feil svar knapp
        }
    }
    document.getElementById('answers').innerHTML = text;
}

//Lets user know they were correct, and unlocks next button. 
//if button 1 is completed twice, it does not unlock button 3
function victoryScreen() {
    if (document.getElementById('level2').disabled && completedLevel.indexOf(currentLevel) === -1) {

        document.getElementById('level2').disabled = false;
        completedLevel.push("currentLevel");


    } else if (document.getElementById('level3').disabled && completedLevel.indexOf(currentLevel) === -1 && currentLevel === "level2") {

        document.getElementById('level3').disabled = false;
        completedLevel.push("currentLevel");

    } else if (completedLevel.indexOf(currentLevel) === -1 && currentLevel === "level3") {

        completedLevel.push("currentLevel");

    }

    //unlock final button if 3 stages are complete, seperated so we can add more effects to it later
    if (completedLevel.length === 3) {

        document.getElementById('levelFinal').disabled = false;

    }

    document.getElementById('answers').innerHTML = "CORRECT!";


}

//lets user know they pressed wrong
function sadnessScreen() {

    document.getElementById('answers').innerHTML = "WRONG!";

}


//få random nummer
//@param opp til nummer upToo
//@return random nummer
function randomNumber(upToo) {
    var randNumb = Math.floor(Math.random() * upToo);
    return randNumb;
}

// When the user clicks the math button, open the math modal
//@param levelClicked saves the level/button number, so completing level 1 twice dont unlock level 3
function mathOne(clickedLevel) {
    currentLevel = clickedLevel;

    GetMath(clickedLevel);
    document.getElementById('MathModal').style.display = "block";
    document.getElementById('MathQuestion').style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function exitModal() {
    document.getElementById('MathModal').style.display = "none";
    document.getElementById('MathQuestion').style.display = "none";
}

//shuffle array (like answer array) (Modern Fisher–Yates shuffle algorithm via 
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}
