function AddGeos(scene, collideMeshList){
    this.object = this;
    
    
    
    
    let mainLightColor = "white";//"#ffffff"
    let mainLight = new THREE.DirectionalLight( mainLightColor, 1);
    mainLight.position.set( 0, 200, 0 );
    mainLight.target.position.set( 0, 0, 0 );
    
    mainLight.castShadow = false;
    mainLight.shadow.camera.visible = true;
    let d = 200;
    mainLight.shadow.camera.left = - d;
    mainLight.shadow.camera.right = d;
    mainLight.shadow.camera.top = d;
    mainLight.shadow.camera.bottom = -d;
    mainLight.shadow.camera.far = 100;
    mainLight.shadow.camera.fov *= 1;
    mainLight.shadow.camera.near = 0;
    mainLight.shadow.mapSize.width = 2 * 512;
    mainLight.shadow.mapSize.height = 2 * 512;
    mainLight.shadow.darkness = 1;
    scene.add(mainLight, mainLight.target);
    //scene.add( new THREE.DirectionalLightHelper(mainLight) );
    
    var hemiLight 
    = new THREE.HemisphereLight(mainLightColor, mainLightColor, 0.51);
    scene.add(hemiLight);
    
    const cameraHelper = new THREE.CameraHelper(mainLight.shadow.camera);
    //scene.add(cameraHelper);
    
    
    
    spotLight = new THREE.SpotLight ("white", 5);
    spotLight.position.set(0, 0, 0 );
    spotLight.castShadow = true;
    spotLight.angle = 3*Math.PI/3;
    spotLight.distance = 200; //spotLight.penumbra = 1;
    spotLight.power = 5; //spotLight.decay *= 1.1
    spotLight.lookAt(new THREE.Vector3( -170+90, 50, -105-52.5));
    scene.add(spotLight);
    //scene.add( new THREE.SpotLightHelper(spotLight) );
    
    var ambLight = new THREE.AmbientLight( 0xffffff, 0.05);
    //scene.add(ambLight);
    
    var pointLight = new THREE.PointLight ("green", 2);
    pointLight.position.set(0, 0, 0 );
    pointLight.castShadow = true;
    //scene.add(pointLight);
    //scene.add( new THREE.PointLightHelper(pointLight) )
    
    
    
    
    
    let skyBoxProps = {topColor: "darkblue", bottomColor: "skyblue"} 
    function getSkyMaterial_Shaded(){
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
    /*
    texture_Cube.format = THREE.RGBFormat;
    var shader = THREE.ShaderLib['cube'];
    //shader.uniforms['tCube'].value = texture_Cube;
    let skyMaterial_ShadedTexture = new THREE.ShaderMaterial( { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: shader.uniforms, depthWrite: false });  
    let skyMaterial_Lambert =  new THREE.MeshLambertMaterial({ color: "white",opacity: 0.45, transparent: false, side: THREE.BackSide, map: texture });
    let skyMaterial_Colors =  new THREE.MeshNormalMaterial({ opacity: 0.8, transparent: true, side: THREE.BackSide });*/
    let skyMaterial_Shaded = getSkyMaterial_Shaded();
    //
    var skyBoxGeometry = new THREE.BoxGeometry(100, 100, 100);
    var skyBoxGeometry = new THREE.SphereGeometry(100, 30, 30)
    skyBox = new THREE.Mesh( skyBoxGeometry, skyMaterial_Shaded );    
    skyBox.position.set(0, 0, 275 );
    scene.add(skyBox)
    
    
    
    
    
    
    

    

    this.mainLight = mainLight;
    this.spotLight = spotLight;
    this.pointLight = pointLight;
    this.skyBox = skyBox;
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    let addGeos = this;
    addGeos.tank = null;
    let tankModel =  new ModelLoader.FBXLoader(window.addrs.res2+"/C-3JS/sprites/3d/m1_and_pistol/"+ "M1.fbx");
    tankModel.onload = function(){
        addGeos.tank = tankModel.object;
        addGeos.tank.position.set( 0, 0, -200.123);
        addGeos.tank.scale.x *= 1/30
        addGeos.tank.scale.y *= 1/30;
        addGeos.tank.scale.z *= 1/30;
        addGeos.tank.position.x = 0;
        addGeos.tank.position.z = 275-50;
        addGeos.tank.position.y = 2;
        addGeos.tank.rotation.y += Math.PI/2
        scene.add(addGeos.tank);
    }
    
    
    addGeos.building = null;
    addGeos.building2 = null;
    let buildingModel = new ModelLoader.OBJLoader(window.addrs.res2+"/C-3JS/sprites/3d/building/"+ "building.obj", window.addrs.res2+"/C-3JS/sprites/3d/building/"+ "building.mtl");
    buildingModel.onload = function(){
        addGeos.building = buildingModel.object;
        addGeos.building.position.set( 0, 0, -200.123);
        addGeos.building.scale.x *= 50;
        addGeos.building.scale.y *= 50;
        addGeos.building.scale.z *= 50;
        addGeos.building.position.x = -350/3;
        addGeos.building.position.y = 0;
        //addGeos.building2 = Object.assign({}, addGeos.building);
        //addGeos.building2.position.x = +350/3;
        //scene.add(addGeos.building2)
        //scene.add(addGeos.building);
        //console.log("finished loading")
        //console.log(addGeos.building);
        //console.log(addGeos.building2);
        
    }
    
    
    
    
    
    
    addGeos.skeleton = null;
    addGeos.hero = null;
    addGeos.Ninja = null;
    addGeos.hero2 = null;
    //BO skeletonModel
    let skeletonModel =  new ModelLoader.FBXLoader(window.addrs.res2+"/C-3JS/sprites/3d/skeleton/"+ "skeleton.fbx");
    skeletonModel.onload = function(){
        addGeos.skeleton = skeletonModel.object;
        addGeos.skeleton.position.set( 0, 1, -200.123);
        addGeos.skeleton.scale.x *= 1/15;
        addGeos.skeleton.scale.y *= 1/15;
        addGeos.skeleton.scale.z *= 1/15;
        addGeos.skeleton.position.x = -5;
        addGeos.skeleton.position.z = 275;
        addGeos.skeleton.rotation.y += 0;//Math.PI/2;
        addGeos.skeleton.resourcePath = (window.addrs.res2+"/C-3JS/sprites/3d/skeleton/"+ "Textures");
        scene.add(addGeos.skeleton)
        console.log("skeleton...", addGeos.skeleton);
        var names = "skeleton: ";
        addGeos.skeleton.animations.map((animation, index)=>{
            names += "    {  "+index+": "+animation.name+"  }     ";
        });
        console.log(names);
        //BO add animation
        const mixer = new THREE.AnimationMixer(addGeos.skeleton);
        mixer.clipAction(addGeos.skeleton.animations[3]).play();
        addGeos.skeleton.animationMixer = mixer;
        console.log("mixer...");
        
        
    }
    
    
    
    
    
    
    
    
    
    
    
//BO stand
 var wallGeom = new THREE.BoxGeometry(30, 7.5, 15/2);
 var wallMaterial = new THREE.MeshPhongMaterial({
 color: 0x9E9E9E,
 opacity: 0.99,
 transparent: true
 });
 // and create the complete wall segment
 var wallMesh = new THREE.Mesh(wallGeom, wallMaterial);
 console.log(wallGeom)
 wallMesh.position.set(0, 0+7.5/2, 275-15)
 scene.add(wallMesh);
 
    addGeos.pistol = null;
    //let pistolModel =  new ModelLoader.FBXLoader(window.addrs.res2+"/C-3JS/sprites/3d/m1_and_pistol/"+ "Pistol Glock.fbx");
    //let pistolModel =  new ModelLoader.FBXLoader(window.addrs.res2+"/C-3JS/sprites/3d/Flat_Guns_West/FBX/Shotgun_Auto_West.Rig.fbx");
    //let pistolModel =  new ModelLoader.FBXLoader(window.addrs.res2+"/C-3JS/sprites/3d/Ultimate_Gun_Pack/FBX/Pistol_3.fbx");
    let pistolModel =  new ModelLoader.OBJLoader(window.addrs.res2+"/C-3JS/sprites/3d/Ultimate_Gun_Pack/OBJ/Pistol_1.obj", window.addrs.res2+"/C-3JS/sprites/3d/Ultimate_Gun_Pack/OBJ/Pistol_1.mtl");
    pistolModel.onload = function(){
        addGeos.pistol = pistolModel.object;
        addGeos.pistol.position.set( 0, 0, -200.123);    /*
        addGeos.pistol.scale.x *= 1/150;
        addGeos.pistol.scale.y *= 1/150;
        addGeos.pistol.scale.z *= 1/150;    */
        addGeos.pistol.position.x = 0;
        addGeos.pistol.position.z = 275+40;
        addGeos.pistol.position.y = +1+7;
        addGeos.pistol.rotation.y += Math.PI/2+Math.PI/16;
        scene.add(addGeos.pistol);
        addGeos.gun = addGeos.pistol;
        addGeos.gun.state = { value: "idle", animating: false };
        
        console.log("pistol...", addGeos.pistol);
        let names = "pistol: ";
        addGeos.pistol.animations.map((animation, index)=>{
            names += "    {  "+index+": "+animation.name+"  }     ";
        });
        console.log(names);
    }
    
    //BO shotgun
    addGeos.shotgun = null;
    let shotgunModel =  new ModelLoader.OBJLoader(window.addrs.res2+"/C-3JS/sprites/3d/Ultimate_Gun_Pack/OBJ/Shotgun_1.obj", window.addrs.res2+"/C-3JS/sprites/3d/Ultimate_Gun_Pack/OBJ/Shotgun_1.mtl");
    shotgunModel.onload = function(){
        addGeos.shotgun = shotgunModel.object;
        addGeos.shotgun.position.y = wallMesh.position.y+7.5;
        addGeos.shotgun.position.x = wallMesh.position.x-7.5+(15/4);
        addGeos.shotgun.position.z = wallMesh.position.z;
        addGeos.shotgun.rotation.y += Math.PI/2+Math.PI/16;
        scene.add(addGeos.shotgun);
    }
    //BO revolver
    addGeos.revolver = null;
    let revolverModel =  new ModelLoader.OBJLoader(window.addrs.res2+"/C-3JS/sprites/3d/Ultimate_Gun_Pack/OBJ/Revolver_1.obj", window.addrs.res2+"/C-3JS/sprites/3d/Ultimate_Gun_Pack/OBJ/Revolver_1.mtl");
    revolverModel.onload = function(){
        addGeos.revolver = revolverModel.object;
        addGeos.revolver.position.y = wallMesh.position.y+7.5;
        addGeos.revolver.position.x = wallMesh.position.x-7.5+2*(15/4);
        addGeos.revolver.position.z = wallMesh.position.z;
        addGeos.revolver.rotation.y += Math.PI/2+Math.PI/16;
        scene.add(addGeos.revolver);
    }
    
    
    
    
    
    
    
           
    let heroGeom = new THREE.BoxGeometry(1,1,1);
    let heroMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        opacity: 0.99,
        transparent: true
    });
    // and create the complete wall segment
    addGeos.hero = new THREE.Mesh(heroGeom, heroMaterial);
    addGeos.hero.position.set( 0, 0, -200.123);
    addGeos.hero.scale.x *= 1/150;
    addGeos.hero.scale.y *= 1/150;
    addGeos.hero.scale.z *= 1/150;
    addGeos.hero.position.x = 0;
    addGeos.hero.position.z = 275+40;
    addGeos.hero.position.y = +1+7;
    addGeos.hero.rotation.y += +Math.PI/2;
    scene.add(addGeos.hero);
    
    
    
    
    
    
    
    
    
    
    //flooring and wall.
    ;(function(){
    addGeos.floorparts = [];
    //
    let floor = {w: 120, l: 120, x: 0-60, z: 275-60};
    let tilesize = {w: 15, l: 15};
    let nooftilesinrow = floor.w/tilesize.w;
    let nooftilesincol = floor.l/tilesize.l;
    floor.x += tilesize.w;
    floor.z += tilesize.l;
    let k = 0;
    for(let i=0; nooftilesincol>i; i++){
    for(let j=0; nooftilesinrow>j; j++){
        addGeos.floorparts.push({
            name: "Floor_Modular.fbx",
            position: {
                z: floor.z+i*tilesize.l- tilesize.l/2,
                x: floor.x+j*tilesize.w- tilesize.w/2,
            },
            rotation: {x: -Math.PI/2},
        });//EO push
        //console.log("tile: ", "z: "+addGeos.floorparts[k].position.z, "x: "+addGeos.floorparts[k].position.x)
        k++;
    }
    }//EO for
    //
    let planeGeometry 
    = new THREE.PlaneGeometry(tilesize.w*0.99, tilesize.l*0.99);
    let planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xbbccdd, side: THREE.DoubleSide,
    });
    
    //floorparts.map
    addGeos.floorparts.map((part, index)=>{
        let part_ = new THREE.Mesh(planeGeometry, planeMaterial);
        part_.rotation.x = -Math.PI/2;
        part_.position.x = 0;
        part_.position.y = 0;
        part_.position.z = 275;
        if(part.position.z!==undefined)    part_.position.z = part.position.z;
        if(part.position.y!==undefined)    part_.position.y = part.position.y;
        if(part.position.x!==undefined)    part_.position.x = part.position.x;
        if(part.rotation.z!==undefined)    part_.rotation.z = part.rotation.z;
        if(part.rotation.y!==undefined)    part_.rotation.y = part.rotation.y;
        if(part.rotation.x!==undefined)    part_.rotation.x = part.rotation.x;
        scene.add(part_);
    })//EO
    
    //
    let planeGeometry2 
    = new THREE.PlaneGeometry(floor.w, floor.l);
    let planeMaterial2 = new THREE.MeshLambertMaterial({
        color: 0x000000, side: THREE.DoubleSide,
    });
    let planeMesh = new THREE.Mesh(planeGeometry2, planeMaterial2);
    planeMesh.rotation.x = -Math.PI/2;
    planeMesh.position.x = 0;
    planeMesh.position.y = -0.5;
    planeMesh.position.z = 275;
    scene.add(planeMesh);
    //
    
    
    
    
    
    //walling
    ;
    [
     [[ floor.l, 7.5, 1], [0, 0+7.5/2, 275-floor.l/2]]
    ,[[ floor.l, 7.5, 1], [0, 0+7.5/2, 275+floor.l/2]]
    ,[[ 1, 7.5, floor.l], [-floor.l/2, 0+7.5/2, 275]]
    ,[[ 1, 7.5, floor.l], [+floor.l/2, 0+7.5/2, 275]]
    ].map((props)=>{
        let dmns = props[0];
        let pstn = props[1];
           
        let wallGeom = new THREE.BoxGeometry(... dmns);
        let wallMaterial = new THREE.MeshLambertMaterial({
        color: 0x9E9E9E,
        opacity: 0.99,
        transparent: false
        });
        // and create the complete wall segment
        let wallMesh = new THREE.Mesh(wallGeom, wallMaterial);
        wallMesh.position.set(... pstn)
        scene.add(wallMesh)
           
    });
    
    
    })();
    //EO flooring and walling
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}//EO addGeos


