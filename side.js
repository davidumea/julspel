let canvas = document.getElementById("spel");
let ctx = canvas.getContext("2d");
let fgImg = document.getElementById("fg-gfx");
let eldImg = document.getElementById("eld-gfx");
let elfImg = document.getElementById("elf-gfx");
let prsImg = document.getElementById("prs-gfx");
let hrtImg = document.getElementById("hrt-gfx");
let px;
let py;
let livesLoss = false;

lives = 3;
score = 0;
presentSpeedAccel = 0.1;
let scoreIsInteger;

playerSpawnPointX = 425;
playerSpawnPointY = 650;
presentSpawnPointX = Math.floor((Math.random()*849) + 1);
presentSpawnPointY = 0;

let hearts = [];
hearts.push(newHeart(10, 20));
hearts.push(newHeart(40, 20));
hearts.push(newHeart(70, 20));
let players = [];
players.push(newPlayer(playerSpawnPointX, playerSpawnPointY));
let presents = [];
presents.push(newPresent(presentSpawnPointX, presentSpawnPointY));

function newHeart(x, y) {
	let heart = {
		x: x,
		y: y,
		size: 20
	}
	return heart;
}

function newPlayer(x, y) {
	let player = {
		x: x,
		y: y,
		speed: 9,
		size: 50
	}
	return player;
}

function newPresent(x, y) {
	let present = {
		x: x,
		y: y,
		speed: 1,
		size: 50
	}
	return present;
}

function drawHeart(hObject) {
	ctx.drawImage(hrtImg, hObject.x, hObject.y, hObject.size, hObject.size);
}

function drawPlayer(pObject) {
	ctx.drawImage(elfImg, pObject.x, pObject.y, pObject.size, pObject.size);
	if (Number.isInteger(scoreIsInteger)) {
		pObject.speed++;
		scoreIsInteger = scoreIsInteger + 0.2;
		console.log(pObject.speed);
	}
	if (pObject.x <= 0) {
		pObject.x = 849;
	} else if (pObject.x >= 850) {
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
	ctx.drawImage(prsImg, prObject.x, prObject.y, prObject.size, prObject.size);
	if (prObject.y > 650) {
		presents.splice(presents.indexOf(prObject),1);
		lives--;
		hearts.pop();
		console.log("Live(s): " + lives);
		if (lives == 0) {
			presents.splice(presents.indexOf(prObject),1);
			if (score < 40) {
				console.log("Du räddade " + score + ", helt värdelöst resultat.");
			} else if (score >= 40 && score < 70) {
				console.log("Du räddade " + score + ", mediokert");
			} else if (score >= 70 && score < 100) {
				console.log("Du räddade " + score + " paket! Vilken jävla superstar!!!");
			} else if (score >= 100) {
				console.log("Du är legit en gud (" + score + " paket räddade)");
			}
		} else {
			presents.push(newPresent(Math.floor((Math.random()*849) + 1), presentSpawnPointY));
		}
	}
	if (prObject.x + 50 >= px && prObject.x <= px + 50 && prObject.y + 50 >= py) {
		presents.splice(presents.indexOf(prObject),1);
		score++;
		scoreIsInteger = score / 5;
		presentSpeedAccel = presentSpeedAccel + 0.005;
		console.log("Score: " + score);
		if (lives > 0) {
			presents.push(newPresent(Math.floor((Math.random()*849) + 1), presentSpawnPointY));
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
			case "A":
			move.left = true;
			break;
		case "D":
			move.right = true;
			break;
			case "a":
			move.left = true;
			break;
		case "d":
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
		case "A":
			move.left = false;
			break;
		case "D":
			move.right = false;
			break;
		case "a":
			move.left = false;
			break;
		case "d":
			move.right = false;
			break;
	}
})

function draw() {
	ctx.clearRect(0,0,900,900);
	ctx.drawImage(eldImg, 0, 700, 900, 200);
	ctx.drawImage(eldImg, (0 + 0), (700 + 0), 900, 200);

	hearts.forEach(element => {
		drawHeart(element);
	});

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
			element.speed = element.speed + presentSpeedAccel;
		}
	});
	window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);