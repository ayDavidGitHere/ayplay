function PlayGame(){
try{
    var a = document.getElementById("canvas");
    var b = a.getContext("2d");
    var sW = a.width = screen.width;
    var sH = a.height = screen.height; 
    a.style.marginTop = 0; a.style.marginLeft =0;
    
    var CW = sW; 
    var CH = sW;
    let CR = MHelp.resultantOf(CW, CH);
    let scene = new CDraw.useScene(b);




    let nightskycolor = "midnightblue"
    let highriseColor = "rgba(10,10,10,0.95)";
    let fogskycolor_2 = "rgba(250,50,120, 0.5)";
    let fogskycolor_3 = "rgba(250,110,20, 0.1)";
    let bgRect_1 = new CDraw.rect(0, CW, 0, CH, "_"+nightskycolor);
    scene.add(bgRect_1);
    
    let bgHighrise_2 = [];
    let hrInd = 0;
        {
        let hrHeight = CH/(1.5+Math.random()*5);
        bgHighrise_2[hrInd] = 
        new CDraw.rect(0+CW/15,  CW/10+((CW/10)/10)*Math.random()*10,hrHeight,
        CH-hrHeight, "_"+highriseColor);;
        scene.add(bgHighrise_2[hrInd]);
        }
    while(bgHighrise_2[hrInd].x<CW){
        hrInd++; 
        let lastHR = bgHighrise_2[hrInd-1];
        let hrHeight = CH/(1.5+Math.random()*5);
        bgHighrise_2[hrInd] = 
        new CDraw.rect(lastHR.x+lastHR.lengthX, CW/10+((CW/10)/10)*Math.random()*10,
        hrHeight, CH-hrHeight, "_"+highriseColor);;
        scene.add(bgHighrise_2[hrInd]);
        console.log(bgHighrise_2[hrInd].lengthX)
    };
    
	let fogskycolorGrad = b.createLinearGradient(0, 0, 0, CH/2);
    fogskycolorGrad.addColorStop(1, fogskycolor_2);
    fogskycolorGrad.addColorStop(0, "transparent");
    let bgRect_2 = new CDraw.rect(0, CW, 0, CH, ["",fogskycolorGrad]);
    scene.add(bgRect_2); 
    
    
    
    
    
    let bgHighrise_3 = [];
    let hrInd_3 = 0;
        {
        let hrHeight = CH/(1.5+Math.random()*5);
        bgHighrise_3[hrInd_3] = 
        new CDraw.rect(0+CW/15,  CW/10+((CW/10)/10)*Math.random()*10,hrHeight,
        CH-hrHeight, "_"+highriseColor);;
        scene.add(bgHighrise_3[hrInd_3]);
        }
    while(bgHighrise_3[hrInd_3].x<CW){
        hrInd_3++; 
        let lastHR = bgHighrise_3[hrInd_3-1];
        let hrHeight = CH/(1.2+Math.random()*2);
        bgHighrise_3[hrInd_3] = 
        new CDraw.rect(lastHR.x+lastHR.lengthX, CW/10+((CW/10)/10)*Math.random()*10,
        hrHeight, CH-hrHeight, "_"+highriseColor);;
        scene.add(bgHighrise_3[hrInd_3]);
        console.log(bgHighrise_3[hrInd_3].lengthX)
    };
    
	let fogskycolorGrad_3 = b.createLinearGradient(0, 0, 0, CH);
    fogskycolorGrad_3.addColorStop(1, fogskycolor_3);
    fogskycolorGrad_3.addColorStop(0, "transparent");
    let bgRect_3 = new CDraw.rect(0, CW, 0, CH, ["",fogskycolorGrad_3]);
    scene.add(bgRect_3); 
    
    
    
    
    
    
    
    
    let animate = function(){
        bgHighrise_2.map((val, ind)=>{
            let lastVal = 
            (ind==0?bgHighrise_2[bgHighrise_2.length-1]:bgHighrise_2[ind-1]);
            val.x-=0.8;
            if(val.x<0-val.lengthX){ 
                val.x = lastVal.x+lastVal.lengthX;
                val.breadthY = CH- CH/(2+Math.random()*10);
                val.y = CH-val.breadthY
            }
        })
        bgHighrise_3.map((val, ind)=>{
            let lastVal = 
            (ind==0?bgHighrise_3[bgHighrise_3.length-1]:bgHighrise_3[ind-1]);
            val.x-=0.8;
            if(val.x<0-val.lengthX){ 
                val.x = lastVal.x+lastVal.lengthX;
                val.breadthY = CH- CH/(1.2+Math.random()*2);
                val.y = CH-val.breadthY
            }
        })
   
   
        
        
        
        
        requestAnimationFrame(animate)
    }
    animate();
    
    
    
    
    
    
}catch(e){console.log(e)}
}