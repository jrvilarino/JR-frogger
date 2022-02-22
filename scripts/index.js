//variables
let trkArr = [];
let trkArr1 = [];
let trkArr2 = [];
let trkArr3 = [];
let trkArr4 = [];
let logArr1 = [];
let logArr2 = [];
let lifeArr = [];

let grid = 90;
let keys = [];
let frame = 0;
let score = 0;
let gameSpeed = 0;
let life = 3;

const imgLog = new Image();
imgLog.src = "./assets/images/Mix/log_small.png";

const imgLog2 = new Image();
imgLog2.src = "./assets/images/Mix/log_large.png";

const imgTruck1 = new Image();
imgTruck1.src = "./assets/images/Car/Truck_1.png";

const imgTruck2 = new Image();
imgTruck2.src = "./assets/images/Car/Truck_2.png";

const imgTruck3 = new Image();
imgTruck3.src = "./assets/images/Car/Truck_3.png";

const imgTruck4 = new Image();
imgTruck4.src = "./assets/images/Car/Truck_4.png";

const imgTruck5 = new Image();
imgTruck5.src = "./assets/images/Car/Truck_5.png";

const imgFrog = new Image();
imgFrog.src = "./assets/images/Frog/frog_idle.png";

const imgDeath = new Image();
imgDeath.src = "./assets/images/Frog/frog_death.png";

const imgJump = new Image();
imgJump.src = "./assets/images/Frog/frog_jump.png";

const imgHeart = new Image();
imgHeart.src = "./assets/images/Mix/heart.png";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 900;

//classes
class Frogger {
  constructor() {
    this.spritedWidth = 350;
    this.spritedHeight = 350;
    this.width = this.spritedWidth / 5;
    this.height = this.spritedHeight / 5;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height - canvas.height - 40;
    this.moving = false;
    this.frameX = 0;
    this.framey = 0;
    this.life = 3;
  }
  update() {
    if (keys[38]) {
      if (this.moving === false) {
        this.y -= grid;
        this.moving = true;
      }
    }
    if (keys[40]) {
      if (this.moving === false) {
        if (this.y < canvas.height - this.height * 2 && this.moving === false) {
          this.y += grid;
          this.moving = true;
        }
      }
    }
    if (keys[37]) {
      if (this.moving === false) {
        if (this.x > this.width - this.width / 2 && this.moving === false) {
          this.x -= grid;
          this.moving = true;
        }
      }
    }
    if (keys[39]) {
      if (this.moving === false) {
        if (this.x < canvas.width - this.width * 2 && this.moving === false) {
          this.x += grid;
          this.moving = true;
        }
      }
    }
    if (this.y < 0) wins();
  }

  draw() {
    ctx.drawImage(imgFrog, this.x, this.y, this.width, this.height);
  }

  // jump() {
  //   ctx.clearRect(frogger.x, frogger.y, frogger.width, frogger.height);
  //   ctx.drawImage(imgJump, frogger.x, frogger.y, 70, 70);
  // }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
  crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
}

