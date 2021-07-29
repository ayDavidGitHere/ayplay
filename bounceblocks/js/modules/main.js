
var Main= (function(){
/* make it into a decision making game , so rotation makes sense*/

var container, scene, camera, FPCamera, renderer, controls;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock;
var mControl;

var mainLight; var spotLight; var pointLight;
var heroBall;   var heroBallTrans;   var hbtoControl;
var camProps = {presentCam: camera, defaultCam:camera, altCam: FPCamera ,followHB: true, ZFromHero: 50, XFromHero: 0, YFromHero: 50};
var block;
var blocks = {majorBlocks: [], sideBlocks:[], sideRamps:[], bridges: []};
var supers = {highs: [], ramps: []}
var ramps = {}
var orbs = {}
var tubes = {};


var collideMeshList = [];   
var message = document.getElementById("message");
var crash = false;
var contr = 0;
var contrText = document.getElementById("contr");
var id = 0;
var crashFace = null; var collisionRes = null;
var lastCrashId = " ";




var color_1 = "rgb("+50+","+ 37+","+ 137+")";
var color_red = "rgb("+200+","+ 30+","+ 100+")";
var color_golden = "goldenrod"
var color_steel = "rgb("+161+","+ 157+","+ 148+")";
let STRUCTURE = {START: {}, CENTER:{}, FLOOR:{}, GENERALCOLOR: color_steel};
    
    
    
    

init();
animate();
console.log("start"); 
//Remove OrbitControls to allow lookAt
//Took me 2 days ):





function init() {
    // Scene
    scene = new THREE.Scene();
    // Camera
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    camera = new THREE.PerspectiveCamera(90, screenWidth/screenHeight, 1, 4000);
    camera.rotation.set(0, 0, 0);
    camProps.defaultCam = camera;
    camProps.presentCam = camera;
    
    
    FPCamera = new THREE.PerspectiveCamera(90, screenWidth/screenHeight, 1, 4000);
    FPCamera.rotation.set(0, 0, 0);
    FPCamera.position.set(-100, 600, 0);
    FPCamera.lookAt(new THREE.Vector3( -170+90, 50, -105-52.5));
    camProps.presentCam = FPCamera;
    new Cam_controlXYZ(FPCamera, renderer, camProps); 
    
    
    
    // Renderer
    if (Detector.webgl) {
        renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: false });
    } else {
        renderer = new THREE.CanvasRenderer();
    }
    renderer.setSize(screenWidth * 1, screenHeight * 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container = document.getElementById("ThreeJS");
    container.appendChild(renderer.domElement);


    
    //Three controller
    THREEx.WindowResize(renderer, camera); 
    //controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    
    //mcontrol
    mControl = new MControl(container);
    mControl.holdPage();
    Math.getSign = function(num){
        var sign = ((num<Math.abs(num))? -1:1)
        return sign
    }
    
    
    //addGeometry
    let addGeos = new AddGeos(scene, collideMeshList, STRUCTURE);
    heroBall = addGeos.heroBall;
    mainLight = addGeos.mainLight;
    STRUCTURE = addGeos.STRUCTURE;
    blocks = addGeos.blocks;
    supers = addGeos.supers;
    ramps = addGeos.ramps;
    
    FPCamera.position.set(STRUCTURE.START.X+STRUCTURE.WID/2, STRUCTURE.FLOOR.Y+120, STRUCTURE.START.Z+STRUCTURE.LEN/2+200);
    heroBallTrans = geoTrans(heroBall, {x:false, y:false, z:false});
    hbtoControl = new HBTO_controlXYZ(camProps, "clicker");
    
    
    
}//EO init




function animate() {   
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camProps.presentCam);
}

    
function update() {
    //heroBall.rotation.z += 0.5
    //save heroBall Positions
    heroBallPosX = heroBall.position.x;
    heroBallPosY = heroBall.position.y;
    heroBallPosZ = heroBall.position.z;

    
    //Reset Cam Props
    camProps.followHB = true;
    camProps.XFromHero = 0;
    camProps.ZFromHero = 0;
    camProps.YFromHero = 0;
    
    
    //Cam Follows Hero
    changeCameraOrientation();
    if(camProps.followHB ){
        camera.position.set(
                heroBall.position.x+ camProps.XFromHero,
                (heroBall.position.y)+ camProps.YFromHero,
                heroBall.position.z+ camProps.ZFromHero
                            );
        camera.lookAt(
            new THREE.Vector3( 
                heroBall.position.x- camProps.XFromHero,
                heroBall.position.y,
                heroBall.position.z- camProps.ZFromHero
                ) );
        FPCamera.lookAt(new THREE.Vector3(STRUCTURE.START.X+STRUCTURE.WID/2, STRUCTURE.FLOOR.Y, STRUCTURE.START.Z+STRUCTURE.LEN/2));
    }
    else{
        camera.position.set(-81, 123, 189); 
    }
    
    
    
    
    
    
    //check intersections
    var crashObj = checkInter(heroBall);
    
    //setDirection
    heroBallSetDirection();
    
    //Control speed or direction
    if(crashObj.crash)
    updateSpeedWithControls();
    
    //Friction & Gravity changes speed
    heroBallDefaultFriction(crashObj);
        
    
    //Allow Geos Transition
    heroBallTranslater();
    
    
    
    
    
    
    
    
    
    
    
    
    
    contr += 0.1;  
    contrText.innerText =   ""
                            //hbtoControl.joystickLeft+"; "+
                            //heroBall.travelOrientation+"; "+
                            //hbtoControl.joystickDeg+"deg; "+
                            //hbtoControl.joystickLeft+
                            //"; "+hbtoControl.joystickTop
                            +"; contr:"+Math.floor(contr)
                            +";\n"+crashObj.crash
                            +";\n"+heroBall.horizonXSpeed
                            +";\n"+heroBall.horizonZSpeed
                            +";\n"+heroBall.verticalSpeed
                            +";\n"+heroBall.factorX
                            +";\n"+heroBall.factorY
                            +";\n"+heroBall.factorZ
                            +";\n"+JSON.stringify(crashFace)
                            +";\n"+((collisionRes!=null)?(collisionRes[0].distance):"$$")
    //console.log(ObjHelp.getProps(collisionRes[0]));
    //console.log(collisionRes[0]);
}//EO update











