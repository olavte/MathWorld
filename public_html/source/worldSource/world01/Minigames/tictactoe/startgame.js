function StateManager() {

	var state = {},
		next = null,
		active = null,
		right = false;

	this.active_name = null;

	this.add = function() {
		for (var i = arguments.length; i--;) {
			var arg = arguments[i];
			state[arg.name] = arg;
		}
	}
	this.set = function(name) {
		active = state[name];
		this.active_name = name;
	}
	this.get = function(name) {
		return state[name];
	}
	this.change = function(name, _right) {
		next = name;
		this.active_name = name;
	}
	this.tick = function(ctx) {
		if (next) {
                    active = state[next];
                    next = false;
                    active.update();
                    active.render(ctx);
		} 
                else {
                    active.update();
                    active.render(ctx);
		}
	}
}

function Tile(x, y) {

	var x = x, y = y;

	var tile = Tile.BLANK;
	var anim = 0;

	if (tile == null) {
		(function() {
			var _c = document.createElement("canvas");
			_c.width = _c.height = 100;
			var _ctx = _c.getContext("2d");

			_ctx.fillStyle = "GreenYellow";
			_ctx.lineWidth = 4;
			_ctx.strokeStyle = "black";
			_ctx.lineCap = "round";
                        
                        
			// Blank
			_ctx.fillRect(0, 0, 100, 100);
			Tile.BLANK = new Image();
			Tile.BLANK.src = _c.toDataURL();

			// Nought
			_ctx.fillRect(0, 0, 100, 100);

			_ctx.beginPath();
			_ctx.arc(50, 50, 30, 0, 2*Math.PI);
			_ctx.stroke();

			Tile.NOUGHT = new Image();
			Tile.NOUGHT.src = _c.toDataURL();

			// Cross
			_ctx.fillRect(0, 0, 100, 100);

			_ctx.beginPath();
			_ctx.moveTo(20, 20);
			_ctx.lineTo(80, 80);
			_ctx.moveTo(80, 20);
			_ctx.lineTo(20, 80);
			_ctx.stroke();

			Tile.CROSS = new Image();
			Tile.CROSS.src = _c.toDataURL();
		})();
		tile = Tile.BLANK;
	}

	this.active = function() {
		return anim > 0;
	}

	this.equals = function(_tile) {
		return tile === _tile;
	}

	this.hasData = function() {
		return tile !== Tile.BLANK;
	}

	this.set = function(next) {
		tile = next;
	}

	this.flip = function(next) {
		tile = next;
		anim = 1;
	}

	this.update = function() {
		if (anim > 0) {
			anim -= 0.02;
		}
	}

	this.draw = function(ctx) {
		if (anim <= 0) {
			ctx.drawImage(tile, x, y);
			return;
		}

		var res = 2;
		var t = tile;
		var p = 0;

		p *= p;

		for (var i = 0; i < 100; i += res) {

			var j = 50 - (anim > 0.5 ? 100 - i : i);

			ctx.drawImage(t, i, 0, res, 100,
				x + i - p*i + 50*p,
				y - j*p*0.2,
				res,
				100 + j*p*0.4
			);
		}
	}

}


