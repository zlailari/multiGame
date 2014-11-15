var socket = io();

var canvas,ctx;

// Initialize your character
var pops = {
    x: 200,
    y: 200,
    width: 30,
    height: 30,
    mov_speed: 200,
    x_vel: 0,
    y_vel: 0,
    color: '#c00'
};

function initGame () {
	canvas = document.getElementById('bCanvas');
	ctx = canvas.getContext('2d');

	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height= window.innerHeight;
	setInterval(run, 10);

}

$('form').submit(function(){
	socket.emit('chat message', $('#m').val());
	$('#m').val('');
	return false;
});

socket.on('chat message', function(msg){
	if (msg === "up") {
		if(!jump) {
            pops.y_vel = -10;
            jump = true; 
        }
	} else if (msg === "right") {
		pops.x_vel += 7;
	} else if (msg === "left") {
		pops.x_vel -= 7;
	}
	$('#messages').append($('<li>').text(msg));
});

function update() {
	pops.y += pops.y_vel;
    pops.x += pops.x_vel;
}

function collisions() {
	// Enforce canvas bounds
    if (pops.x < 0) {
        pops.x = 0;
    }
    if (pops.y < 0) {
        pops.y = 5;
        pops.y_vel = 1;
    }
    if (pops.x > (canvas.width-pops.width)) {
        pops.x = canvas.width-pops.width;
    }
    if (pops.y > (canvas.height-pops.height)) {
        pops.y = canvas.height-pops.height;
        pops.y_vel = 0;
        pops.x_vel = 0;
        jump = false;
    }
}

function render() {
	ctx.fillRect(pops.x, pops.y, pops.width, pops.height);
}

function run() {
    update();
    collisions();
    render();
    time = Date.now();
}

initGame();
