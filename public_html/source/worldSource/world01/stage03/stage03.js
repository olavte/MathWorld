/* 
 */



// variables for questions
var answer = selectWord();
var mathAnswers = [];

//canvas init

var canvas = document.getElementById("stageCanvas");
var ctx = canvas.getContext("2d");

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
question1();




//functions for math and questions below


function victoryScreen() {
    document.getElementById('questionText').innerHTML = "<p>Correct!</p>";
    document.getElementById('questionPicture').innerHTML = "<button onclick='question2()'>Next question!</button>";

}

//lets user know they pressed wrong
function loseScreen() {

    document.getElementById('questionText').innerHTML = "<p>WRONG!</p><p>Try again:</p>";

}



//få random nummer 
//@param opp til nummer upToo
//@return random nummer
function randomNumber(upTo) {
    var randNumb = Math.floor(Math.random() * upTo);
    return randNumb;
}

//Selects a random word within the words array and returns it.
function selectWord() {    
    var words = ["apple", "ice", "orange", "car", "computer", 
                 "game", "math", "school", "juice", "soda", 
                 "carrot", "purple", "movie", "superhero"];
    var randNumb = randomNumber(words.length);
    return words[randNumb];
}

function guessWord() {
    var guess = document.getElementById("guessField").value;
    
    if (guess.toLowerCase() === answer) {
        victoryScreen();
    } else {
        loseScreen();
    } 
}

function checkAnswer(index) {
    var guess = document.getElementById('questionField' + index).value;
    if (guess === mathAnswers[index]){
        victoryScreen();
    }
} 

//builds and executes first question
function question1() {
    var generated = false;
    var letterArray = answer.split;
    
    document.getElementById('stageTitle').innerHTML = "Guess The Word!";
    document.getElementById('questionText').innerHTML = "<p>The word is " + answer + ".</p><p>Enter your guess below!</p>";
    document.getElementById('answerOptions').innerHTML = "Solve the math questions to reveal letters:";
    document.getElementById('answer').innerHTML = "Word: ";

    
    while (generated === false) {
        for (i = 0; i < answer.length; i++) {
            var firstNumber = randomNumber(50);
            var secondNumber = randomNumber(50);
            var ans = firstNumber + secondNumber;
            mathAnswers.push(ans);
            
            var div = document.createElement('div');
            var newClass = 'question' + i;
            div.className = newClass;
            div.innerHTML = '<p>#' + (i+1) + ': ' + firstNumber + ' + ' + secondNumber + ' = <input type="text" name="guess" id="questionField' + i + '"><button id="button' + i + '" onclick="checkAnswer(' + i + ')">Check Answer</button></p>';
            document.getElementById('answerOptions').appendChild(div);
        }
        generated = true;
    }   
}


function question2() {
    document.getElementById('stageTitle').innerHTML = "TODO";
    document.getElementById('questionText').innerHTML ="TODO";
    document.getElementById('answerOptions').innerHTML ="TODO";
}