function AIPlayer(data) {

	var data = data, seed, oppSeed;

	this.setSeed = function(_seed) {
		seed = _seed;
		oppSeed = _seed === Tile.NOUGHT ? Tile.CROSS : Tile.NOUGHT;
	}

	this.getSeed = function() {
		return seed;
	}

	this.move = function() {
		return minimax(2, seed)[1];
	}

	function minimax(depth, player) {
		var nextMoves = getValidMoves();

		var best = (player === seed) ? -1e100 : 1e100,
			current,
			bestidx = -1;

		if (nextMoves.length === 0 || depth === 0) {
			best = evaluate();
		} else {
			for (var i = nextMoves.length;i--;) {
				var m = nextMoves[i];
				data[m].set(player);

				if (player === seed) {
					current = minimax(depth-1, oppSeed)[0];
					if (current > best) {
						best = current;
						bestidx = m;
					}
				} else {
					current = minimax(depth-1, seed)[0];
					if (current < best) {
						best = current;
						bestidx = m;
					}
				}

				data[m].set(Tile.BLANK);
			}
		}

		return [best, bestidx];
	}

	function getValidMoves() {
		var nm = [];
		if (hasWon(seed) || hasWon(oppSeed)) {
			return nm;
		}
		for (var i = data.length;i--;) {
			if (!data[i].hasData()) {
				nm.push(i);
			}
		}
		return nm;
	}

	function evaluate() {
		var s = 0;
		s += evaluateLine(0, 1, 2);
		s += evaluateLine(3, 4, 5);
		s += evaluateLine(6, 7, 8);
		s += evaluateLine(0, 3, 6);
		s += evaluateLine(1, 4, 7);
		s += evaluateLine(2, 5, 8);
		s += evaluateLine(0, 4, 8);
		s += evaluateLine(2, 4, 6);
		return s;
	}

	function evaluateLine(idx1, idx2, idx3) {
		var s = 0;

		if (data[idx1].equals(seed)) {
			s = 1;
		} else if (data[idx1].equals(oppSeed)) {
			s = -1;
		}

		if (data[idx2].equals(seed)) {
			if (s === 1) {
				s = 10;
			} else if (s === -1) {
				return 0;
			} else {
				s = 1;
			}
		} else if (data[idx2].equals(oppSeed)) {
			if (s === -1) {
				s = -10;
			} else if (s === 1) {
				return 0;
			} else {
				s = -1;
			}
		}

		if (data[idx3].equals(seed)) {
			if (s > 0) {
				s *= 10;
			} else if (s < 0) {
				return 0;
			} else {
				s = 1;
			}
		} else if (data[idx3].equals(oppSeed)) {
			if (s < 0) {
				s *= 10;
			} else if (s > 0) {
				return 0;
			} else {
				s = -1;
			}
		}

		return s;
	}

	var winnigPatterns = (function() {
		var wp = ["111000000", "000111000", "000000111",
				  "100100100", "010010010", "001001001",
				  "100010001", "001010100"],
			r = new Array(wp.length);
		for (var i = wp.length;i--;) {
			r[i] = parseInt(wp[i], 2);
		}
		return r;
	})();

	var hasWon = this.hasWon = function(player) {
		var p = 0;
		for (var i = data.length;i--;) {
			if (data[i].equals(player)) {
				p |= (1 << i);
			}
		}
		for (var i = winnigPatterns.length;i--;) {
			var wp = winnigPatterns[i];
			if ((p & wp) === wp) return true;
		}
		return false;
	}

	this.hasWinner = function() {
		if (hasWon(seed)) {
			return seed;
		} if (hasWon(oppSeed)) {
			return oppSeed;
		}
		return false;
	}
}


function MenuButton(text, x, y, cb) {


	var text = text, x = x, y = y, callback = cb;
	var hover, normal, rect = {};

	canvas.addEventListener("mousedown", function(evt) {
		if (state.active_name !== "menu") return;

		if (rect.hasPoint(mouse.x, mouse.y)) {
			if (callback) {
				callback();
			}
		}
	}, false);

	(function() {
		var _c = document.createElement("canvas"),
			_w = _c.width = 340,
			_h = _c.height = 50,
			_lw = 3,
			s = 0;

		rect.x = x;
		rect.y = y;
		rect.width = _c.width;
		rect.height = _c.height;

		_w -= _lw;
		_h -= _lw;

		var _ctx = _c.getContext("2d");

		_ctx.fillStyle = "GreenYellow";
		_ctx.strokeStyle = "black";
		_ctx.lineWidth = _lw;
		_ctx.font = "bold 20px Open Sans";

		_ctx.translate(_lw/2, _lw/2);
		_ctx.beginPath();
		_ctx.arc(s, s, s, Math.PI, 1.5*Math.PI);
		_ctx.arc(_w-s, s, s, 1.5*Math.PI, 0);
		_ctx.arc(_w-s, _h-s, s, 0, 0.5*Math.PI);
		_ctx.arc(s, _h-s, s, 0.5*Math.PI, Math.PI);
		_ctx.closePath();
		_ctx.fill();
		_ctx.stroke();

		_ctx.fillStyle = _ctx.strokeStyle;
		var _txt = text;
		_ctx.fillText(_txt, (_w - _ctx.measureText(_txt).width)/2, 30);
                
                _ctx.fillStyle = "#9de72a";

		normal = new Image();
		normal.src = _c.toDataURL();

		_ctx.fill();
		_ctx.stroke();

		_ctx.fillStyle = "black";
		_ctx.fillText(_txt, (_w - _ctx.measureText(_txt).width)/2, 30);

		hover = new Image();
		hover.src = _c.toDataURL();
	})();

	rect.hasPoint = function(x, y) {
		var xl = this.x < x && x < this.x+this.width,
			yl = this.y < y && y < this.y+this.height;

		return xl && yl;
	}

	this.draw = function(ctx) {
		var tile = rect.hasPoint(mouse.x, mouse.y) && state.active_name==="menu"? hover : normal;
		ctx.drawImage(tile, x, y);
	}

}

