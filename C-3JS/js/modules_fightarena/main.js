
var Main= (function(){
/* make it into a decision making game , so rotation makes sense*/

var container, scene, camera, OrbitCamera, renderer, controls, orbitControl;
var TPCamera, OrbitCamera;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var time = {};
var mControl;
var collideMeshList = [];   
var message = document.getElementById("message");
var crash = false;
var contr = 0;
var contrText = document.getElementById("contr");
var id = 0;
var logger = document.getElementById("logger");


var camProps = {};
var addGeos = null;
    let hero = {
        speed: 0,
        directionX: -1,
        directionZ: 0,
        health: 100,
        state: "alive",
        attack: (skeleton)=>{
            if(skeleton.isBoundBy(hero)) skeleton.health = skeleton.health-20;
        }
    }
    let SkeletonSchema = function(model){
        this.health = 100;
        this.model = model;
        this.isBoundBy = function(hero){
            logger.innerText += "\n..."+this.model.position.x+" "+hero.model.position.x;
            //return 
            if(this.model.position.x+8>= hero.model.position.x){
            if(this.model.position.x-8<= hero.model.position.x){
            if(this.model.position.z+8>= hero.model.position.z){
            if(this.model.position.z-8<= hero.model.position.z){
                return true;
            }
            }
            }
            }
            return false;
        }
        this.attacking = function(){
            
        }
    }
    let skeleton1 = null;




console.log("starting...", window.location)







var stateScreen = document.getElementById("stateScreen");
window.stateScreen = stateScreen;
stateScreen.Game = {
    screen: stateScreen,
    screen_colors: {major: "#4D2A07", minor: "white", extra: "red"},
    level: 1,
    loading: 0,
    states: {init: false, paused: false, playing: false}
}
stateScreen.Game = {...stateScreen.Game,
    screen_styles: {
        default_:`
        position: absolute;
        width: 100%; display: block;
        height: 100%;
        z-index: 2;
        background-color: ${stateScreen.Game.screen_colors.major};
        color: ${stateScreen.Game.screen_colors.minor};
        `,
        visible:`display: block;`,
        hidden:`display: none;`,
    },
    setState: (state)=>{
        let states = {
        init: () => {
            stateScreen.style = stateScreen.Game.screen_styles.default_;
            states = {init: true, paused: false, playing: false};
            view_init();
        },
        pause: () => {
            stateScreen.style = stateScreen.Game.screen_styles.visible;
            states = {init: false, paused: true, playing: false};
        },
        play: () => {
            stateScreen.style = stateScreen.Game.screen_styles.hidden;
            states = {init: false, paused: false, playing: true}
        },
        };
        states[state]();
    },
}
stateScreen.Game.setState("init");
//EO stateScreen...















function view_init() {
    // Scene
    scene = new THREE.Scene();
    // Camera
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    TPCamera=new THREE.PerspectiveCamera(90, screenWidth/screenHeight,1,4000);
    //scene.add(new THREE.CameraHelper(TPCamera));
    
    OrbitCamera=new THREE.PerspectiveCamera(90,screenWidth/screenHeight,1,4000);
    OrbitCamera.rotation.set(0, 0, 0);
    OrbitCamera.position.set(0, 0, 0);
    OrbitCamera.lookAt(new THREE.Vector3( 0, 0, -200.123));
    camProps.list = [TPCamera, OrbitCamera];
    camselectlistener();
    heroctrlslistener();
    
    
    // Renderer
    if (Detector.webgl)
    renderer =
    new THREE.WebGLRenderer({ antialias:true, preserveDrawingBuffer:false });
    else
    renderer = new THREE.CanvasRenderer();
    
    
    renderer.setSize(screenWidth * 1, screenHeight * 1);
    renderer.shadowMap.enabled = false;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container = document.getElementById("ThreeJS");
    container.appendChild(renderer.domElement);
    
    
    
    //Three controller
    THREEx.WindowResize(renderer, camera); 
    orbitControl = new THREE.OrbitControls(OrbitCamera, renderer.domElement);
    orbitControl.rotateSpeed = .7;
    orbitControl.enableDamping = false;
    orbitControl.dampingFactor = .5;
    orbitControl.autoRotate = false;
    orbitControl.enableZoom = true;
    orbitControl.minDistance = 0;
	orbitControl.maxDistance = 100;
    orbitControl.maxPolarAngle = Math.PI / 2;
    orbitControl.target = new THREE.Vector3(0, 0, 275);
    orbitControl.enableKeys = (false);
    //orbitControl.listenToKeyEvents(window);
    console.log(orbitControl)
    
    
    addGeos = new AddGeos(scene, collideMeshList);
    addGeos.mainLight.position.set(0, 200, 350);
    addGeos.mainLight.target.position.set(0, 0, 275);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    loadChecker();
    animate();
}//EO view_init




function loadChecker() {   
    if(
     true
     &&addGeos.skeleton == null
     &&addGeos.hero == null
     )
    {
        stateScreen.Game.loading = 100;
    }
    else requestAnimationFrame(loadChecker);
}
function animate() {   
    if(stateScreen.Game.loading==100) update();
    renderer.render(scene, camProps.presentCam);
    requestAnimationFrame(animate);
}


function update() {
    logger.innerText = "";
    time.now = new Date();
    if(time.last === null) time.last = time.now;
    time.fps = 1000/(time.now-time.last);
    
    
    
    
    orbitControl.update();
    
    
    (function(){
    if(addGeos.skeleton == null) return;
    //BO AnimationHandler
    if (addGeos.skeleton.animationMixer !== null)
    addGeos.skeleton.animationMixer.update(clock.getDelta());
    })();
    
    //BO hero
    (function(){
    if(addGeos.hero == null) return;
    
    //hero 
    hero.model = addGeos.hero;
    
    //hero motion
    addGeos.hero.animationMixer.update(clock.getDelta());
    if(hero.moving){
        hero.speed = 2;
    }else{
        hero.speed = 0;
    }
    addGeos.hero.position.x += hero.speed*(1/time.fps)*hero.directionX*-1;
    addGeos.hero.position.z += hero.speed*(1/time.fps)*hero.directionZ*-1;
    
    //hero rotor
    if(addGeos.hero.rotating == "left") addGeos.hero.rotation.y += 0.2%6.3;
    if(addGeos.hero.rotating == "right") addGeos.hero.rotation.y -= 0.2%6.3;
    hero.directionX = Math.sin(Math.PI+addGeos.hero.rotation.y);
    hero.directionZ = -Math.cos(addGeos.hero.rotation.y);
    
    
    
    //BO TPCamera
    TPCamera.position.z = addGeos.hero.position.z+(15)*hero.directionZ;
    TPCamera.position.y = addGeos.hero.position.y+10;
    TPCamera.position.x = addGeos.hero.position.x+(15)*hero.directionX;
    TPCamera.lookAt(new THREE.Vector3(
    addGeos.hero.position.x-15*hero.directionX,
    0,
    addGeos.hero.position.z-15*hero.directionZ
    ));
    //TPCamera.rotation.y = -addGeos.hero.rotation.y;
    
    
    //BO AnimationHandler
    if (addGeos.hero.animationMixer != null) 
    addGeos.hero.animationMixer.update(clock.getDelta());
    
    
    prog();
    })();
    
    //BO Ninja
    (function(){
    if(addGeos.Ninja == null) return;
    //BO AnimationHandler
    if (addGeos.Ninja.animationMixer) 
    addGeos.Ninja.animationMixer.update(clock.getDelta());
    console.log(addGeos.Ninja.animationMixer)
    })();
    
    
    (function(){
    if(addGeos.skeleton == null) return;
    addGeos.skeleton.position.z -= 0*(1/time.fps);
    })();
    
    
    
    
    time.last = time.now;
    logger.innerText += "\nfps: "+time.fps+"\nhero: "+hero.speed;
}//EO update












function prog(){
    skeleton1 = (skeleton1==null?new SkeletonSchema(addGeos.skeleton):skeleton1);
    logger.innerText += ""
    +"\nisBoundBy: "+(skeleton1.isBoundBy(hero))
    +"\nhealth: "+(skeleton1.health);
}










var sel1 = null;
var sel2 = null;
var sels = null;
var currentInd = null;
function camselectlistener(){
    sel1 = document.querySelector("camselect sel#sel1");
    sel2 = document.querySelector("camselect sel#sel2");
    sels = [sel1, sel2];
    sels.map((sel, ind)=>{
        sel.onclick = function(){ camSelect(sels, ind); currentInd = ind; };
    });
    sel2.click();
}//EO camselectlistener


function camSelect(sels, ind){
    sels.map((sel)=>{
        sel.style.backgroundColor = "white";
        sel.style.opacity = 1;
    });
    sels[ind].style.opacity = 0.5;
    camProps.presentCam = camProps.list[ind];
}//EO camSelect


function heroctrlslistener(){
    let ctrA1 = document.querySelector("heroctrls[actions] contr[contr1]");
    let ctrA2 = document.querySelector("heroctrls[actions] contr[contr2]");
    ctrA1.onselectstart = function(e){ e.preventDefault(); return false};
    ctrA2.onselectstart = function(e){ e.preventDefault(); return false};
    ctrA1.ontouchstart = ctrA1.onmousedown = function(e){
        e.preventDefault();
        hero.moving = true;
        addGeos.hero.setAction(addGeos.hero.runUpAction);
        addGeos.hero.setAction(addGeos.hero.runDownAction);
    }
    ctrA1.ontouchend = ctrA1.onmouseup = function(e){
        e.preventDefault();
        hero.moving = false;
    }
    ctrA2.onclick = function(e){
        e.preventDefault();
        addGeos.hero.setAction(addGeos.hero.hit1Action);
        hero.attack(skeleton1);
    }
    
    
    
    //
    let ctrR1 = document.querySelector("heroctrls[rotors] contr[contr1]");
    let ctrR2 = document.querySelector("heroctrls[rotors] contr[contr2]");
    ctrR1.onselectstart = function(e){ e.preventDefault(); return false};
    ctrR2.onselectstart = function(e){ e.preventDefault(); return false};
    ctrR1.ontouchstart = ctrR1.onmousedown = function(e){
        e.preventDefault();
        addGeos.hero.rotating = "left";
    }
    ctrR1.ontouchend = ctrR1.onmouseup = function(e){
        e.preventDefault();
        addGeos.hero.rotating = null;
    }
    
    
    ctrR2.ontouchstart = ctrR2.onmousedown = function(e){
        e.preventDefault();
        addGeos.hero.rotating = "right";
    }
    ctrR2.ontouchend = ctrR2.onmouseup = function(e){
        e.preventDefault();
        addGeos.hero.rotating = null;
    }
    
    
    
    
    
    
    
    
    document.onkeydown = (e)=>{
    if(e.keyCode == 38 || e.keyCode == 40){
        ctrA1.ontouchstart(e);
    }
    if(e.keyCode == 38){
    }
    if(e.keyCode == 40){
    }
    if(e.keyCode == 37){
        ctrR1.onmousedown(e);
    }
    if(e.keyCode == 39){
        ctrR2.onmousedown(e);
    }
    if(e.keyCode == 65){//Akey
        ctrA2.onclick(e);
    }
    if(e.keyCode == 32){ //spacekey
        camSelect(sels, (currentInd+1)%2);
    }
    }//EO liste
    
    document.onkeyup = (e)=>{
    if(e.keyCode == 38 || e.keyCode == 40){
        ctrA1.ontouchend(e);
    }
    if(e.keyCode == 38){
    }
    if(e.keyCode == 40){
    }
    if(e.keyCode == 37){
        ctrR1.onmouseup(e); 
    }
    if(e.keyCode == 39){
        ctrR2.onmouseup(e);
    };
    
    }//EO liste
    
    
    
    
    
}//EO heroctrlslistener
















logger.onclick = function(){
    let a = document.createElement("a");
    let img = new Image( );
    img.src = ( renderer.domElement.toDataURL() );
    a.href = img.src;
    a.download = "capture.png";
    a.click();
}








})//EO function