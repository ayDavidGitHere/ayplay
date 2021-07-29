
var hitBlock = (function(){

// 定义全局变量
var container, scene, camera, renderer, controls;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock;
var mControl;

var movingFloor;    var glassBlock;
var collideMeshList = [];
var hitballs = [];
var message = document.getElementById("message");
var crash = false;
var contr = 0;
var contrText = document.getElementById("contr");
var id = 0;
var crashId = " ";
var lastCrashId = " ";
var arr_rgb = [0, 0, 0]; var colIndex = 0; var colPlus = true;
init();
animate();




function init() {   
    // Scene
    scene = new THREE.Scene();
    // Camera
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, screenWidth / screenHeight, 0.1, 20000);
    camera.position.set(0, 170, 400);
    camera =
    new THREE.PerspectiveCamera(90, screenWidth/screenHeight, 0.1, 20000);
    camera.position.set(0, 350, 400);
    
    
    // Renderer
    if (Detector.webgl) {
        renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: false });
    } else {
        renderer = new THREE.CanvasRenderer();
    }
    renderer.setSize(screenWidth * 1, screenHeight * 1);
    //renderer.setSize(1200, 400);
    container = document.getElementById("ThreeJS");
    container.appendChild(renderer.domElement);

    //Three controller
    THREEx.WindowResize(renderer, camera);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    
            
    mControl = new MControl(container);
    //mControl.holdPage();
    addGeos();
    
    try{/*    new App({renderer: renderer,
                    scene:scene,
                    camera: camera,
                    controls:controls
            });
        */
    }
    catch(e){   alert(e)    }
}
function addGeos(){
    var light = new THREE.DirectionalLight("white", 2.0);
    var light = new THREE.AmbientLight("white");
    //light.position.set(0, 1, 1);
    scene.add(light);
    
    // 加入控制的sphere
    var floorGeometry = new THREE.PlaneGeometry(600, 10000, 10, 10)
    var wireMaterial = new THREE.MeshBasicMaterial({
        color: "rgba(20, 100, 200, 0.5)",
        side: THREE.DoubleSide,
        wireframe: false,
    });   
    movingFloor = new THREE.Mesh(floorGeometry, wireMaterial);
    movingFloor.position.y = -0.5;
    movingFloor.rotation.x = Math.PI / 2;
    //scene.add(movingFloor);
    
    
    // 加入控制的cube
    var glassBlockGeometry = new THREE.CubeGeometry(50, 50, 50, 1, 1, 1);
    var wireMaterial = new THREE.MeshPhongMaterial({
            color: "ghostwhite",
            transparency:0.8,
            reflectivity: 9.0,
            refractionratio: 0.8,
            shininess: 29,
            wireframe: false
    });
    glassBlock = new THREE.Mesh(glassBlockGeometry, wireMaterial);
    glassBlock.position.set(0, 50, -50);
    scene.add(glassBlock);
            
}
function makeRandomhitballs(){  
    var a = 1 * 30,
        b = getRandomInt(1, 3) * 30,
        c = 1 * getRandomInt(50, 500);
    var geometry = new THREE.SphereGeometry(a, b, 30);
    var material = new THREE.MeshPhongMaterial({
        color: "rgba(100, 20, 200, 0.99)",
        size: 3,
        wireframe: false
    });
    var hitball= new THREE.Mesh(geometry, material);
    //hitball.material.color.setHex(Math.random() * 0xffffff);
    hitball.position.x = getRandomArbitrary(-250, 250);
    hitball.position.y =  0+b/2;
    hitball.position.z = getRandomArbitrary(-4000, -5000);
    
    hitballs.push(hitball);
    hitball.name = "hitball_" + id;
    id++;
    collideMeshList.push(hitball);
    scene.add(hitball);
}
function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
}

function update() {
    updateControls();
    
    var cInter; 
    cInter= checkInter(glassBlock); 
    crash = cInter.crash;   
    if(checkInter.crashId !=null )crashId = checkInter.crashId;
    if (crash){
        console.log("Crash");
        if (crashId !== lastCrashId) {
            contr -= 100;
            lastCrashId = crashId;
            document.getElementById('explode_sound').play()
        }
    } else {
        //message.innerText = "Safe"
    }
    
    if (Math.random() < 0.03 && hitballs.length < 30) {
        makeRandomhitballs();
    }
    for (i = 0; i < hitballs.length; i++) {
        if (hitballs[i].position.z > camera.position.z) {
            scene.remove(hitballs[i]);
            hitballs.splice(i, 1);
            collideMeshList.splice(i, 1);
        } else {
            if(i%2 == 0)hitballs[i].position.z += 10;
            if(i%2 != 0)hitballs[i].position.z += 10;
        }
        //renderer.render(scene, camera);
    }
    contr += 0.1;
    contrText.innerText = hitballs.length+"contr:" + Math.floor(contr);
    
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
        if (collisionResults.length > 0 &&
            collisionResults[0].distance < directionVector.length()) {
            crash = true;
            crashId = collisionResults[0].object.name;
            break;
        }
        crash = false; 
        crashId = null;
    }  
    return{crash:crash, crashId:crashId};
}
    
    
function updateControls() {
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
            
            if(mControl.touched.moveCord.length>0 && mControl.touched.end){
            if (mControl.touched.moveDirection == "right") {
                //camera.rotation.z += moveDistance;
                movingFloor.rotation.z += moveDistance/10;
                //movingRing.rotation.y += moveDistance/10;
            }
            if (mControl.touched.moveDirection == "left") {
                //camera.position.y -= moveDistance;
                movingFloor.rotation.z -= moveDistance/10;
                //movingRing.rotation.y -= moveDistance/10;
            }
            if (mControl.touched.moveDirection == "down") {
                //camera.position.x -= moveDistance;
                movingFloor.rotation.z -= moveDistance/10;
                //movingRing.rotation.x -= moveDistance/10;
            }
            if (mControl.touched.moveDirection == "up") {
                //camera.position.x += moveDistance;
                movingFloor.rotation.z += moveDistance/10;
                //movingRing.rotation.x += moveDistance/10;
            }
            mControl.touched.moveCord.shift()
            }
            
            //controls.autoRotate = true;
            controls.update();
}
    
    










// 返回一个介于min和max之间的随机数
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// 返回一个介于min和max之间的整型随机数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}




CLS("contr-container", 0).addEventListener("click", function(e){
        try{
        /*
        document.getElementById("downLink").href ='https://cdn.jsdelivr.net/gh/mrdoob/Three.js@r92/examples/js/loaders/GLTFLoader.js'
        document.getElementById("downLink").download = "THREE.GLTFLoader.js"
        */
        document.getElementById("downLink").href = "https://unpkg.com/three@0.87.1/examples/js/loaders/GLTFLoader.js"
        document.getElementById("downLink").download = "THREE.GLTFLoader.js"
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






})//EO function