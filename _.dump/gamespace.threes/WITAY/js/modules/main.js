
var Main= (function(){
/* make it into a decision making game , so rotation makes sense*/

var container, scene, camera, FPCamera, renderer, controls;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock;
var mControl;
var collideMeshList = [];   
var message = document.getElementById("message");
var crash = false;
var contr = 0;
var contrText = document.getElementById("contr");
var id = 0;
var logger = document.getElementById("logger");



var camProps = {};
var addGeos;

var color_1 = "rgb("+50+","+ 37+","+ 137+")";
var color_red = "rgb("+200+","+ 30+","+ 100+")";
var color_golden = "goldenrod"
var color_steel = "rgb("+161+","+ 157+","+ 148+")";



    

init();
animate();
console.log("start"); 




function init() {
    // Scene
    scene = new THREE.Scene();
    // Camera
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    camera = new THREE.PerspectiveCamera(90, screenWidth/screenHeight,1,4000);
    camera.rotation.set(0, 0, 0);
    camProps.defaultCam = camera;
    camProps.presentCam = camera;
    
    
    FPCamera=new THREE.PerspectiveCamera(90, screenWidth/screenHeight,1,4000);
    FPCamera.rotation.set(0, 0, 0);
    FPCamera.position.set(0, 0, 0);
    FPCamera.lookAt(new THREE.Vector3( -170+90, 50, -105-52.5));
    camProps.presentCam = FPCamera;
    
    
    
    // Renderer
    if (Detector.webgl)
    renderer =
    new THREE.WebGLRenderer({ antialias:true, preserveDrawingBuffer:false });
    else
    renderer = new THREE.CanvasRenderer();
    
    
    renderer.setSize(screenWidth * 1, screenHeight * 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container = document.getElementById("ThreeJS");
    container.appendChild(renderer.domElement);
    
    
    
    //Three controller
    THREEx.WindowResize(renderer, camera); 
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    addGeos = new AddGeos(scene, collideMeshList);
    addGeos.orb.position.set( -170+90, 50, -105-52.5);
    addGeos.mainLight.target.position.set(-170+90, 50, -105-52.5);
    addGeos.orb.geometry.faces.map((face)=>{
        face.color.setRGB( (50+Math.random()*200)/255,100/255,50/255 );
        face.color = new THREE.Color(0xffffff);
        //console.log(face);
    });
    addGeos.orb.geometry.colorsNeedUpdate = true;
    addGeos.orb.geometry.elementsNeedUpdate = true;
    
    //console.log(addGeos.orb)
    //console.log(camProps.presentCam);
    
    
    
    //FPCamera.position.set(STRUCTURE.START.X+STRUCTURE.WID/2, STRUCTURE.FLOOR.Y+120, STRUCTURE.START.Z+STRUCTURE.LEN/2+200);
}//EO init




function animate() {   
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camProps.presentCam);
}

    
function update() {
    (function(){
    if(addGeos == null) return;
    addGeos.orb.rotation.x+= 0.05/15*2;
    addGeos.orb.rotation.y+= 0.01/15*2;
    addGeos.orb.rotation.z+= 0.025/15*2;
    //addGeos.spotLight.angle 
    })();
    
}//EO update



function orbControl(){
    let tList = [];
    container.ontouchstart = function(e){
        tList = [];
    }
    container.ontouchmove = function(e){
        var t = (e.touches[0]);
        tList.push([t.pageX, t.pageY]);
        //console.log(t);
        logger.innerText = "a: "+t.radiusX+"\n"+t.radiusY;
    }
}//EO orbControl
orbControl();








})//EO function