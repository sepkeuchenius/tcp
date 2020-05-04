
var myGamePiece;
var mousex;
var mousey
function startGame() {
    myGamePiece = new component(30, 30, "red", (dimension[0] - 270 )/ 2, (dimension[1] - 270 )/ 2);
    myGameArea.start();
}
var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];
var myGameArea = {

    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = dimension[0] - 300;
        this.canvas.height = dimension[1] - 100;
        this.canvas.onmousemove = handleMouseMove
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        run()
        this.interval2 = setInterval(updateDirection, 1000)
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
      if((this.x - mousex)**2 + (this.y - mousey)**2 < 200){console.log('hit')}
      // if(this.x < 0 || this.x > myGameArea.canvas.width){
      //   this.speedX *= -1
      // }
      // if(this.y < 0 || this.y > myGameArea.canvas.height){
      //   this.speedY *= -1
      // }
        this.x += this.speedX;
        this.y += this.speedY;
    }
}
var sec = 0;
var n = [0,-1]
var s = [0, 1]
var w = [-1,0]
var e = [1,0]
var directionUpdates = {
  1: s,
  3: e,
  5: n,
  7: w,
  9: s,
  11: n,
  12: s,
  14: e,
  17: s,
  19: e,
  20: n
}
var high_beeps = [2, 5, 9, 14, 20, 22, 25, 28, 29, 30, 34, 39, 41, 48, 55, 59]
var low_beeps = [3, 8, 12, 16, 19, 24, 31, 35, 40, 45, 50, 52, 53, 57]
var beeps = {}
for(var i in low_beeps){
  beeps[low_beeps[i]] = 1
  if(high_beeps[i]){
    beeps[high_beeps[i]] = 2
  }
}
var audio_low = document.getElementById('audio-low')
var audio_high = document.getElementById('audio-high')
function updateDirection(){
  if(directionUpdates[sec]){
    myGamePiece.speedX = directionUpdates[sec][0] * 1.5
    myGamePiece.speedY = directionUpdates[sec][1] * 1.5
  }
  if(beeps[sec]){
    console.log(beeps[sec])
    if(beeps[sec] == 1){
      audio_low.play()
    }
    else if(beeps[sec] == 2){
      audio_high.play()
    }
  }
  sec++
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
  // num = Math.random() * 2
  // num2 =Math.random() * 2
  // num *=  Math.floor(Math.random()*2) == 1 ? 1 : -1;
  // num2 *=  Math.floor(Math.random()*2) == 1 ? 1 : -1;
  // myGamePiece.speedX = num
  // myGamePiece.speedY = num2
}
function handleMouseMove(event) {
      mousex =  event.clientX;
      mousey = event.clientY;
}
