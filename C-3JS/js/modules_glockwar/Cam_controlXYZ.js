    
    
    
    
Cam_controlXYZ = function(camera, renderer, camProps){



plusX = false;
minusX = false;
plusY = false;
minusY = false;
plusZ = false;
minusZ = false
    
MHelp.objCallB(CLS("cambut", "class"), el=>{
    el.addEventListener("touchstart", function(e){
        e.preventDefault();
        camProps.presentCam = camera;
    });
});
$("plusX").addEventListener("touchstart", function(e){
        plusX = true;
})
$("plusX").addEventListener("touchend", function(e){
        plusX = false;
})
$("minusX").addEventListener("touchstart", function(e){
        minusX = true;
})
$("minusX").addEventListener("touchend", function(e){
        minusX = false;
})


$("plusY").addEventListener("touchstart", function(e){
        plusY = true;
})
$("plusY").addEventListener("touchend", function(e){
        plusY = false;
})
$("minusY").addEventListener("touchstart", function(e){
        minusY = true;
});
$("minusY").addEventListener("touchend", function(e){
        minusY = false;
})
    
    
$("plusZ").addEventListener("touchstart", function(e){
        plusZ = true;
})
$("plusZ").addEventListener("touchend", function(e){
        plusZ = false;
})
$("minusZ").addEventListener("touchstart", function(e){
        minusZ = true;
});
$("minusZ").addEventListener("touchend", function(e){
        minusZ = false;
})







function camContrAnimFrame(){
    if(plusX)camera.position.x += 5
    if(minusX)camera.position.x -= 5;
    if(plusY)camera.position.y += 5;
    if(minusY)camera.position.y -= 5;
    if(plusZ)camera.position.z += 5;
    if(minusZ)camera.position.z -= 5;
    
    $("plusX").innerText = Math.floor(camera.position.x)+"+X";
    $("plusY").innerText = Math.floor(camera.position.y)+"+Y"
    $("plusZ").innerText = Math.floor(camera.position.z)+"+Z"
    requestAnimationFrame(camContrAnimFrame);
}//EO camContrAnimFrame
camContrAnimFrame();



}//EO every
    
    
    
    
    
    
    