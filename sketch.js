
var mountainbg, mt;
var plr, plrAn;
var edges;
var sb, sbGroup, sbImage, sbHitSound;
var score, oxygen;
var o2CanistersImg;
var coin, coinImg, coinsGroup;
var monster, monsterAn, flippedMonsterAn, monsterRoarSound, monsterGroup;
var invisEdge1, invisEdge2;
var windSound;
var warningSound
var gameEndImg, gameEndSound;
var o2tank, o2Img, o2Group;
var gameState = 0;

function preload(){
  mountainbg = loadImage("mt.png");
  o2Img = loadImage("02tank.png");
  plrAn = loadAnimation("player1.png","player2.png","player3.png","player4.png","player5.png","player6.png","player7.png","player8.png","player9.png");
  sbImg = loadImage("sb.png");
  monsterAn = loadAnimation("monster1.png","monster2.png","monster3.png","monster4.png","monster5.png","monster6.png","monster7.png","monster8.png","monster9.png");
  flippedMonsterAn = loadAnimation("fm1.png","fm2.png","fm3.png","fm4.png","fm5.png","fm6.png","fm7.png","fm8.png","fm9.png");
  coinImg = loadImage("coin.png");
  windSound = loadSound("wind.mp3");
  warningSound = loadSound("warning.mp3");
  sbHitSound = loadSound("smack.mp3");
  monsterRoarSound = loadSound("roar.mp3");
  gameEndSound = loadSound("trombone.mp3")
  gameEndImg = loadImage("gameendimg.jpg");
}

function setup(){
  createCanvas(800, 800);
  mt = createSprite(420, 400, 200, 200);
  mt.addImage(mountainbg);
  mt.scale = 4;
  //mt.x = mt.width/2
  mt.y = mt.height/2;
  
  plr = createSprite(300, 500, 40, 40)
  plr.addAnimation("climbing_player",plrAn);
  plr.scale = 0.5

  score = 0;
  oxygen = 100
  edges = createEdgeSprites();

  sbGroup = new Group();
  monsterGroup = new Group();
  o2Group = new Group();
  coinsGroup = new Group();

  invisEdge1 = createSprite(400, 150, 800, 10);
  invisEdge1.visible = false;
  invisEdge2 = createSprite(400, 600, 800, 10)
  invisEdge2.visible = false;
}

function draw(){
  background("black");
  if(gameState === 0){
    mt.velocityY = 3;
    if(mt.y > 500){
      mt.y = mt.height/2;
    }
    
    if(keyDown("right")){
      plr.x +=  10;
    }
    if(keyDown("left")){
      plr.x -= 10;
    }
    if(keyDown("up")){
      plr.y -=  10;
    }
    if(keyDown("down")){
      plr.y += 10;
    }
    windSound.loop();

    createSnowBalls();
    demon();
    createOxygenTanks();
    createCoins();

    oxygen = oxygen - 0.01;
    if(plr.isTouching(sbGroup)){
      gameState = 1
      sbHitSound.play();
    }
    if(plr.isTouching(coinsGroup)){
      score = score + 1
      coinsGroup.destroyEach();
    }
    if(plr.isTouching(monsterGroup)){
      gameState = 1
      monsterRoarSound.play();
    }
    if(plr.isTouching(o2Group)){
      oxygen = oxygen + 10;
      o2Group.destroyEach();
    }
    if(oxygen <= 0){
      gameState = 1
    }
    plr.collide(edges[0]);
    plr.collide(edges[1]);
    plr.collide(invisEdge1);
    plr.collide(invisEdge2);
    drawSprites();
    textSize(20);
    fill("blue");
    text("Oxygen Tank: " + Math.round(oxygen), 50, 50);
    textSize(20);
    fill("blue");
    text("Score: " + score, 50, 100);

  }else if(gameState === 1){
    gameEndSound.play();
    textSize(40);
    fill("red");
    text("GAME OVER", 300, 400);
  }

  
}
function destroyEverything(){
  sbGroup.destroyEach();
  monsterGroup.destroyEach();
  coinsGroup.destroyEach();
  o2Group.destroyEach();
  plr.destroy();
}
function createSnowBalls(){
   if(frameCount%100 === 0){
     sb = createSprite(400, 0, 50, 50);
     sb.velocityY = 8;
     sb.x = Math.round(random(150, 650));
     sb.addImage(sbImg);
     sbGroup.add(sb);
     sb.lifetime = 100;
   }
}
function demon(){
  if(frameCount%200 === 0){
      monster = createSprite(400, 350, 50, 50);
      var randomSide = Math.round(random(1,2));
      if(randomSide === 1){
         monster.x = 0;
         monster.velocityX = 14;
         monster.addAnimation("running_monster", monsterAn);
      } else{
        monster.x = 800;
        monster.velocityX = -14;
        monster.addAnimation("flipped_running_monster", flippedMonsterAn);
      }
      monster.y = Math.round(random(300, 500));
      monster.scale = 0.7;
     //monster.velocityX = 10;//(-10 + score/1000)     
      monster.lifetime = 60;   
      monsterGroup.add(monster);

    }
}
function createOxygenTanks(){
  if(frameCount%150 === 0){
    o2tank = createSprite(20, 0, 20, 20);
    o2tank.addImage(o2Img);
    o2tank.velocityY = 8
    o2tank.scale = 0.2;
    var randomSide = Math.round(random(1, 2));
    if(randomSide === 1){
      o2tank.x = 50;
    }else{
      o2tank.x = 650;
    }
    o2Group.add(o2tank);
    o2tank.lifetime = 100
  }
}
function createCoins(){
  if(frameCount%50 === 0){
    coin = createSprite(20, 0, 20, 20);
    coin.addImage(coinImg);
    coin.velocityY = 6
    coin.scale = 0.05
    coin.x = Math.round(random(100, 600));
    coinsGroup.add(coin)
    coin.lifetime = 135; 
  }
}