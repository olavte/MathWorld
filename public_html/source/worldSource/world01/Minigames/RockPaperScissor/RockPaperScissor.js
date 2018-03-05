/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//canvas init

var backCanvas = document.getElementById("stageCanvas");
var backCtx = backCanvas.getContext("2d");

var middleCanvas = document.getElementById("middleCanvas");
var middleCtx = middleCanvas.getContext("2d");

//var frontCanvas = document.getElementById("frontCanvas");
//var frontCtx = frontCanvas.getContext("2d");


var srcX;
var srcY;

var frameDelayerCounter = 0;
var frameDelayerValue = 10;

var sheetWidth = 1200;
var sheetHeight = 300;

var frameCount = 4;

var spriteWidth = 300;
var spriteHeight = 300;

var currentFrame = 0;

//var plussCharacter = new Image();
//plussCharacter.src = "assets/characters/plussCharSpr.png";

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

var W = window.innerWidth;
var H = window.innerHeight;

backCanvas.width = W;
backCanvas.height = H;
middleCanvas.width = W;
middleCanvas.height = H;
//frontCanvas.width = W;
//frontCanvas.height = H;

//rectangles, placeholder for rock/paper/scissor figure
elemLeft = middleCanvas.offsetLeft;
elemTop = middleCanvas.offsetTop;
var elements = [];
elements.push({
    colour: 'red',
    width: 75,
    height: 75,
    top: H - 175,
    left: W/2 - 105
}, {
    colour: 'blue',
    width: 75,
    height: 75,
    top: H - 175,
    left: W/2
    }, {
    colour: 'green',
    width: 75,
    height: 75,
    top: H - 175,
    left: W/2 + 105
    });

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
    backCtx.clearRect(0, 0, W, H);
    middleCtx.clearRect(0, 0, W, H);
    //frontCtx.clearRect(0, 0, W, H);

    updateFrame();

    drawBack();
    drawMiddle();
    //drawFront();

    function drawBack() {
        backCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
        backCtx.beginPath();
        for (var i = 0; i < mp; i++)
        {
            var p = particles[i];
            backCtx.moveTo(p.x, p.y);
            backCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }
        backCtx.fill();
        updateBackground();
    }

    function drawMiddle() {
        middleCtx.fillStyle = "black";
        middleCtx.fillRect(0, 0, W, H);
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            middleCtx.fillStyle = el.colour;
            middleCtx.fillRect(el.left, el.top, el.width, el.height);
        }


    }

    /* function drawFront() {
        frontCtx.drawImage(plussCharacter, srcX, srcY, spriteWidth,
                spriteHeight, 0, 100, W / 4, H / 2);
    }*/
}

var angle = 0;
function updateBackground()
{
    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
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



// Add event listener for `click` events.
middleCanvas.addEventListener('click', function(event) {
    
    //scaling if canvas is resised from bitmap
    var rect = middleCanvas.getBoundingClientRect();
    var scaleX = middleCanvas.width / rect.width;
    var scaleY = middleCanvas.height / rect.height;
    
    //get mouse position
    var x = (event.clientX - rect.left) * scaleX,
        y = (event.clientY - rect.top) * scaleY;

    // Collision detection between clicked offset and element.
       for(i = 0; i < elements.length; i++){
        var element = elements[i];
        if (y > element.top && y < element.top + element.height 
            && x > element.left && x < element.left + element.width) {
            alert('clicked an element');
        }
    }


}, false);


//animation loop, 60 fps
animationLoop = setInterval(draw, 16);