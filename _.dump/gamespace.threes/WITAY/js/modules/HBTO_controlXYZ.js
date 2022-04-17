    
    
    
    
//HeroBall Travel Orientation
HBTO_controlXYZ = function(camProps, controlType = "clicker", keyboard=null){ 
    
this.controlType = controlType;
CLS("hbto", 0).addEventListener("touchstart", function(e){
    camProps.presentCam = camProps.defaultCam;
    
});
$("hbto_switchContr").addEventListener("click", (e) =>{   
    this.controlType =( (this.controlType==="clicker")?"joystick":"clicker" );
    setController()
});
    
    
    
var setController = ()=>{
    
    
if(this.controlType === "clicker"){
    let ctx = this;
    let joysticker = $("hbtoJoystick");
    joysticker.style.display = "none"
    this.joystickDeg = "use \"joystick\" \n"; 
    this.joystickLeft = "use \"joystick\" \n"; 
    this.joystickTop = "use \"joystick\" \n"; 
        
        
    var clicker = $("hbtoClicker"); 
    clicker.style.display = "block";
    this.clicked = "-Z"
    this.clickedArr = ["-Z", "+X", "+Z", "-X"];
    this.clickedInd = 16*16;//cylic picker
    getAllElem(CLS("hbtobut", "class"), function(el){
        el.addEventListener("click", function(e){
            e.preventDefault();
            camProps.presentCam = camProps.defaultCam;
            //e.target.innerText = ""+ctx.clickedInd
        });
    });
    CLS("hbto", 0).addEventListener("click", function(e){
        e.preventDefault();
        camProps.presentCam = camProps.defaultCam;
    });
    
    
    $("HBTO_plusX").addEventListener("click", (e) =>{
            this.clicked = this.clickedArr[(++this.clickedInd)%4];//"+X";
    })
    
    $("HBTO_minusX").addEventListener("click", (e) =>{
            this.clicked = this.clickedArr[(--this.clickedInd)%4];//"-X";
    })
    
    
    $("HBTO_plusY").addEventListener("click", (e) =>{
            this.clicked = "+Y";
    })
    
    $("HBTO_minusY").addEventListener("click", (e) =>{
            this.clicked = "-Y";
    });
        
        
    $("HBTO_plusZ").addEventListener("click", (e) =>{
            this.clickedInd += 2;
            this.clicked =this.clickedArr[(this.clickedInd)%4];//"+Z";
    })
    
    $("HBTO_minusZ").addEventListener("click", (e) =>{
            this.clickedInd -= 2;
            this.clicked =this.clickedArr[(this.clickedInd)%4];//"-Z";
    });
    
    
    
}//EO clicker
        
        
        
if(this.controlType === "joystick"){
    $("hbtoClicker").style.display = "none";
    this.clicked = "use \"clicker\""
    
    var joystick = $("hbtoJoystick");
    joystick.style.display = "block";
    let joystickDefaultPosition = {
        x: joystick.getBoundingClientRect().left ,
        y: joystick.getBoundingClientRect().top,
        xInPar: -joystick.parentNode.getBoundingClientRect().left + joystick.getBoundingClientRect().left,
        yInPar: -joystick.parentNode.getBoundingClientRect().top + joystick.getBoundingClientRect().top,
    }
    var joystickParent = CLS("hbto", 0);
    ctx = this;
    this.joystickDeg = -90; 
    this.joystickLeft = joystick.style.left;
    this.joystickTop = joystick.style.top;
    
    
    joystick.ontouchmove = ev =>{
        ev.preventDefault();
        ePX = ev.touches[0].pageX;
        ePY = ev.touches[0].pageY;
        
        //get degrees of rotation
        oppX = -1*(ePX - joystickDefaultPosition.x );
        adjZ = -1*(ePY - joystickDefaultPosition.y );
        degInRad = Math.atan(oppX/adjZ);
        degInRad = Math.atan2(oppX, adjZ);
        degInRad = Math.atan2(adjZ, oppX); //0 at X>
        degInAng = (degInRad*180/Math.PI);//+( (degInRad < 0)?360:0 );
        this.joystickDeg = -degInAng;
        this.joystickLeft = 
            (joystickDefaultPosition.xInPar+
            ( Math.cos( (180-this.joystickDeg)*Math.PI/180)*joystick.clientHeight)
            )*100/joystickParent.clientWidth
        this.joystickTop =
            (joystickDefaultPosition.yInPar+
            ( Math.sin( (180-this.joystickDeg)*Math.PI/180)*joystick.clientWidth)
            )*100/joystickParent.clientHeight
        joystick.style.left = this.joystickLeft+"%";
        joystick.style.top = this.joystickTop+"%";
        
        
        console.log( Math.tan( (this.joystickDeg)*Math.PI/180)*joystick.clientHeight/2)
        console.log(this.joystickLeft+"; "+this.joystickTop+"; "+joystickParent.offsetWidth+"; "+this.joystickDeg);
        console.log(joystick.style.left+"; "+joystick.style.top);
    }//EO joystick
    
} //EO joystick




    
if(this.controlType === "keyboarder"){
    this.keyboarded = "-Z"
    this.keyboardedArr = ["-Z", "+X", "+Z", "-X"];
    this.keyboardedInd = 16*16;//cylic picker
    this.keyboarderPM = 0;
    console.log(keyboard);
    document.onkeydown = (e)=>{ //alert()
    if(e.keyCode == 38){
        this.keyboarded = this.keyboardedArr[(++this.keyboardedInd)%4];//"+X";
        //alert("left"+""+this.keyboarded)
        this.keyboarderPM = this.keyboarderPM+20;;
    }
    if(e.keyCode == 40){
        this.keyboarded = this.keyboardedArr[(--this.keyboardedInd)%4];//"-X";
        //alert("right"+""+this.keyboarded)
    }
    if(e.keyCode == 37){
        this.keyboardedInd += 2;
        this.keyboarded = this.keyboardedArr[(this.keyboardedInd)%4];//"+Z";
        //alert("up"+this.keyboarded);
        this.keyboarderPM = this.keyboarderPM-20;;
    }
    if(e.keyCode == 39){
        this.keyboardedInd -= 2;
        this.keyboarded = this.keyboardedArr[(this.keyboardedInd)%4];//"-Z";
        //alert("down", this.keyboarded)
    };
    
    }//EO liste
}//EO keyboarder
    
    
    
    
}//EO setController
setController();




}//EO HBTO_controlXYZ
    
    
    
    
    
    
    