const myGameArea = {
  canvas: document.getElementById("canvas"),
  start: function () {
    this.context = this.canvas.getContext("2d");
    resizeCanvasToDisplaySize(this.context.canvas);
    window.addEventListener("keydown", function (e) {
      myGameArea.key = e.keyCode;
    });
    window.addEventListener("keyup", function (e) {
      myGameArea.key = false;
    });
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

const lv1 = {
  bossAsset: "",
  bulletAsset: "https://img.icons8.com/ultraviolet/80/000000/flash-on.png",
  bulletSpeed: 0.0025,
};

const lv2 = {
  bossAsset: "",
  bulletAsset: "https://img.icons8.com/ultraviolet/40/000000/flash-on.png",
  bulletOrder: [[0, 0, 1, 0, 1]],
};

function character(src, xP, yP, health) {
  this.x = xP;
  this.y = yP;
  this.health = health;
  this.img = new Image();
  this.img.src = src;
  this.width = this.img.width;
  this.height = this.img.height;
  this.update = function () {
    ctx = myGameArea.context;
    if (this.x > 0.9) {
      this.x = 0.9;
    }
    if (this.y < 0.1) {
      this.x = 0.1;
    }
    ctx.drawImage(
      this.img,
      this.x * ctx.canvas.width - this.img.width / 2,
      this.y * ctx.canvas.height - this.img.height / 2
    );
    background();
  };
}

function bulletObj(src, xP, yP) {
  this.x = xP;
  this.y = yP;
  this.img = new Image();
  this.img.src = src;
  this.width = this.img.width;
  this.height = this.img.height;
  this.update = function () {
    ctx = myGameArea.context;
    ctx.drawImage(
      this.img,
      this.x * ctx.canvas.width - this.img.width / 2,
      this.y * ctx.canvas.height - this.img.height / 2
    );
  };
  this.moveDown = function (val) {
    this.y += val;
  };
}

function randomX() {
  let x = Math.floor(Math.random() * 4);
  const xArr = [0.1, 0.3, 0.5, 0.7, 0.9];
  return xArr[x];
}

function spawnAndSpeedBullets(val) {
  bullet1.update();
  if (bullet1.y <= 0.9) {
    bullet1.moveDown(val);
  } else {
    bullet1.y = 0.2;
    bullet1.x = randomX();
  }

  bullet2.update();
  if (bullet2.y <= 0.9) {
    bullet2.moveDown(val);
  } else {
    bullet2.y = 0.2;
    bullet2.x = randomX();
  }

  bullet3.update();
  if (bullet3.y <= 0.9) {
    bullet3.moveDown(val);
  } else {
    bullet3.y = 0.2;
    bullet3.x = randomX();
  }

  bullet4.update();
  if (bullet4.y <= 0.9) {
    bullet4.moveDown(val);
  } else {
    bullet4.y = 0.2;
    bullet4.x = randomX();
  }
}

function checkCollision1() {
  if (
    mainChar.x * ctx.canvas.width - mainChar.img.width / 2 <
      bullet1.x * ctx.canvas.width - bullet1.img.width / 2 + bullet1.width &&
    mainChar.x * ctx.canvas.width - mainChar.img.width / 2 + mainChar.width >
      bullet1.x * ctx.canvas.width - bullet1.img.width / 2 + bullet1.width &&
    mainChar.y * ctx.canvas.height - mainChar.img.height / 2 <
      bullet1.y * ctx.canvas.height - bullet1.img.height / 2 + bullet1.height &&
    mainChar.y * ctx.canvas.height - mainChar.img.height / 2 + mainChar.height >
      bullet1.y * ctx.canvas.height - bullet1.img.height / 2
  ) {
    mainChar.health -= 2;
  }
}

function checkCollision2() {
  if (
    mainChar.x * ctx.canvas.width - mainChar.img.width / 2 <
      bullet2.x * ctx.canvas.width - bullet2.img.width / 2 + bullet2.width &&
    mainChar.x * ctx.canvas.width - mainChar.img.width / 2 + mainChar.width >
      bullet2.x * ctx.canvas.width - bullet2.img.width / 2 + bullet2.width &&
    mainChar.y * ctx.canvas.height - mainChar.img.height / 2 <
      bullet2.y * ctx.canvas.height - bullet2.img.height / 2 + bullet2.height &&
    mainChar.y * ctx.canvas.height - mainChar.img.height / 2 + mainChar.height >
      bullet2.y * ctx.canvas.height - bullet2.img.height / 2
  ) {
    mainChar.health -= 2;
  }
}

function checkCollision3() {
  if (
    mainChar.x * ctx.canvas.width - mainChar.img.width / 2 <
      bullet3.x * ctx.canvas.width - bullet3.img.width / 2 + bullet3.width &&
    mainChar.x * ctx.canvas.width - mainChar.img.width / 2 + mainChar.width >
      bullet3.x * ctx.canvas.width - bullet3.img.width / 2 + bullet3.width &&
    mainChar.y * ctx.canvas.height - mainChar.img.height / 2 <
      bullet3.y * ctx.canvas.height - bullet3.img.height / 2 + bullet3.height &&
    mainChar.y * ctx.canvas.height - mainChar.img.height / 2 + mainChar.height >
      bullet3.y * ctx.canvas.height - bullet3.img.height / 2
  ) {
    mainChar.health -= 2;
  }
}

function checkCollision4() {
  if (
    mainChar.x * ctx.canvas.width - mainChar.img.width / 2 <
      bullet4.x * ctx.canvas.width - bullet4.img.width / 2 + bullet4.width &&
    mainChar.x * ctx.canvas.width - mainChar.img.width / 2 + mainChar.width >
      bullet4.x * ctx.canvas.width - bullet4.img.width / 2 + bullet4.width &&
    mainChar.y * ctx.canvas.height - mainChar.img.height / 2 <
      bullet4.y * ctx.canvas.height - bullet4.img.height / 2 + bullet4.height &&
    mainChar.y * ctx.canvas.height - mainChar.img.height / 2 + mainChar.height >
      bullet4.y * ctx.canvas.height - bullet4.img.height / 2
  ) {
    mainChar.health -= 2;
  }
}

function updateGameArea() {
  myGameArea.clear();
  //left
  if (myGameArea.key && myGameArea.key == 65 && mainChar.x > 0.1) {
    mainChar.x -= 0.005;
  }
  //right
  if (myGameArea.key && myGameArea.key == 68 && mainChar.x < 0.9) {
    mainChar.x += 0.005;
  }

  spawnAndSpeedBullets(lv1.bulletSpeed);
  checkCollision1();
  checkCollision2();
  checkCollision3();
  checkCollision4();
  console.log(mainChar.health);
  console.log(bullet1.x);
  mainChar.update();
  requestAnimationFrame(updateGameArea);
}

function startGame() {
  myGameArea.start();
  mainChar = new character(
    "https://img.icons8.com/ultraviolet/80/000000/crystal.png",
    0.5,
    0.9,
    200
  );
  bullet1 = new bulletObj(lv1.bulletAsset, 0.1, 0.2);
  bullet2 = new bulletObj(lv1.bulletAsset, 0.3, 0.2);
  bullet3 = new bulletObj(lv1.bulletAsset, 0.7, 0.2);
  bullet4 = new bulletObj(lv1.bulletAsset, 0.9, 0.2);
  updateGameArea();
}

function resizeCanvasToDisplaySize(canvas) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  // Check if the canvas is not the same size.
  const needResize =
    canvas.width !== displayWidth || canvas.height !== displayHeight;

  if (needResize) {
    // Make the canvas the same size
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }

  return needResize;
}

function background() {
  let ctx = myGameArea.context;
  let spacing = 1 / 5;
  let top = 0.2;
  let bot = 0.75;
  ctx.lineWidth = 5;

  //1
  ctx.beginPath();
  ctx.moveTo(ctx.canvas.width * spacing, ctx.canvas.height * top);
  ctx.lineTo(ctx.canvas.width * spacing, ctx.canvas.height * bot);
  ctx.stroke();

  //2
  ctx.beginPath();
  ctx.moveTo(ctx.canvas.width * spacing * 2, ctx.canvas.height * top);
  ctx.lineTo(ctx.canvas.width * spacing * 2, ctx.canvas.height * bot);
  ctx.stroke();

  //3
  ctx.beginPath();
  ctx.moveTo(ctx.canvas.width * spacing * 3, ctx.canvas.height * top);
  ctx.lineTo(ctx.canvas.width * spacing * 3, ctx.canvas.height * bot);
  ctx.stroke();

  //4
  ctx.beginPath();
  ctx.moveTo(ctx.canvas.width * spacing * 4, ctx.canvas.height * top);
  ctx.lineTo(ctx.canvas.width * spacing * 4, ctx.canvas.height * bot);
  ctx.stroke();
}
try {
  startGame();
} catch (e) {
  alert(e.stack);
}
