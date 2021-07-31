<?php
 header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT"); 
 header("Expires: " . gmdate("D, d M Y H:i:s") . " GMT"); 
 header("Cache-Control: no-cache, must-revalidate"); 
 header("Pragma: no-cache"); 
?>

<html >
    
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">

<meta name="viewport" content="width=device-width, height=device-height,initial-scale=1.0, maximum-scale=1.0" user-scalable=no, shrink-to-fit="no" >



<link rel="stylesheet" href="http://localhost:1111/fontconstant.css">
<link rel="stylesheet" href="http://<?php print $_SERVER['HTTP_HOST']; ?>/siteconstant.css"> 
<link rel="stylesheet" href="http://<?php print $_SERVER['HTTP_HOST']; ?>/sitemain.css"> 
<link rel="stylesheet" href="swyp.css">
<link rel="shortcut icon"  href="img/mainlogo.png" />



   <meta name="theme-color" content="#000807"/>
 <meta name="title" content="Play Jetpack"> 
 <meta name="description" content="  Top "> <meta name="keywords" content=" erotica, sci-fi, fantasy, relationship, advices, stories, read, write"> <meta name="robots" content="index, follow"> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <meta name="language" content="English"> <meta name="revisit-after" content="1 days"> <meta name="author" content="aydavidgithere">
 <title >Jetpack   </title>
<noscript>Unfortunately, JavaScript must be enabled in your browser</noscript>
    </head>
    
    <body onload="run()">
<script src="http://localhost:1111/lidsacaebasic.js">
 </script>
<script src="http://localhost:1111/aygraph2.js">
 </script>
<script src="https://aydavidgithere.github.io/res/lidsacaebasic.js">
 </script>