function checkInter(geomet){
    var originPoint = geomet.position.clone();
    for (var vertexIndex = 0; vertexIndex < geomet.geometry.vertices.length; vertexIndex++) {
        // 顶点原始坐标
        var localVertex = geomet.geometry.vertices[vertexIndex].clone();
        // 顶点经过变换后的坐标
        var globalVertex = localVertex.applyMatrix4(geomet.matrix);
        var directionVector = globalVertex.sub(geomet.position);
        var ray = new THREE.
            Raycaster(originPoint, directionVector.clone().normalize());
        var collisionResults = ray.intersectObjects(collideMeshList);
        if (collisionResults.length > 0
            &&collisionResults[0].distance < directionVector.length()
        ) { 
            crash = true;
            collisionRes = [];
            crashFace = [];
            collisionResults.map((collisionResEl)=>{
                if(collisionResEl.distance < directionVector.length()){
                    collisionRes.push(  collisionResEl  );
                    crashFace.push([
                        collisionResEl.face.normal.x,
                        collisionResEl.face.normal.y,
                        collisionResEl.face.normal.z
                        ])
                }//EO if
            })
            break;
        }
        crash = false; 
        crashFace = null;
        collisionRes = null
    }  
    return{crash:crash, crashFace:crashFace, collisionRes: collisionRes};
}//EO checkInter
    
    
    
    
    
    
function updateSpeedWithControls() {
            var delta = clock.getDelta();
            var moveDistance = 200 * delta;
            var rotateAngle = Math.PI / 2 * delta;

            if (keyboard.pressed("A")) {
                //movingCube.rotation.y += rotateAngle;
            }
            if (keyboard.pressed("D")) {
                //movingCube.rotation.y += rotateAngle;
            }
            if (keyboard.pressed("left")) {
                //movingCube.position.x -= moveDistance;
            }
            if (keyboard.pressed("right")) {
                //movingCube.position.x += moveDistance;
            }
            if (keyboard.pressed("up")) {
                //movingCube.position.z -= moveDistance;
            }
            if (keyboard.pressed("down")) {
                //movingCube.position.z += moveDistance;
            }
            
            
            
            
            //for This Game
            let moveCord = mControl.touched.moveCord
            let moveCordLen = moveCord.length;
            if(moveCord.length>1){
                heroBall.horizonXSpeed += 0.020*2*2*heroBall.factorX/5;
                heroBall.horizonZSpeed += 0.020*2*2*heroBall.factorZ/5;
                //LIGHT STEERING
                /*
                if(heroBall.travelOrientation != "+X" 
                   && moveCord[moveCordLen-2].x < moveCord[moveCordLen-1].x){
                    heroBallTrans.x(+0.1);
                }
                if(heroBall.travelOrientation != "-X" 
                   && moveCord[moveCordLen-2].x > moveCord[moveCordLen-1].x){
                    heroBallTrans.x (-0.1)
                }
                if(heroBall.travelOrientation != "+Z" 
                   && moveCord[moveCordLen-2].y < moveCord[moveCordLen-1].y){
                    heroBallTrans.z (+0.1);
                }
                if(heroBall.travelOrientation != "-Z" 
                   && moveCord[moveCordLen-2].y > moveCord[moveCordLen-1].y){
                    heroBallTrans.z (-0.1);
                }
                */
            }
            if(mControl.touched.end){
                mControl.touched.moveCord = [];
            }
            
            
            
            
            //controls.autoRotate = true;
            //controls.update();
}











