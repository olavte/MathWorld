/* 
 */

//canvas init

iniBack();

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


/*
 * Math part
 * 
 */

// variables for questions
var answer;
var totalSum;

//run question1
question1();
//variable to save current question progress
var currentQuestion = 1;


//functions for math and questions below
function backToWorld() {
    goToNewScreen('source/worldSource/world01/world01.html', 'source/worldSource/world01/world01.js');
}

function victoryScreen() {
    currentQuestion++;
    var questionToLoad;
    if(currentQuestion === 2){
        questionToLoad = question2();
    } else if(currentQuestion === 3) {
        questionToLoad = question3();
    } else if(currentQuestion === 4) {
        questionToLoad = backToWorld();
    }

}

//lets user know they pressed wrong
function sadnessScreen() {
    var text = "<p>Wrong</p>";
   document.getElementById('questionText').innerHTML = text;
   

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

function question1() {
    question(75);
}
function question2() {
    question(100);
}
function question3() {
    question(150);
}

//builds and executes first question
//@param the max size of numbers used
function question(dificulty) {
    totalSum = 0; //resets total sum every time question is loaded
    var firstNumber = randomNumber(dificulty);
    var secondNumber = randomNumber(dificulty);
    var thirdNumber = randomNumber(dificulty);
    answer = firstNumber + secondNumber + thirdNumber;
    
    document.getElementById('stageTitle').innerHTML = "Total:" + totalSum;
    document.getElementById('questionText').innerHTML ="This icecream is " + answer + " grams, wich of these icecream balls must you pick to get the same weight?";
   
   
    document.getElementById('questionPicture').innerHTML = "<img src='assets/world1/world1ice.png' class = '.centered' style = 'height: 200px;'>";
    
    
    
    var options = [firstNumber, secondNumber, thirdNumber, randomNumber(dificulty - 50), randomNumber(dificulty - 25)];
    shuffle(options);
    
    //add option text over pictures
    for(i = 0; i < options.length; i++) {
        var thisOption = document.getElementById('option' + i);
        //clears previous question nodes
        if(thisOption.value !== null) {
            thisOption.removeChild(thisOption.lastChild);
        }
        thisOption.appendChild(document.createTextNode(options[i]));
        thisOption.value = options[i];
    }
    
    if(totalSum === answer){
        victoryScreen();
    } else if(totalSum > answer) {
        sadnessScreen();
    }
    
}

//what happends when imagine is clicked
//@param ID of clicked element

function clikedPic(clickedId) {
    
   var value = document.getElementById(clickedId).value;
   totalSum = totalSum + value;
   document.getElementById('stageTitle').innerHTML = "Total:" + totalSum;
   
    if(totalSum === answer){
        victoryScreen();
    } else if(totalSum > answer) {
        sadnessScreen();
    }
}

function reload() {
    goToNewScreen('source/worldSource/world01/stage01/stage01.html', 'source/worldSource/world01/stage01/stage01.js');
}

