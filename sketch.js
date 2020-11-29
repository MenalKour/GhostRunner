var PLAY=1;
var END=0;
var gameState=PLAY;
var tower,toweImage;
var door,doorImage,doorsGroup;
var climber,climberImage,climbersGroup;
var ghost,ghostImage,ghostImage2;
var invisibleBlock,invisibleBlockGroup;
var score=0;
var spookySound;




function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  ghostImage2=loadImage("ghost-jumping.png");
  
  spookySound=loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=3;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImage)
 ghost.scale=0.35;
  
 
  
  ghost.setCollider("rectangle",0,0,100,ghost.height);
  
  doorsGroup= new Group();
  climbersGroup= new Group();
  invisibleBlockGroup= new Group();
  
}

function draw(){
  background("black")
    
  if (gameState===PLAY){
   
  
  if(tower.y>600){
    tower.y=300
     
  }
    
  if(keyDown("space")){
    ghost.velocityY=-2;
    ghost.addImage(ghostImage2)
    
}
  ghost.velocityY+=0.8;
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
    score=score+Math.round(getFrameRate()/60)
    spawnDoor();
  if(climbersGroup.isTouching(ghost)){
    
    ghost.velocityY=0;
    ghost.addImage(ghostImage)
    
     
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    gameState=END;
   
  }
  }
   
  
    if(gameState===END){
       ghost.destroy();
      
   climbersGroup.destroyEach();
    doorsGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
    tower.destroy();
      
    }
      
    fill("orange")
    textSize(50);
    text("GAME OVER",180,250)
       
 

  drawSprites();


  textSize(20)
    text("Score: "+score,500,50);
  
  
}
function spawnDoor(){
  if(frameCount%160===0){
    door=createSprite(200,-50);
    door.addImage(doorImage);
    door.velocityY=3;
 door.x=Math.round(random(120,400));
    door.lifetime=300;
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    doorsGroup.add(door);
    climber=createSprite(200,10);
    climber.addImage(climberImage);
    climber.velocityY=3;
    climber.x=door.x;
    climber.lifetime=300;
     
    climbersGroup.add(climber);
     invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.velocityY=3;
    invisibleBlock.x=door.x
    invisibleBlock.lifetime=300;
    
    
    invisibleBlockGroup.add(invisibleBlock)
  }
  
}