class Obstacle {
  constructor(x, y, width, height, speed, type, img) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.type = type;
    this.img = img;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  update() {
    this.x += this.speed * gameSpeed;
    if (this.x > canvas.width + this.width) {
      this.x = 0 - this.width;
    }
    if (this.x < 0 - this.width) {
      this.x = canvas.width + this.width;
    }
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
}

//Funções
const frogger = new Frogger();
const logs = new Obstacle(0, 340, 300, 60, 1, "logs", imgLog);
const logs2 = new Obstacle(900, 440, 300, 60, -2, "logs2", imgLog2);
const truck1 = new Obstacle(900, 610, 100, 75, -3, "truck1", imgTruck1);
const truck2 = new Obstacle(0, 510, 100, 75, 1, "truck2", imgTruck2);
const truck3 = new Obstacle(900, 250, 100, 75, -3, "truck3", imgTruck3);
const truck4 = new Obstacle(0, 160, 100, 75, 1, "truck4", imgTruck4);
const truck5 = new Obstacle(900, 65, 100, 75, -4, "truck5", imgTruck5);
const heart = new Obstacle(850, 10, 45, 45, 0, "truck5", imgHeart);

lifeArr = [
  new Obstacle(850, 10, 45, 45, 0, "truck5", imgHeart),
  new Obstacle(800, 10, 45, 45, 0, "truck5", imgHeart),
  new Obstacle(750, 10, 45, 45, 0, "truck5", imgHeart),
];

trkArr = [
  new Obstacle(900, 610, 100, 75, -3, "truck1", imgTruck1),
  new Obstacle(700, 610, 100, 75, -3, "truck1", imgTruck1),
  new Obstacle(300, 610, 100, 75, -3, "truck1", imgTruck1),
];
trkArr1 = [
  new Obstacle(0, 510, 100, 75, 1, "truck2", imgTruck2),
  new Obstacle(200, 510, 100, 75, 1, "truck2", imgTruck2),
  new Obstacle(450, 510, 100, 75, 1, "truck2", imgTruck2),
  new Obstacle(600, 510, 100, 75, 1, "truck2", imgTruck2),
];
trkArr2 = [
  new Obstacle(0, 160, 100, 75, 1, "truck4", imgTruck4),
  new Obstacle(225, 160, 100, 75, 1, "truck4", imgTruck4),
  new Obstacle(450, 160, 100, 75, 1, "truck4", imgTruck4),
  new Obstacle(675, 160, 100, 75, 1, "truck4", imgTruck4),
];
trkArr3 = [
  new Obstacle(900, 250, 100, 75, -3, "truck3", imgTruck3),
  new Obstacle(600, 250, 100, 75, -3, "truck3", imgTruck3),
  new Obstacle(300, 250, 100, 75, -3, "truck3", imgTruck3),
];
trkArr4 = [
  new Obstacle(900, 65, 100, 75, -4, "truck5", imgTruck5),
  new Obstacle(650, 65, 100, 75, -4, "truck5", imgTruck5),
  new Obstacle(520, 65, 100, 75, -4, "truck5", imgTruck5),
  new Obstacle(300, 65, 100, 75, -4, "truck5", imgTruck5),
  new Obstacle(900, 65, 100, 75, -4, "truck5", imgTruck5),
];
logArr1 = [
  new Obstacle(0, 340, 300, 60, 1, "logs", imgLog),
  new Obstacle(450, 340, 300, 60, 1, "logs", imgLog),
];

function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < lifeArr.length; i++) {
    lifeArr[i].update();
    lifeArr[i].draw();
  }
  logs.update();
  logs.draw();
  logs2.update();
  logs2.draw();
  frogger.update();
  frogger.draw();
  manageObstacle();
  for (let i = 0; i < trkArr.length; i++) {
    trkArr[i].update();
    trkArr[i].draw();
  }
  for (let i = 0; i < trkArr1.length; i++) {
    trkArr1[i].update();
    trkArr1[i].draw();
  }
  for (let i = 0; i < trkArr2.length; i++) {
    trkArr2[i].update();
    trkArr2[i].draw();
  }
  for (let i = 0; i < trkArr3.length; i++) {
    trkArr3[i].update();
    trkArr3[i].draw();
  }
  for (let i = 0; i < trkArr4.length; i++) {
    trkArr4[i].update();
    trkArr4[i].draw();
  }
  victoryGame();
  scoreBoard();
  // gameOver();
  requestAnimationFrame(animation);
}
animation();

function wins() {
  score++;
  gameSpeed += 1;
  frogger.x = canvas.width / 2 - frogger.width / 2;
  frogger.y = canvas.height - frogger.height - 40;
}

function lostLife() {
  life--;
  if (life === 0) {
    gameOver();
  }
  return;
}

function scoreBoard() {
  ctx.fillstyle = "black";
  ctx.strokeStyle = "black";
  ctx.font = "35px Verdana";
  ctx.strokeText("Nivel:", 20, 40);
  ctx.font = "30px Verdana";
  ctx.fillText(score, 130, 40);
}

