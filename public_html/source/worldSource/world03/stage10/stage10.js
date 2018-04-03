//functions for math and questions below


var answer;

mathStageNine();
//mathStageNineSecond();
//mathStageNineThird();



function mathStageNine(){
    
   
    
    var ansArray = new Array();
    var text = "";
    for(i = 0; i<1; i++){
        var num1 = randomNumber(9) +2;
        var num2 = randomNumber(10) +2;
        ansArray.push(num1 * num2);
       
        text += num1 + " x " + num2 + " = " + "<br />";
        
    }
    var answer = num1 * num2;
     document.getElementById('question10').innerHTML = "Click the right pinecone for the multiplication below: <br />"+text;
    
     document.getElementById('pineconediv1').appendChild(document.createTextNode(answer));
     document.getElementById('pineconediv2').appendChild(document.createTextNode(randomNumber(15)+30));
     document.getElementById('pineconediv3').appendChild(document.createTextNode(randomNumber(10)+40));
     //animations for the objects
     doNextPoint1();
     doNextPoint2();
     doNextPoint3();

}

function mathStageNineSecond(){
    
   
    
    var ansArray = new Array();
    var text = "";
    for(i = 0; i<1; i++){
        var num1 = randomNumber(4) +2;
        var num2 = randomNumber(5) +3;
        var num3 = randomNumber(5) +2;
        ansArray.push(num1 * num2 * num3);
       
        text += num1 + " x " + num2 + " x " + num3 + " = " + "<br />";
        
    }
    var answer = num1 * num2 * num3;
     document.getElementById('question10').innerHTML = "Click the right pinecone for the multiplication below: <br />"+text;
    
     document.getElementById('pineconediv1').appendChild(document.createTextNode(answer));
     document.getElementById('pineconediv2').appendChild(document.createTextNode(randomNumber(10)+40));
     document.getElementById('pineconediv3').appendChild(document.createTextNode(randomNumber(10)+20));
      //animations for the objects
     doNextPoint1();
     doNextPoint2();
     doNextPoint3();
 
    document.getElementById('qanswers').innerHTML = "";

}



function mathStageNineThird(){
    
   
    
    var ansArray = new Array();
    var text = "";
    for(i = 0; i<1; i++){
        var num1 = randomNumber(10) +1;
        var num2 = randomNumber(10) +3;
        var num3 = randomNumber(5) +1;
        ansArray.push(num1 * num2 * num3);
       
        text += num1 + " * " + num2 + " * " + num3 + " = " + "<br />";
        
    }
    var answer = num1 * num2 * num3;
     document.getElementById('question10').innerHTML = "Click the right pinecone for the multiplication below: <br />"+text;
    
     document.getElementById('pineconediv1').appendChild(document.createTextNode(answer));
     document.getElementById('pineconediv2').appendChild(document.createTextNode(randomNumber(15)+2));
     document.getElementById('pineconediv3').appendChild(document.createTextNode(randomNumber(10)+2));

     //animations for the objects
     doNextPoint1();
     doNextPoint2();
     doNextPoint3();
     creditsMoney +=50;

}


//Lets user know they were correct, 
function victoryScreen() {
    
    document.getElementById('qanswers').innerHTML = "CORRECT!";
    document.getElementById("mathbutton2").disabled = false;
     var option1 = document.getElementById('pineconediv1');
        option1.removeChild(option1.lastChild);
        var option2 = document.getElementById('pineconediv2');
        option2.removeChild(option2.lastChild);
        var option3 = document.getElementById('pineconediv3');
        option3.removeChild(option3.lastChild);

}

//lets user know they pressed wrong
function sadnessScreen() {

    document.getElementById('qanswers').innerHTML = "WRONG!";
    reload();
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
    
   var correctPic = document.getElementById(clickedId);
     if (correctPic===document.getElementById("pineconediv1")) {
    victoryScreen(); // rett svar knapp
        } 
        else if(!correctPic !==document.getElementById("pineconediv1")){
            sadnessScreen();
        }

   
   
 
   }
   //creates an area for the animation of the objects, width and heigth of stage background
//$('#animationArea').width($('#stage10background').width()).height(($('#stage10background').height()/2));


function doNextPoint1(){
    
   $('#animationArea').width($('#stage10background').width());
   $('#animationArea').height($('#stage10background').height());
    var animationTop = $("#animationArea")[0].getBoundingClientRect();
    var maxX = $('#animationArea').width() - $('#pineconediv1').width();    
    var newX = rand(0, maxX);    
    var maxY = $('#animationArea').height() - $('#pineconediv1').height();
    var newY = rand(animationTop.top, maxY);
    var speed  = rand (1000, 3000);
    
    $('#pineconediv1').animate({
        'top': newY + 'px',
        'left': newX + 'px'
        
    }, speed, function(){
        doNextPoint1();    
    });
    
    
    
    
}
//$('#animationArea').width($('#stage10background').width()).height(($('#stage10background').height()/2));


function doNextPoint2(){
    var animationTop = $("#animationArea")[0].getBoundingClientRect();
    var maxX = $('#animationArea').width() - $('#pineconediv2').width();    
    var newX = rand(0, maxX);    
    var maxY = $('#animationArea').height() - $('#pineconediv2').height();
    var newY = rand(animationTop.top, maxY);
    var speed  = rand (1000, 3000);
    
    $('#pineconediv2').animate({
        'top': newY + 'px',
        'left': newX + 'px'
        
    }, speed, function(){
        doNextPoint2();    
    });

}
//$('#animationArea').width($('#stage10background').width()).height(($('#stage10background').height()/2));


function doNextPoint3(){
    var animationTop = $("#animationArea")[0].getBoundingClientRect();
    var maxX = $('#animationArea').width() - $('#pineconediv3').width();    
    var newX = rand(0, maxX);    
    var maxY = $('#animationArea').height() - $('#pineconediv3').height();
    var newY = rand(animationTop.top, maxY);
    var speed  = rand (1000, 3000);
    
    $('#pineconediv3').animate({
        'top': newY + 'px',
        'left': newX + 'px'
        
    }, speed, function(){
        doNextPoint3();    
    });
    
}
function rand (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}    

function reload() {
    goToNewScreen('source/worldSource/world03/stage10/stage10.html', 'source/worldSource/world03/stage10/stage10.js');
    
}

function backToWorld() {
    goToNewScreen('source/worldSource/world03/world03.html', 'source/worldSource/world03/world03.js');
    }