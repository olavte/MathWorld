/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.addEventListener("click", goToMainMenuFromStartScreen);
window.addEventListener("click", clearStartScreenInterval);

// If the user clicks in the window, set the background color of <body> to yellow
function goToMainMenuFromStartScreen() {
    window.removeEventListener("click", goToMainMenuFromStartScreen);
    goToNewScreen("mainMenu/mainMenu.html", "mainMenu/mainMenu.js");
}

//Blinking Text Script

blinkText = function(){
    var el = document.getElementById("clickToStart");
    if (el.style.display === 'block') {
        el.style.display = 'none';
    } else {
        el.style.display = 'block';
    }
};

var startScreenInterval = setInterval(blinkText, 1000);

function clearStartScreenInterval() {
    window.removeEventListener("click", clearStartScreenInterval);
    clearInterval(startScreenInterval);
    startScreenInterval = null;
}

startAlphabethRain();

function startAlphabethRain() {
    //canvas init
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

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
            y: H, //y-coordinate
            r: Math.random() * 4 + 1, //radius
            d: Math.random() * mp, //density
            n: Math.round((Math.random() * 100) + 1),
            s: Math.round((Math.random() * 100) + 1)
        });
    }

    //Lets draw the flakes
    function draw()
    {
        ctx.clearRect(0, 0, W, H);        
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.beginPath();
        for (var i = 0; i < mp; i++)
        {
            var p = particles[i];
            ctx.font= p.s + "px Verdana";
            ctx.fillText(p.n, p.x, p.y);
            //ctx.moveTo(p.x, p.y);
            //ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }
        update();
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
    setInterval(draw, 33);
}

