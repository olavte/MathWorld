var memory_array = [];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;


//canvas init
iniBack("world4StageCanvas");

var divisionCharacter = createAnimatedSprite('assets/characters/divisionCharSpr.png', 1200, 300, 300, 300, 22, 1);

//snowflake particles
//iniBackgroundEffects(1);

//Lets draw the flakes
function draw()
{
    backCtx.clearRect(0, 0, W, H);
    divisionCharacter.updateFrame();
    //updateBackgroundEffects(1);
    backCtx.drawImage(divisionCharacter.image, divisionCharacter.srcX, divisionCharacter.srcY, divisionCharacter.spriteWidth,
        divisionCharacter.spriteHeight, 80, 150, divisionCharacter.spriteWidth, divisionCharacter.spriteHeight);
}

//animation loop
animationLoop = setInterval(draw, 33);

//få random nummer 
//@param opp til nummer upToo
//@return random nummer
function divRandomNumber(upTo) {
    var zeroCheck = true;
    while (zeroCheck) {
        var randNumb = Math.floor(Math.random() * upTo);
        
        if (randNumb != 0 && randNumb != 1) {
            zeroCheck = false;;
        }
    }
    return randNumb;
}


function countDecimals(number) {
  var match = (''+number).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) { return 0; }
  return Math.max(
       0,
       // Number of digits right of decimal point.
       (match[1] ? match[1].length : 0)
       // Adjust for scientific notation.
       - (match[2] ? +match[2] : 0));
}



function fillArray() {
    console.log("Starting array fill");
    for (i = 0; i <= 11; i++){
        var decimalCheck = true;
        var firstNumber, secondNumber, ans;
        
            while (decimalCheck) {
                firstNumber = divRandomNumber(100);
                secondNumber = divRandomNumber(12);
                ans = firstNumber / secondNumber;
                
                if((countDecimals(ans) === 0) && (ans != 1) && (ans < 13)) {
                    decimalCheck = false;
                }
            }
        
        var question = '' + firstNumber + ' / ' + secondNumber;
        var ans  = '' + ans;
        memory_array.push(question, ans);
        console.log("Array filled.");
    }
}

Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function victory(){
    setTimeout(function(){
        setTimeout(function(){
            newBoard();
        }, 700);
        goToNewScreen('source/worldSource/world04/world04.html', 'source/worldSource/world04/world04.js');
    }, 1000);    
}

function newBoard(){
    fillArray();
    tiles_flipped = 0;
    var output = '';
    memory_array.memory_tile_shuffle();
    for(var i = 0; i < memory_array.length; i++){
        output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
    }
    document.getElementById('memory_board').innerHTML = output;
}

function memoryFlipTile(tile,val){
    if(tile.innerHTML === "" && memory_values.length < 2){
        tile.style.background = '#FFF';
    	tile.innerHTML = val;
        if(memory_values.length === 0){
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        } else if(memory_values.length === 1){
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
            
            //From string to number
            var value1 = math.eval(memory_values[0]);
            var value2 = math.eval(memory_values[1]);
            
            
            if((value1 === value2) && 
              ((memory_values[0].includes("/")) && !(memory_values[1].includes("/")))) {
            	tiles_flipped += 2;
		// Clear both arrays
		memory_values = [];
                memory_tile_ids = [];
		// Check to see if the whole board is cleared
		if(tiles_flipped === memory_array.length){
                    victory();
		}
            } else if((value1 === value2) && 
              (!(memory_values[0].includes("/")) && (memory_values[1].includes("/")))) {
            	tiles_flipped += 2;
		// Clear both arrays
		memory_values = [];
                memory_tile_ids = [];
		// Check to see if the whole board is cleared
		if(tiles_flipped === memory_array.length){
                    victory();
		}
            }else {
		function flip2Back(){
		// Flip the 2 tiles back over
		var tile_1 = document.getElementById(memory_tile_ids[0]);
		var tile_2 = document.getElementById(memory_tile_ids[1]);
		tile_1.style.background = 'greenyellow';
                tile_1.innerHTML = "";
		tile_2.style.background = 'greenyellow';
                tile_2.innerHTML = "";
		// Clear both arrays
		memory_values = [];
                memory_tile_ids = [];
                }
		setTimeout(flip2Back, 700);
            }
	}
    }
}

newBoard();