
var myGamePiece;
var mousex;
var mousey
document.addEventListener('click', click)
function startSound(){
  c = ['c']
  start = true
  sound = true
  sec = 0
  t_3 = 0
  interval_quick = window.setInterval(function(){
    t_3 += 0.050
  },50)
  interval = window.setInterval(function(){
    if(sound && beeps[sec]){
      console.log(beeps[sec])
      if(beeps[sec] == 1){
        audio_low.play()
      }
      else if(beeps[sec] == 2){
        audio_high.play()
      }
    }
    sec++

  },1000)
  window.setTimeout(function(){
    clearInterval(interval)
  clearInterval(interval_quick)
  document.getElementById('mouse_output').innerText = ''
  document.getElementById('click_output').innerText = ''
  document.getElementById('click_output').innerText = buildCSV(c)
  start = false;
},60000)
}

function startBoth() {
    t = 0
    t_3 =0
    c = ['c']
    mouseLog = [['t', 'd']]
    start = true;
    sound = true;
    myGamePiece = new component(30, 30, "red", (dimension[0] - 270 )/ 2, (dimension[1] - 270 )/ 2);
    myGameArea.start();
    // myGameArea.canvas.addEventListener('click', click)
    window.setTimeout(function(){
      clearInterval(myGameArea.interval)
      clearInterval(myGameArea.interval2)
      clearInterval(myGameArea.mousInterval)
      myGameArea.clear();
      myGameArea.canvas.remove()
      document.getElementById('mouse_output').innerText = ''
      document.getElementById('click_output').innerText = ''
      document.getElementById('mouse_output').innerText = buildCSV(mouseLog)
      document.getElementById('click_output').innerText = buildCSV(c)

      start = false
    },60000)
}
function startMouse(){
    t = 0
    t_3 =0
    c = []
    mouseLog = [['t', 'd']]
    // mouseLog = ['t', 'd']
   start = true;
   sound = false;
   myGamePiece = new component(30, 30, "red", (dimension[0] - 270 )/ 2, (dimension[1] - 270 )/ 2);
   myGameArea.start();
   window.setTimeout(function(){
     clearInterval(myGameArea.interval)
     clearInterval(myGameArea.interval2)
     clearInterval(myGameArea.mousInterval)
     myGameArea.clear();
     myGameArea.canvas.remove()
     document.getElementById('mouse_output').innerText = ''
     document.getElementById('click_output').innerText = ''
     document.getElementById('output_mouse').innerText = buildCSV(mouseLog)
     start = false
   },60000)
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
        this.mousInterval = setInterval(checkMouse, 100)
        this.interval2 = setInterval(updateDirection, 1000)
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
t = 0
t_3 = 0
var mouseLog = ['t', 'd']
function checkMouse(){
  d = Math.sqrt((myGamePiece.x + (myGamePiece.width / 2) - mousex) ** 2 + (myGamePiece.y + (myGamePiece.height / 2) - mousey) **2)
  mouseLog.push([t.toFixed(1),d])
  t += 0.1
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
var start = false;
var sec = 0;
var n = [0,-1]
var s = [0, 1]
var w = [-1,0]
var e = [1,0]
// At these seconds, the direction is switched either north (n), south (s), west (w), east (e).
var directionUpdates = {
  1: s,
  3: e,
  5: n,
  7: w,
  9: s,
  11: n,
  12: s,
  14: e,
  17: n,
  19: e,
  20: n,
  21:e,
  23:w,
  25:s,
  28:n,
  29:s,
  30:e,
  33:w,
  36:e,
  37:n,
  38:w,
  40:s,
  41:w,
  41:n,
  43:e,
  45:w,
  47:e,
  48:n,
  50:w,
  53:s,
  57:n,
  68:e,
  59:w
}
// At these seconds, either a high tone (high_beeps) or low tone (low_beeps) is played.
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
  if(sound && beeps[sec]){
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
    t_3 += 0.02
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

function handleMouseMove(event) {
      mousex =  event.clientX;
      mousey = event.clientY;
}
c = ['c']
function click(){
  console.log('test')
  if(start){
  c.push(t_3.toFixed(3))
  }
}
function buildCSV(list){
  csv = ''
  for(y in list){
    if(typeof list[y] == 'number' || typeof list[y] =='string'){
      csv += list[y] + ','
    }
    else{
    for(x in list[y]){
      csv+=list[y][x] + ','
    }
    }
    // csv = csv.substring(0, csv.length - 1)
    csv += '\n'
  }
return csv
}
