/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 */
 var candyPrice = randomNumber(10) + 1;
 var moneyOnHand = Math.floor(Math.random() * 90) + 30;


// variables for questions
var answer;
var totalSum = 0;

//canvas init

var canvas = document.getElementById("stageCanvas");
var ctx = canvas.getContext("2d");

var srcX;
var srcY;

playMusic(startMenuMusic);

var frameDelayerCounter = 0;
var frameDelayerValue = 10;

var sheetWidth = 1200;
var sheetHeight = 300;

var frameCount = 4;

var spriteWidth = 300;
var spriteHeight = 300;

var currentFrame = 0;

var plussCharacter = new Image();
plussCharacter.src = "assets/characters/plussCharSpr.png";

function updateFrame() {
    if (frameDelayerCounter > frameDelayerValue) {
        frameDelayerCounter = 0;
        currentFrame = ++currentFrame % frameCount;
        srcX = currentFrame * spriteWidth;
        srcY = 0;
    } else {
        frameDelayerCounter++;
    }
}

//canvas dimensions
var W = window.innerWidth;
var H = window.innerHeight;
canvas.width = W;
canvas.height = H;

//snowflake particles
var mp = 30; //max particles
var particles = [];
for (var i = 0; i < mp; i++)
{
    particles.push({
        x: Math.random() * W, //x-coordinate
        y: Math.random() * H, //y-coordinate
        r: Math.random() * 4 + 1, //radius
        d: Math.random() * mp //density
    });
}

//Lets draw the flakes
function draw()
{
    ctx.clearRect(0, 0, W, H);

    updateFrame();


    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    for (var i = 0; i < mp; i++)
    {
        var p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    update();
    ctx.drawImage(plussCharacter, srcX, srcY, spriteWidth, spriteHeight, 160, 150, spriteWidth, spriteHeight);
}

//Function to move the snowflakes
//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
var angle = 0;
function update()
{
    angle += 0.01;
    for (var i = 0; i < mp; i++)
    {
        var p = particles[i];
        //Updating X and Y coordinates
        //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        //Every particle has its own density which can be used to make the downward movement different for each flake
        //Lets make it more random by adding in the radius
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 2;

        //Sending flakes back from the top when it exits
        //Lets make it a bit more organic and let flakes enter from the left and right also.
        if (p.x > W + 5 || p.x < -5 || p.y > H)
        {
            if (i % 3 > 0) //66.67% of the flakes
            {
                particles[i] = {x: Math.random() * W, y: -10, r: p.r, d: p.d};
            } else
            {
                //If the flake is exitting from the right
                if (Math.sin(angle) > 0)
                {
                    //Enter from the left
                    particles[i] = {x: -5, y: Math.random() * H, r: p.r, d: p.d};
                } else
                {
                    //Enter from the right
                    particles[i] = {x: W + 5, y: Math.random() * H, r: p.r, d: p.d};
                }
            }
        }
    }
}

//animation loop
animationLoop = setInterval(draw, 33);
mathFourFinal();






//creates a random price for a candy
//and a random value of money you have on hand
//


//final level in world 1, for special assignement and timer function
function mathFourFinal() {
   
    var answer = Math.floor(moneyOnHand/candyPrice);
    var options = [answer, randomNumber(30), randomNumber(60), randomNumber(80)];
    shuffle(options);

    document.getElementById('question04').innerHTML = "If this candy is " + candyPrice + " cents and you have " + moneyOnHand + " cents, how many candies can you buy with the money you have?";
    var text = "<ul>";
    for (i = 0; i < options.length; i++) {
        if (options[i] === answer) {
            text += "<button onclick='victoryScreen()' style='height:50px;width:100px'>" + options[i] + "</button>"; // rett svar knapp
        } else {
            text += "<button onclick='sadnessScreen()' style='height:50px;width:100px'>" + options[i] + "</button>"; // feil svar knapp
        }
    }
    document.getElementById('qanswers').innerHTML = text;
}



    









//Lets user know they were correct, 
function victoryScreen() {


    document.getElementById('qanswers').innerHTML = "CORRECT!";


}

//lets user know they pressed wrong
function sadnessScreen() {

    document.getElementById('qanswers').innerHTML = "WRONG!";

}


//få random nummer 
//@param opp til nummer upToo
//@return random nummer
function randomNumber(upToo) {
    var randNumb = Math.floor(Math.random() * upToo);
    return randNumb;
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

    function clikedPic(clickedId) {
    
   var value = document.getElementById(clickedId);
   totalSum = candyPrice + totalSum;
   document.getElementById('total04').innerHTML = "Money spent: " + totalSum + " cents";
   }