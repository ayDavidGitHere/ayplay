function AddGeos(scene, collideMeshList){
    this.object = this;
    
    var geosCustom_orb = new GeosCustom(scene, collideMeshList, {GEN_GEO_COLOR: "crimson"});
    var orb = geosCustom_orb.createOrb( 
        [80, 10, 10],
        [200, 200, 200],
        "orbs_A",
        {   type: "IcosahedronGeometry",
            add: true,
            material: new THREE.MeshLambertMaterial({ color: "#ff5231", opacity: 0.99, transparent: true, side: THREE.DoubleSide })
        },
    );
    
    
    
    
    
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
    
    
    
    

    this.mainLight = mainLight;
    this.spotLight = spotLight;
    this.pointLight = pointLight;
    //this.skyBox = skyBox;
    this.orb = orb;
}//EO addGeos


