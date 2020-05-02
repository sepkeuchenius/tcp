
var myGamePiece;
var missed = []
function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGameArea.start();
}
var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];
var myGameArea = {

    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = dimension[0];
        this.canvas.height = dimension[1];
        this.canvas.onmousemove = handleMouseMove
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        run()
        this.interval2 = setInterval(updateDirection, 5000)
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    // this.style.borderRadius = "50%";
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
      if(this.x < 0 || this.x > myGameArea.canvas.width){
        this.speedX *= -1
      }
      if(this.y < 0 || this.y > myGameArea.canvas.height){
        this.speedY *= -1
      }
        this.x += this.speedX;
        this.y += this.speedY;
    }
}
function updateDirection(){
  console.log(missed)
  num = Math.random() * 2 + 2
  num2 = Math.random() * 2 + 2
  num *=  Math.floor(Math.random()*2) == 1 ? 1 : -1;
  num2 *=  Math.floor(Math.random()*2) == 1 ? 1 : -1;
  myGamePiece.speedX = num
  myGamePiece.speedY = num2

}
function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

function moveup() {
    myGamePiece.speedY -= 1;
}

function movedown() {
    myGamePiece.speedY += 1;
}

function moveleft() {
    myGamePiece.speedX -= 1;
}

function moveright() {
    myGamePiece.speedX += 1;
}
function run(){
  num = Math.random() * 2
  num2 =Math.random() * 2
  num *=  Math.floor(Math.random()*2) == 1 ? 1 : -1;
  num2 *=  Math.floor(Math.random()*2) == 1 ? 1 : -1;
  myGamePiece.speedX = num
  myGamePiece.speedY = num2
}
function handleMouseMove(event) {
      missed.push((myGamePiece.x + 15) - event.clientX)
}
