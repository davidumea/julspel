let canvas = document.getElementById("spel");
let ctx = canvas.getContext("2d");
let fgImg = document.getElementById("fg-gfx");

playerSpawnPointX = 440;
playerSpawnPointY = 700;
presentSpawnPointX = Math.floor((Math.random()*879) + 1);
presentSpawnPointY = 0;


let players = [];
players.push(newPlayer(playerSpawnPointX, playerSpawnPointY));
let presents = [];
presents.push(newPresent(presentSpawnPointX, presentSpawnPointY));

function newPlayer(x, y) {
	let player = {
		x: x,
		y: y,
		speed: 6,
		size: 20
	}
	return player;
}

function newPresent(x, y) {
	let present = {
		x: x,
		y: y,
		speed: 1,
		size: 20
	}
	return present;
}

function drawPlayer(pObject) {
	ctx.drawImage(fgImg, pObject.x, pObject.y, pObject.size, pObject.size);
}

function drawPresent(prObject, x, y, size) {
	ctx.drawImage(fgImg, prObject.x, prObject.y, prObject.size, prObject.size);
}

let move = {
	left: false,
	right: false
};

document.addEventListener("keydown", function(e) {
	switch(e.key) {
		case "ArrowLeft":
			move.left = true;
			break;
		case "ArrowRight":
			move.right = true;
			break;
	}
})

document.addEventListener("keyup", function(e) {
	switch(e.key) {
		case "ArrowLeft":
			move.left = false;
			break;
		case "ArrowRight":
			move.right = false;
			break;
	}
})

function draw() {

	ctx.clearRect(0, 0, 900, 900);
	players.forEach(element => {
		if (move.left) { 
			element.x = element.x - element.speed;
		}
		if (move.right) { 
			element.x = element.x + element.speed;
		}
		drawPlayer(element);
	});

	presents.forEach(element => {
		element.y = element.y + element.speed;
		drawPresent(element);
		if (element.y >= 10) {
			element.speed = 2;
		} if (element.y >= 30) {
			element.speed = 3;
		} if (element.y >= 60) {
			element.speed = 4;
		} if (element.y >= 100) {
			element.speed = 5;
		} if (element.y >= 150) {
			element.speed = 6;
		} if (element.y >= 210) {
			element.speed = 7;
		} if (element.y >= 280) {
			element.speed = 8;
		}
		if (element.y >= 800) {
			ctx.clearRect(element.x, element.y, element.size, element.size);
			newPresent(presentSpawnPointX, presentSpawnPointY);
			drawPresent(fgImg, element.x, element.y, element.size, element.size);
		}
	});
	window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);