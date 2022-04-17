function AddGeos(scene, collideMeshList, STRUCTURE){
    
    let E1 = {height: 15/5};
    let MB = {height: 30/5, width: 100/5, len: 100/5};    
    let BG = {height: 5/5, width: 20/5, len: 50/5};
    let SB = {height: 25/5, width: 70/5, len: 50/5};
    let HB = {height: 30/5, width: 15/4, len: 15/4};
    
    
    STRUCTURE.START.Y = 50/5;
    STRUCTURE.START.Z = -340/5;
    STRUCTURE.START.X = -170/5;
    STRUCTURE.START.LANDING = 0;
    STRUCTURE.LEN = 0;    STRUCTURE.WID = 0;    STRUCTURE.HEI = 210/5;
    STRUCTURE.CENTER.Z = STRUCTURE.START.Z+STRUCTURE.LEN/2
    STRUCTURE.FLOOR.Y = STRUCTURE.START.Y+MB.height;
    
    var block;
    var blocks = {majorBlocks: [], sideBlocks:[], sideRamps:[], bridges: []};
    var supers = {highs: [], ramps: []}
    var ramps = {}
    var orbs = {}
    var tubes = {};
    var randColor = 
    ["steelblue", "orange", "darkgreen"][Math.floor(Math.random()*3)];

    
    
    
    
    //texture loader
    var textureDir = "../../../mein3/img/";
    var textureUrl = ["sand.jpg", "rock.jpg", "grass.jpg", "sand.jpg"];
    var skyBoxTextureDir = "sprites/";
    var skyBoxTextureUrl = ["skyboxtexture.png"];
    var texture = new THREE.TextureLoader().load(textureDir+textureUrl[0]);
    var texture_Cube 
    =new THREE.CubeTextureLoader().load(skyBoxTextureDir+skyBoxTextureUrl[0]);
    
    
    
    var geosCustom = new GeosCustom(scene, collideMeshList, {GEN_GEO_COLOR: STRUCTURE.GENERALCOLOR})
    //geosCustom.setGeneralMaterial(    new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide })  )
    var geosCustom_sup = new GeosCustom(scene, collideMeshList, {GEN_GEO_COLOR: "royalblue"});
    var geosCustom_orb = new GeosCustom(scene, collideMeshList, {GEN_GEO_COLOR: "crimson"});
    var geosCustom_ramp = new GeosCustom(scene, collideMeshList, {GEN_GEO_COLOR: "royalblue"});
    
    STRUCTURE.CENTER.Z =STRUCTURE.START.Z+MB.len;
    var gen = new GenerateAll();
    var arr_supers = gen.arr_All.map(val => "VV");
    var arr_bases = gen.arr_All;
    arr_bases.map((sect, sectInd)=>{
        [...sect].map((elem, elemInd)=>{
            if(elem == "M"){
                let mBlock =
                geosCustom.createBLK([MB.width, MB.height, MB.len], 
                [STRUCTURE.START.X+MB.width*sectInd, STRUCTURE.START.Y,
                STRUCTURE.START.Z+MB.len*elemInd], 
                "majorBlocks_"+elem+""+sectInd );
                mBlock.receiveShadow = true;
                blocks.majorBlocks.push(mBlock);//EO push
                STRUCTURE.START.LANDING = blocks.majorBlocks[0].position;
                
                
                if( Math.random()>0.5 &&
                    arr_bases[sectInd-1] != undefined &&
                    arr_bases[sectInd-1][elemInd] == "M" &&
                    arr_bases[sectInd+1] != undefined &&
                    arr_bases[sectInd+1][elemInd] == "M" &&
                    arr_bases[sectInd-1][1-elemInd] != "S" &&
                    arr_supers[sectInd-1][elemInd] != "R"
                    
                ){
                    
                    let rSuper = 
                    geosCustom_ramp.createRamp([MB.len, MHelp.randOpt(30/5, 20/5), 50/5],
                    [STRUCTURE.START.X+MB.width*sectInd, STRUCTURE.FLOOR.Y,
                    STRUCTURE.START.Z+MB.len*elemInd],
                    "rampSupers_"+elem+""+elemInd,
                    {"orient": [ [-1, 2, 0] ][0]});
                    rSuper.castShadow = true;
                    rSuper.receiveShadow = true;
                    supers.ramps.push(rSuper);
                    arr_supers[sectInd] = ["RV", "VR"][elemInd];
                    
                    
                    let rSBack = 
                    geosCustom_ramp.createRamp([MB.len, rSuper.my.heiY, 50/5/3],
                    [STRUCTURE.START.X+MB.width*sectInd+rSuper.my.lenZ,STRUCTURE.FLOOR.Y,
                    STRUCTURE.START.Z+MB.len*elemInd],
                    "rsBack_"+elem+""+elemInd,
                    {"orient": [ [-1, 0, 0] ][0]});
                    rSBack.castShadow = true;
                    rSBack.receiveShadow = true;
                }
                else if(
                        arr_supers[sectInd][elemInd] != "R"
                    ){
                    let hSuper_height = HB.height*(1+Math.random()*2);
                    let hSuper_Z = STRUCTURE.START.Z+MB.len*(elemInd+Math.floor(Math.random()*4)/4)-HB.len*0;
                    let hSuper =
                    geosCustom_sup.createBLK([HB.width,hSuper_height, HB.len],
                    [STRUCTURE.START.X+MB.width*sectInd,
                    STRUCTURE.FLOOR.Y, hSuper_Z],
                    "highSupers_"+elem+""+sectInd );
                    hSuper.castShadow = true;
                    hSuper.receiveShadow = true;
                    supers.highs.push(hSuper);
                    //arr_supers[sectInd] = ["HV", "VH"][elemInd];
                    
                    if(Math.random()>0.5){
                    let orb= 
                    geosCustom_orb.createOrb( 
                    [HB.width/1.5, HB.width/1.5, HB.width/1.5],/*
                    [STRUCTURE.START.X+MB.width*sectInd,
                    STRUCTURE.FLOOR.Y+hSuper_height+10, hSuper_Z],*/
                    [STRUCTURE.START.X+MB.width*sectInd-HB.width/1.5,
                    STRUCTURE.FLOOR.Y+HB.width/1.5, hSuper_Z],
                    "orbs_A", {type: "IcosahedronGeometry", add: true});
                    }
                }//EO if
                
                
            }//EO if
            if(elem == "S"){
                let bg_posZ = STRUCTURE.CENTER.Z-BG.len*(1-elemInd);
                let bg =
                geosCustom.createBLK([BG.width, BG.height, BG.len],
                [STRUCTURE.START.X+MB.width*(sectInd+1), STRUCTURE.START.Y+MB.height-BG.height,
                bg_posZ],
                "bg_"+elem+""+sectInd );
                bg.receiveShadow = true;
                blocks.bridges.push(bg);
                
                let sBlocks = 
                geosCustom.createBLK([SB.width, SB.height, SB.len],
                [STRUCTURE.START.X+MB.width*(sectInd+1), STRUCTURE.START.Y+MB.height-SB.height,
                bg_posZ-SB.len*(1-elemInd)+BG.len*elemInd],
                "bg_"+elem+""+sectInd );
                sBlocks.receiveShadow = true;
                blocks.sideBlocks.push(sBlocks);//EO push blocks
                
            }//EO if
        })
    })//EO gen
    STRUCTURE.WID = arr_bases.length*MB.width;
    STRUCTURE.LEN = MB.len*2;

    //console.log(arr_supers)
    //alert(supers.ramps.length)
    
    
    
    
    
    

    
    var ballGeometry = new THREE.SphereGeometry(4/5, 15, 15);
    var wireMaterial = new THREE.MeshPhongMaterial({   wireframe: false,  color: randColor
    });
    heroBall = new THREE.Mesh(ballGeometry, wireMaterial);
    heroBall.castShadow = true;
    heroBall.receiveShadow = true;
    heroBall.position.y = STRUCTURE.START.LANDING.y+50/5;
    heroBall.position.x = STRUCTURE.START.LANDING.x//+MB.width/2;
    heroBall.position.z = STRUCTURE.START.LANDING.z//+MB.len/2;
    
    heroBall.horizonXSpeed = 0; 
    heroBall.horizonZSpeed = 0; 
    heroBall.verticalSpeed = 0;
    heroBall.travelOrientation = "-Z";
    heroBall.factorZ = -1;
    heroBall.factorY = 0;
    heroBall.factorX = 0;
    heroBall.my = {radius: 4/5}
    scene.add(heroBall);
    
    
    
    
    
    
    
    let mainLightColor = "#ffffff"
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
    
    
    
    
    
    
    let skyBoxProps = {topColor: "midnightblue", bottomColor: "#000817"} 
    function skyMaterial_Shaded(){
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
        var uniforms = { topColor: {type: "c", value: new THREE.Color(skyBoxProps.topColor)}, bottomColor: {type: "c", value: new THREE.Color(skyBoxProps.bottomColor)}, offset: {type: "f", value: 0}, exponent: {type: "f", value: 0.8} }
        var skyMaterial =new THREE.ShaderMaterial({vertexShader: vertexShader,fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide, fog: false});
        return skyMaterial;
    }
    
    
    
    texture_Cube.format = THREE.RGBFormat;
    var shader = THREE.ShaderLib['cube'];
    //shader.uniforms['tCube'].value = texture_Cube;
    let skyMaterial_ShadedTexture = new THREE.ShaderMaterial( { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: shader.uniforms, depthWrite: false });  
    let skyMaterial_Lambert =  new THREE.MeshLambertMaterial({ color: "white",opacity: 0.45, transparent: false, side: THREE.BackSide, map: texture });
    let skyMaterial_Colors =  new THREE.MeshNormalMaterial({ opacity: 0.8, transparent: true, side: THREE.BackSide });
    
    //console.log(skyMaterial_ShadedTexture)
    var skyBoxGeometry = new THREE.BoxGeometry(STRUCTURE.WID*3, STRUCTURE.WID*3, STRUCTURE.WID*3);
    var skyBoxGeometry = new THREE.SphereGeometry(STRUCTURE.WID, 30, 30)
    skyBox = new THREE.Mesh( skyBoxGeometry, skyMaterial_Shaded() );    
    skyBox.position.set(STRUCTURE.START.X+STRUCTURE.WID/2, STRUCTURE.START.LANDING.y, STRUCTURE.START.Z+STRUCTURE.LEN/2 );
    scene.add(skyBox)
    
    
    
    this.STRUCTURE = STRUCTURE
    this.heroBall = heroBall;
    this.mainLight = mainLight;
    this.spotLight = spotLight;
    this.skyBox = skyBox;
    this.block = block;
    this.blocks = blocks ;
    this.supers = supers;
    this.ramps = ramps;
    this.orbs = orbs
    this.tubes = tubes

    
    
}//EO addGeos