function manageObstacle() {
  for (let i = 0; i < trkArr.length; i++) {
    if (collisionTruck(frogger, trkArr[i])) {
      ctx.clearRect(frogger.x, frogger.y, frogger.width, frogger.height);
      ctx.drawImage(imgDeath, frogger.x, frogger.y, 70, 70);
      window.setTimeout(resetgame, 200);
      console.log(life);
      lostLife();
      return;
    }
  }
  for (let i = 0; i < trkArr1.length; i++) {
    if (collisionTruck(frogger, trkArr1[i])) {
      ctx.clearRect(frogger.x, frogger.y, frogger.width, frogger.height);
      ctx.drawImage(imgDeath, frogger.x, frogger.y, 70, 70);
      // window.setTimeout(resetgame, 200)
      return;
    }
  }
  for (let i = 0; i < trkArr2.length; i++) {
    if (collisionTruck(frogger, trkArr2[i])) {
      ctx.clearRect(frogger.x, frogger.y, frogger.width, frogger.height);
      ctx.drawImage(imgDeath, frogger.x, frogger.y, 70, 70);
      // window.setTimeout(resetgame, 200)
      return;
    }
  }
  for (let i = 0; i < trkArr3.length; i++) {
    if (collisionTruck(frogger, trkArr3[i])) {
      ctx.clearRect(frogger.x, frogger.y, frogger.width, frogger.height);
      ctx.drawImage(imgDeath, frogger.x, frogger.y, 70, 70);
      // window.setTimeout(resetgame, 200)
      return;
    }
  }

  for (let i = 0; i < trkArr4.length; i++) {
    if (collisionTruck(frogger, trkArr4[i])) {
      ctx.clearRect(frogger.x, frogger.y, frogger.width, frogger.height);
      ctx.drawImage(imgDeath, frogger.x, frogger.y, 70, 70);
      // window.setTimeout(resetgame, 200)
      return;
    }
  }

  if (frogger.y >= 290 && frogger.y <= 510) {
    if (!frogger.crashWith(logs) && !frogger.crashWith(logs2)) {
      ctx.clearRect(frogger.x, frogger.y, frogger.width, frogger.height);
      ctx.drawImage(imgDeath, frogger.x, frogger.y, 70, 70);
      // window.setTimeout(resetgame, 200)
      return;
    }
  }
}

function collisionTruck(first, second) {
  return !(
    first.x > second.x + second.width ||
    first.x + first.width < second.x ||
    first.y > second.y + second.height ||
    first.y + first.height < second.y
  );
}

function resetgame() {
  frogger.x = canvas.width / 2 - frogger.width / 2;
  frogger.y = canvas.height - frogger.height - 40;
  score = 1;
  gameSpeed = 1;
}

function victoryGame() {
  if (score === 5) {
    this.clear();
    const imgVictory = new Image();
    imgVictory.src = "./assets/images/Frog/frog_victory.png";

    ctx.drawImage(imgVictory, 200, 70, 500, 700);

    ctx.font = "40px Verdana";
    ctx.fillStyle = "white";
    ctx.fillText(`Who let the frogs out?!?`, 30, 770);
    ctx.font = "55px Verdana";
    ctx.fillStyle = "white";
    ctx.fillText(`You beat the game! Frogtastic!`, 30, 850);
  }
  clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}

function gameOver() {
  // if(life === 0){

  this.clear();
  const imgGameOver = new Image();
  imgGameOver.src = "./assets/images/Frog/frog_game_over.png";

  ctx.drawImage(imgGameOver, 200, 70, 500, 700);

  ctx.font = "40px Verdana";
  ctx.fillStyle = "white";
  ctx.fillText(`Should not be that hard!!`, 200, 790);
  ctx.fillStyle = "white";
  ctx.fillText(`YOU LOSE`, 350, 850);
  // }
  clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}

//eventlistener

window.addEventListener("keydown", function () {
  keys = [];
  keys[event.keyCode] = true;
  //37 esquerda, 38 cima, 39 direita, 40 baixo
  if (keys[37] || keys[38] || keys[39] || keys[40]) {
    // frogger.jump();
  }
});

window.addEventListener("keyup", function () {
  delete keys[event.keyCode];
  frogger.moving = false;
});