function changeCameraOrientation(){
    //steering
    camProps.XFromHero = -70/4*heroBall.factorX;
    camProps.ZFromHero = -70/4*heroBall.factorZ;
    camProps.YFromHero = 70/4;
}
    
    
    
    

function heroBallSetDirection(){
    switch (hbtoControl.controlType){
        case "clicker":
        heroBall.travelOrientation = hbtoControl.clicked;
        switch (heroBall.travelOrientation) {
            case "-Z":
                heroBall.factorZ = -1;
                heroBall.factorY = 1;
                heroBall.factorX = 0;  break;
            case "+Z":
                heroBall.factorZ = 1;
                heroBall.factorY = 1;
                heroBall.factorX = 0;  break;
            case "-X":
                heroBall.factorX = -1;
                heroBall.factorY = 1;
                heroBall.factorZ = 0;  break;
            case "+X":
                heroBall.factorX = 1;
                heroBall.factorY = 1;
                heroBall.factorZ = 0;  break;
            case "-Y":
                heroBall.factorY = -1;
                heroBall.factorX = 0;
                heroBall.factorZ = 0;  break;
            case "+Y":
                heroBall.factorY = 1;
                heroBall.factorX = 0;
                heroBall.factorZ = 0;  break;
        }
        break;
        case "joystick":
            heroBall.factorZ= (Math.sin(hbtoControl.joystickDeg*Math.PI/180) )
            heroBall.factorY = 1;
            heroBall.factorX = ( Math.cos( (180-hbtoControl.joystickDeg)*Math.PI/180) )
        break;
    }
}


function heroBallTranslater(){
    heroBallTrans.z( heroBall.horizonZSpeed )//* heroBall.factorZ); 
    heroBallTrans.x( heroBall.horizonXSpeed )//* heroBall.factorX);
    heroBallTrans.y( heroBall.verticalSpeed )//* heroBall.factorY);
    
    heroBall.material.color.set("rgb("
    +(155*Math.round(Math.abs(heroBall.factorX)))+", "
    +(55*Math.round(Math.abs(heroBall.factorY)))+","
    +(155*Math.round(Math.abs(heroBall.factorZ)))+")")
}//EO heroBallTranslater
    
    
    
