export default function MakeMPMLogo(){
    var a = document.getElementById("canvas");
    var b = a.getContext("2d");
    CDraw.setCanvasStyle(a, {type: "fill", alpha: 0, position: "static", pinToTop: true});   
    drawOn(b, 96*2, 96*2); 
    var logText = "LogText Here";






function drawOn(b, CW, CH){ 
    a.width = CW;
    a.height = CH;
    let CR = MHelp.resultantOf(CW, CH);
    let scene = new CDraw.useScene(b); 
    let bgRect = new CDraw.rect(0, CW, 0, CH, "_crimson");
    //scene.add(bgRect);
    
    
    /* //MPM_launcher_icon_
    let cir1 = new CDraw.arc(CW/2, CH/2, CH/2, 0, 6.3, "_crimson");
    scene.add(cir1);
    let cir2 = new CDraw.arc(CW/2, CH/2, CH/2.1, 0, 6, CW/40+"_white");
    scene.add(cir2);
    let mText = new CDraw.text("+*100pt codar", "M", CW/2, CH/2, "_white", 10000)
    //scene.add(mText);
    */
    
    let GW = CW*1.6; 
    let GH = CH*1.6;
    /*  //MPM_launcher_icon_
    let rect4 = new CDraw.rect(GW/2-GW/7, GW/12, GH/3, GH/3, "_#121212")
    let rect5 = new CDraw.rect(GW/2+GW/7, GW/12, GH/3, GH/3, "_#1d242e")
    let rect2 = new CDraw.rect(GW/2-GW/15, GW/12, GH/3, GH/4, "_#242628")
    let rect3 = new CDraw.rect(GW/2+GW/15, GW/12, GH/3, GH/4, "_#1b171b")
    */
    
    let rect4 = new CDraw.rect(GW/2-GW/7, GW/12, GH/3, GH/3, "_crimson")
    let rect5 = new CDraw.rect(GW/2+GW/7, GW/12, GH/3, GH/3, "_crimson")
    let rect2 = new CDraw.rect(GW/2-GW/15, GW/12, GH/3, GH/4, "_crimson")
    let rect3 = new CDraw.rect(GW/2+GW/15, GW/12, GH/3, GH/4, "_crimson")
    scene.add(rect4);
    scene.add(rect5);
    scene.add(rect2);
    scene.add(rect3);
    rect2.rotation.rad -= 0.8;
    rect3.rotation.rad += 0.8;
    
    
    
    rect2.alpha = 0.85;
    rect3.alpha = 0.85;
    rect4.alpha = 0.85;
    rect5.alpha = 0.85;
    rect2.x -= rect2.lengthX/2;
    rect3.x -= rect3.lengthX/2;
    rect4.x -= rect4.lengthX/2;
    rect5.x -= rect5.lengthX/2;
    rect2.x -= (GW-CW)/2;
    rect3.x -= (GW-CW)/2;
    rect4.x -= (GW-CW)/2;
    rect5.x -= (GW-CW)/2;
    rect2.y -= (GH-CH)/2;
    rect3.y -= (GH-CH)/2;
    rect4.y -= (GH-CH)/2;
    rect5.y -= (GH-CH)/2;
    
    
    
    
    
    console.log(bgRect.rotation);
    update();
    
    function update(){
    
    
    
    
    
    //b.drawImage(img, 0, 0, CW, CH);
    document.getElementById("logText").innerText = logText;
    requestAnimationFrame(update)
    }//EO updateFrame
    
}   //EO drawOn
    
    var saveBut = document.createElement("button");
    saveBut.value = logText;
    document.body.appendChild(saveBut);
    var downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    saveBut.onclick = ()=>{
        var img = new Image();
        img.src = a.toDataURL();
        downloadLink.appendChild(img)
        downloadLink.href = img.src;
        //downloadLink.download = "MPM_launcher_icon_"+(a.width)+".png";
        downloadLink.download = "MPM_listview_stub"+(a.width)+".png";
    }
    
    
    
    
    
    
}//EO bgCanvas
