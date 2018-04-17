var canvas, ctx, state, mouse = {x:0, y:0};

function main() {
	canvas = document.createElement("canvas");
	canvas.width = canvas.height = 3*120 + 20;
	ctx = canvas.getContext("2d");

	state = new StateManager();
	state.add(new MenuState("menu"), new GameState("game"));
	state.set("menu");

	document.body.appendChild(canvas);

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