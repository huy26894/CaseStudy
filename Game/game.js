let canvas = document.getElementById("snake");
let ctx = canvas.getContext("2d");

let box = 25;

let foodImg = new Image();
foodImg.src = "image/food.png";

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();
// let music = new Audio();

// music.src = "audio/play.mp3"
dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

let snake = [];

snake[0] =
    {
        x: 9 * box,
        y: 10 * box
    };

let food =
{
    x: Math.floor(Math.random() * 24) * box,
    y: Math.floor(Math.random() * 24) * box
}

let score = 0;

let d;
let imgplay = document.getElementById("play");
let imgGameOver = document.getElementById("GameOver");
let imgReplay = document.getElementById("Replay");

document.addEventListener("keydown", direction);
function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        left.play();
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
        up.play();
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
        right.play();
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
        down.play();
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}
function disPlay() {
    play.style.display= "none"
}

function drew() {

    ctx.clearRect(0, 0, 608, 608);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "orange" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "0000ff";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 24) * box,
            y: Math.floor(Math.random() * 24) * box
        }

    } else {
        snake.pop();
    }

    let newHead =
    {
        x: snakeX,
        y: snakeY
    }

    if (snakeX < 0 || snakeX > 600 - 25 || snakeY < 0 || snakeY > 600 - 25 || collision(newHead, snake)) {
        clearInterval(game);
        
        dead.play();
        imgReplay.style.display = "block";
        imgGameOver.style.display = "block";
        

    }

    snake.unshift(newHead);

    ctx.fillStyle = "black";
    ctx.font = "20px Changa one";
    ctx.fillText("Score: " + score, canvas.width - 80, 20);
}

let game = setInterval(drew, 110);

function StarGame() {
    location.reload()  
}