var bg,bgImg;
var player, shooterImg, shooter_shooting;
var isMobile;
var arriba, abajo;
var enemy, enemy2, enemy3;
var enemy1Group, enemy2Group, enemy3Group;
var enemyImg1, enemyImg2, enemyImg3;
var fire, fireImg, fireGroup, fires = 70;+ç
var impactos = 3;

function preload(){
  
  shooterImg = loadImage("assets/Nave.png");
  shooter_shooting = loadImage("assets/Nave.png");

  bgImg  = loadImage("assets/Fondo.png");

  enemyImg1 = loadImage("assets/enemigo1.png");
  enemyImg2 = loadImage("assets/enemigo2.png");
  enemyImg3 = loadImage("assets/enemigo3.png");

  fireImg = loadImage("assets/fire.png");

}

function setup() {

//tamaños de canvas
  isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth, displayHeight);    
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }
  
 //creando sprite invisible
 arriba = createSprite(windowWidth-1600, windowHeight-850, 50,5);
 arriba.debug = false;
 //arriba.visible = false;
 
 abajo = createSprite(windowWidth-1600, windowHeight+10, 50,5);
 abajo.debug = false;
 //abajo.visible = false;
 
 //creando grupos
 fireGroup = new Group();
 enemy1Group = new Group();
 enemy2Group = new Group();
 enemy3Group = new Group();

 //creando el sprite del jugador 
 player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
    player.scale = 0.3
    player.debug = false
    player.setCollider("rectangle",0,0,300,230);


}

function draw() {
  background(0); 
  image(bgImg,0,0,displayWidth+500,displayHeight);  
  imageMode(CENTER);
  spawnenemy1();
  spawnenemy2();
  spawnenemy3();

  //mover al jugador hacia arriba y hacia abajo y hacer que el juego sea compatible con dispositivos móviles usando toques
if(keyDown("UP_ARROW") || player.collide(abajo)){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW") || player.collide(arriba)){
 player.y = player.y+30
}

//libera balas y cambia la imagen del tirador a la posición de disparo cuando se presiona el espacio
if(keyWentDown("space")){
  player.addImage(shooter_shooting); 
}

//el jugador vuelve a la imagen de pie original una vez que dejamos de presionar la barra espaciadora
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
   

if(isMobile){
  arriba.x = windowHeight;
  arriba.y = windowHeight;

  abajo.x = windowWidth;
  abajo.y = windowHeight;

  player.x = 70;
  //player.y = 348;
  player.scale = 0.2;
  if(player.y < 468 && keyDown("DOWN_ARROW")){//abajo
    // player.x = 70;
    player.y = 483;
    player.y = player.y-15
  } 
  if(player.y > 248 && keyDown("UP_ARROW")){//arriba
    // player.x = 70;
    player.y = 248;
    player.y = player.y+15  
    
  }
  console.log(player.y) 
}

// Liberar balas y cambiar la imagen del tirador a posición de tiro cuando se presiona la barra espaciadora. 
if(keyWentDown("space")){ 
  fire = createSprite(displayWidth-1130,player.y,20,10) 
  fire.velocityX = 20
  fireGroup.add(fire)
  player.depth = fire.depth
  player.depth = player.depth+2 
  fire.addImage(fireImg)
  fires = fires-1 
  fire.scale = 0.8
}

// Destruye al zombi cuando una bala lo toca 
if(enemy1Group.isTouching(fireGroup)){
   for(var i=0;i<enemy1Group.length;i++){
     if(enemy1Group[i].isTouching(fireGroup)){
        enemy1Group[i].destroy()
        fireGroup.destroyEach() 
     } 
   }
}

if(enemy2Group.isTouching(fireGroup)){
  for(var i=0;i<enemy2Group.length;i++){
    if(enemy2Group[i].isTouching(fireGroup)){
       enemy2Group[i].destroy()
       fireGroup.destroyEach() 
    } 
  }
}

if(enemy3Group.isTouching(fireGroup)){
  for(var i=0;i<enemy3Group.length;i++){
    if(enemy3Group[i].isTouching(fireGroup) && impactos>0){
      impactos -= 1;
    }else{
       enemy3Group[i].destroy()
       fireGroup.destroyEach() 
    }
  }
}

drawSprites();

}

function spawnenemy1(){
  if (frameCount % 100 == 0 ){
    enemy = createSprite(windowWidth+20,windowHeight/2,50,50);
    enemy.addImage(enemyImg1);
    enemy.y = Math.round(random(75,windowHeight-75));
    enemy.setCollider("rectangle");
    enemy.velocityX = -5
    enemy.debug = false;
    enemy.scale = 0.15;
    enemy.lifetime = 2000;
    enemy1Group.add(enemy);
  }
}

function spawnenemy2(){
  if  (frameCount % 150 == 0 ){
    enemy2 = createSprite(windowWidth+20,windowHeight/2,50,50);
    enemy2.addImage(enemyImg2);
    enemy2.y = Math.round(random(75,windowHeight-75));
    enemy2.setCollider("rectangle");
    enemy2.velocityX = -6
    enemy2.debug = false;
    enemy2.scale = 0.3;
    enemy2.lifetime = 2000;
    enemy2Group.add(enemy2);
  }
}

function spawnenemy3(){
  if (frameCount % 200 == 0){
    enemy3 = createSprite(windowWidth+20,windowHeight/2,50,50);
    enemy3.addImage(enemyImg3);
    enemy3.y = Math.round(random(75,windowHeight-75));
    enemy3.setCollider("rectangle")
    enemy3.velocityX = -3
    enemy3.debug = true;
    enemy3.scale = 0.3;
    enemy3.lifetime = 3000;
    enemy3Group.add(enemy3);
  }
}