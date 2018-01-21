/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.addEventListener("click", goToMainMenuFromStartScreen);
window.addEventListener("click", clearStartScreenInterval);

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

    //letters
    var mp = 30; //max letters
    var particles = [];
    for (var i = 0; i < mp; i++)
    {
        particles.push({
            x: Math.random() * W, //x-coordinate
            y: Math.random() * H, //y-coordinate
            r: Math.random() * 4 + 1, //radius
            d: Math.random() * mp, //density
            n: Math.round((Math.random() * 100) + 1),
            s: Math.round((Math.random() * 300) + 1),
            cr: Math.round((Math.random() * 255) + 1),
            cg: Math.round((Math.random() * 255) + 1),
            cb: Math.round((Math.random() * 255) + 1),
        });
    }

    //Draw the letters
    function draw()
    {
        ctx.clearRect(0, 0, W, H);        
        ctx.beginPath();
        for (var i = 0; i < mp; i++)
        {
            var p = particles[i];
            ctx.fillStyle = "rgba(" + p.cr + ", " + p.cg + ", " + p.cb +", 0.9)";
            ctx.font= p.s + "px Verdana";
            ctx.fillText(p.n, p.x, p.y);
        }
        update();
    }

    //Function to move the letters
    var angle = 0;
    function update()
    {
        angle += 0.01;
        for (var i = 0; i < mp; i++)
        {
            var p = particles[i];
            p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
            p.x += Math.sin(angle) * 2;
            
            if (p.x > W + 15 || p.x < -15 || p.y > H + 200)
            {
                if (i % 3 > 0) //66.67% of the letters
                {
                    particles[i] = {x: Math.random() * W, y: -10, r: p.r, d: p.d, n: p.n, s: p.s, cr: p.cr, cg: p.cg, cb: p.cb};
                } else
                {
                    //If the letter is exitting from the right
                    if (Math.sin(angle) > 0)
                    {
                        //Enter from the left
                        particles[i] = {x: -5, y: Math.random() * H, r: p.r, d: p.d, n: p.n, s: p.s, cr: p.cr, cg: p.cg, cb: p.cb};
                    } else
                    {
                        //Enter from the right
                        particles[i] = {x: W + 5, y: Math.random() * H, r: p.r, d: p.d, n: p.n, s: p.s, cr: p.cr, cg: p.cg, cb: p.cb};
                    }
                }
            }
        }
    }

    //animation loop
    setInterval(draw, 33);
}

