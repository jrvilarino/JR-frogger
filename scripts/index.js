//variables
const trkArr = [];
const logArr = [];

let grid = 90;
let keys = [];
let frame = 0;
let score = 0;
let gameSpeed = 1;

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

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 900;

// function drawBgImg() {
//   let bgImg = new Image();
//   bgImg.src = './assets/images/Mix/bgimg.jpg';
//   bgImg.onload = () => {
//       ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
//   }
// }

// const canvasLogs = document.getElementById("logs");
// const ctxLogs = canvasLogs.getContext("2d");
// canvasLogs.width = 600;
// canvasLogs.height = 600;

// const canvasTrucks = document.getElementById("trucks");
// const ctxTrucks = canvasTrucks.getContext("2d");
// canvasTrucks.width = 600;
// canvasTrucks.height = 600;

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
    // ctx.fillStyle = "green";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(imgFrog, this.x, this.y, this.width, this.height);
  }

  jump() {
    console.log("teste jump");
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
    // ctx.fillStyle = "blue";
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  update() {
    this.x += this.speed * gameSpeed;
  }
}

//Funções
const frogger = new Frogger();
const logs = new Obstacle(0, 340, 100, 60, 1, "logs", imgLog);
const logs2 = new Obstacle(900, 430, 100, 60, -1, "logs2", imgLog2);
const truck1 = new Obstacle(900, 610, 100, 75, -1, "truck1", imgTruck1);
const truck2 = new Obstacle(0, 510, 100, 75, 1, "truck2", imgTruck2);
const truck3 = new Obstacle(900, 250, 100, 75, -1, "truck3", imgTruck3);
const truck4 = new Obstacle(0, 160, 100, 75, 1, "truck4", imgTruck4);
const truck5 = new Obstacle(900, 65, 100, 75, -1, "truck5", imgTruck5);

// function aniObstacle() {
//   // for (let i = 0; i < logArr.length; i++) {
//   //   logArr[i].update();
//   //   logArr[i].draw();
//   // }
// }

function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frogger.update();
  frogger.draw();
  logs.update();
  logs.draw();
  logs2.update();
  logs2.draw();
  truck1.update();
  truck1.draw();
  truck2.update();
  truck2.draw();
  truck3.update();
  truck3.draw();
  truck4.update();
  truck4.draw();
  truck5.update();
  truck5.draw();
  // aniObstacle();
  requestAnimationFrame(animation);
}
animation();

function wins() {
  score++;
  gameSpeed += 1;
  frogger.x = canvas.width / 2 - frogger.width / 2;
  frogger.y = canvas.height - frogger.height - 40;
}

// function startObstacle() {
//   //faixa 1
//   for (let i = 0; i < 2; i++) {
//     let x = i * 350;
//     logArr.push(
//       new Obstacle(x, canvas.height - grid * 2 - 20, grid, grid, 1, "log")
//     );
//   }
// }
// startObstacle();

//eventlistener

window.addEventListener("keydown", function () {
  keys = [];
  keys[event.keyCode] = true;
  //37 esquerda, 38 cima, 39 direita, 40 baixo
  if (keys[37] || keys[38] || keys[39] || keys[40]) {
    frogger.jump();
  }
});

window.addEventListener("keyup", function () {
  delete keys[event.keyCode];
  frogger.moving = false;
});
