function preload(){
narutoImage=loadImage("naruto running.gif")
backgroundImage=loadImage("naruto background.gif")
itachiImage=loadImage("naruto-itachi.gif")
obitoImage=loadImage("naruto obstacle obito.png")
sasoriImage=loadImage("naruto-sasori.png")
painImage=loadImage("naruto-painbrother-obstacle.png")
kakuzuImage=loadImage("naruto-akatuski-obstacle.png")
bgImg=loadImage("bg2.jpg")
jumpSound=loadSound("dattebayojump.mp3")
bgmusic=loadSound("bg.mp3")
go=loadSound("game_over.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  naruto=createSprite(windowWidth-900,windowHeight-200,50,50)
  naruto.scale=0.8
  naruto.addImage(narutoImage)

  itachi=createSprite(windowWidth-1200,windowHeight-200,50,50)
itachi.scale=0.6
itachi.addImage(itachiImage)

obstacleGroup=new Group()

invGround=createSprite(0,windowHeight-50,windowWidth*2,10)
invGround.visble=false
}

function draw(){
  background("white")
  if(!bgmusic.isPlaying()){
    bgmusic.play()
    bgmusic.setVolume(0.2)
  }
  if(keyDown("space")){
    naruto.velocityY=-15
    jumpSound.play()
  
  }
  naruto.velocityY+=1
 image(bgImg,0,0,width,height)
  createObstacles()
  naruto.collide(invGround)

  if(obstacleGroup.isTouching(naruto)){
    gameOver()
   
    
    obstacleGroup.destroyEach()
    naruto.destroy()
    itach.destroy()
  }

drawSprites()
}

function createObstacles(){
  if(frameCount%180===0){
    obstacle=createSprite(windowWidth,windowHeight-200,10,40)
    obstacle.velocityX=-8
    obstacle.scale=0.3
    num=Math.round(random(1,4))
    switch(num){
      case 1:
        obstacle.addImage(sasoriImage)
        break
        case 2: 
        obstacle.addImage(kakuzuImage)
        break
        case 3: 
        obstacle.addImage(obitoImage)
        break
        case 4: 
        obstacle.addImage(painImage)
        break
        default:break
        
    }
    obstacleGroup.add(obstacle)
  }
  
}


function gameOver(){
if(bgmusic.isPlaying()){
  bgmusic.stop()
  jumpSound.stop()
  go.play()
}
  swal({
title:"Game Over",
text:"Naruto lose",
imageUrl:"https://game-over-dex.fandom.com/wiki/Naruto_Clash_Of_Ninja_2?file=Ncon2_gameover.png",
imageSize:"150x150",
confirmButtonText:"Wanna Play again"
  },
  function(isConfirm){
    if(isConfirm){
      location.reload()
    }
  }
  )

}