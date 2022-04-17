
function TwoD(){
    return new Promise( (mainResolve, mainReject) =>{
        
        
   var ctx = this;
   var a, b;
   ctx.a = a = document.getElementById("canv2d"); 
   ctx.b = b = a.getContext("2d");  
   declare(a, b); 
   a.width=innerWidth/2;
   a.height=innerWidth/2
   var sW = a.width;
   var sH=a.height; 
   
   b.fillStyle = "white"
   b.fillRect(0, 0, sW, sH);
   b.fill(); 
   
   //load obbjs
   var mes = [/*
       {name: "Joyner Lucas", imageUrl: "img/ay/joyner.png", rating:"20%", rank:1 },
       {name: "Ronaldo", imageUrl: "img/ay/ronaldo.png", rating:"20%", rank:2},
       {name: "Juventus", imageUrl: "img/ay/juve.png", rating:"12%", rank:5},
       {name: "Bryce Vine", imageUrl: "img/ay/bryce.png", rating:"10%", rank:4 },
       {name: "History", imageUrl: "img/ay/history.png", rating:"10%", rank:6 },
       {name: "Davido", imageUrl: "img/ay/davido.png", rating:"3%", rank:8 },
       {name: "Ajr", imageUrl: "img/ay/ajr.png", rating:"5%", rank:7 },*/
       {name: "Javascript", imageUrl: "img/ay/js.png", rating:"5%", rank:7 },
       {name: "Java", imageUrl: "img/ay/java.png", rating:"5%", rank:7 },
       {name: "Php", imageUrl: "img/ay/php.png", rating:"5%", rank:7 }
   ]
   var startX = 0;
   var startY = 0;
   
   mes.sort(function(a, b){
       return -(Number(b.rating.replace("%", "") )- Number(a.rating.replace("%", "") ) )
   })
   
   
   //multiply
   let multiTimes = 4;
   for(let i=0; multiTimes>i+1; i++){
        mes = mes.concat(mes);
        mes.ay.shuffle(mes);
   }
   mes.ay.shuffle(mes);
   //while length is nkt a square pad it.
   while( Math.sqrt(mes.length) != Math.floor(Math.sqrt(mes.length)) ){
        let randIndex = Math.floor(Math.random()*(mes.length));
        if(mes.length %2 == 0) mes.push(mes[randIndex]);
        if(mes.length %2 != 0) mes.unshift(mes[randIndex]);
   }

   
   
   var largest = 20
   var countX = Math.sqrt(mes.length)//(100/largest);
   var countY = Math.sqrt(mes.length) //(100/largest);
   var eqWid = sW/countX;
   var eqHei = sH/countY;
   
   
   //load images in promises array
   var img = new Array(mes.length);
   var imgProm = [];
   mes.forEach(function(val, ind){ 
       imageUrlAt = val.imageUrl
       img[ind] = new Image();
       imgProm.push( new Promise(resolve =>{
            img[ind].onload = function(){
                    resolve("done")
            }//EO onload
            img[ind].onerror = function(){
                    resolve("failed")
            }//EO onload
       }) );
       img[ind].src = imageUrlAt;
   });
   
   
   
    Promise.all(imgProm).then( 
        function(imgLoaded){
        mes.forEach(function(val, ind){ 
            imageUrlAt = val.imageUrl
            nameAt = val.name;
            ratingAt = largest// Number(val.rating.replace("%", "") )
            width = (ratingAt/largest)*eqWid;
            height = (ratingAt/largest)*eqHei;
       
       
            setRow = Math.floor(ind/countX);
            setCol = Math.floor(ind-setRow*countY);
            startX = (setCol*eqWid)+(eqWid-width)/2;
            startY = (setRow*eqHei)+(eqHei-height)/2;
            
            if(imgLoaded[ind] == "failed"){ 
                //rect(startX, width, startY, height, "rgba("+Math.random()*255+","+(Math.random()*255)+", 100, 0.7)" );
                color("black");
                txt("$#20pt exo", nameAt,startX+width/2, startY+height/2, 0, 1000)
            }
            if(imgLoaded[ind] == "done"){ 
                b.drawImage(img[ind], startX, startY, width, height);
            }
            
        });//EO forEach
        mainResolve(ctx)
        mainReject("failed")
        }
   ).catch(error => alert(error));
   
   
   /*
    var largest = 20;
    a.width = (largest/100)*sW
    startX = 0;
    startY = 0;
   
    mes.forEach(function(val, ind){ 
       imageUrlAt = val.image
       nameAt = val.name;
       ratingAt = Number(val.rating.replace("%", "") )
       width = (ratingAt/100)*sW;
       height = (ratingAt/100)*sH;
       
       
       if(startY>sH){ startY = 0;}
       rect(startX, width, startY, height, "rgba("+Math.random()*255+","+(Math.random()*255)+", 100, 0.8)" );
       color("black")
       txt("20pt font", ind+", ",startX, startY, 0, 1000);
       startY +=height;
       
    })
   */
   
   
   
   
   
   
   
       
    })//EO promise
}//EO function