
var Main= (function(){
/* make it into a decision making game , so rotation makes sense*/

var container, scene, camera, OrbitCamera, renderer, controls, orbitControl;
var TPCamera, OrbitCamera;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var time = {now: null, last: null};
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
let M$ = {
    isBound: function(a,b,g){
        return (b+g>a&&b-g<a)
    },
}
let hero = {
    speed: 0,
    directionX: -1,
    directionZ: 0,
    health: 100,
    state: "alive",
    attack: (gun)=>{
        if(gun.state.animating) return;
           //hero.setTarget(gun);
           hero.shoot(gun);
    },
    setTarget: (gun)=>{ 
        gun.state.value = "target";
        gun.state.animating = true;
        let cndt1 = 
        M$.isBound(gun.rotation.y,addGeos.hero.rotation.y,0.5*3.143/64);
        let cndt2 = 
        M$.isBound(gun.position.x,addGeos.hero.position.x,0.5*0.5);
        if(!cndt1) gun.rotation.y -= 3.143/64;
        if(!cndt2) gun.position.x -= 0.5;
        if(!cndt1&&!cndt2)
        requestAnimationFrame(function(){ hero.setTarget(gun); });
        else{ gun.state.animating = false; gun.state.value = "idle"}
    },
    shoot: (gun, d=null, k=null)=>{ 
        gun.state.value = "shoot";
        gun.state.animating = true;
        if(k==null) k = 1;
        if(d==null) d = gun.rotation.z+(3.143/4)*k;
        let cndt1 = 
        M$.isBound(gun.rotation.z, d, 0.5*3.143/8);
        if(!cndt1) gun.rotation.z += 3.143/8*k;
        if(cndt1 && k>0) {
            k = -1;
            d = gun.rotation.z+(3.143/4)*k;
            cndt1 = false;
        }
        
        if(cndt1){ gun.state.animating = false; gun.state.value = "idle"}
        else
        requestAnimationFrame(function(){ hero.shoot(gun, d, k); });
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
    screen_colors: {major: "#000817", minor: "white", extra: "red"},
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
    TPCamera=new THREE.PerspectiveCamera(90, screenWidth/screenHeight,0.1,400);
    //scene.add(new THREE.CameraHelper(TPCamera));
    OrbitCamera=new THREE.PerspectiveCamera(90,screenWidth/screenHeight,1,4000);
    OrbitCamera.rotation.set(0, 0, 0);
    OrbitCamera.position.set(150/1.5, 150, 150*1.5);
    OrbitCamera.lookAt(new THREE.Vector3( 0, 100, 200.123));
    camProps.list = [TPCamera, OrbitCamera];
    camselectlistener();
    heroctrlslistener();
    
    
    // Renderer
    renderer = (Detector.webgl?new THREE.WebGLRenderer({ antialias:true, preserveDrawingBuffer:false }):new THREE.CanvasRenderer());
    
    
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
	orbitControl.maxDistance = 80;
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
    let args = [addGeos.skeleton, addGeos.hero, addGeos.gun];
    let cndt = true; 
    //console.log(args.length, "--", args)
    args.map((model)=>{ cndt = model==null?false:cndt; });
    if(cndt){stateScreen.Game.loading=100; stateScreen.Game.setState("play");}
    else requestAnimationFrame(loadChecker);
}
function animate() {   
    if(stateScreen.Game.loading==100) update();
    renderer.render(scene, camProps.presentCam);
    requestAnimationFrame(animate);
}


function update() {
    //BO Calculate fps.
    time.now = new Date();
    if(time.last === null) time.last = time.now-20000;
    time.fps = 1000/(time.now-time.last);
    //BO logger
    logger.innerText = "";
    
    
    
    
    
    
    
    orbitControl.update();
    //BO AnimationHandler
    if (addGeos.skeleton.animationMixer !== null)
    addGeos.skeleton.animationMixer.update(clock.getDelta());
    
    //BO hero
    //hero 
    hero.model = addGeos.hero;
    //hero motion
    if(hero.moving){
        hero.speed = 3;
    }else{
        hero.speed = 0;
    }
    addGeos.hero.position.x += hero.speed*(1/time.fps)*hero.directionX*-1;
    addGeos.hero.position.z += hero.speed*(1/time.fps)*hero.directionZ*-1;
    //hero rotor
    if(addGeos.hero.rotating == "left") addGeos.hero.rotation.y += 0.2%6.3;
    if(addGeos.hero.rotating == "right") addGeos.hero.rotation.y -= 0.2%6.3;
    hero.directionX = Math.sin(Math.PI+addGeos.hero.rotation.y+Math.PI/2);
    hero.directionZ = -Math.cos(addGeos.hero.rotation.y+Math.PI/2);
    
    
    
    //BO TPCamera
    TPCamera.position.z = addGeos.hero.position.z+(1/10)*hero.directionZ;
    TPCamera.position.y = addGeos.hero.position.y*1.2;
    TPCamera.position.x = addGeos.hero.position.x+(1/10)*hero.directionX;
    TPCamera.lookAt(new THREE.Vector3(
    addGeos.hero.position.x-50*hero.directionX,
    addGeos.hero.position.y,
    addGeos.hero.position.z-50*hero.directionZ
    ));
    //
    
    
    if(addGeos.gun.state.value=="idle"){
    addGeos.gun.position.z = addGeos.hero.position.z+(1/1.2)*hero.directionX-(1.8)*hero.directionZ;
    addGeos.gun.position.y = addGeos.hero.position.y;
    addGeos.gun.position.x = addGeos.hero.position.x+(1/1.2)*hero.directionZ-(1.8)*hero.directionX;
    addGeos.gun.rotation.y = addGeos.hero.rotation.y+Math.PI/16;
    //addGeos.gun.rotation.x += 3.14/64;
    //addGeos.gun.rotation.z += 3.14/64;
    //addGeos.gun.rotation.y += 3.14/64;
    }
    if(addGeos.shotgun !=null && addGeos.revolver !=null){
    addGeos.shotgun.rotation.x += 3.14/64;
    addGeos.shotgun.rotation.z += 3.14/128;
    addGeos.shotgun.rotation.y += 3.14/64;
    addGeos.revolver.rotation.x += 3.14/64;
    addGeos.revolver.rotation.z += 3.14/32;
    addGeos.revolver.rotation.y += 3.14/64;
    }
    
    
    
    
    //BO AnimationHandler
    if (addGeos.hero.animationMixer != null) 
    addGeos.hero.animationMixer.update(clock.getDelta());
    //prog
    prog();
    
    
    
    
    
    time.last = time.now;
    logger.innerText += "\nfps: "+Math.floor(time.fps)+"\nhero: "+hero.speed;
}//EO update












function prog(){
    skeleton1 = (skeleton1==null?new SkeletonSchema(addGeos.skeleton):skeleton1);
    logger.innerText += ""
    +"\ndirectionX: "+hero.directionX+" directionZ: "+hero.directionZ
    +"\ngunrotation: "
    +(addGeos.gun.state.animating)
    +"\nisBoundBy: "+(skeleton1.isBoundBy(hero))
    +"\nhealth: "+(skeleton1.health)
    
    ;
}













var sel1 = null;
var sel2 = null;
var sels = null;
var currentInd = 0;
function camselectlistener(){
    sel1 = document.querySelector("camselect sel#sel1");
    sel2 = document.querySelector("camselect sel#sel2");
    sels = [sel1, sel2];
    sels.map((sel, ind, sels)=>{
        sel.onclick = function(){ camSelect(sels, ind); };
    });
    sel2.click();
}//EO camselectlistener


function camSelect(sels, ind){
    currentInd = ind;
    sels.map((sel)=>{
        sel.style.backgroundColor = "white";
        sel.style.opacity = 1;
    });
    sels[ind].style.opacity = 0.5;
    camProps.presentCam = camProps.list[ind];
}//EO camSelect


function heroctrlslistener(){
    let ctrA1 = document.querySelector("heroctrls contr[actions][contr1]");
    let ctrA2 = document.querySelector("heroctrls contr[actions][contr2]");
    let ctrA3 = document.querySelector("heroctrls contr[actions][contr3]");
    ctrA1.onselectstart = function(e){ e.preventDefault(); return false};
    ctrA2.onselectstart = function(e){ e.preventDefault(); return false};
    ctrA3.onselectstart = function(e){ e.preventDefault(); return false};
    ctrA1.ontouchstart = ctrA1.onmousedown = function(e){
        e.preventDefault();
        hero.moving = true;
    }
    ctrA1.ontouchend = ctrA1.onmouseup = function(e){
        e.preventDefault();
        hero.moving = false;
    }
    ctrA2.onclick = function(e){
        e.preventDefault();
        hero.attack(addGeos.gun);
    }
    ctrA3.onclick = function (e) {
        e.preventDefault();
        toggleGunsDisplays();
    }
    
    
    
    //
    let ctrR1 = document.querySelector("heroctrls contr[rotors][contr1]");
    let ctrR2 = document.querySelector("heroctrls contr[rotors][contr2]");
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



function toggleGunsDisplays(){
    
}












logger.onclick = function(){
    let a = document.createElement("a");
    let img = new Image( );
    img.src = ( renderer.domElement.toDataURL() );
    a.href = img.src;
    a.download = "capture.png";
    a.click();
}








})//EO function