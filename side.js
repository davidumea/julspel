let canvas = document.getElementById("spel");
let ctx = canvas.getContext("2d");
let fgImg = document.getElementById("fg-gfx");
let eldImg = document.getElementById("eld-gfx");
let px;
let py;

lives = 3;
score = 0;

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
		speed: 9,
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
	if (pObject.x <= 0) {
		pObject.x = 879;
	} else if (pObject.x >= 880) {
		pObject.x = 1;
	}
	if (lives == 0) {
		players.splice(players.indexOf(pObject),1);
	}
	px = pObject.x;
	py = pObject.y;
	return px, py;
}

function drawPresent(prObject, x, y, size) {
	ctx.drawImage(fgImg, prObject.x, prObject.y, prObject.size, prObject.size);
	if (prObject.y > 800) {
		presents.splice(presents.indexOf(prObject),1);
		lives--;
		console.log("Live(s): " + lives);
		if (lives == 0) {
			presents.splice(presents.indexOf(prObject),1);
			console.log("du är trash");
		} else {
			presents.push(newPresent(Math.floor((Math.random()*879) + 1), presentSpawnPointY));
		}
	}
	if (prObject.x + 20 >= px && prObject.x <= px + 20 && prObject.y + 20 >= py) {
		presents.splice(presents.indexOf(prObject),1);
		score++;
		console.log("Score: " + score);
		if (lives > 0) {
			presents.push(newPresent(Math.floor((Math.random()*879) + 1), presentSpawnPointY));
		}
	}
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
	ctx.clearRect(0,0,900,900);
	ctx.drawImage(eldImg, 0, 800, 200, 900);

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
		} if (element.y >= 20) {
			element.speed = 3;
		} if (element.y >= 40) {
			element.speed = 4;
		} if (element.y >= 70) {
			element.speed = 5;
		} if (element.y >= 110) {
			element.speed = 6;
		} if (element.y >= 160) {
			element.speed = 7;
		} if (element.y >= 210) {
			element.speed = 8;
		}
	});
	window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);