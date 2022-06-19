var wood, woodImg
var knivesImg, knives
var appleImg, apple
var applesGroup
var score = 0
var edges
var PLAY = 1
var END = 0
var WON = 2
var gameState = PLAY
var gameOverImg
var winnerImg
var level = 1
var vy = 10
function preload() {
  woodImg = loadImage("images/wood.png")
  knivesImg = loadAnimation("images/knives.png")
  appleImg = loadImage("images/apple.png")
  gameOverImg = loadAnimation("images/gameover.jpg")
  winnerImg = loadAnimation("images/Winner.jpg")
}
function setup() {

  createCanvas(800, 600);
  wood = createSprite(400, 200, 800, 400)
  wood.addImage(woodImg)
  wood.scale = 2
  knives = createSprite(145, 324, 100, 150)
  knives.addAnimation("knives", knivesImg)
  knives.addAnimation("gameOver", gameOverImg)
  knives.addAnimation("winner", winnerImg)
  knives.scale = 0.25
  // apple = createSprite(250, 325, 140, 120)
  // apple.addImage(appleImg)
  // apple.scale = 0.30
  applesGroup = new Group()
  edges = createEdgeSprites()


}

function draw() {
  background(235, 253, 223);
  if (gameState === PLAY) {


    knives.x = mouseX
    knives.y = mouseY
    spawnApple()
    if (applesGroup.isTouching(knives)) {
      applesGroup.destroyEach()
      score = score + 5
    }
    if ( score>0 && score %25 === 0) {
      level=level+1
      vy+=2
      score =score+10
      applesGroup.setVelocityYEach(vy)
    }
    if (level === 15) {
      gameState = WON
    }
    if (applesGroup.isTouching(edges[3])) {
      gameState = END
    }
    
  }
  if (gameState === END) {
    applesGroup.destroyEach()
    knives.x = 400
    knives.y = 300
knives.changeAnimation("gameOver")
  }
  if (gameState === WON) {
    applesGroup.destroyEach()
    knives.x = 400
    knives.y = 300
    knives.changeAnimation("winner")
  }
  //image(wood,width/2,height,800,400)
  drawSprites();
  fill("black")
  textSize(20)
  text("score:" + score, 700, 50)
text("level:" +level, 50,50)
}
function spawnApple() {
  //write code here to spawn the apples
  if (frameCount % 60 === 0) {
    apple = createSprite(400, 0, 40, 10);
    apple.x = Math.round(random(30, 770));
    apple.addImage(appleImg);
    apple.scale = 0.30;
    apple.velocityY = vy 

    //assign lifetime to the variable
    apple.lifetime = 200;

    //adjust the depth
    apple.depth = knives.depth;
    knives.depth = knives.depth + 1;

    //add each apple to the group
    applesGroup.add(apple);
  }
}


