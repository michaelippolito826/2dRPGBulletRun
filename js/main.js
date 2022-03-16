const myGameArea = {
  canvas : document.getElementById("canvas"),
  start : function() {
    this.context = this.canvas.getContext("2d");
    resizeCanvasToDisplaySize(this.context.canvas);
    this.interval = setInterval(updateGameArea, 1000 / 10);
    window.addEventListener('keydown', function (e) {
      myGameArea.key = e.keyCode;
    })
    window.addEventListener('keyup', function (e) {
      myGameArea.key = false;
    })
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};

function character(src, xP, yP) {
  this.x = xP;
  this.y = yP;
  this.img = new Image();
  this.img.src = src;
  this.update = function(){
    ctx = myGameArea.context;
    if (this.x > .9) {
      this.x = .9;
    }
    if (this.y < .1) {
      this.x = .1;
    }
    ctx.drawImage(this.img, (this.x * ctx.canvas.width) - this.img.width/2, (this.y * ctx.canvas.height) - this.img.height/2);
    background();
  };
}

function updateGameArea() {
  myGameArea.clear();
  //left
  if (myGameArea.key && myGameArea.key == 65 && mainChar.x > .1) {mainChar.x -= .2; }
  //right
  if (myGameArea.key && myGameArea.key == 68 && mainChar.x < .9) {mainChar.x += .2; }
  mainChar.update();
  bullet.update();
}

function startGame() {
  myGameArea.start();
  mainChar = new character("https://img.icons8.com/ultraviolet/80/000000/crystal.png", .5, .9);
  bullet = new character("https://img.icons8.com/ultraviolet/40/000000/flash-on.png", .5, .25);
}

function resizeCanvasToDisplaySize(canvas) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth  = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;
 
  // Check if the canvas is not the same size.
  const needResize = canvas.width  !== displayWidth ||
                     canvas.height !== displayHeight;
 
  if (needResize) {
    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
 
  return needResize;
}

function background() {
  let ctx = myGameArea.context;
  let spacing = 1 / 5;
  let top = .2;
  let bot = .75;
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
try{
startGame();

}catch(e){alert(e.stack)}
