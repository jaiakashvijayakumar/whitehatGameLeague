//Game States
var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,monster,fruitGroup,enemyGroup, score,r,randomFruit,gameover,start
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage,bg,resatartImg;


function preload(){
  
  swordImage = loadImage("santi.png");
  monsterImage = loadImage("corona.png")
  fruit1 = loadImage("bomb.png");
  fruit2 = loadImage("bomb.png");
  fruit3 = loadImage("bomb.png");
  fruit4 = loadImage("bomb.png");
  gameOverImage = loadImage("re.png")
  bg = loadImage("city.png")
   
}



function setup() {
  createCanvas(800, 500);
  
  //creating sword
   sword=createSprite(50,250,0,0);
   sword.addImage(swordImage);
   sword.scale=0.2
  
  
  //set collider for sword
  sword.setCollider("rectangle",0,0,40,40);
  
  gameover =  createSprite(200,200,10,10)
  gameover.addImage(gameOverImage)
  gameover.visible = false
  
  
  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
  
  background(bg);
  
   //Display score
  fill('black');
  text("Score : "+ score,300,30);
  
  
  
  if(gameState===PLAY){
    
    //Call fruits and Enemy function
    fruits();
    Enemy();
    
    // Move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(enemyGroup.isTouching(sword)){
      enemyGroup.destroyEach();
     
      score=score+1;
    }
     if(fruitGroup.isTouching(sword)){
        gameState = END;
    }
  }
    else if(gameState === END){
         
        
        gameover.visible = true
      
  
  sword.scale = 0.2
      gameover.scale = 0.4
      
      

  
  
 
  
  fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
           
  
  score = 0;
        
       if(mousePressedOver(gameover)) {
        
         restart()
  }
      }
         
    
  
  
  
   drawSprites();
      
}


function Enemy(){
  if(World.frameCount%50===0){
    monster=createSprite(800,900,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%60===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.4;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}


function stop(){
 
  
 
  
  
}

function restart(){
  
   gameState = PLAY;
    gameover.visible = false
    console.log("pressed")
     
    fruitGroup.destroyEach();
        enemyGroup.destroyEach();
  
    
    
}