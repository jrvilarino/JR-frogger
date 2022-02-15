//variables
const trkArr = [];
const logArr = [];

let grid = 80;
let keys = [];
let frame = 0;
let score = 0;
let gameSpeed = 1;

const canvasFrog = document.getElementById("frog");
const ctxFrog = canvasFrog.getContext("2d");
canvasFrog.width = 900;
canvasFrog.height = 900;

const canvasLogs = document.getElementById("logs");
const ctxLogs = canvasLogs.getContext("2d");
canvasFrog.width = 600;
canvasFrog.height = 600;

const canvasTrucks = document.getElementById("trucks");
const ctxTrucks = canvasTrucks.getContext("2d");
canvasTrucks.width = 600;
canvasTrucks.height = 600;

//classes
class Frogger {
  constructor() {
    this.spritedWidth = 350;
    this.spritedHeight = 350;
    this.width = this.spritedWidth / 5;
    this.height = this.spritedHeight / 5;
    this.x = canvasFrog.width / 2 - this.width / 2;
    this.y = canvasFrog.height - canvasFrog.height - 40;
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
        if (
          this.y < canvasFrog.height - this.height * 2 &&
          this.moving === false
        ) {
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
        if (
          this.x < canvasFrog.width - this.width * 2 &&
          this.moving === false
        ) {
          this.x += grid;
          this.moving = true;
        }
      }
    }
    if (this.y < 0) wins();
  }

  draw() {
    ctxFrog.fillStyle = "green";
    ctxFrog.fillRect(this.x, this.y, this.width, this.height);
  }

  jump() {
    console.log("teste jump");
  }
}

class Obstacle {
  contructor(x, y, width, height, speed, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.tyoe = type;
  }
  draw() {
    ctxLogs.fillStyle = "blue";
    ctxLogs.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.x += this.speed * gameSpeed;
  }
}

//Funções
const frogger = new Frogger();

function aniObstacle() {
  for (let i = 0; i < logArr.length; i++) {
    logArr[i].update();
    logArr[i].draw();
  }
}

function animation() {
  ctxFrog.clearRect(0, 0, canvasFrog.width, canvasFrog.height);
  frogger.draw();
  frogger.update();
  aniObstacle();
  requestAnimationFrame(animation);
}
animation();

function wins() {
  score++;
  gameSpeed += 1;
  frogger.x = canvasFrog.width / 2 - frogger.width / 2;
  frogger.y = canvasFrog.height - frogger.height - 40;
}

function startObstacle() {
  //faixa 1
  for (let i = 0; i < 2; i++) {
    let x = i * 350;
    logArr.push(
      new Obstacle(x, canvasLogs.height - grid * 2 - 20, grid, grid, 1, "log")
    );
  }
}
startObstacle();

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
