  var Play = 1;
  var End = 0;
  var gameState=Play;

  var monkey , monkeyImage , back , backgroundImage , invisibleGround;
  var banana , bananaImage , stone , stoneImage;
  var FoodGroup , obstacleGroup;

  var gameOver , restart , gameOverImage , restartImage; 

  var score;


function preload(){
 backgroundImage = loadImage("jungle.jpg");
  
  monkeyImage= loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage=loadImage("banana.png");
  stoneImage=loadImage("stone.png");
  
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png")
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  back = createSprite(windowWidth/2,windowHeight/2,20,20);
  back.addImage(backgroundImage);
  
  monkey = createSprite(50,windowHeight-70,20,20)
  monkey.addAnimation("monkeyRunning",monkeyImage);
  monkey.scale=0.10;
  
  invisibleGround = createSprite(50,windowHeight-30,windowWidth,10);
  invisibleGround.visible=false;
  
//   monkey.setCollider("circle",0,0   );
//   monkey.debug=true
  
  FoodGroup= new Group();
  obstacleGroup = new Group();
  score=0;
}

function draw() {
  background(220);
   drawSprites()
  monkey.collide(invisibleGround);
  stroke("white");
     textSize(20);
     fill("white");
     text("Score: "+score,450,50)
  camera.position.x=monkey.x+250;
  camera.position.y=monkey.y-150;
  if(gameState===Play){
     back.velocityX=-3;
    
     
    
  if(back.x<200){
  back.x=back.width/2
  }
    
    if(keyDown("space")&&monkey.y>windowHeight-100){
      monkey.velocityY=-15
    }
   monkey.velocityY=monkey.velocityY+0.8;
    
    spawnBanana()
  spawnObstacles()
    
    if(FoodGroup.isTouching(monkey)){
      score = score+2;
      FoodGroup.destroyEach()
    }
   switch(score){
      case 10:monkey.scale=0.12;
              break;
      case 20:monkey.scale=0.14;
              break;
      case 30 :monkey.scale=0.16;
              break;
      case 40:monkey.scale=0.18;
              break;
      default:break;
   }
    
    if(obstacleGroup.isTouching(monkey)){
      score=score-4;
      monkey.scale=0.10;
      obstacleGroup.destroyEach();
    }
    if(score<0){
      gameState=End;
    }
  }
 else if(gameState===End){
    text("GAME OVER ",windowWidth/2-100,windowHeight/2-50);
    text("Press R o Restart",windowWidth/2-100,windowHeight/2)
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    back.velocityX=0;
  }
  if(keyDown("R")&&gameState===End){
    console.log("working")
    gameState=Play;
  //  monkey.setAnimation(monkeyImage);
    score=0;
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
  }
  
 
  
  
}
function spawnBanana(){
  if(frameCount % 80 === 0){
    banana = createSprite(400,200,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.065;
    banana.y=Math.round(random(windowHeight-200,windowHeight-300,window));
    banana.velocityX=-4;
    banana.lifetime=400;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300===0){
    stone = createSprite(windowWidth,windowHeight-70,20,20);
    stone.addImage("obstacles",stoneImage);
    stone.scale=0.175;
    stone.velocityX=-4;
    stone.lifetime=300;
    
    obstacleGroup.add(stone);
    
  }
  
}
// function reset(){
//   gameOver = createSprite(windowWidth/2,windowHeight/2-50,20,20);
//   gameOver.addImage(gameOverImage);
 
  
//   restart=createSprite(windowWidth/2,windowHeight/2,20,20);
//   restart.addImage(restartImage);
//   restart.scale=0.5;
  
// }


