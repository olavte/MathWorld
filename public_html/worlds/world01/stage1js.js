/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//math JS testing atm
//@param world wich world, to know operation
function GetMath(world) {
    
    var number1 = randomNumber(100);
    var number2 = randomNumber(100);
    var question = "";
    var answer = "";
    var answerMix = randomNumber(2);
    
    //Dummy id's atm, setter spørsmål og svar i div's
    if(world===01) {
        question = "What is " + number1 + " + " + number2 + "?";
        answer = number1 + number2;
        document.getElementById("World1Question").innerHTML = question;
        
        //midlertidig, skal bli sin egen funksjon når ej veit ID på spørsmål og svar bedre
        if(answerMix === 0) {
        document.getElementById("World1answer1").innerHTML = answer;
        document.getElementById("World1Answer2").innerHTML = randomNumber(200);
        document.getElementById("World1Answer3").innerHTML = randomNumber(200);
        
        }else if(answerMix === 1) {
        document.getElementById("World1answer1").innerHTML = randomNumber(200);
        document.getElementById("World1Answer2").innerHTML = answer;
        document.getElementById("World1Answer3").innerHTML = randomNumber(200);
        
        } else {
        document.getElementById("World1answer1").innerHTML = randomNumber(200);
        document.getElementById("World1Answer2").innerHTML = randomNumber(200);
        document.getElementById("World1Answer3").innerHTML = answer;
        }
        
    } else if(world===02) {
        //ect
    }
}
//få random nummer 
//@param opp til nummer upToo
//@return random nummer
function randomNumber(upToo) {
    var randNumb = Math.floor(Math.random()*upToo);
    return randNumb;
}
