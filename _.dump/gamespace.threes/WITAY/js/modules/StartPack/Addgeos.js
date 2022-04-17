function AddGeos(scene, collideMeshList, STRUCTURE){
    
    var loadState = true;
    //texture loader
    var textureDir = "../../../mein3/img/";
    var textureNames = ["sand.jpg", "rock.jpg", "grass.jpg", "sand.jpg"];
    var textureUrl = textureDir+textureNames[1];
    
    var textureDir = "http://localhost:8080/res/sprites/Textures/";
    var textureUrl = textureDir+["road_duallane.jpg", "city_road.jpg"][1];
    var texture = new THREE.TextureLoader().load(textureUrl);
    texture.wrapT=texture.wrapS=THREE.RepeatWrapping;
    texture.repeat.set(1, 5);
    texture.rotation = Math.PI/2;
    texture.center = new THREE.Vector2(0.5, 0.5); 
    texture.flipY = false;
    //alert(ObjHelp.getPropsOf(texture.center))
    
    var skyBoxTextureDir = "http://localhost:8080/res/sprites/Textures/";
    var skyBoxTextureUrl = 
    skyBoxTextureDir+["skybox.png", "skybox2.png", "skydome.png", "skydome2.png"][3]; 
    var skyBoxTexture = new THREE.TextureLoader().load(skyBoxTextureUrl);
    var texture_Cube 
    =new THREE.CubeTextureLoader().load(skyBoxTextureUrl);
    
    
    
    var geosCustom = new GeosCustom(scene, collideMeshList, {GEN_GEO_COLOR: "dimgray"})
    geosCustom.setGeneralMaterial(new THREE.MeshLambertMaterial({map:texture,color: "white",side: THREE.DoubleSide}))
    var geosCustom_sup = new GeosCustom(scene, collideMeshList, {GEN_GEO_COLOR: "midnightblue"});
    var geosCustom_orb = new GeosCustom(scene, collideMeshList, {GEN_GEO_COLOR: "skyblue"});
    var geosCustom_ramp = new GeosCustom(scene, collideMeshList, {GEN_GEO_COLOR: "crimson"});
    
    var STRUCTURE = {START: { X: 20, Y: 50, Z: 20, LANDING: {Y: 50} }, WID: 100, LEN: 100, CENTER:{}, FLOOR:{Y: 20}, GENERALCOLOR: "white"};
    var STRUCTURE = {
        CENTER: {Z: -48},
        FLOOR: {Y: 16},
        GENERALCOLOR: "rgb(161,157,148)",
        HEI: 42, LEN: 40, WID: 280, 
        START: { LANDING:{x: -24, y:13, z: -58},X:- 34, Y: 10, Z: -68}
    };
    
    
    
    
    
    
    
    try{
    
    
    
    let mainLightColor = "white"
    let mainLight = new THREE.DirectionalLight( mainLightColor, 1);
    //mainLight = new THREE.SpotLight (mainLightColor, 1);
    mainLight.position.set( STRUCTURE.START.X+STRUCTURE.WID/2, STRUCTURE.START.LANDING.y+500/5, STRUCTURE.START.Z+STRUCTURE.LEN/2 );
    mainLight.target.position.set( STRUCTURE.START.X+STRUCTURE.WID/2, STRUCTURE.START.LANDING.y, STRUCTURE.START.Z+STRUCTURE.LEN/2 );
    
    
    
    mainLight.castShadow = false;
    mainLight.shadow.camera.visible = true;
    let d = STRUCTURE.LEN
    mainLight.shadow.camera.left = - STRUCTURE.WID/2;
    mainLight.shadow.camera.right = STRUCTURE.WID/2;
    mainLight.shadow.camera.top = d;
    mainLight.shadow.camera.bottom = -d;
    mainLight.shadow.camera.far = 100;
    mainLight.shadow.camera.fov *= 1;
    mainLight.shadow.camera.near = 0;
    mainLight.shadow.mapSize.width = 2 * 512;
    mainLight.shadow.mapSize.height = 2 * 512;
    mainLight.shadow.darkness = 1;
    scene.add(mainLight, mainLight.target);
    //.add( new THREE.DirectionalLightHelper(mainLight) );
    
    var hemiLight 
    = new THREE.HemisphereLight(mainLightColor, mainLightColor, 1);
    scene.add(hemiLight);
    
    const cameraHelper = new THREE.CameraHelper(mainLight.shadow.camera);
    //scene.add(cameraHelper);
    
    
    
    spotLight = new THREE.SpotLight ("green", 15);
    spotLight.position.set(STRUCTURE.START.X+STRUCTURE.WID/2, STRUCTURE.FLOOR.Y+50, STRUCTURE.START.Z+STRUCTURE.LEN/2 );
    spotLight.castShadow = true;
    spotLight.angle = 3*Math.PI/3;
    spotLight.distance = 400; //spotLight.penumbra = 1;
    spotLight.power = 200; //spotLight.decay *= 1.1
    spotLight.lookAt(new THREE.Vector3( STRUCTURE.START.X+STRUCTURE.WID/2, STRUCTURE.FLOOR.y+50, STRUCTURE.START.Z+STRUCTURE.LEN/2 ));
    //scene.add(spotLight);
    //scene.add( new THREE.SpotLightHelper(spotLight) )
    
    var ambLight = new THREE.AmbientLight( 0xffffff, 0.05);
    scene.add(ambLight);
    
    var pointLight = new THREE.PointLight ("indigo", 2);
    pointLight.position.set(STRUCTURE.START.X+STRUCTURE.WID/2, STRUCTURE.FLOOR.Y, STRUCTURE.START.Z+STRUCTURE.LEN/2 );
    pointLight.castShadow = true;
    //scene.add(pointLight);
    //scene.add( new THREE.PointLightHelper(pointLight) )
    
    
    
    
    
    

    function skyMaterial_ShadedColors(){
        var vertexShader = "varying vec3 vWorldPosition;"+
        " "+
        "void main() {"+
        " vec4 worldPosition = modelMatrix * vec4( position, 1.0 );"+
        " vWorldPosition = worldPosition.xyz;"+ //xyz
        " "+
        " gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );"+
        "}";
        var fragmentShader = "uniform vec3 topColor;"+
        "uniform vec3 bottomColor;"+
        "uniform float offset;"+
        "uniform float exponent;"+
        " "+
        "varying vec3 vWorldPosition;"+
        " "+
        "void main() {"+
        " float h = normalize( vWorldPosition + offset ).y;"+
        " gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( h, exponent ), 0.0 )), 1.0 );"+
        "}";
        var skyBoxProps ={topColor: "deepskyblue", bottomColor: "grey"} 
        var uniforms = { topColor: {type: "c", value: new THREE.Color(skyBoxProps.topColor)}, bottomColor: {type: "c", value: new THREE.Color(skyBoxProps.bottomColor)}, offset: {type: "f", value: 0}, exponent: {type: "f", value: 0.8} }
        var skyMaterial =new THREE.ShaderMaterial({vertexShader: vertexShader,fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide, fog: false});
        return skyMaterial;
    }
    
    
    
    texture_Cube.format = THREE.RGBFormat;
    var shader = THREE.ShaderLib['cube'];
    //shader.uniforms['tCube'].value = texture_Cube;
    let skyMaterial_ShadedTexture = new THREE.ShaderMaterial( { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: shader.uniforms, depthWrite: false });  
    let skyMaterial_Lambert =  new THREE.MeshLambertMaterial({ color: "white",opacity: 0.45, transparent: false, side: THREE.BackSide, map: skyBoxTexture });
    let skyMaterial_RainbowColors =  new THREE.MeshNormalMaterial({ opacity: 0.8, transparent: true, side: THREE.BackSide });
    
    //console.log(skyMaterial_ShadedTexture)
    //var skyBoxGeometry = new THREE.BoxGeometry(STRUCTURE.WID*3, STRUCTURE.WID*3, STRUCTURE.WID*3);
    var skyBoxGeometry = new THREE.SphereGeometry(STRUCTURE.WID, 30, 30)
    skyBox = new THREE.Mesh( skyBoxGeometry, skyMaterial_RainbowColors );    
    skyBox.position.set(STRUCTURE.START.X+STRUCTURE.WID/2, STRUCTURE.START.LANDING.y, STRUCTURE.START.Z+STRUCTURE.LEN/2 );
    scene.add(skyBox)
    
    
    
    
    
    this.STRUCTURE = STRUCTURE;
    this.mainLight = mainLight;
    this.spotLight = spotLight;
    this.skyBox = skyBox;
    this.texture = texture;
    this.loadState = loadState;
    
    
    
    
    
    
    }catch(e){console.log(e)}
    
    
    
    
    
    
}//EO addGeos


