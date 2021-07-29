<?php
 header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT"); 
 header("Expires: " . gmdate("D, d M Y H:i:s") . " GMT"); 
 header("Cache-Control: no-cache, must-revalidate"); 
 header("Pragma: no-cache"); 
?>

<html >
    
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">




<link rel="stylesheet" href="http://localhost:1111/fontconstant.css">
<link rel="stylesheet" href="http://<?php print $_SERVER['HTTP_HOST']; ?>/siteconstant.css"> 
<link rel="stylesheet" href="http://<?php print $_SERVER['HTTP_HOST']; ?>/sitemain.css"> 
<link rel="shortcut icon"  href="img/mainlogo.png" />


   <meta name="theme-color" content="#000837"/>
 <meta name="title" content="Ho clock"> <meta name="description" content="  design "> <meta name="keywords" content=" design, movies"> <meta name="robots" content="index, follow"> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <meta name="language" content="English"> <meta name="revisit-after" content="1 days"> <meta name="author" content="aydavidgithere">
 <title > Sizzler  </title>
<noscript>Unfortunately, JavaScript must be enabled in your browser</noscript>
    </head>
    
    <body onload="run()">
<script src="http://localhost:1111/lidsacaebasic.js">
 </script>
<script src="http://localhost:1111/aygraph2.js">
 </script>
 </script>
 
 
 
    <script>
    


                 
                 
 function run(){
         try{



     //Load canvas
    var a = document.getElementById("canvas");
    var b = a.getContext("2d"); 
    var sW = 450//screen.width; //300; 
    var sH = 150;//screen.height; //300;
    declare(a, b)

    var mW = sW; 
    var mH = sH;   //square it
    a.width = sW = mW;
    a.height = sH = mH
    
    var tArea = document.createElement("textarea");
    tArea.setAttribute("id", "puttext");
    var tAreaBut = document.createElement("button");
    tAreaBut.setAttribute("id", "puttextBut");
    TAGN("textareaspace", 0).innerHTML = "";
    TAGN("textareaspace", 0).appendChild(tArea);
    TAGN("textareaspace", 0).appendChild(tAreaBut);
    TAGN("textareaspace", 0).style = "position: absolute";
    tArea.style= 
    "display: block; width:"+mW+"px; background: transparent; color: purple;";
    tAreaBut.style= 
    "display: block; width:"+(mW/2)+"px; height: "+(mH/10)+"px; margin: 0 auto; background: #000857; color: white; border-radius: 10px; border-style: none;  outline: none";
    tAreaBut.innerHTML = "Animate Text";
    
    tAreaBut.onclick = function(){
        var tAreaVal = tArea.value;
        if(tAreaVal == ""){  
        makeSizzler(["empty"]) 
        }else{
        var arr_texts = tAreaVal
        makeSizzler(arr_texts)
        }
    }
      
    
    
    
    
    
    
    
    
    
    
          
                function heart(x, y, col, arr_scale){
                         style.w(0.5)
                         b.translate(x, y)
                         b.scale( 1/1200+arr_scale[0], 1/1200+arr_scale[1] );
                         b.translate(-75, -62.5)
                         b.beginPath();
                         b.moveTo(75,40);
                         b.bezierCurveTo(75,37,70,25,50,25);
                         b.bezierCurveTo(20,25,20,62.5,20,62.5);
                         b.bezierCurveTo(20,80,40,102,75,120);
                         b.bezierCurveTo(110,102,130,80,130,62.5);
                         b.bezierCurveTo(130,62.5,130,25,100,25);
                         b.bezierCurveTo(85,25,75,37,75,40);
                         makeCol(".blue"); makeCol(col); 
                        b.setTransform(1,0,0,1,0,0);
                }
                   
                  
                    
			function getOpaquePixels(posX, limX, posY, limY, callback){
			           width = limX  =mW, 
			           height = limY  =mH; 
				       var imD = b.getImageData(posX, posY, width*2, height);   
		               var imDd = imD.data;   
		               var length = imDd.length
		               var _width = imD.width*4
		               var arr_opaq_pos = [];
		               rP = 0; gP=0; bP=0; 
                   for(pos=0; pos <= length- 4; pos+=4) {
				         //var pos =  0;// posY*sW+posX;		
				         var posY= Math.round(pos/_width);
				         var posX = pos-(posY*_width);
				         rP = imDd[pos] 
					     gP = imDd[pos+1]
					     bP = imDd[pos+2] 
					     aP = imDd[pos+3]
					     
					     
                        
                        if(aP>250){
                            arr_opaq_pos.push({x: posX/4, y: posY})
                        }
                       

                    }//EO for
                    callback(arr_opaq_pos)
                    //b.putImageData(imD, 0, 0)
              }// EO getOpaquePixels
   


    
    
    
     
              
              function makeSizzler(sizzText){
sizzText = sizzText.split(",")
var colGrad;
init_canv()
        function init_canv(){
    //main   
    var thiscol = "black"//"purple";
    var thiscol2 = "#000837";
    rect(0, sW, 0, sH, thiscol);
 
	colGrad = b.createLinearGradient(0, 0, sW*2, sH);
	colGrad.addColorStop(1, thiscol)
    colGrad.addColorStop(0, thiscol2)
    rect(0, mW, 0, mH, colGrad);

    var dater = new Date();
    daterInSeconds = dater.getSeconds();
    daterInMinutes = dater.getMinutes()
 
    isStarted = true;
 
 
 
    
    clear();
    color("white");  
    color(".white")
    txt( ""+(sW/6)+"pt font11$#", sizzText[0], mW/2, mH/2, 0, mW);
    
    var textLen = sizzText[0].length;
    var sizzCol = thiscol
    var selectedSolids = [];
    var arrWords = ["</>", "{ }", "<\? >"]//, "php", "html", "css", "-"];
    var arrCols = ["slateblue", "tan", "maroon"]
    getOpaquePixels(0, mW, 0, mH, function(solids){
          solids.map(function(val, ind){
                freq = 12;
                if( Math.round(Math.random()*freq )==freq ){
                rText= arrWords[Math.floor(Math.random()*(arrWords.length))];
                sCol = arrCols[Math.floor(Math.random()*(arrCols.length))];
                //arc.m(solids[ind].x, solids[ind].y, 2, 0, 6.3, sizzCol);
                selectedSolids.push( {
                    x: solids[ind].x,
                    y: solids[ind].y,
                    x2: 0,
                    y2: mH/20,
                    xEnd: mW+2,
                    yEnd: mH,
                    sizzCol: sCol,
                    rText: rText
                     })
                }//EO if
          })
          canv_(selectedSolids);
     })//EO getOpaquePixels
 
 
 

        }// EO init_canv
            
            
            
            
            
            
            
            
    function canv_(arr){
            
            arr.map(function(val, ind){
                    val.initX = val.x+Math.random()*(mW/10)
                    val.initY = mH/1.05-Math.random()*(mH/100)
                    val.speed = 0.5+Math.random()*2+(arr.length-ind)/arr.length
                    val.speedX = 0.1+Math.random();
                    
                    
                    val.initRad = 0.01;
                    val.rad = 0.005+Math.random()/10;
                    val.radSpeed = 0.0001+Math.random()/1000;
                    //val.sizzCol = "red"
                    //"rgb("+(Math.random()*200)+", 50, "+(250-Math.random()*200)+")"; 
            })
              var blowAway = false;
              var timer = 0;
              canv_Animer()
        function canv_Animer(){
            clear()
            rect(0, mW, 0, mH, colGrad);
            type_sizzler();
            //type_pop();
            

            timer = timer+1;   
            requestAnimationFrame(canv_Animer)
       }//EO canv_Animer
                
                
                
                
                
                
                
                
        function type_sizzler(){
            if(timer> 220){ blowAway = true; }; 
            arr.map(function(val, ind){
               if(blowAway == false){
                    if(val.initY > arr[ind].y){
                        val.initY = val.initY-val.speed;
                    }
                    if(val.initX > arr[ind].x){
                        val.initX = val.initX-val.speedX;
                    }
                }
               if(blowAway == true){
                        if( val.initX < val.xEnd){
                            val.initX = val.initX+val.speedX*2;
                        }
               }
                  style.w(1); color(val.sizzCol)
                  //arc.m( val.initX, val.initY, 2, 0, 6.3, val.sizzCol);
                  //rect(val.initX-2, 4, val.initY-2, 4, "."+val.sizzCol)
                  //txt( 5+"pt font11", "love", val.initX, val.initY, 0, 1000)
                  txt("$#5pt font10", val.rText, val.initX, val.initY, 0, 1000) 
           })//EO arr map
           
        }//EO type_sizzler
        
        
        function type_pop(){
            arr.map(function(val, ind){
                  if(val.rad>val.initRad){ val.initRad += val.radSpeed}
                  heart(val.x, val.y, val.sizzCol, [val.initRad, val.initRad])
            })//EO arr map
        }



    }//canv_
            
            
            
            
            
            
            




        
        }//EO makeSizzler
      makeSizzler("AYDAVID");

           


          
           $("but1").addEventListener("click", function(){ 
                   var canvasImgSrc = a.toDataURL();
                   var canvasImg = new Image();
                   canvasImg.src = canvasImgSrc;  
                  TAGN("empty", 0).appendChild(canvasImg); 
                  $("toSaveImage").href = canvasImgSrc; 
                  $("toSaveImage").download = "newCanv.png"
           })
       a.addEventListener("touchstart", function(e){
	             e.preventDefault(e)
	             onMouse  = true;
				 // for game1
	             evMoveX =  Math.round(e.touches[0].pageX);   
	             //evMoveX2 = Math.round(e.touches[1].pageX)
				 evMoveY =  Math.round(e.touches[0].pageY);
				 //evMoveY2 = e.touches[1].pageY;

		         touched = true;
				 } )
				 var touched = false
        
            	  
       a.addEventListener("touchend", function(e){
	             //e.preventDefault(e);
	             touched = false;
				 } )
        
      
       
       
        
          
          
          
          
         


       

             }catch(e){ alert(""+e) }
      }//EO run
      
      
      
      
      
      
      
      
      



  

        
        
    </script>

             <textareaspace></textareaspace>
             <div id="canvasDiv">
                 <canvas id="canvas" width="1280" height="675"> 
                     opps! Canvas net supported in your browser  
                 </canvas>
             </div>
             
       <div id="non-canvas">


             <a class="transparentlink" id="toSaveImage" >
             <button id="but1" class="but">
                 Save Image
             </button>
             </a>
             <button id="menubut" class="but">
                 Open Menu
             </button>
             <empty></empty>
             
       </div>

 
    
    </body>
    
    
    
    
    
    
    
    
    
</html>  
