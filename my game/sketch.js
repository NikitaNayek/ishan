var bgimg,z1,z2,z3,z4,p1,z1img,z2img,z3img,z4img,p1img
function preload(){
z1img=loadAnimation("backzombie/z1.png","backzombie/z2.png","backzombie/z3.png","backzombie/z4.png")
z2img=loadAnimation("bigzombie/z1.png","bigzombie/z2.png","bigzombie/z3.png","bigzombie/z4.png","bigzombie/z6.png")
z3img=loadAnimation("kidzombie2/z1.png","kidzombie2/z2.png","kidzombie2/z3.png","kidzombie2/z4.png")
p1img=loadAnimation("player/p1.png","player/p2.png","player/p3.png","player/p4.png")
bgimg=loadImage("maxresdefault.jpg")
bimg=loadImage("ghar.png")
bulletimg=loadImage("bullet.png")
m1img=loadAnimation("molotov/m1.png","molotov/m2.png","molotov/m3.png","molotov/m4.png","molotov/m5.png")
goimg=loadImage("go.jpg")
music=loadSound("mujik.mp3")
}
function setup(){
createCanvas(displayWidth,displayHeight)
b=createSprite(40,displayHeight-170,40,120)
b.scale=2.5
b.addImage("building",bimg)
p=createSprite(300,90,40,100)

p.addAnimation("player",p1img)
p.scale=0.74
bz=createSprite(60,80,40,100)
bz.addAnimation("backzom",z1img)
bz.scale=0.85
p.setCollider("circle",0,70,40)
go=createSprite(displayWidth/2,displayHeight/2)
go.addImage("game over",goimg)
go.scale=0.5
go.visible=false
invGr=createSprite(10,170,500,10)
invGr.velocityX=-3
invGr.visible=false
invGr2=createSprite(0,displayHeight-80,displayWidth,10)
invGr2.x=invGr2.width/2
invGr2.velocityX=-3

invGr2.visible=false
bulletGroup=new Group()
zombieGroup=new Group()
moloGroup=new Group()
score=0
music.play()
}
function draw(){
textSize(30)
fill("white")
text("SCOREEEE: " +score, displayWidth-250,20)
    if(invGr2.x<500){
        invGr2.x=invGr2.width/2
    }
    if(keyDown("space")&& p.y>displayHeight-250){
        p.velocityY=-10
    }
    p.velocityY+=1
    bz.velocityY+=1
background(bgimg)
p.collide(invGr)
p.collide(invGr2)
bz.collide(invGr)
bz.collide(invGr2)
zombies()
drawSprites();
bullets();
molotov();
/*
if(bulletGroup.isTouching(zombieGroup)){
    zombieGroup.destroyEach()
    bulletGroup.destroyEach()
    score=score+10

}

*/

for(i =0; i<zombieGroup.length;i++){
   
    if (zombieGroup.get(i).isTouching(bulletGroup)){
      
        zombieGroup.get(i).remove();
        bulletGroup.destroyEach()
      
    }
    
  }


  for(i =0; i<moloGroup.length;i++){
   
    if (moloGroup.get(i).isTouching(bulletGroup)){
      
        moloGroup.get(i).remove();
        bulletGroup.destroyEach()
      
    }
    
  }

  for(var x =0; x<zombieGroup.length;x++){
   
    if (zombieGroup.get(x).isTouching(p)){
      
        go.visible=true
      zombieGroup.destroyEach()
      moloGroup.destroyEach()
      zombieGroup.setVelocityXEach(0)
    }
    
  }

  for(var y =0; y<moloGroup.length;y++){
   
    if (moloGroup.get(y).isTouching(p)){
      
        go.visible=true
        moloGroup.destroyEach()
        zombieGroup.destroyEach()
        moloGroup.setVelocityXEach(0)
      
    }
    
  }

}


function zombies() {
    if(frameCount%120===0){
        zom=createSprite(displayWidth-20,displayHeight-160,50,50)
        zom.velocityX=-5
        zom.scale=0.7
        num=Math.round(random(1,2))
        switch(num){
        case 1: zom.addAnimation("biggy", z2img)
        break
        
        case 2: zom.addAnimation("shorty", z3img)
        break
        
        } zombieGroup.add(zom)

            }
           

}
function bullets(){
    bul=createSprite(300,displayHeight-210,10,10)
    bul.addImage("bullet",bulletimg)
    bul.scale=0.05
    bul.visible=false
    if(keyDown("5")){
        bul.visible=true
        bul.velocityX=5
    }
    bulletGroup.add(bul)
}
function molotov(){
    if(frameCount%80===0){
        molo=createSprite(displayWidth-20,displayHeight-200,20,20)
        molo.scale=0.2
        molo.velocityX=-10
        molo.addAnimation("molo",m1img)
        moloGroup.add(molo)    
    }
}