//variables
let trkArr = [];
const logArr = [];

let grid = 90;
let keys = [];
let frame = 0;
let score = 0;
let gameSpeed = 1;
let safe = false;

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
imgJump.src = "../assets/images/Frog/frog_jump.png";

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
trkArr = [new Obstacle(900, 610, 100, 75, -3, "truck1", imgTruck1),new Obstacle(800, 610, 100, 75, -3, "truck1", imgTruck1),new Obstacle(700, 610, 100, 75, -3, "truck1", imgTruck1)];

function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  logs.update();
  logs.draw();
  logs2.update();
  logs2.draw();
  
  frogger.update();
  frogger.draw();
  manageObstacle();
  for (let i = 0; i < trkArr.length; i++){
    trkArr[i].update();
    trkArr[i].draw();
  }
  // truck1.update();
  // truck1.draw();
  truck2.update();
  truck2.draw();
  truck3.update();
  truck3.draw();
  truck4.update();
  truck4.draw();
  truck5.update();
  truck5.draw();
  victoryGame();
  scoreBoard();
  requestAnimationFrame(animation);
}
animation();

function wins() {
  score++;
  gameSpeed += 1;
  frogger.x = canvas.width / 2 - frogger.width / 2;
  frogger.y = canvas.height - frogger.height - 40;
}

function scoreBoard() {
  ctx.fillstyle = "black";
  ctx.strokeStyle = "black";
  ctx.font = "35px Verdana";
  ctx.strokeText("Nivel:", 20, 40);
  ctx.font = "30px Verdana";
  ctx.fillText(score, 130, 40);
  // ctx.font = '20px Verdana';
  // ctx.fillText('Speed ' + gameSpeed, 20, 60)
}

function manageObstacle() {
  for (let i = 0; i < trkArr.length;i++){
    if (collisionTruck(frogger, trkArr[i])) {
      ctx.clearRect(frogger.x, frogger.y, frogger.width, frogger.height);
      ctx.drawImage(imgDeath, frogger.x, frogger.y, 70, 70);
      // window.setTimeout(resetgame, 200)
      return
    }
  }
  
  if (collisionTruck(frogger, truck2)) {
    ctx.clearRect(frogger.x, frogger.y, frogger.width, frogger.height);
    ctx.drawImage(imgDeath, frogger.x, frogger.y, 70, 70);
    // window.setTimeout(resetgame, 200)
    return
  }
  if (collisionTruck(frogger, truck3)) {
    ctx.clearRect(frogger.x, frogger.y, frogger.width, frogger.height);
    ctx.drawImage(imgDeath, frogger.x, frogger.y, 70, 70);
    // window.setTimeout(resetgame, 200)
    return
  }
  if (collisionTruck(frogger, truck4)) {
    ctx.clearRect(frogger.x, frogger.y, frogger.width, frogger.height);
    ctx.drawImage(imgDeath, frogger.x, frogger.y, 70, 70);
    // window.setTimeout(resetgame, 200)
    return
  }
  if (collisionTruck(frogger, truck5)) {
    ctx.clearRect(frogger.x, frogger.y, frogger.width, frogger.height);
    ctx.drawImage(imgDeath, frogger.x, frogger.y, 70, 70);
    // window.setTimeout(resetgame, 200)
    return
  }
  if (frogger.y >= 290 && frogger.y <= 510) {
    if (!collisionTruck(frogger, logs)) {
      ctx.clearRect(frogger.x, frogger.y, frogger.width, frogger.height);
      ctx.drawImage(imgDeath, frogger.x, frogger.y, 70, 70);
      // window.setTimeout(resetgame, 200)
      return;
    }
  }
  if (frogger.y >= 290 && frogger.y <= 510) {
    if (!frogger.crashWith(logs2)) {
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
// function collisionLog(first, second) {
//   return (
//     first.x > second.x + second.width ||
//     first.x + first.width < second.x ||
//     first.y > second.y + second.height ||
//     first.y + first.height < second.y
//   );
// }

function resetgame() {
  frogger.x = canvas.width / 2 - frogger.width / 2;
  frogger.y = canvas.height - frogger.height - 40;
  score = 1;
  gameSpeed = 1;
}

function victoryGame() {
  if (score >= 2) {
    this.clear();
    const imgVictory = new Image();
    imgVictory.src = "../assets/images/Frog/frog_victory.png";

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
