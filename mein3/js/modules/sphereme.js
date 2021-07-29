
var sphereMe = (function(){
    
// 定义全局变量
var container, scene, camera, renderer, controls;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock;
var mControl;

var movingCube; var movingSphere; var movingRing;
var rings = [];
var movingFbxModel; var movingObjModel;
var boner;
var collideMeshList = [];
var cubes = [];
var message = document.getElementById("message");
var crash = false;
var score = 0;
var contrText = document.getElementById("contr");
var id = 0;
var crashId = " ";
var lastCrashId = " ";
var arr_rgb = [0, 0, 0]; var colIndex = 0; var colPlus = true;
var twoD;
async function loadTwoD(){ 
    try{ 
        twoD = ( await new TwoD() );
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
    camera.position.set(0, 170, 400);
    
    
    
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



    
    var light = new THREE.DirectionalLight("white", 2.0);
    light.position.set(1, 1, 1);
    scene.add(light);
    
    
    // 加入控制的sphere
    var sphereGeometry = new THREE.SphereGeometry(80, 50, 50);
    var texture = new THREE.CanvasTexture(twoD.a); 
    var wireMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        //color: "rgba(220, 100, 200, 0.5)",
        //color: "rgba(220, 10, 10, 0.2)",
        //color: "rgba(20, 20, 200, 1)",
        wireframe: false,
    });   
    movingSphere = new THREE.Mesh(sphereGeometry, wireMaterial);
    movingSphere.position.set(0, 50, -350);
    movingSphere.scale.set(0.5, 0.5, 0.5);
    scene.add(movingSphere);
    
    // 加入控制的ring
    var ringGeometry = new THREE.RingGeometry(100, 99, 50);
    var texture = new THREE.CanvasTexture(twoD.a);
    var wireMaterial = new THREE.MeshBasicMaterial({
        //map: texture,
        color: "blue",
        wireframe: false,
        side: THREE.DoubleSide
    });   
    movingRing= new THREE.Mesh(ringGeometry, wireMaterial);
    //movingRing.position.set(0, 50, 30); 
    //scene.add(movingRing);
    
    
    // 加入控制的ring
    var ring2Geometry = new THREE.RingGeometry(100, 99, 50);
    movingRing2= new THREE.Mesh(ring2Geometry, wireMaterial);
    //movingRing2.position.set(0, 50, 50); 
    //movingRing2.rotation.set(0, 180, 0); 
    //scene.add(movingRing2);

    //movingRing.scale.set(0.5, 0.5, 0.5);
    //movingRing2.scale.set(0.5, 0.5, 0.5);
    
    var ringsLength = 10;
    for(let ringsCount=0; ringsLength>ringsCount; ringsCount++){
        // 加入控制的ring
        var ringOutRad = 50-ringsCount*2.5
        var ring2Geometry = new THREE.RingGeometry(ringOutRad, ringOutRad-1, 50);
        rings.push( new THREE.Mesh(ring2Geometry, wireMaterial) );
        ringAt = rings[ringsCount];
        ringAt.material.color.set(
        "rgb("+(ringsCount*22.5)+", "+(225-ringsCount*22.5)+", "+(225-ringsCount*22.5)+")"
        );
        ringAt.position.set(0, 50, 50); 
        ringAt.rotation.set(ringsCount*36, ringsCount*36, ringsCount*36); 
        scene.add(ringAt);
    }
    
    
    var mLoader = new ModelLoader(scene)
    //mLoader.loadFbxModel()
    //mLoader.loadObjMtlModel()
}

function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);

}




function update() {
    updateControls();
    movingSphere.rotation.y += 0.01;
    movingSphere.rotation.x += 0.005;
    //movingSphere.rotation.z += 0.01;
    //movingRing.rotation.y += 0.0075;
    //movingRing.rotation.x += 0.015;
    //movingRing2.rotation.y += 0.005;
    //movingRing2.rotation.x += 0.01;
    
    rC=arr_rgb[0];
    gC=arr_rgb[1];
    bC=arr_rgb[2];
    
    function flr(val){   return Math.floor(val); }
    if(arr_rgb[flr(colIndex)]  == 255){  colPlus = false; colIndex += 0.5; };
    if(arr_rgb[flr(colIndex)]  == 0 && colIndex!=flr(colIndex) ){  colPlus = true; colIndex += 0.5; };
    if(colIndex>=arr_rgb.length){    colIndex = 0; }
    if(colPlus) arr_rgb[flr(colIndex)] ++;
    if(!colPlus) arr_rgb[flr(colIndex)] --;
    
    rC = 255-rC;  gC = 255-gC; bC = 255-bC;
    movingSphere.material.color.set("rgb("+rC+","+gC+","+bC+")");
    //movingRing.material.color.set("rgb("+rC+","+gC+","+bC+")");
    //movingRing2.material.color.set("rgb("+rC+","+gC+","+bC+")");
    //movingRing.rotation.z += 0.01;
    rings.map((ringAt)=>{
        ringAt.rotation.x -= 0.05;
        ringAt.rotation.y += 0.05;
        ringAt.rotation.z -= 0.05;
    })
    
    if(movingFbxModel!=null){
        movingFbxModel.rotation.y +=0.01;
        if(boner !=null){  boner.rotation.y -= 0.05; }
    }
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
                //camera.rotation.z += moveDistance;
                movingSphere.rotation.y += moveDistance/10;
                //movingRing.rotation.y += moveDistance/10;
            }
            if (mControl.touched.moveDirection == "left") {
                //camera.position.y -= moveDistance;
                movingSphere.rotation.y -= moveDistance/10;
                //movingRing.rotation.y -= moveDistance/10;
            }
            if (mControl.touched.moveDirection == "down") {
                //camera.position.x -= moveDistance;
                movingSphere.rotation.x -= moveDistance/10;
                //movingRing.rotation.x -= moveDistance/10;
            }
            if (mControl.touched.moveDirection == "up") {
                //camera.position.x += moveDistance;
                movingSphere.rotation.x += moveDistance/10;
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