<script src="https://aydavidgithere.github.io/res/aygraph2.js">
 </script>
 <script src="runningperson.js" ></script>
 
 
    <script>
    


                 
                 
 function run(){
         try{



     //Load canvas
    var a = document.getElementById("canvas");
    var b = a.getContext("2d");
    var sW = a.width = screen.width; //300; 
    var sH = a.height = screen.height; //300;
     declare(a, b)
     
    var mW = sW; 
    var mH = sW;
    
    
    
    
    
    
              
    
    imgsrc = "../quoteit/img/olam.jpeg"



     //Load Array of Randoms
           var rd12m = new Array();
           var rd12m2 = new Array();
           var rd12m3 = new Array();
    for(i=0; 12>i; i++){
           rd12m[i] = Math.random();
           rd12m2[i] =  Math.random();
           rd12m3[i] =  Math.random();
    }
            
           var rd24m = new Array();
           var rd24m2 = new Array();
           var rd24m3 = new Array();
    for(i=0; 24>i; i++){
           rd24m[i] = Math.random();
           rd24m2[i] =  Math.random();
           rd24m3[i] =  Math.random();
    }
    
    
    
    
    //Load Vars
    var rP = 100 ;   
    var gP = 100 ;
    var bP = 100 ;
    var aP = 100 ;
    rPN = 225-rP;   gPN = 225-gP;   bPN = 225-bP;  aPN = 225-aP;
     var rotV = 0;
     
     

    //Load Img
     var bgImg = new Image();
     bgImg.onload = function(){  
        var bgImgW = bgImg.width;
        var bgImgH = bgImg.height; 
		var posX=mW-2;   var posY= mH-2;   
		var imD = b.getImageData(posX, posY, 1, 1);   
		var imDd = imD.data;      
		var pos =   0;//500*mW+i
		rP = imDd[pos]
		gP = imDd[pos+1]
		bP = imDd[pos+2]
		aP = imDd[pos+3];
        pat = b.createPattern(bgImg, "repeat");
        toPat = pat;
     }
     bgImg.src = imgsrc
     var pat; 
     var toPat = "white"





    
    var toDeg = function(deg){ 
        var result = ( Math.PI/180 )*deg
        return result;   }
    var toRad = function(deg){ 
        var result = ( 180/Math.PI )*deg
        return result;   }
    


    
    


var tapSoun = document.createElement("audio");
tapSoun.src = "soun/tap.wav"
var arr_col = ["white", "red", "green", "goldenrod", "pink", "gray", "whitesmoke", "crimson", "yellow", "green"]
var touched = {active: "no"  }
var gameI = {distance: 0}


var hero = {
x: mW/8.0, y: mH/2, width: mW/10, height: mH/8,
arc: {radius: mW/16}, 
col: "red",meet: false}
    

var backG_ = {
    x: mW/10,
    y: mH/8,
    col: "red",
    xWid: mW/20,  
    yWid: mH-mH/4,
    xWid_ice: (mW/20)*(4+Math.random()),
    yWid_ice: (mH-mH/4)/(1+Math.random()),
    designtype: "ice",
    drawType: function(){
        b.beginPath();
        b.moveTo(this.x, this.y);
            for(i=0; 300>i; i++){
        b.lineTo(this.x+i*this.xWid*4, this.y)
        b.lineTo(this.x+i*this.xWid*4+this.xWid*2, this.y )
        b.lineTo(this.x+i*this.xWid*4+this.xWid*2, this.y+this.yWid )
        b.lineTo(this.x+i*this.xWid*4+this.xWid*4, this.y+this.yWid )
                }
        style.w(0.2)
        b.strokeStyle = this.col; b.stroke()
        b.closePath();
    },
    drawType2: function(){
         style.w(0.4)
            for(i=0; 300>i; i++){
        paths.polygon(5, this.x+i*this.xWid*4, this.y+(i%2)*this.yWid, this.xWid*2, "."+this.col, 0.2+i/10);
            }
    },
    drawIceMount: function(){

    },
    motion: function(){
        this.x = this.x-2.5
    }
}





var arr_comingV1 = [];
      for(i= 0; 50>i; i++){
arr_comingV1.push({
x: (mW*6)+ (Math.random()*mW*3*i),
y: Math.random()*mH,
length: 50,
col: arr_col[Math.floor(Math.random()*10)],
arc: {radius: mW/70}, 
meethero: false,
speedX: 2.5+Math.random(),
motion: function(){    this.x = this.x-this.speedX; },
checkmeet: function(){ 
        if(hero.x > this.x-hero.width/2 &&
        hero.x < this.x+hero.width/2){
        if(hero.y > this.y-hero.height/2 &&
        hero.y < this.y+hero.height/2){ 
            this.meethero = true;
            hero.meet = true
        }
        }
    }
})//EO arrcomingV1
           }
           
           
           
var arr_comingVArc = [];
var comingVArc = { designtype:"ice", numbers_:15  };
      for(var i= 0; comingVArc.numbers_>i; i++){
arr_comingVArc.push({
x: (mW*1.2)+ Math.random()*(mW*3*i),
y: mH/2,
length: 50,
col: arr_col[Math.floor(Math.random()*10)],
arc: {radius: mW/70+Math.random()*(mW/50)}, 
meethero: false,
directiondown: true,
speedX: 3+Math.random(),
speedY: 3+Math.random(),
checkmeet: function(){ 
    var distBetween = Math.sqrt( Math.pow(hero.x-this.x, 2)+Math.pow(hero.y-this.y, 2) )-(hero.arc.radius+this.arc.radius);
    if(distBetween < 1){ this.meethero = true;  hero.meet = true}
    },
motion: function(){
    if(this.y+this.arc.radius > mW){ this.directiondown = false }
    if(this.y-this.arc.radius <0){ this.directiondown = true }
    if(this.directiondown){ this.y = this.y+this.speedY;}
    if(!this.directiondown){this.y = this.y-this.speedY;}
    this.x = this.x-this.speedX
}
})   //EO arrcomingV1
           }



     
     
     
     
     
var arr_comingRot = [];
var comingRot = { designtype:"ice", numbers_:5  };
      for(var i= 0; comingRot.numbers_>i; i++){
arr_comingRot.push({
x: (mW*1.2)+ (Math.random()*mW*3*i),
y: Math.random()*mH,
length: mH/5,
col: arr_col[Math.floor(Math.random()*10)],
arc: {radius: 3}, 
meethero: false,
directiondown: true,
speedX: 2.5,
speedY: 2.5,
rotAng: 0,
checkmeet: function(ang){ 
     var rotX = this.x+ Math.cos(ang)*this.length
     var rotY = this.y+ Math.sin(ang)*this.length
     if( hero.x+hero.arc.radius> rotX && hero.x-hero.arc.radius< rotX &&
         hero.y+hero.arc.radius> rotY && hero.y-hero.arc.radius< rotY ){
             hero.meet = true; }
},
motion: function(){
     this.x = this.x-this.speedX; 
     this.rotAng += 0.02
}
})   //EO arrcomingV1
     

if (arr_comingRot[i].y+arr_comingRot[i].length>mH ||
    arr_comingRot[i].y-arr_comingRot[i].length<0){
    arr_comingRot[i].y = mH/2;
}
           }

        
        
        
var obstacles = [];
var tallWall = function(x, y, height, color){
    this.x = x; this.y = y; this.height=height; this.color= color;
    this.draw = ()=>{
        shadow.m(0.1, 0.1, this.color, 15);
        singleL(this.x, this.y, 0, this.height, this.color);
        shadow.r();
    }
}
    
    


 //for runningPerson
var animIndex = 2;
    
    
     
     
     
     
     
     
     
     
     
     


    
    var rotArcAnim;
    thiscol = "midnightblue";
	b.globalCompositeOperation = "co"
	nightskycolor = b.createLinearGradient(0, 0, sW, sH);
    nightskycolor.addColorStop(1, "#000837")
    nightskycolor.addColorStop(0, "black")

canv()
        function canv(){
    //main   
    thiscol = "black";
	b.globalCompositeOperation = "co"
    rect(0, mW, 0, mH, nightskycolor);
    singleL(0, mW, mH, 0, "white", 2)
    rect(0, mW, mH, sH-mH, "nightskycolor");
    
    backG_.drawType2();
    backG_.drawIceMount();
    backG_.motion();
   
    anim1 = anim(1, 0.01, 100000, 0, "linear")
   
   
   
   
   
   
   //hero
/*
     style.w(1)
   b.translate(hero.x, hero.y);
   b.rotate(0.2+anim1);
   b.translate(-hero.x, -hero.y);
     rect(hero.x-hero.width/2.8, hero.width/1.4, hero.y-hero.width/2.8,
     hero.width/1.4, hero.col);
   b.setTransform(1, 0, 0, 1, 0, 0);  */
   //arc.m(hero.x, hero.y, hero.width/2, 0, 6.3, "."+hero.col) ;
   flying=false;
   if(touched.active == "no"){   flying=false};
   if(touched.active == "yes"){   flying=true};
   runningPerson(!flying, mW/4, mH/4, hero.x,hero.y-mH/16, "#af6e51")
    
   
    
    if(touched.active === "yes" && hero.y-hero.height/2>0){
              hero.y = hero.y -2;
              tapSoun.play()
    }
    if(touched.active === "no" && hero.y+hero.height/2< mH){
              hero.y = hero.y+(1+hero.y/(mH/4));
    }
      
      
      
      
      
      
      
      
    //color(".blue"); //style.w(10);
         
    if(comingVArc.designtype == "glow"){
         arr_comingVArc.map(function(comingVArc){
    shadow.m(0.1, 0.1, comingVArc.col, comingVArc.arc.radius/2)
    arc.m(comingVArc.x,comingVArc.y,comingVArc.arc.radius,
    0, 6.3, ""+comingVArc.col)
    shadow.r()
    shadow.m(-0.1, -0.1, comingVArc.col, comingVArc.arc.radius/2)
    arc.m(comingVArc.x,comingVArc.y,comingVArc.arc.radius,
    0, 6.3, ""+comingVArc.col)
    shadow.r()
    comingVArc.checkmeet()  
    comingVArc.motion()
         })
    }
    
    if(comingVArc.designtype == "ice"){
         arr_comingVArc.map(function(comingVArc){
    arc.m(comingVArc.x,comingVArc.y,comingVArc.arc.radius,
    0, 6.3, "maroon");
    arc.m(comingVArc.x,comingVArc.y,comingVArc.arc.radius/2,
    0, 6.3, "rgb(255, 19, 50)");
    comingVArc.checkmeet()  
    comingVArc.motion()
         })
    }
    
         
         arr_comingV1.map(function(comingV1){   
    shadow.m(0.1, 0.1, comingV1.col, 15)
    singleL(comingV1.x+comingV1.arc.radius, comingV1.length,
    comingV1.y, 0, comingV1.col, 2);
    arc.m(comingV1.x,comingV1.y,comingV1.arc.radius, 0, 6.3, "."+comingV1.col)
    shadow.r()
    shadow.m(-0.1, -0.1, comingV1.col, 15)
    singleL(comingV1.x+comingV1.arc.radius, comingV1.length,
    comingV1.y, 0, comingV1.col, 2);
    arc.m(comingV1.x,comingV1.y,comingV1.arc.radius, 0, 6.3, "."+comingV1.col)
    shadow.r()
    comingV1.motion()
    comingV1.checkmeet()
         })
    
    
    if(comingRot.designtype = "ice"){
         arr_comingRot.map(function(comingRot){   
   b.translate(comingRot.x, comingRot.y)
   b.rotate(comingRot.rotAng);
   b.translate(-comingRot.x, -comingRot.y)
    shadow.m(0.1, 0.1, "steelblue", 15)
    singleL(comingRot.x, comingRot.length,
    comingRot.y, 0, "rgb(175, 219, 240)", 2);
    arc.m(comingRot.x,comingRot.y,comingRot.arc.radius, 0, 6.3, "steelblue");
    shadow.r();
    shadow.m(-0.1, -0.1, "steelblue", 15)
    singleL(comingRot.x, comingRot.length,
    comingRot.y, 0, "rgb(175, 219, 240)", 2);
    arc.m(comingRot.x,comingRot.y,comingRot.arc.radius, 0, 6.3, "rgb(175, 219, 240)");
    shadow.r()
   b.setTransform(1, 0, 0, 1, 0, 0)
    comingRot.motion()
    comingRot.checkmeet(comingRot.rotAng)
         })
    }
         
         
         
         
         
    if(obstacles < 4){
        let obstacle = MHelp.randOpt(new tallWall(mW, mH/4, mH/4, "red"));
        obstacles.push(obstacle);
    }
    obstacles.map((obstacle, obstacleInd)=>{
        obstacle.draw();
        if(obstacle.x < 0){    obstacles.splice(obstacleInd, 1);   }
    })
         
         
         
    
    
    
    
    txt(mW/20+"pt$# font6",  
    ""+Math.round(gameI.distance)+"m", mW/2,mH/12, 0, 1000);
    if(hero.meet){ 
        txt(mW/10+"pt$# font4","GAME OVER", mW/2, mH/2, 0, 1000)
        hero.col = "midnightblue"
    }
    gameI.distance = gameI.distance+0.6;
            requestAnimationFrame(canv);
}// EO canv





 
           var evMoveX = 0;
           var evMoveY = 2;
           var arrOfEvX = new Array();
           var arrOfEvY = new Array();
           tmMoveX = 0; tmMoveY = 0;
           var kicked = {active: "no"}
           
           
           $("but1").addEventListener("click", function(){
               var canvasImgSrc = a.toDataURL();
               var canvasImg = new Image();
                   canvasImg.src = canvasImgSrc;
                  TAGN("empty", 0).appendChild(canvasImg);
                  $("toSaveImage").href = canvasImgSrc
                  $("toSaveImage").download = "newCanv.png"
           })
           
           a.addEventListener("touchstart", function(e){
	             e.preventDefault(e)
	             onMouse  = true;
				 // for game1
	          //   arrOfEvX.push(e.touches[0].pageX);   
			  //   arrOfEvY.push(e.touches[0].pageY);  
		      //    kicked.active = "yes"
		           touched.active = "yes"
				 } )

           a.addEventListener("touchend", function(e){
	             e.preventDefault(e)
	             onMouse  = true;
				 // for game1
				 touched.active = "no"
	             
				 } )
           a.addEventListener("touchmove", function(e){
	             e.preventDefault(e)
	             onMouse  = true;
				 // for game1

				 } );
			
           
           a.addEventListener("mousedown", function(e){
	             e.preventDefault(e)
	             onMouse  = true;
				 // for game1
	          //   arrOfEvX.push(e.touches[0].pageX);   
			  //   arrOfEvY.push(e.touches[0].pageY);  
		      //    kicked.active = "yes"
		           hero.y = hero.y -5;
				 } )


          
         


       

             }catch(e){ alert(""+e) }
      }
      
      
      
      
      
      
      
      
      



  

        
        
    </script>

             
             <div id="canvasDiv">
                 <canvas id="canvas" width="1280" height="675"> opps! Canvas net supported in your browser  </canvas>
             </div>

          <a class="transparentlink" href="index.php" >
      <div id="divtotop20">   
              Make Top 20   
      </div>
             </a>
             <empty> </empty>

             <br10></br10>             <br10></br10>
             <a class="transparentlink" id="toSaveImage" >
             <button id="but1" class="but">
                 Save Image
             </button>
             </a>
             

          
    
    
    
    
    
    
</html>  