function heroBallDefaultFriction(crashObj){
    //Detect Collision and Guide Movements
    
    //Gravity
    if( !crashObj.crash ){
        //heroBall.verticalSpeed =  -0.98;
        heroBall.verticalSpeed -= 0.0098 *2*10/5
    }
    
    
    if( crashObj.crash ){
        
        
        var collidesInd = 0;
                crashObj.collisionRes.map((collisionResEl, collidesInd)=>{
        var crashId = crashObj.collisionRes[collidesInd].object;
        
        
        //Floor Friction Coefficent
        let hZ_Coeff = (heroBall.horizonZSpeed-heroBall.horizonZSpeed/1.05);
        let hX_Coeff = (heroBall.horizonXSpeed-heroBall.horizonXSpeed/1.05)
    
        if(heroBall.horizonXSpeed>0)heroBall.horizonXSpeed -= hX_Coeff
        if(heroBall.horizonXSpeed<0)heroBall.horizonXSpeed += hX_Coeff*-1
        if(heroBall.horizonZSpeed>0)heroBall.horizonZSpeed -= hZ_Coeff
        if(heroBall.horizonZSpeed<0)heroBall.horizonZSpeed += hZ_Coeff*-1
        
        
        var normX = crashObj.crashFace[collidesInd][0];
        var normY = crashObj.crashFace[collidesInd][1]; 
        var normZ = crashObj.crashFace[collidesInd][2] 
        //if( crashId.my.type == "block" ){
        if(normX == Math.floor(normX)
        && normY == Math.floor(normY) 
        && normZ == Math.floor(normZ)
            ){
            //heroBall.horizonXSpeed = ( heroBall.horizonXSpeed - 
            //    Math.abs(normX) * heroBall.horizonXSpeed*1.5 );
            //heroBall.horizonXSpeed += normX*(heroBall.horizonXSpeed*1.5);
            //heroBall.horizonZSpeed = ( heroBall.horizonZSpeed - 
            //    Math.abs(normZ) * heroBall.horizonZSpeed*1.5 );
            //heroBall.verticalSpeed = heroBall.verticalSpeed -
            //    Math.abs(normY) * heroBall.verticalSpeed*1;
                
            ELOSS = 0.8; ELOSS_Y = 0.6;
            heroBall.horizonXSpeed *= 1-Math.abs(normX)*(ELOSS+1);
            heroBall.horizonZSpeed *= 1-Math.abs(normZ)*(ELOSS+1);
            heroBall.verticalSpeed *= 1-Math.abs(normY)*(ELOSS_Y+1);
            
            
            //correction
            if(crashObj.collisionRes[collidesInd].distance<=
            heroBall.heiY){
                heroBall.position.y += (heroBall.heiY-crashObj.collisionRes[collidesInd].distance)*Math.abs(normY)
            }
            if(crashObj.collisionRes[collidesInd].distance<=
            heroBall.widX){
                heroBall.position.x += (heroBall.widX-crashObj.collisionRes[collidesInd].distance)* -normX;
            }
            if(crashObj.collisionRes[collidesInd].distance<=
            heroBall.lenZ){
                heroBall.position.z += (heroBall.lenZ-crashObj.collisionRes[collidesInd].distance)* -normZ
            }//EO if
        }
        if( crashId.my.type == "ramp" ){
            var orientY = crashId.my.orientY;
            var orientX = crashId.my.orientX;
            var orientZ = crashId.my.orientZ;
            var normZ = -Math.sin(Math.PI/2*(orientY));
            var normX = -Math.cos(Math.PI/2*(orientY));
            var slope = crashId.my.heiY/crashId.my.lenZ;
            //Friction
            //heroBall.horizonZSpeed -= 0.01*normZ;
            //heroBall.horizonXSpeed -= 0.01*normX 
            heroBall.horizonZSpeed -= 0.005*slope*normZ/5
            heroBall.horizonXSpeed -= 0.005*slope*normX/5;
            
            heroBall.verticalSpeed 
            = slope*(0
            + ( heroBall.horizonZSpeed* normZ )
            + ( heroBall.horizonXSpeed* normX )
            );//EO verticalSpeed
            
            /*
            if(crashObj.collisionRes[collidesInd].distance<= 4){
                heroBall.position.x += (4-crashObj.collisionRes[collidesInd].distance)* -normX
                heroBall.position.z += (4-crashObj.collisionRes[collidesInd].distance)* -normZ
            //4 is heroball radius
            }//EO if
            */
            
            
        }//EO if
        
        
        })//EO map
    
    }//EO if 
    
}//EO heroBallDefaultFriction
    
    
    
    
    
    
    
    
    
    
    
    
function geoTrans( geo, cond= {x:true, y:true, z:true} ){
    return {
        x: function(transBy){
                geo.position.x  = geo.position.x+(transBy);
                if(cond.x){
                    geo.rotation.y -= transBy/10;
                }
        },
        y: function(transBy){
                geo.position.y  = geo.position.y+(transBy);
                if(cond.y){
                    geo.rotation.z += transBy/10;
                }
        },
        z: function(transBy){
                geo.position.z  = geo.position.z+(transBy);
                if(cond.z){
                    geo.rotation.x += transBy/10;
                }
        },
        setCondX: function(condX){
            cond.x = condX 
        },
        setCondY: function(condY){
            cond.y = condY 
        },
        setCondZ: function(condZ){
            cond.z = condZ
        }
    }
}//EO geoTrans









    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
$("contr").addEventListener("click", function(e){
        try{
        /*
        document.getElementById("downLink").href ='https://cdn.jsdelivr.net/gh/mrdoob/Three.js@r92/examples/js/loaders/GLTFLoader.js'
        document.getElementById("downLink").download = "THREE.GLTFLoader.js"
        */
        document.getElementById("downLink").href = "https://unpkg.com/three@0.87.1/examples/js/loaders/GLTFLoader.js"
        //document.getElementById("downLink").download = "THREE.GLTFLoader.js"
        /*
        var canvasImgSrc =
        renderer.domElement.toDataURL()
        //(document.getElementsByTagName("canvas", 0)).toDataURL();
        var canvasImg = new Image();
        canvasImg.src = canvasImgSrc;  
        CLS("contr-container", 0).appendChild(canvasImg);  
        alert(canvasImgSrc)
        //document.getElementById("downLink").href = canvasImgSrc
        document.getElementById("downLink").download = "me3.png"
        */
        }catch(e){   alert(e)  }

})





this.animate = animate;
})//EO function