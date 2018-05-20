

// player1.addEventListener('keydown', (e) => {
//   player1.style.left = parseInt(player1.style.left) + 5 + 'px';
//   console.log(e.key);
// });

// document.addEventListener('keydown', (e) => {
//   moveRight();
//   // e.preventDefault();
// });

const player1 = document.querySelector('.player1'); 
const player2 = document.querySelector('.player2'); 
const finishLine = document.querySelector('.finish-line');
const p1Btn = document.querySelector('.p1Btn');
const p2Btn = document.querySelector('.p2Btn');
const resetBtn = document.querySelector('.reset-btn'); 
const p1scoreDisplay = document.getElementById("p1score");
const p2scoreDisplay = document.getElementById("p2score");
let player1Count = 0;
let player2Count = 0;

// Display scores
function updateScores(){
  p1scoreDisplay.textContent = player1Count;
  p2scoreDisplay.textContent = player2Count;
}

// Reset scores
function resetScores(){
  player1Count = 0;
  player2Count = 0;
  updateScores();
  resetPlayerPositions();
}

function resetPlayerPositions(){
  player1.style.left = 0 + "px";
  player2.style.left = 0 + "px";
}

updateScores();

p1Btn.addEventListener('click', (e) => moveRight(e, player1));
p2Btn.addEventListener('click', (e) => moveRight(e, player2));

// enable mutli-touch button presses for mobile devices

// Log events flag
var logEvents = false;

// Touch Point cache
var tpCache = new Array();

function set_handlers(name) {
  console.log("touch event");
  // Install event handlers for the given element
  var el = document.querySelector(name);
  el.ontouchstart = start_handler;
  // Use same handler for touchcancel and touchend
  el.ontouchcancel = end_handler;
  el.ontouchend = end_handler;
}

function start_handler(e) {
  e.preventDefault();
  if (e.targetTouches.length == 2) {
    for (var i = 0; i < e.targetTouches.length; i++) {
      tpCache.push(e.targetTouches[i]);
    }
  }
  if (logEvents) log("touchStart", e, true);
  if (e.target.className === 'mobile-btn p1Btn'){
    moveRight(e, player1);
  }
  if (e.target.className === 'mobile-btn p2Btn') {
    moveRight(e, player2);
  }

  // update_background(ev);
}

const youWin = function(player) {
  alert("you win!");
  player1.style.left = 0 + "px";
  player2.style.left = 0 + "px";
  player.className === 'player1' ? player1Count += 1 : player2Count += 1;
  updateScores();
}

function end_handler(ev) {
  ev.preventDefault();
  if (logEvents) log(ev.type, ev, false);
  if (ev.targetTouches.length == 0) {
    
  }
}

function init() {
  set_handlers(".p1Btn");
  set_handlers(".p2Btn");
}

init();


resetBtn.addEventListener('click', (e) => resetScores());

let down = false;
document.addEventListener('keydown', (e) => {
  e.preventDefault();
  if(down) return;
  down = true;
  console.log(e.keyCode);
  switch (e.keyCode) {
    case 37:
      setTimeout(moveLeft(player1), 500);
    break;
    
    case 39:
      moveRight(e, player1);
    break;
    
    case 38:
      moveUp(player1);
    break;
    
    case 40:
      moveDown(player1);
    break;

    case 65:
      moveLeft(player2);
      // moveLeft(player2);
      break;

    case 68:
      moveRight(e, player2);
      break;

    case 87:
      moveUp(player2);
      break;

    case 83:
      moveDown(player2);
      break;
  }
}, false);

document.addEventListener('keyup', (e) => {
  down = false;
});

function moveLeft(player){
  // let left = parseInt(player1.style.left);
  if ((parseInt(player.style.left)) > 0){
    player.style.left = parseInt(player.style.left) - 30 + "px";
  }
}

const moveRight = function(e, player){
  console.log(player);
  if ((parseInt(player.style.left)) <= parseInt(finishLine.style.left)-95) {
    player.style.left = parseInt(player.style.left) + 30 + "px";
    if ((parseInt(player.style.left)) >= parseInt(finishLine.style.left) - 95) {
      setTimeout(youWin, 250, player);
    }
  }

}
function moveUp(player){
  if ((parseInt(player.style.top)) > 0) {
    player.style.top = parseInt(player.style.top) - 30 + "px";
  }
}
function moveDown(player){
  player.style.top = parseInt(player.style.top) + 30 + "px";
}
