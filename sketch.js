var backImage, backgr;
var player, player_running;
var ground, ground_img;
var bananaImage, obstacleImage;
var bananaGroup, obstacleGroup;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var score = 0;

function preload() {
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800, 400);

  backgr = createSprite(0, 0, 800, 400);
  backgr.addImage(backImage);
  backgr.scale = 1.5;
  backgr.x = backgr.width / 2;
  backgr.velocityX = -4;

  player = createSprite(100, 340, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.1;

  ground = createSprite(400, 350, 800, 10);
  ground.x = ground.width / 2;
  ground.visible = false;

  bananaGroup = new Group();
  obstacleGroup = new Group();

}

function draw() {
  background(0);


  if (gameState === PLAY) {

    if (player.isTouching(obstacleGroup)) {
      gameState = END;
    }

    if (player.isTouching(bananaGroup)) {
      score = score + 10;
      player.scale = player.scale + 0.05;
      bananaGroup.destroyEach();
    }

    if (backgr.x < 100) {
      backgr.x = backgr.width / 2;
    }

    if (keyDown("space")) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;

    player.collide(ground);

  }

  else if (gameState === END) {
    background("black");
    textSize(20);
    fill("red");
    text("GAME OVER", 320, 200);
    player.destroy();
    backgr.destroy();
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();

  }

  spawnObstacles();

  spawnBananas();

  drawSprites();

  fill("red");
  text("Score: " + score, 600, 100);
}


function spawnBananas() {
  if (frameCount % 120 === 0) {
    var banana = createSprite(800, random(100, 300));
    banana.addImage("banana", bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    bananaGroup.add(banana);
    banana.lifetime = 800 / 5;
  }
}

function spawnObstacles() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(800, 320);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 800 / 5;
  }
}