function Scene(width, height) {
	
	var width = width, height = height;

	var canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	var ctx = canvas.getContext("2d");

	this.getContext = function() {
		return ctx;
	}

	this.getCanvas = function() {
		return canvas;
	}

	this.draw = function(_ctx) {
		_ctx.drawImage(canvas, 0, 0);
	}
}



function MenuState(name) {
        
	this.name = name;
	var scene = new Scene(canvas.width, canvas.height),
		ctx = scene.getContext();

	var btns = [], angle = 0, frames = 0;

	var _yPos = 100;
	btns.push(new MenuButton("Play", 20, _yPos, function() {
		state.get("game").init(ONE_PLAYER);
		state.change("game");
	}));/*
	btns.push(new MenuButton("Two Player Game", 20, _yPos+70, function() {
		state.get("game").init(TWO_PLAYER);
		state.change("game");
	}));*/
	btns.push(new MenuButton("Back", 20, _yPos+70, function() {
            
            goToNewScreen('source/worldSource/world01/world01.html', 'source/worldSource/world01/world01.js');
	}));

	this.update = function() {
		frames++;
		angle = 0.2*Math.cos(frames*0.02);
	}

	this.render = function(_ctx) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.save();
		ctx.translate(190, 60);
		ctx.font = "40px Open Sans";
		ctx.fillStyle = "black";
		var txt = "Tic Tac Toe";
		ctx.fillText(txt, -ctx.measureText(txt).width/2, 18);
		ctx.restore();

		for (var i = btns.length;i--;) {
			btns[i].draw(ctx);
		}

		if (_ctx) { 
			scene.draw(_ctx);
		} else {
			return scene.getCanvas();
		}
	}
}

var ONE_PLAYER = 1,
	TWO_PLAYER = 2;

function GameState(name) {

	this.name = name;
	var scene = new Scene(canvas.width, canvas.height),
		ctx = scene.getContext();

	var data, player, ai, isPlayer, aiMoved, mode, winner, winnerMsg, hastick;

	canvas.addEventListener("mousedown", function(evt) {
		if (winnerMsg && state.active_name === "game") {
			state.change("menu", true);
			return;
		}
		if (!isPlayer || winner || state.active_name !== "game" || !hastick) return;

		var px = mouse.x;
		var py = mouse.y;

		if (px % 120 >= 20 && py % 120 >= 20) {
			var idx = Math.floor(px/120);
			idx += Math.floor(py/120)*3;

			if (data[idx].hasData()) {
				return;
			}
			data[idx].flip(player);
			if (mode & ONE_PLAYER) {
				isPlayer = false;
			} else {
				player = player === Tile.NOUGHT ? Tile.CROSS : Tile.NOUGHT;
			}
		}
	}, false);

	this.init = function(_mode, tile) {

		mode = _mode || ONE_PLAYER;
		data = [];

		for (var i = 0; i < 9; i++) {
			var x = (i % 3)*120 + 20;
			var y = Math.floor(i/3)*120 + 20;
			data.push(new Tile(x, y));
		}

		player = tile || Tile.NOUGHT;

		isPlayer = player === Tile.NOUGHT;
		aiMoved = false;
		winner = false;
		winnerMsg = false;
		hastick = false;

		ai = new AIPlayer(data);
		ai.setSeed(player === Tile.NOUGHT ? Tile.CROSS : Tile.NOUGHT);

		if (mode & TWO_PLAYER) {
			player = Tile.NOUGHT;
			isPlayer = true;
		}
	}

	this.update = function() {
		if (winnerMsg) return;
		var activeAnim = false;
		for (var i = data.length; i--;) {
			data[i].update();
			activeAnim = activeAnim || data[i].active();
		}
		if (!activeAnim) {
			if (!aiMoved && !isPlayer) {
				var m = ai.move();
				if (m === -1) {
					winner = true;
				} else {
					data[m].flip(ai.getSeed());
				}
				isPlayer = true;
			}

			if (winner && !aiMoved) {
				if (winner === true) {
					winnerMsg = "The game was a draw!";
				} else if (winner === Tile.NOUGHT) {
					winnerMsg = "The Nought player won!";
				} else {
					winnerMsg = "The Cross player won!";
				}
			}

			aiMoved = true;
		} else {
			if (aiMoved) {
				winner = ai.hasWinner();
			}
			aiMoved = false;
		}
		hastick = true;
	}

	this.render = function(_ctx) {

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (var i = data.length; i--;) {
			data[i].draw(ctx);
		}
		if (winnerMsg) {
			var s = 10, lw = 2, w = 300, h = 80;

			w -= lw;
			h -= lw;

			ctx.save();
			ctx.translate((canvas.width - w + lw)/2, (canvas.height - h + lw)/2);
			ctx.fillStyle = "white";
			ctx.strokeStyle = "black";
			ctx.lineWidth = lw;
			ctx.font = "20px Open Sans";

			ctx.beginPath();
			ctx.arc(s, s, s, Math.PI, 1.5*Math.PI);
			ctx.arc(w-s, s, s, 1.5*Math.PI, 0);
			ctx.arc(w-s, h-s, s, 0, 0.5*Math.PI);
			ctx.arc(s, h-s, s, 0.5*Math.PI, Math.PI);
			ctx.closePath();

			ctx.fill();
			ctx.stroke();

			ctx.fillStyle = "black";
			var txt = winnerMsg;
			ctx.fillText(txt, w/2 -ctx.measureText(txt).width/2, 45);

			ctx.restore();
		}

		if (_ctx) { 
			scene.draw(_ctx);
		} else {
			return scene.getCanvas();
		}
	}
}

