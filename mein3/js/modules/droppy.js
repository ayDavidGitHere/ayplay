
var Droppy = (function(){

// 定义全局变量
this.functionName = "thedroppy"
var container, scene, camera, renderer, controls;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock;
var mControl;

var light;
var venue_cylinder;    var heroBall;  var venue_tube;
var venue_cylinder_HEIGHT = 1000;
var collideMeshList = [];
var hitballs = [];
var message = document.getElementById("message");
var crash = false;
var contr = 0;
var contrText = document.getElementById("contr");
var id = 0;
var crashId = " ";
var lastCrashId = " ";
var randColor = 
["darkblue", "darkred", "darkgreen"][Math.floor(Math.random()*3)];     

var quick = new Quicks();
quick.loadFont( function(){
    init();
    animate();
    console.log("start")
})




function init() {   
    // Scene
    scene = new THREE.Scene();
    // Camera
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, screenWidth / screenHeight, 0.1, 20000);
    camera.position.set(0, 170, 0);
    camera =
    new THREE.PerspectiveCamera(45, screenWidth/screenHeight, 1, 4000);
    camera.position.set(0, 1000, 0);
    camera.rotation.set(0, 0, 0)
    
    // Renderer
    if (Detector.webgl) {
        renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: false });
    } else {
        renderer = new THREE.CanvasRenderer();
    }
    renderer.setSize(screenWidth * 1, screenHeight * 1);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    //renderer.setSize(1200, 400);
    container = document.getElementById("ThreeJS");
    container.appendChild(renderer.domElement);

    //Three controller
    THREEx.WindowResize(renderer, camera);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    
            
    mControl = new MControl(container);
    mControl.holdPage();
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
    var light = new THREE.DirectionalLight("white", 2.0, 100);
    //var light = new THREE.AmbientLight("white");
    /*
    light.castShadow = true;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 200;
    light.shadow.camera.fov = 45;
    light.shadowDarkness = 0.5;
    */
    //light.shadow.map.width = window.innerWidth;
    //light.shadow.map.height = window.innerHeight;
    
    light.position.set(0, 1, 0);
    scene.add(light);
    pointLight= new THREE.PointLight ("white", 1, venue_cylinder_HEIGHT*2);
    pointLight.position.set(0, -1, 0);
    scene.add(pointLight);
    
    
    //texture loader
    var textureUrl = "../../mein3/img/"+["sand.jpg", "rock.jpg", "rock.jpg"][Math.floor(Math.random()*3)]; 
    var texture = THREE.ImageUtils.loadTexture(textureUrl);
    var cylinderGeometry = new THREE.CylinderGeometry(99, 99, venue_cylinder_HEIGHT, 45, 1, true, 0, 6.3);
    var wireMaterial = new THREE.MeshLambertMaterial({
            map: texture, 
            color: randColor,
            side: THREE.DoubleSide,
    });
    venue_cylinder = new THREE.Mesh(cylinderGeometry, wireMaterial);
    venue_cylinder.position.set(camera.position.x, camera.position.y-venue_cylinder_HEIGHT/2, camera.position.z);
    scene.add(venue_cylinder);
    
    
    //texture loader
    var textureUrl = "../../mein3/img/rock.jpg"; 
    var texture = THREE.ImageUtils.loadTexture(textureUrl);
    // 加入控制的cube
    var cirPlateGeometry = new THREE.SphereGeometry(10, 30, 30);
    var wireMaterial = new THREE.MeshPhongMaterial({
            map: texture,
            color: randColor,
    });
    heroBall = new THREE.Mesh(cirPlateGeometry, wireMaterial);
    heroBall.position.set(0, 50, -50);
    heroBall.position.set(camera.position.x, camera.position.y, camera.position.z);
    heroBall.constructor.prototype.my = function(first_argument) {
        return {    falling: true   };
    };
    scene.add(heroBall)
    //alert( JSON.stringify(light) );
    
    
    
}
function makeRandomhitballs(){
    var r = 10+ getRandomInt(1, 5) * 1,
        h = 20+ getRandomInt(1, 3) * 10,
        b = getRandomInt(1, 3) * 30,
        c = 1 * getRandomInt(50, 500);
    var geometry //= new THREE.CircleGeometry(r, 30);
    = new THREE.CylinderGeometry(r, r, h, 21, 1)
    var material = new THREE.MeshPhongMaterial({
        color: "white",
        size: 3,
        transparency: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
        wireframe: false
    });
    

    var hitball = new THREE.Group();
    var hitball_cylinder= new THREE.Mesh(geometry, material);
    hitball = hitball_cylinder
    hitball.position.x = getRandomArbitrary(-50, 50);
    hitball.position.y = getRandomArbitrary(-100, -50);
    hitball.position.z = getRandomArbitrary(-50, 50);
    hitball.castShadow = true;
    hitball.recieveShadow = true;
    /*
    hitball.add(hitball_cylinder);
    hitball_text = quick.createText(Math.random(hitball.position.x));
    //hitball_text.position.x = hitball.position.x-r/2;
    // hitball_text.position.y = hitball.position.y+h/2;
    //hitball_text.position.z = hitball.position.z;
    hitball_text.rotation.set(-45, 0, 0)
    hitball_text.scale.set(0.2, 0.2, 0.2);
    hitball.add(hitball_text);
    */
        
    hitballs.push(hitball);
    hitball.name = "hitball_" + id;
    id++;
    collideMeshList.push(hitball);
    scene.add(hitball);

}
var animate = function() {   
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
}
    var yUpSpeed = 10/3;
    var yDownSpeed = 10/6
    var accl = 10/180;
