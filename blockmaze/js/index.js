// 定义全局变量
var container, scene, camera, renderer, controls;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock;
var mControl;

var movingCube; var movingSphere; var movingRing;
var collideMeshList = [];
var cubes = [];
var message = document.getElementById("message");
var crash = false;
var score = 0;
var scoreText = document.getElementById("score");
var id = 0;
var crashId = " ";
var lastCrashId = " ";
var TwoD;
async function loadTwoD(){ 
    try{
        TwoD = ( await new TwoD() );
        init();
        animate();
    }catch(e){  alert(e); }
};
loadTwoD();


function init() {
    // Scene
    scene = new THREE.Scene();
    // Camera
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, screenWidth / screenHeight, 1, 20000);
    camera.position.set(0, 700, 700);
    
    
    
    // Renderer
    if (Detector.webgl) {
        renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: false });
    } else {
        renderer = new THREE.CanvasRenderer();
    }
    renderer.setSize(screenWidth * 0.85, screenHeight * 0.85);
    container = document.getElementById("ThreeJS");
    container.appendChild(renderer.domElement);

    //Three controller
    THREEx.WindowResize(renderer, camera);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    
            
    mControl = new MControl(container);
    //mControl.holdPage();

  /*
    //texture loader
    var textureUrl = "img/sand.jpg"; 
    var texture = THREE.ImageUtils.loadTexture(textureUrl);
    // 加入一个平面plane
    var planeMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
    })
    var planeGeometry = new THREE.PlaneGeometry(50, 50, 10, 10);
    
    

    var plane =new 
    THREE.Mesh(planeGeometry, planeMaterial );
    plane.position.y = -0.5;
    plane.rotation.x = 0;
    scene.add(plane);
            




    // 加入两条直线  lines
    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-250, -1, -3000));
    geometry.vertices.push(new THREE.Vector3(-300, -1, 200));
    material = new THREE.LineBasicMaterial({
        color: 0x6699FF, linewidth: 5, fog: true
    });
    var line1 = new THREE.Line(geometry, material);
    scene.add(line1);
    
    
    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(250, -1, -3000));
    geometry.vertices.push(new THREE.Vector3(300, -1, 200));
    var line2 = new THREE.Line(geometry, material);
    scene.add(line2);
    
    */
    
    
    var loader;
    try{    three = new OBJLoader();    }catch(e){  console.log(e)      }
    
    
    
    
    var light = new THREE.DirectionalLight("white", 3);
    light.position.set(1, 10, 1);
    scene.add(light);
    
    
    // 加入控制的cube
    var cubeGeometry = new THREE.CubeGeometry(50, 25, 60, 5, 5, 5);
    var wireMaterial = new THREE.MeshPhongMaterial({
        color: "crimson",
        wireframe:false
    });
    
    movingCube = new THREE.Mesh(cubeGeometry, wireMaterial);
    //            movingCube = new THREE.BoxHelper(movingCube);
    movingCube.position.set(0, 25, -20);
    movingCube.rotation.x += 10
    scene.add(movingCube);
    
    
    // 加入控制的sphere
    var sphereGeometry = new THREE.SphereGeometry(20, 50, 50);
    var texture = new THREE.CanvasTexture(TwoD.a); 
    var wireMaterial = new THREE.MeshPhongMaterial({
        color:"maroon",//map: texture,
        wireframe: false,
    });   
    movingSphere = new THREE.Mesh(sphereGeometry, wireMaterial);
    movingSphere.position.set(50, 0, 30);
    scene.add(movingSphere);
    
    // 加入控制的ring
    var ringGeometry = new THREE.RingGeometry(20, 21, 22);
    var wireMaterial = new THREE.MeshBasicMaterial({
        color: "red",
        wireframe: false,
        side: THREE.DoubleSide
    });   
    movingRing= new THREE.Mesh(ringGeometry, wireMaterial);
    movingRing.position.set(0, 50, 30); 
    scene.add(movingRing);
    
    
    
}

function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);

}