function AboutState(name) {

	this.name = name;
	var scene = new Scene(canvas.width, canvas.height),
		ctx = scene.getContext();

	var text = "Tic-tac-toe (or Noughts and crosses, Xs and Os) is a game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three respective marks in a horizontal, vertical, or diagonal row wins the game.";
	var hastick = false;

	canvas.addEventListener("mousedown", function(evt) {
		if (hastick && state.active_name === "about") {
			state.change("menu");
		}
		hastick = false;
	}, false);
	
	(function() {

		ctx.font = "20px Open Sans";
		ctx.fillStyle = "skyblue";

		ctx.translate(20, 20);

		var s = 10,
			w = 340,
			h = 340,
			pi = Math.PI;

		ctx.beginPath();
		ctx.arc(s, s, s, pi, 1.5*pi);
		ctx.arc(w-s, s, s, 1.5*pi, 0);
		ctx.arc(w-s, h-s, s, 0, 0.5*pi);
		ctx.arc(s, h-s, s, 0.5*pi, pi);
		ctx.fill();

		ctx.fillStyle = "white";

		var words = text.split(' '),
			line = '',
			x = 20,
			y = 75,
			maxWidth = 300,
			lineHeight = 25;

		for(var n = 0; n < words.length; n++) {
			var testLine = line + words[n] + ' ';
			var metrics = ctx.measureText(testLine);
			var testWidth = metrics.width;
			if (testWidth > maxWidth && n > 0) {
				ctx.fillText(line, x, y);
				line = words[n] + ' ';
				y += lineHeight;
			}
			else {
				line = testLine;
			}
		}
		ctx.fillText(line, x, y);
	})();	


	this.update = function() {
		hastick = true;
	}

	this.render = function(_ctx) {

		if (_ctx) { 
			scene.draw(_ctx);
		} else {
			return scene.getCanvas();
		}
	}
}


var canvas, ctx, state, mouse = {x:0, y:0};

function main() {
	canvas = document.createElement("canvas");
	canvas.width = canvas.height = 3*120 + 20;
	ctx = canvas.getContext("2d");

	state = new StateManager();
	state.add(new MenuState("menu"), new GameState("game"));
	state.set("menu");
        
        div = document.getElementById("stage01");
	div.appendChild(canvas);

	canvas.addEventListener("mousemove", mouseMove, false);

	init();
	tick();
}

function init() {
	state.get("game").init(ONE_PLAYER);
}

function tick() {
	window.requestAnimationFrame(tick);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	state.tick(ctx);
}

function mouseMove(evt) {
	var el = evt.target;
	var ox = oy = 0;
	do {
		ox += el.offsetLeft;
		oy += el.offsetTop;
	} while (el.parentOffset)

	mouse.x = evt.clientX - ox;
	mouse.y = evt.clientY - oy;
}

main();