function update() {
    camera.rotation.x += 1;
    camera.lookAt( (heroBall.position) );
    camera.position.y = heroBall.position.y+100;
    //camera.position.x = heroBall.position.x;
    //camera.position.z = heroBall.position.z
    
    if(heroBall.my.falling){
        yDownSpeed = yDownSpeed+accl;
        heroBall.position.y -= yDownSpeed;
        heroBall.rotation.x -= 0.05;
        heroBall.rotation.y += 0.005;
    }  
    updateControls();
    
    var cInter; 
    cInter= checkInter(heroBall); 
    crash = cInter.crash;   
    if(checkInter.crashId !=null )crashId = checkInter.crashId;
    if (crash){
        console.log("Crash");
        if (crashId !== lastCrashId) {
            contr -= 100;
            lastCrashId = crashId;
            document.getElementById('explode_sound').play()
        }
        heroBall.my.falling = false;
        heroBall.position.y += yUpSpeed;
        pointLight.distance -= 10;
        yDownSpeed = 10/6;
    } else {
        heroBall.my.falling = true;
        //message.innerText = "Safe"
    }
    
    if (Math.random() < 0.03 && hitballs.length < 30) {
        makeRandomhitballs();
    }
    for (i = 0; i < hitballs.length; i++) {
        //if (hitballs[i].position.z > camera.position.z) {
        if (hitballs[i].position.y > 
            venue_cylinder.position.y+venue_cylinder_HEIGHT/2) {
            scene.remove(hitballs[i]);
            hitballs.splice(i, 1);
            collideMeshList.splice(i, 1);
        } else {
            if(i%2 == 0)hitballs[i].position.y += yUpSpeed;
            if(i%2 != 0)hitballs[i].position.y += yUpSpeed;
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
                heroBall.position.x += moveDistance;
                heroBall.rotation.x += moveDistance/10;
                //movingRing.rotation.y += moveDistance/10;
            }
            if (mControl.touched.moveDirection == "left") {
                heroBall.position.x -= moveDistance;
                heroBall.rotation.x -= moveDistance/10;
                //movingRing.rotation.y -= moveDistance/10;
            }
            if (mControl.touched.moveDirection == "down") {
                heroBall.position.z += moveDistance;
                heroBall.rotation.z += moveDistance/10;
                //movingRing.rotation.x -= moveDistance/10;
            }
            if (mControl.touched.moveDirection == "up") {
                heroBall.position.z -= moveDistance;
                heroBall.rotation.z -= moveDistance/10;
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




CLS("contr", 0).addEventListener("click", function(e){
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