/* 
 */



// variables for questions
var answer = selectWord();
var letterArray = answer.split("");
var mathAnswers = [];

//canvas init
iniBack("world1Canvas")

var plussCharacter = createAnimatedSprite('assets/characters/plussCharSpr.png', 1200, 300, 300, 300, 4, 30);

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

    plussCharacter.updateFrame();


    backCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
    backCtx.beginPath();
    for (var i = 0; i < mp; i++)
    {
        var p = particles[i];
        backCtx.moveTo(p.x, p.y);
        backCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    backCtx.fill();
    update();
    backCtx.drawImage(plussCharacter.image, plussCharacter.srcX, plussCharacter.srcY, plussCharacter.spriteWidth,
        plussCharacter.spriteHeight, 160, 150, plussCharacter.spriteWidth, plussCharacter.spriteHeight);
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
    document.getElementById('questionText').innerHTML = '<p>Correct!</p>';
    document.getElementById('questionPicture').innerHTML = "";
    document.getElementById('answerOptions').innerHTML = "";
    setTimeout(function(){
        goToNewScreen('source/worldSource/world01/world01.html', 'source/worldSource/world01/world01.js');
    }, 1500);
}

//lets user know they pressed wrong
function loseScreen() {

    document.getElementById('questionText').innerHTML = "<p>WRONG! Try again:</p>";
    setTimeout(function(){
        document.getElementById('questionText').innerHTML = '</p>Enter your guess below!</p>';
    }, 1500);

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

function checkAnswer(i) {
    var guess = document.getElementById('questionField' + i).value;
    
    if (guess.toString() === mathAnswers[i].toString()){
        document.getElementById('question' + i).innerHTML = '<p>Letter Number ' + (i+1) + ' = ' + letterArray[i].toUpperCase() + '</p>';
    } else {
        document.getElementById('answerOptionsTitle').innerHTML = '<p>WRONG, try again!</p>';
        setTimeout(function(){
            document.getElementById('answerOptionsTitle').innerHTML = '<p>Solve the math questions to reveal letters:</p>';
        }, 1500);
    }
} 

//builds and executes first question
function question1() {
    var generated = false;
    
    document.getElementById('stageTitle').innerHTML = 'Guess The Word!';
    document.getElementById('questionText').innerHTML = '</p>Enter your guess below!</p>';
    document.getElementById('answerOptionsTitle').innerHTML = '<p>Solve the math questions to reveal letters:</p>';

    
    while (generated === false) {
        for (i = 0; i < answer.length; i++) {
            var buttonId = "button" + i;
            var questionFieldId = "questionField" + i;
            var firstNumber = randomNumber(15);
            var secondNumber = randomNumber(15);
            var ans = firstNumber + secondNumber;
            mathAnswers.push(ans);
            
            var div = document.createElement('div');
            var newId = 'question' + i;
            div.id = newId;
            div.innerHTML = '<p>' + firstNumber + ' + ' + secondNumber + ' = <input type="text" name="guess" id=' + questionFieldId + '><button id=' + buttonId + ' onclick="checkAnswer(' + i + ')">Check Answer</button></p>';
            document.getElementById('answerOptions').appendChild(div);
            
            /* ENTER TO CHECK ANSWER DOES NOT WORK
             * 
            var input = document.getElementById(questionFieldId);
            input.addEventListener('keyup', function(event) {
                event.preventDefault();
                if (event.keyCode === 13) {
                    document.getElementById(buttonId).click();
                } 
            });*/
        }
        generated = true;
    }   
}


function question2() {
    document.getElementById('stageTitle').innerHTML = "TODO";
    document.getElementById('questionText').innerHTML ="TODO";
    document.getElementById('answerOptions').innerHTML ="TODO";
}
