const game = document.getElementById('game');
const car = document.getElementById('car');
const obstacles = document.getElementById('obstacles');
const score = document.getElementById('score');
const CAR_WIDTH = 80;
const OBSTACLE_WIDTH = 50;
const OBSTACLE_HEIGHT = 80;
const GAME_WIDTH = game.clientWidth;
const GAME_HEIGHT = game.clientHeight;

let carX = GAME_WIDTH / 2 - CAR_WIDTH / 2;
let obstacleSpeed = 2;
let scoreValue = 0;
let obstacleIntervalId;

game.addEventListener('keydown', moveCar);

function moveCar(event) {
  const key = event.key;
  if (key === 'ArrowLeft' && carX > 0) {
    carX -= 20;
  } else if (key === 'ArrowRight' && carX + CAR_WIDTH < GAME_WIDTH) {
    carX += 20;
  }
  car.style.left = `${carX}px`;
}

function spawnObstacle() {
  const obstacleX = Math.floor(Math.random() * (GAME_WIDTH - OBSTACLE_WIDTH));
  const obstacle = document.createElement('div');
  obstacle.className = 'obstacle';
  obstacle.style.left = `${obstacleX}px`;
  obstacles.appendChild(obstacle);
  animateObstacle(obstacle);
}

function animateObstacle(obstacle) {
  let obstacleY = -OBSTACLE_HEIGHT;
  obstacleIntervalId = setInterval(() => {
    if (obstacleY + OBSTACLE_HEIGHT >= GAME_HEIGHT) {
      clearInterval(obstacleIntervalId);
      obstacles.removeChild(obstacle);
    } else {
      obstacleY += obstacleSpeed;
      obstacle.style.bottom = `${obstacleY}px`;
      checkCollision(obstacle);
    }
  }, 10);
}

function checkCollision(obstacle) {
  const carRect = car.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();
  if (
    carRect.right >= obstacleRect.left &&
    carRect.left <= obstacleRect.right &&
    carRect.bottom >= obstacle
