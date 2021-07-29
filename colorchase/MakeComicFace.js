export function MakeComicFace(){
    var a = document.getElementById("canvas");
    var b = a.getContext("2d");
    CDraw.setCanvasStyle(a, {type: "fill", alpha: 0, position: "static", pinToTop: true});   
    drawOn(b); 
    var logText = "";






function drawOn(b){ 
    let CW = a.width = 300;
    let CH = a.height =300;
    let CR = MHelp.resultantOf(CW, CH);
    //let scene = new CDraw.useScene(b);
    //let bgRect = new CDraw.rect(0, CW, 0, CH, "_yellow");
    //scene.add(bgRect);
    let img = new Image();
    img.src="../res/sprites/ay.png";    
    img.onload = function(){    
        update();
        b.drawImage(img, 0, 0, CW, CH);
        var arr_opaq_pos = [];  
	    var imD = b.getImageData(0, 0, CW, CH);   
    	var _width = imD.width*4;   
	    var allPixels = imD.data;   
	    var length = allPixels.length;
	    var rP = 0; var gP=0; var bP=0; 
        for(pos=0; pos <= length -4; pos+=4) {
		    var posY = Math.floor(pos/_width);
		    var posX = (pos-Math.floor(pos/_width)*_width)/4;
            rP = allPixels[pos+0];
		    gP = allPixels[pos+1];
		    bP = allPixels[pos+2];
		    aP = allPixels[pos+3];
		    let pixelHere = getPixelInfo(allPixels, pos);
		    let pixBefore = getPixelInfo(allPixels, pos-4);
		    let pixAfter = getPixelInfo(allPixels, pos+4);  
            imD.data[pos+0] = MHelp.clamp(rP, pixBefore.r, pixAfter.r)
		    imD.data[pos+1] = MHelp.clamp(gP, pixBefore.g, pixAfter.g)
		    imD.data[pos+2] = MHelp.clamp(bP, pixBefore.b, pixAfter.b)  
            //imD.data[pos+0] = (pixBefore.r+pixelHere.r+pixAfter.r)/3
		    //imD.data[pos+1] = (pixBefore.g+pixelHere.g+pixAfter.g)/3
		    //imD.data[pos+2] = (pixBefore.b+pixelHere.b+pixAfter.b)/3;
        }//EO for
        a.ontouchmove = (ev)=>{
            let posX = ev.touches[0].pageX;
            let posY = ev.touches[0].pageY;
            let pos = Math.floor((posX*4)+posY*_width)
            logText =
            [getPixelInfo(imD.data, pos).r, getPixelInfo(imD.data, pos).g, getPixelInfo(imD.data, pos).b];
        };
        b.putImageData(imD, 0, 0); 
    }//EO
    function getPixelInfo(pixel, pos){
        let obj = {}
        let r = obj.r = pixel[pos+0];
        let g = obj.g = pixel[pos+1];
        let b = obj.b = pixel[pos+2];
        let a = obj.a = pixel[pos+3];
        let rgb = obj.rgb = [r, g, b];
        let rgba = obj.rgba = [r, g, b, a]
        obj.pos = pos;
        let avg = obj.avg = (r+g+b)/3;
        return obj;
    }//EO
    
    
    function update(){
    
    //b.drawImage(img, 0, 0, CW, CH);
    document.getElementById("logText").innerText = logText;
    requestAnimationFrame(update)
    }//EO updateFrame
    
    
    
    
    
    
    
}   //EO drawOn
    
    
    
    
    
    
    
    
}//EO bgCanvas
