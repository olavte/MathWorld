/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//canvas init


var middleCanvas = document.getElementById("middleCanvas");
var middleCtx = middleCanvas.getContext("2d");

//global selected variables
var selectedRec;
var computerSelected;
var hasSelected = false;





var W = window.innerWidth;
var H = window.innerHeight;

middleCanvas.width = W;
middleCanvas.height = H;


//rectangles, placeholder for rock/paper/scissor figure
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

var computerOptions = [];

computerOptions.push({
    colour: 'red',
    width: 75,
    height: 75,
    top: 175,
    left: W/2 - 105
}, {
    colour: 'blue',
    width: 75,
    height: 75,
    top: 175,
    left: W/2
    }, {
    colour: 'green',
    width: 75,
    height: 75,
    top: 175,
    left: W/2 + 105
    });


startGame();

function startGame()
{
    drawMiddle();
    computerSelecting();

}

function drawMiddle() {
        middleCtx.clearRect(0, 0, W, H);
        middleCtx.fillStyle = "black";
        middleCtx.fillRect(0, 0, W, H);
        
        //rules window
        rulesVisual();
        
        
        for (var i = 0; i < elements.length; i++) {
            
            var el = elements[i];
                
            middleCtx.fillStyle = el.colour;
            middleCtx.fillRect(el.left, el.top, el.width, el.height);
               

            }
        for (var i = 0; i < computerOptions.length; i++) {
            
            var cs = computerOptions[i];

            middleCtx.fillStyle = cs.colour;
            middleCtx.fillRect(cs.left, cs.top, cs.width, cs.height);

            }
    }


function playerSelecting() {
    //waiting for player  
    //player selected
    var newSelected = {
                colour: selectedRec.colour,
                width: 135,
                height: 125,
                top: H - 310,
                left: W/2
                };
    
    elements = [];
    elements.push(newSelected);
    
    if(computerSelected !== null) {
            drawMiddle();
        } else {
            computerSelecting();
        }
        
    determineWinner();
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
            
            selectedRec = element;
            hasSelected = true;
            playerSelecting();
            
        }
    }


}, false);

//computer selects rectangle
function computerSelecting() {
        
    shuffle(computerOptions);
    
    var randNumb = randomNumber(2);
    
    
    var cs = computerOptions[randNumb];
    var newSelected = {
                        colour: cs.colour,
                        width: 135,
                        height: 125,
                        top: 185,
                        left: W/2
                       };
    computerOptions = [];
    computerSelected = newSelected;                    
    computerOptions.push(newSelected);               
}


/**
 * Pokemon Ruled:
 * Red beats green
 * green beats blue
 * blue beats red
 */
function determineWinner() {
    var computer = computerSelected.colour;
    var player = selectedRec.colour;
    var match = player + computer;
    
    var endgameText = "Hmmmm";
    if(match === "redgreen" || match === "greenblue" || match === "bluered") {
        //player won
        endgameText = "You won!";
        
    } else if(match === "greengreen" || match === "blueblue" || match === "redred") {
        //draw
        endgameText = "Draw!";
        
    } else {
        //computer won
        endgameText = "Computer won!";
    }
    
    middleCtx.font = "30px Arial";
    middleCtx.fillStyle = "white";
    middleCtx.textAlign = "center";
    middleCtx.fillText(endgameText, W/2, H/2);
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

function randomNumber(upToo) {
    var randNumb = Math.floor(Math.random() * upToo);
    return randNumb;
}

function reload() {
    goToNewScreen('source/worldSource/world01/Minigames/RockPaperScissor/rockPaperScissor.html', 'source/worldSource/world01/Minigames/RockPaperScissor/rockPaperScissor.js');
}

function backToWorld() {
    goToNewScreen('source/worldSource/world01/world01.html', 'source/worldSource/world01/world01.js');
}

function rulesVisual() {
    
    middleCtx.fillStyle = "white";
    middleCtx.fillRect(0, 0, (W * 1)/6, H/2);
        
    middleCtx.font = "50px Arial";
    middleCtx.fillStyle = "black";
    middleCtx.textAlign = "center";
    middleCtx.fillText("Rules:", (W*1)/12, 80);
    middleCtx.font = "30px Arial";
    middleCtx.fillText(" Beats ", (W*1)/12, 140);
    middleCtx.fillText(" Beats ", (W*1)/12, 280);
    middleCtx.fillText(" Beats ", (W*1)/12, 420);
    
    middleCtx.fillStyle = "green";
    middleCtx.fillRect((W*1)/12 - 70, 130, 15, 15);
    middleCtx.fillStyle = "blue";
    middleCtx.fillRect((W*1)/12 + 60, 130, 15, 15);
    
    middleCtx.fillStyle = "blue";
    middleCtx.fillRect((W*1)/12 - 70, 270, 15, 15);
    middleCtx.fillStyle = "red";
    middleCtx.fillRect((W*1)/12 + 60, 270, 15, 15);
    
    middleCtx.fillStyle = "red";
    middleCtx.fillRect((W*1)/12 - 70, 410, 15, 15);
    middleCtx.fillStyle = "green";
    middleCtx.fillRect((W*1)/12 + 60, 410, 15, 15);
        

}