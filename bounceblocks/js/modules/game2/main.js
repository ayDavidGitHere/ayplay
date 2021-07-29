
var Main= (function(){
/* make it into a decision making game , so rotation makes sense*/

var container, scene, camera, FPCamera, renderer, controls;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock;
var mControl;

var addGeos;
var mainLight; var spotLight; var pointLight;
var heroBallTrans;   var hbtoControl;
var camProps = {presentCam: camera, defaultCam:camera, altCam: FPCamera ,followHB: true, ZFromHero: 50, XFromHero: 0, YFromHero: 50};
var loadState = false;



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
var STRUCTURE = {START: {}, CENTER:{}, FLOOR:{}, GENERALCOLOR: color_steel};
    
    
    
    

init();
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
    
    
    
    
    //addGeometry
    try{
    addGeos = new AddGeos(scene, collideMeshList, STRUCTURE);
    mainLight = addGeos.mainLight;
    STRUCTURE = addGeos.STRUCTURE;
    loadState = addGeos.loadState;
    }catch(e){console.log(e)}
    
    
    FPCamera.position.set(STRUCTURE.START.X+STRUCTURE.WID/2, STRUCTURE.FLOOR.Y+120, STRUCTURE.START.Z+STRUCTURE.LEN/2+200);
    //hbtoControl = new HBTO_controlXYZ(camProps, "clicker");
    //hbtoControl.clicked = "+X";
    animate();
    
}//EO init




function animate() {   
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camProps.presentCam);
}

    
function update() {
    
    
    //Reset Cam Props
    camProps.followHB = true;
    camProps.XFromHero = 0; camProps.ZFromHero = 0; camProps.YFromHero = 0;
    
    
    //Cam Follows Hero
    changeCameraOrientation();
    if(camProps.followHB){
        FPCamera.lookAt(new THREE.Vector3(STRUCTURE.START.X+STRUCTURE.WID/2, STRUCTURE.FLOOR.Y, STRUCTURE.START.Z+STRUCTURE.LEN/2));
    }
    else{   
        camera.position.set(-20, 123, 29); 
    }
    
    
    
    
    contr += 0.1;  
    contrText.innerText =   ""
                            +"; contr:"+Math.floor(contr)
                            +";\n"+loadState
}//EO updaete
    
    
    
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
            }
            if(mControl.touched.end){
                mControl.touched.moveCord = [];
            }
            
            //controls.autoRotate = true;
            //controls.update();
}


function changeCameraOrientation(){
    //steering camera
    camProps.XFromHero = -70/3*1//*heroBall.factorX;
    camProps.ZFromHero = -70/3*0//*heroBall.factorZ;
    camProps.YFromHero = 70/9;
    //steering object
}
    
    
    
    
    
    
this.animate = animate;
})//EO function