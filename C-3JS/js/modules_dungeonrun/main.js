
var Main= (function(){
/* make it into a decision making game , so rotation makes sense*/

[...document.querySelector("body").children].map((el)=>{
    console.log("___ "+el.outerHTML.slice(0,120).replace("\n","")+"...\n")
});

var GAME = {state: "loading", score: 0};
var hero = {speed: 2, }
var container, scene, camera, OrbitCamera, renderer, controls, orbitControl;
var FPCamera, OrbitCamera;
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
//BO dungeonParts
let floorparts = [], wallparts = [];
let archdoorparts = [], archbarsparts = [];
let spikesparts = [];




console.log("starting...")
init();




function init() {
    // Scene
    scene = new THREE.Scene();
    // Camera
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    FPCamera=new THREE.PerspectiveCamera(90, screenWidth/screenHeight,1,4000);
    FPCamera.rotation.set(0, 0, 0);
    
    OrbitCamera=new THREE.PerspectiveCamera(90,screenWidth/screenHeight,1,4000);
    OrbitCamera.rotation.set(0, 0, 0);
    OrbitCamera.position.set(0, 0, 0);
    OrbitCamera.lookAt(new THREE.Vector3( 0, 0, -200.123));
    camProps.list = [FPCamera, OrbitCamera];
    camselectlistener();
    playbackbuttonlistener();
    
    
    // Renderer
    renderer = (Detector.webgl? new THREE.WebGLRenderer({ antialias:false, preserveDrawingBuffer:false }): new THREE.CanvasRenderer());
    renderer.setSize(screenWidth * 1, screenHeight * 1);
    renderer.shadowMap.enabled = false;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container = document.getElementById("ThreeJS");
    container.appendChild(renderer.domElement);
    //setFullscreen(document.body);
    
    
    //Three controller
    THREEx.WindowResize(renderer, camera); 
    orbitControl = new THREE.OrbitControls(OrbitCamera, renderer.domElement);
    orbitControl.enableKeys = true;
    orbitControl.rotateSpeed = .7;
    orbitControl.enableDamping = false;
    orbitControl.dampingFactor = .5;
    orbitControl.autoRotate = false;
    orbitControl.enableZoom = true;
    orbitControl.minDistance = 0;
	orbitControl.maxDistance = 100;
    orbitControl.maxPolarAngle = Math.PI / 2;
    orbitControl.target = new THREE.Vector3(0, 0, 275+(300-275)/2);
    console.log(orbitControl)
    
    
    addGeos = new AddGeos(scene, collideMeshList);
    addGeos.orb.position.set( 0, 100, 275);
    addGeos.mainLight.position.set(0, 200, 350);
    addGeos.mainLight.target.position.set(0, 0, 275+(300-275)/2);
    addGeos.orb.geometry.faces.map((face)=>{
        face.color.setRGB( (50+Math.random()*200)/255,100/255,50/255 );
        face.color = new THREE.Color(0xffffff);
        //console.log(face);
    });
    addGeos.orb.geometry.colorsNeedUpdate = true;
    addGeos.orb.geometry.elementsNeedUpdate = true;
    scene.remove(addGeos.orb)
    //console.log(addGeos.orb)
    //console.log(camProps.presentCam);
    
    
    
    
    
    
    
    addGeos.dungeonParts = 
    [
    {name: "Arch.fbx", position: {}, rotation: {}, scale: {}, object:null, type: "archanddoor"},
    {name: "Arch_Door.fbx", position: {x: -2}, rotation: {y: 1.6}, scale: {}, object:null, type: "archanddoor", hide: true},
    {name: "Arch.fbx", position: {z: 252}, rotation: {}, scale: {}, object:null, type: "archandbars"},
    {name: "Arch_bars.fbx", position: {z: 252, x: -2}, rotation: {y: 1.6}, scale: {}, object:null, type: "archandbars", hide: true},
    {name: "Floor_Modular.fbx", position: {z: 250, x: 0, }, rotation: {}, scale: {}, object: null, hide: true},
    {name: "Wall_Modular.fbx", position: {z: 300, x: -6, y: 6}, rotation: {}, scale: {}, object:null, hide: true},
    {name: "Spikes.fbx", position: {z: 250, x: 0, }, rotation: {}, scale: {}, object: null, hide: true},
    ];
    
    
    
    
    
   //flooring
    (function(){
//    let floor = {w: 8, l: 36, x: -4, z: 252};
//    let tilesize = {w: 8, l: 9};
    let floor = {w: 8, l: 72, x: -4, z: 216};
    let tilesize = {w: 8, l: 24};
    let scale = {x: (tilesize.w/4)*1/50, z: (tilesize.l/4)*1/50};
    let nooftilesinrow = floor.w/tilesize.w;
    let nooftilesincol = floor.l/tilesize.l;
    floor.x += tilesize.w/2;
    floor.z += tilesize.l/2;
    for(let i=0; nooftilesincol>i; i++){
        for(let j=0; nooftilesinrow>j; j++){
    addGeos.dungeonParts.push(
    {name: "Floor_Modular.fbx", position: {z: floor.z+i*tilesize.l, x: floor.x+j*tilesize.w, }, rotation: {}, scale: {x: scale.x, z: scale.z}, object:"Floor_Modular.fbx", type: "floor"},
    );//EO push
        }
    }//EO for
    })();
   //wall long SE left
    (function(){
    //let wall = {h: 8, l: 36, y: 0, z: 252};
    //let tilesize = {h: 8, l: 9, b: 0};
    let wall = {h: 8, l: 54, y: 0, z: 234};
    let tilesize = {h: 8, l: 18, b: 0};
    let scale = {x: (tilesize.l/4)*1/50, y: (tilesize.h/4)*1/50};
    let nooftilesinrow = wall.l/tilesize.l;
    let nooftilesincol = wall.h/tilesize.h;
    wall.z += tilesize.l/2;
    wall.y += tilesize.h/2;
    wall.x = -4+tilesize.b/2;
    for(let i=0; nooftilesincol>i; i++){
        for(let j=0; nooftilesinrow>j; j++){
    addGeos.dungeonParts.push(
    {name: "Wall_Modular.fbx", position: {z: wall.z+j*tilesize.l, y: wall.y+i*tilesize.h, x: wall.x}, rotation: {y: 3*Math.PI/2}, scale: {x: scale.x, y: scale.y}, object:"Wall_Modular.fbx", type: "wall"},
    );//EO push
        }
    }//EO for
    })();
   //wall long SE right
    (function(){
    //let wall = {h: 8, l: 36, y: 0, z: 252};
    //let tilesize = {h: 8, l: 9, b: 0};
    let wall = {h: 8, l: 54, y: 0, z: 234};
    let tilesize = {h: 8, l: 18, b: 0};
    let scale = {x: (tilesize.l/4)*1/50, y: (tilesize.h/4)*1/50};
    let nooftilesinrow = wall.l/tilesize.l;
    let nooftilesincol = wall.h/tilesize.h;
    wall.z += tilesize.l/2;
    wall.y += tilesize.h/2;
    wall.x = 4+tilesize.b/2;
    for(let i=0; nooftilesincol>i; i++){
        for(let j=0; nooftilesinrow>j; j++){
    addGeos.dungeonParts.push(
    {name: "Wall_Modular.fbx", position: {z: wall.z+j*tilesize.l, y: wall.y+i*tilesize.h, x: wall.x}, rotation: {y: 3*Math.PI/2}, scale: {x: scale.x, y: scale.y}, object:"Wall_Modular.fbx", type: "wall"},
    );//EO push
        }
    }//EO for
    })();
    
   //spikes
    (function(){
    let tilesize = {w: 8/4, l: 8/4};
    let scale = {x: (tilesize.w/4)*1/50, z: (tilesize.l/4)*1/50};
    addGeos.dungeonParts.push(
    {name: "Spikes.fbx", position: {z: 400-tilesize.l/2, x: -4+0*8/3+1*tilesize.w/2, }, rotation: {}, scale: {x: scale.x, z: scale.z}, object:"Spikes.fbx", type: "spikes"},
    );//EO push
    addGeos.dungeonParts.push(
    {name: "Spikes.fbx", position: {z: 400+16-tilesize.l/2, x: -4+2*8/3+1*tilesize.w/2, }, rotation: {}, scale: {x: scale.x, z: scale.z}, object:"Spikes.fbx", type: "spikes"},
    );//EO push
    })();
    
    
    
    
    
    
    
    addGeos.dungeonParts.map((part, index)=>{
        if(part.object == null){
            part.model = new ModelLoader.FBXLoader(window.addrs.res2+"/C-3JS/sprites/3d/dungeon/FBX/"+ part.name);
            part.model.onload = function(){
                find(addGeos.dungeonParts, (p)=>p.object===part.name, (partClone)=>{
                    
                    if(partClone !== undefined){
                        console.log("...cloining")
                        partClone.model = {};
                        partClone.model.object = part.model.object.clone();
                        onLoad(partClone);
                    }//EO if undefined
                });//EO find
                onLoad(part);
            };
        }
        function onLoad(part_){
            part_.object = part_.model.object;
            part_.object.position.set( 0, 0, -200.123);
            part_.object.scale.x *= 1/50;
            part_.object.scale.y *= 1/50;
            part_.object.scale.z *= 1/50;
            part_.object.position.x = 0;
            part_.object.position.z = 300;
            //part_.object.rotation.y += Math.PI/2.5;
            if(part_.position.z!==undefined)
            part_.object.position.z = part_.position.z;
            if(part_.position.y!==undefined)
            part_.object.position.y = part_.position.y;
            if(part_.position.x!==undefined)
            part_.object.position.x = part_.position.x;
            if(part_.rotation.z!==undefined)
            part_.object.rotation.z = part_.rotation.z;
            if(part_.rotation.y!==undefined)
            part_.object.rotation.y = part_.rotation.y;
            if(part_.rotation.x!==undefined)
            part_.object.rotation.x = part_.rotation.x;
            if(part_.scale.z!==undefined)
            part_.object.scale.z = part_.scale.z;
            if(part_.scale.y!==undefined)
            part_.object.scale.y = part_.scale.y;
            if(part_.scale.x!==undefined)
            part_.object.scale.x = part_.scale.x;
            
            
            
            //part_.hide = true;
            if(part_.hide) return;
            scene.add(part_.object);
            part_.inscene = true;
            if(part_.type==="floor") floorparts.push(part_);
            if(part_.type==="wall") wallparts.push(part_);
            if(part_.type==="archanddoor") archdoorparts.push(part_);
            if(part_.type==="archandbars") archbarsparts.push(part_);
            if(part_.type==="spikes") spikesparts.push(part_);
            //console.log(scene)
            //console.log("dungeonparts::"+part_.name );
        }
        function find(arr, cond, result){
            let arrFound = [];
            arr.map((value)=>{
                if(cond(value))arrFound.push(value);
            });
            arrFound.map((v)=> {result(v);});
        }
    })//EO
    
    
    
    
    
    addGeos.skeleton = null;
    let skeletonModel =  new ModelLoader.FBXLoader(window.addrs.res2+"/C-3JS/sprites/3d/skeleton/"+ "skeleton.fbx");
    skeletonModel.onload = function(){
        addGeos.skeleton = skeletonModel.object;
        addGeos.skeleton.move = skeletonProps.move;
        addGeos.skeleton.position.set( 0, 0, -200.123);
        addGeos.skeleton.scale.x *= 1/40;
        addGeos.skeleton.scale.y *= 1/40;
        addGeos.skeleton.scale.z *= 1/40;
        addGeos.skeleton.position.x = 0;
        addGeos.skeleton.position.z = 252+24+16;
        addGeos.skeleton.rotation.y += Math.PI;
        //addGeos.skeleton.resourcePath = (window.addrs.res2+"/C-3JS/sprites/3d/skeleton/"+ "Textures");
        scene.add(addGeos.skeleton)
        console.log("skeleton...", addGeos.skeleton);
        
        //BO add animation
        const mixer = new THREE.AnimationMixer(addGeos.skeleton);
        mixer.clipAction(addGeos.skeleton.animations[5]).play();
        addGeos.skeleton.animationMixer = mixer;
        console.log("mixer...", mixer)
        
        
        
        //BO FPCamera.position
        FPCamera.position.z = addGeos.skeleton.position.z+8;
        FPCamera.position.y = addGeos.skeleton.position.y+5;
        FPCamera.position.x = addGeos.skeleton.position.x;
        FPCamera.target = new THREE.Vector3(addGeos.skeleton.position.x, 0, addGeos.skeleton.position.z-8);
        
        //playback;
        playbackbutton.click();
        sel1.click();
        renderer.domElement
        .addEventListener('touchstart', handleTouchStart, false);    
        renderer.domElement
        .addEventListener('touchmove', handleTouchMove, false);
    }//EO skeleton.onload
    let skeletonProps = {
        move: function(dir){
        switch (dir) {
            case 'left':
                addGeos.skeleton.position.x +=
                (addGeos.skeleton.position.x<0?0:-2);
                break;
            case 'right':
                addGeos.skeleton.position.x +=
                (addGeos.skeleton.position.x>0?0:+2);
                break;
            case 'up':
                addGeos.skeleton.position.y +=
                (addGeos.skeleton.position.y>0?0:+3);
                break;
            case 'down':
                addGeos.skeleton.position.y +=
                (addGeos.skeleton.position.y<=0?0:-3*(1/time.fps));
                break;
            default:
                // code
        }//EO switch
        }
    }//EO skeletonProps.
    
    
    
    
    
    
    animate();
}//EO init




function animate() {   
    if(GAME.state != "paused") update();
    playbackbuttonspan.innerText = GAME.score;
    renderer.render(scene, camProps.presentCam);
    requestAnimationFrame(animate);
}

    
function update() {
    time.now = new Date();
    if(time.last === null || time.now-time.last>1000) time.last = time.now;
    time.fps = 1000/(time.now-time.last);
    
    
    
    orbitControl.update();
    (function(){
    if(addGeos.skeleton == null) return;
    
    //BO AnimationHandler
    if (addGeos.skeleton.animationMixer) 
    addGeos.skeleton.animationMixer.update(clock.getDelta());
    
    
    //BO herospeed
    hero.speed = 4.5*(hero.speed<6?1+GAME.score/500:1.5);
    addGeos.skeleton.move("down");
    
    //BO dungeonParts
    addGeos.dungeonParts
    .map((part)=>{
        if(!part.inscene)  ;
        else part.object.position.z += hero.speed*(1/time.fps);
    });
    //Regeneration
    floorparts.sort((part1, part2)=>part1.object.position.z-part2.object.position.z);
    floorparts.map((part)=>{
        if(!part.inscene)  ;
        else {
        part.object.size = {
            z: 4*(part.object.scale.z)/(1/50),
            x: 4*(part.object.scale.x)/(1/50),
        };
        if(part.object.position.z > FPCamera.position.z+12){
        part.object.position.z = 
        floorparts[0].object.position.z-part.object.size.z
        }
        }//EO else.
    });
    //Regeneration
    wallparts.sort((part1, part2)=>part1.object.position.z-part2.object.position.z);
    wallparts.map((part)=>{
        if(!part.inscene)  ;
        else {
        part.object.size = {
            z: 4*(part.object.scale.x)/(1/50),
            y: 4*(part.object.scale.y)/(1/50),
        };
        if(part.object.position.z > FPCamera.position.z+12){
        part.object.position.z = 
        wallparts[0].object.position.z-part.object.size.z
        }
        }//EO else.
    });
    
    
    //Regeneration
    let archdoorparts0 = archdoorparts[0].object;
    //let archdoorparts1 = archdoorparts[1].object;
    //Regeneration
    let archbarsparts0 = archbarsparts[0].object;
    //let archbarsparts1 = archbarsparts[1].object;
    if(archdoorparts0.position.z>FPCamera.position.z+16){
        let rndm = -Math.random()*16;
        archdoorparts0.position.z = 252+rndm;
        //archdoorparts1.position.z = 252+rndm;
    }
    if(archbarsparts0.position.z>FPCamera.position.z+16){
        let rndm = -Math.random()*16;
        archbarsparts0.position.z = 252+rndm;
        //archbarsparts1.position.z = 252+rndm;
    }
    
    //Regeneration
    spikesparts.sort((part1, part2)=>part1.object.position.z-part2.object.position.z);
    spikesparts.map((part)=>{
        if(!part.inscene)  ;
        else {
        part.object.size = {
            z: 4*(part.object.scale.x)/(1/50),
            x: 4*(part.object.scale.x)/(1/50),
        };
        if(part.object.position.z > FPCamera.position.z+12){
        part.object.position.z = 
        spikesparts[0].object.position.z-part.object.size.z-(1+Math.random())*16;
        part.object.position.x = -4+(Math.floor(Math.random()*3))*8/3+part.object.size.x/2;
        GAME.score += 10;
        }
        }//EO else.
    });
    
    
    
    
    
    
    
    
    
    
    })();
    time.last = time.now;
    logger.innerText = "fps: "+time.fps;
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
//orbControl();



//BO camselectlistener
var sel1, sel2;
function camselectlistener(){
    [...document.querySelectorAll("camselect sel")].map((sel)=>{
        alert("sel..."+ sel.id)
    })
    sel1 = document.querySelector("camselect sel#sel1");
    sel2 = document.querySelector("camselect sel#sel2");
    let sels = [sel1, sel2];
    sels.map((sel, ind)=>{
        sel.onclick = function(){ camSelect(sels, ind); };
    });
    sel2.click();
}//EO camselectlistener
function camSelect(sels, ind){ alert("camSelect")
    sels.map((sel)=>{
        sel.style.backgroundColor = "rgba(65,65,65,1.75)"; //= "#444444dd" 
    });
    sels[ind].style.backgroundColor = "rgba(255,255,255,1.75)" //= "#ffffffdd";
    camProps.presentCam = camProps.list[ind];
}//EO camSelect








//BO playbackbuttonlistener
var playbackbutton, playbackbuttonimg, playbackbuttonspan, menu, menugamestate ;
function playbackbuttonlistener(){
playbackbutton = document.querySelector("playbackbutton");
playbackbuttonimg = document.querySelector("playbackbutton img");
playbackbuttonspan = document.querySelector("playbackbutton span");
menu = document.querySelector("menublock");
menugamestate = document.querySelector("menublock [gamestate]");
playbackbutton.onclick = function(){
    let state = playbackbutton.getAttribute("state");
    let newstate = state;
    switch (state) {
        case 'void':
            newstate = "loading";
            playbackbuttonimg.src = "./img/refresh.png";
            menu.style.display = "block";
            break;
        case 'loading':
            newstate = "playing";
            playbackbuttonimg.src = "./img/pause.png";
            menu.style.display = "none";
            break;
        case 'paused':
            newstate = "playing";
            playbackbuttonimg.src = "./img/pause.png";
            menu.style.display = "none";
            break;
        case 'playing':
            newstate = "paused";
            playbackbuttonimg.src = "./img/play.png";
            menu.style.display = "block";
            break;
        default:
            // code
    }
    
    playbackbutton.setAttribute("state", newstate);
    menugamestate.innerText = newstate+" ...";
    GAME.state = newstate;
    SetNewState();
}//EO onclick
playbackbutton.click();
function SetNewState(){
}
}//EO playbackbuttonlistener



function setFullscreen(element) {
if (!element) element = document.documentElement;
element.requestFullscreen = 
element.requestFullscreen ||
element.mozRequestFullScreen ||
element.webkitRequestFullscreen ||
element.msRequestFullscreen;
element.requestFullscreen();
//alert(document.fullscreenEnabled);
}














var xDown = null, yDown = null;
function getTouches(evt) {return evt.touches || evt.originalEvent.touches;}
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}
function handleTouchMove(evt) {
    //alert(xDown+" "+yDown)
    if ( ! xDown || ! yDown ) return;
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
            /* left swipe */
            addGeos.skeleton.move("left");
        } else {
            /* right swipe */
            addGeos.skeleton.move("right");
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
            addGeos.skeleton.move("up");
        } else { 
            /* down swipe */
            addGeos.skeleton.move("down");
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};












})//EO function