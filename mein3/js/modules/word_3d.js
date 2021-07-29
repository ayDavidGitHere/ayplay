
var word_3d = (function(){
    
// 定义全局变量
var container, scene, camera, renderer, controls;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock;
var mControl;

var movingCube; var movingSphere; var movingText;
var arr_movingChar = [];
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



    
    var light = new THREE.DirectionalLight("white", 1.5);
    light.position.set(0.5, 0, 3);
    scene.add(light);
    
    // 加入控制的sphere
    var sphereGeometry = new THREE.SphereGeometry(30, 50, 50);
    var texture = new THREE.CanvasTexture(twoD.a); 
    var wireMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        wireframe: false,
    });   
    movingSphere = new THREE.Mesh(sphereGeometry, wireMaterial);
    movingSphere.position.set(0, 50, 0);
    movingSphere.scale.set(0.5, 0.5, 0.5);
    scene.add(movingSphere);
    
    
    var textGeometry;
    var text_3d = "AyDavid".toUpperCase();
    var arr_text_3d = text_3d.split("")
    const fontLoader = new THREE.FontLoader();
    fontLoader.load('http://localhost:8080/res/js/threejs/fonts/helvetiker_regular.typeface.json', function(font){
        
        var texture = new THREE.CanvasTexture(twoD.a);  
        texture.wrapS = texture.wrapT
        //= THREE.ClampToEdgeWrapping;
        =THREE.RepeatWrapping;
	    texture.repeat.set( 0.05, 0.05 );
        //alert(getAll$Properties(texture));
        var materialColor = ["#000837", "#2D0011", "#1E031C", "#002300"][Math.floor(Math.random()*4)];
        var wireMaterial = new THREE.MeshPhongMaterial({
            //map: texture,
            color: materialColor,
            //wireframe: true,
        });
	    var materialArray = 
	    [ wireMaterial, wireMaterial, wireMaterial, wireMaterial ];
	    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
	    
	    var textPosition = {    x: -50, y:-50, z:0    };
	    var textWidthSum = 0;
        arr_text_3d.map(function(character, ind){
	    textGeometry = new THREE.TextGeometry( text_3d[ind], {
		    font: font,
		    size: 30,
		    height: 5,
		    curveSegments: 6,
		    bevelEnabled: true,
		    bevelThickness: 4,
		    bevelSize: 3,
		    bevelOffset: 0,
		    bevelSegments: 6
	    });
        movingText = new THREE.Mesh(textGeometry, textMaterial);
        movingText.
        position.set(textPosition.x, textPosition.y, textPosition.z);
        movingText.geometry.center();
        //movingText.rotation.z = Math.PI/(Math.random()*4)/4;
        movingText.rotation.y = +(Math.PI/(Math.random()*4))/4;
        movingText.rotation.x = -(Math.PI/(Math.random()*4))/4;
        scene.add(movingText);
	    arr_movingChar.push({mesh: movingText, disp: {rot: 45}})
        
	    var textGeom = movingText.geometry;
	    textGeom.computeBoundingBox();
	    var textWidth = 
	    textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
	    textPosition.x += textWidth;
	    textWidthSum += textWidth;
        })//EO map
        arr_movingChar.map(function(val){
            val.mesh.position.x -= -(0 - textPosition.x)/4;
        });
    });//fontLoader
    
    
    
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
    if(arr_movingChar!=null){
        arr_movingChar.map(function(val){
            val.mesh.rotation.x -= 0.0005;
        });
    }
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
    
    //rC = 255-rC;  gC = 255-gC; bC = 255-bC;
    movingSphere.material.color.set("rgb("+rC+","+gC+","+bC+")");
    //movingRing.material.color.set("rgb("+rC+","+gC+","+bC+")");
    //movingRing2.material.color.set("rgb("+rC+","+gC+","+bC+")");
    //movingRing.rotation.z += 0.01;
    rings.map((ringAt)=>{
        ringAt.rotation.x -= 0.005;
        ringAt.rotation.y += 0.005;
        ringAt.rotation.z -= 0.005;
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