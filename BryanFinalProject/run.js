
let board ;
let boardWidth =  750;
let boardHeight =250;
let context;

let runnerWidth = 88;
let runnerHeight = 94;
let runnerX = 50;
let runnerY = boardHeight  - runnerHeight ;
let runnerImg;

let runner = {
    x: runnerX,
    y: runnerY,
    width: runnerWidth,
    height: runnerHeight
} ;

let hurdleArray = [];

let hurdleWidth =  50;      
let hurdleHeight =  70;
let hurdleX = 700;
let hurdleY = boardHeight - hurdleHeight;

let hurdleImg;
let velocityX = -8; 
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d") ;

    runnerImg = new Image();
    runnerImg.src = "./img/runner.png ";

    hurdleImg = new Image();
    hurdleImg.src = " ./img/hurdle.png";

    requestAnimationFrame(update);

    setInterval(placeHurdle, 1200);

    document.addEventListener("keydown" , moveRunner);
   }

function update() {

    requestAnimationFrame(update);
    if (gameOver) return;

    context.clearRect(0, 0, board.width, board.height);

    velocityY += gravity;
    runner.y = Math.min(runner.y + velocityY, runnerY) ;

    context.drawImage(runnerImg, runner.x, runner.y, runner.width, runner.height);

    for (let i = 0; i < hurdleArray.length; i++) {
        
        let h = hurdleArray[i] ;
        h.x += velocityX ;
        context.drawImage(hurdleImg, h.x, h.y, h.width, h.height);

        if (detectCollision(runner, h)) {
            gameOver = true;
        }
    }

    
    score++;
    context.fillStyle = "black";
    context.font = "22px Courier";
    context.fillText("Score: " + Math.floor(score / 10), 5, 25);

    if (Math.floor(score / 10) % 200 === 0 && Math.floor(score / 10) !== 0) {
        velocityX *= 1.05;
      }
}  

function moveRunner(e) {
    if (gameOver) return;

    if ((e.code === "Space" || e.code === "ArrowUp") && runner.y === runnerY) {
        velocityY = -10;
      }
  }

function placeHurdle() {
    if (gameOver) return;

    let hurdle = {
        img: hurdleImg ,
        x: hurdleX,
        y: hurdleY ,
        width: hurdleWidth,
        height: hurdleHeight
     };

    hurdleArray.push(hurdle);

    if (hurdleArray.length > 6) {
        hurdleArray.shift();
       }
 }

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
   } 