function update() {  /*
    var delta = clock.getDelta();
    var moveDistance = 200 * delta;
    //console.log(moveDistance);
    var rotateAngle = Math.PI / 2 * delta;

    //            if (keyboard.pressed("A")) {
    //                camera.rotation.z -= 0.2 * Math.PI / 180;
    //                console.log("press A")
    //            }
    //            if (keyboard.pressed("D")) {
    //                movingCube.rotation.y += rotateAngle;
    //            }

    if (keyboard.pressed("left") || keyboard.pressed("A")) {
        if (movingCube.position.x > -270)
            movingCube.position.x -= moveDistance;
        if (camera.position.x > -150) {
            camera.position.x -= moveDistance * 0.6;
            if (camera.rotation.z > -5 * Math.PI / 180) {
                camera.rotation.z -= 0.2 * Math.PI / 180;
            }
        }
    }
    if (keyboard.pressed("right") || keyboard.pressed("D")) {
        if (movingCube.position.x < 270)
            movingCube.position.x += moveDistance;
        if (camera.position.x < 150) {
            camera.position.x += moveDistance * 0.6;
            if (camera.rotation.z < 5 * Math.PI / 180) {
                camera.rotation.z += 0.2 * Math.PI / 180;
            }
        }
    }
    if (keyboard.pressed("up") || keyboard.pressed("W")) {
        movingCube.position.z -= moveDistance;
    }
    if (keyboard.pressed("down") || keyboard.pressed("S")) {
        movingCube.position.z += moveDistance;
    }

    if (!(keyboard.pressed("left") || keyboard.pressed("right") ||
        keyboard.pressed("A") || keyboard.pressed("D"))) {
        delta = camera.rotation.z;
        camera.rotation.z -= delta / 10;
    }
    */

    updateControls();
    movingSphere.rotation.y += 0.01;
    movingSphere.rotation.x += 0.005;
    //movingSphere.rotation.z += 0.01;
    movingRing.rotation.y += 0.01;
    movingRing.rotation.x += 0.005;
    //movingRing.rotation.z += 0.01;
    
    
    


    var cInter = checkInter(movingSphere);
    crash = cInter.crash;
    if(checkInter.crashId !=null )    crashId = checkInter.crashId;   
    
    if (crash){
        movingCube.material.color.setHex(0x346386);
        console.log("Crash");
        if (crashId !== lastCrashId) {
            score -= 100;
            lastCrashId = crashId;
            document.getElementById('explode_sound').play()
        }
    } else {
        //message.innerText = "Safe"
    }
    
    
    
    
    
    if (Math.random() < 0.03 && cubes.length < 30) {
        makeRandomCube();
    }
    for (i = 0; i < cubes.length; i++) {
        if (cubes[i].position.z > camera.position.z) {
            scene.remove(cubes[i]);
            cubes.splice(i, 1);
            collideMeshList.splice(i, 1);
        } else {
            cubes[i].position.z += 10;
        }
        //                renderer.render(scene, camera);
    }
    
    
    score += 0.1;
    scoreText.innerText = "Score:" + Math.floor(score);
    //controls.update();
}//EO update

    
function updateControls() {
            var delta = clock.getDelta();
            var moveDistance = 200 * delta;
            var rotateAngle = Math.PI / 2 * delta;

            if (keyboard.pressed("A")) {
                movingCube.rotation.y += rotateAngle;
            }
            if (keyboard.pressed("D")) {
                movingCube.rotation.y += rotateAngle;
            }

            if (keyboard.pressed("left")) {
                movingCube.position.x -= moveDistance;
            }
            if (keyboard.pressed("right")) {
                movingCube.position.x += moveDistance;
            }
            if (keyboard.pressed("up")) {
                movingCube.position.z -= moveDistance;
            }
            if (keyboard.pressed("down")) {
                movingCube.position.z += moveDistance;
            }
            
            if(mControl.touched.moveCord.length>0 && mControl.touched.end){
            if (mControl.touched.moveDirection == "right") {
                movingSphere.position.x += moveDistance;
                movingCube.rotation.y += moveDistance/2;
                movingRing.rotation.x += moveDistance/2;
                
            }
            if (mControl.touched.moveDirection == "left") {
                movingSphere.position.x -= moveDistance;
                movingCube.rotation.y -= moveDistance/2;
                movingRing.rotation.x -= moveDistance/2;
            }
            if (mControl.touched.moveDirection == "down") {
                movingSphere.position.z += moveDistance;
                //movingCube.rotation.x += moveDistance/2;
                movingRing.rotation.z += moveDistance/2;
            }
            if (mControl.touched.moveDirection == "up") {
                movingSphere.position.z -= moveDistance;
                //movingCube.rotation.x -= moveDistance/2; 
                movingRing.rotation.z -= moveDistance/2;
            }
            mControl.touched.moveCord.shift()
            }
            

            controls.update();
}
    
    


// 返回一个介于min和max之间的随机数
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function makeRandomCube() {
    var a = 1 * 50,
        b = getRandomInt(1, 3) * 50,
        c = 1 * getRandomInt(50, 500);
    var geometry = new THREE.CubeGeometry(a, b, c);
    var material = new THREE.MeshBasicMaterial({
        color: Math.random() * 0xffffff,
        size: 3
    });


    var object = new THREE.Mesh(geometry, material);
    var box = new THREE.BoxHelper(object);
    //            box.material.color.setHex(Math.random() * 0xffffff);
    box.material.color.setHex(0xff0000);

    box.position.x = getRandomArbitrary(-250, 250);
    box.position.y = 1 + b / 2;
    box.position.z = getRandomArbitrary(-800, -1200);
    cubes.push(box);
    box.name = "box_" + id;
    id++;
    collideMeshList.push(box);

    scene.add(box);
}
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
    





CLS("score-container", 0).addEventListener("click", function(e){
        try{    
        /*
        document.getElementById("downLink").href ='https://cdn.jsdelivr.net/gh/mrdoob/Three.js@r92/examples/js/loaders/GLTFLoader.js'
        document.getElementById("downLink").download = "THREE.loader.js"
        */
            
        var canvasImgSrc =
        renderer.domElement.toDataURL()
        //(document.getElementsByTagName("canvas", 0)).toDataURL();
        var canvasImg = new Image();
        canvasImg.src = canvasImgSrc;  
        CLS("score-container", 0).appendChild(canvasImg);  
        alert(canvasImgSrc)
        //document.getElementById("downLink").href = canvasImgSrc
        document.getElementById("downLink").download = "me3.png"
        
        }catch(e){   alert(e)  }
})