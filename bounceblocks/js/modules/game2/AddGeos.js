function AddGeos(scene, collideMeshList, STRUCTURE){
    
    let E1 = {height: 15/5};
    let MB = {height: 30/10, width: 100/5, len: 100/5};    
    let BG = {height: 5/5, width: 20/5, len: 50/5};
    let SB = {height: 25/5, width: 70/5, len: 50/5};
    let HB = {height: 30/5, width: 15/3, len: 15/3};
    
    
    STRUCTURE.START.Y = 50/5;
    STRUCTURE.START.Z = -340/5;
    STRUCTURE.START.X = -170/5;
    STRUCTURE.START.LANDING = 0;
    STRUCTURE.LEN = 0;    STRUCTURE.WID = 0;    STRUCTURE.HEI = 210/5;
    STRUCTURE.CENTER.Z = STRUCTURE.START.Z+STRUCTURE.LEN/2
    STRUCTURE.FLOOR.Y = STRUCTURE.START.Y+MB.height;
    
    var heroBall; var heroBoundBox;
    var block;
    var blocks = {majorBlocks: [], sideBlocks:[], sideRamps:[], bridges: []};
    var supers = {highs: [], ramps: []}
    var ramps = {}
    var orbs = {}
    var tubes = {};
    var randColor = 
    ["steelblue", "orange", "darkgreen"][Math.floor(Math.random()*3)];
    var loadState = false;
    var carsList = this.carsList = [];
    var noList = this.noList = [];

    
    
    
    
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
    
    
    
    
    
    
    STRUCTURE.CENTER.Z =STRUCTURE.START.Z+MB.len;
    let mBlock =
    geosCustom.createBLK([MB.width*14, MB.height, MB.len*2], 
        [STRUCTURE.START.X, STRUCTURE.START.Y,STRUCTURE.START.Z], 
        "majorBlocks");
    mBlock.receiveShadow = true;
    blocks.majorBlocks.push(mBlock);//EO push
    STRUCTURE.START.LANDING = blocks.majorBlocks[0].position;
    STRUCTURE.WID = 14*MB.width;
    STRUCTURE.LEN = MB.len*2;

    var gen = new GenerateAll();
    var arr_supers = gen.arr_All.map(val => "VV");
    var arr_bases = gen.arr_All;
    arr_bases.map((sect, sectInd)=>{
        [...sect].map((elem, elemInd)=>{
            if(elem == "M"){
                
                if( Math.random()>0.5 && false && //supers
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
                        arr_supers[sectInd][elemInd] != "R" && false
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
                    [HB.width/1.5, HB.width/1.5, HB.width/1.5],
                    [STRUCTURE.START.X+MB.width*sectInd,
                    STRUCTURE.FLOOR.Y+hSuper_height+10, hSuper_Z],
                    "orbs_A", {type: "IcosahedronGeometry", add: true});
                    }
                }//EO if
                
            }//EO if
        })
    })//EO gen
    STRUCTURE.WID = arr_bases.length*MB.width;
    STRUCTURE.LEN = MB.len*2;

    //console.log(arr_supers)
    
    
    
    
    
    
    
    try{
    
    /*
    
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
    
    
    
    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total){
        alert("manager progress; "+item, loaded+" of "+total);
    };
    manager.onLoad = function() {
        alert("manager load completed;");
    };
    manager.onError = function(e) {
        alert("manager error:"+" "+e);
    };
    
    var loader = new THREE.GLTFLoader(manager);
    var MODEL_PATH = 
    "../../sprites/3d/model2.gltf";
    loader.crossOrigin = true; 
    loader.load(MODEL_PATH,
        function(gltf){
            model = gltf.scene;
            let fileAnimations = gltf.animations;
            scene.add(model);
            alert("gltf at: "+model.position.x)
            console.log(model.position.x)
        },
        function(loading){
            console.log("loading; ", loading)
        },
        function(error) {
            alert("error: "+error.stack);
        }
    );
    */
    
    
    asset_path = "http://localhost:8080/res/sprites/3d/Realistic-Car-Pack-Nov2018/OBJ/";
    asset_name_obj = "sportscar2.obj";//"Taxi.obj"
    asset_name_mtl = "sportscar2.mtl";
    var mLoader = new ModelLoader(scene);
    mLoader.objLoader(asset_path, asset_name_obj, asset_name_mtl, (object)=>{
        object.traverse((child)=>{
            if (child instanceof THREE.Mesh) {
                //alert(child.geometry);
            }
        })//EO traverse
        object.scale.x *=3;
        object.scale.y *=3;
        object.scale.z *=3; alert("Cars Loading done");
        object.rotation.y += Math.PI/2;
        var widX = 12; var heiY = 10/2; var lenZ = 6;
        var posX = 0;//object.position.x;
        var posY = 0;//object.position.y;
        var posZ = 0;//object.position.z
        var bbMaterial = new THREE.MeshLambertMaterial({ color: "green", side: THREE.DoubleSide, wireframe: true, transparent: true, opacity: 0 });
        var bbGeo = new THREE.BoxGeometry(widX, heiY, lenZ, 5, 5);
        var bBox = new THREE.Mesh( bbGeo, bbMaterial );
        bBox.position.y = heiY/2
        bBox.lenZ = lenZ; bBox.widX = widX; bBox.heiY;
        var object3d = new THREE.Group();
        object3d.add(bBox);
        object3d.add(object)
        scene.add(object3d);
        
        object3d.position.set(STRUCTURE.START.LANDING.x-STRUCTURE.WID/2+widX*2, STRUCTURE.START.LANDING.y+5
            , STRUCTURE.START.Z+STRUCTURE.LEN/5*3);
        object3d.horizonXSpeed = 0; 
        object3d.horizonZSpeed = 0; 
        object3d.verticalSpeed = 0;
        object3d.travelOrientation = "-Z";
        object3d.factorZ = -1;
        object3d.factorY = 0;
        object3d.factorX = 0;
        
        this.heroBoundBox = heroBoundBox = bBox;
        this.heroBall = heroBall = object3d;
        this.loadState = loadState = true;
    }, (loading)=>{     this.loadState = loadState = false;
    }, (error)=>{    alert(error); 
    }
    );
    
    
    function dumpMtl(dir, name, plus, scale, addToList=noList){
    var asset_path = "http://localhost:8080/res/sprites/3d/"+dir
    var asset_name_obj = name+".obj";//"Taxi.obj"
    var asset_name_mtl = name+".mtl";
    mLoader.objLoader(asset_path, asset_name_obj, asset_name_mtl, (object)=>{
        if(scale.length==0){  scaleFactor = 3; }
        if(scale[0]!=undefined){  scaleFactor = scale[0]; }
        object.scale.x *=scaleFactor; 
        object.scale.y *=scaleFactor;
        object.scale.z *=scaleFactor;
        object.rotation.y -= Math.PI/2;
        var widX = 12; var heiY = 10/2; var lenZ = 6;
        var posX = 0;//object.position.x;
        var posY = 0;//object.position.y;
        var posZ = 0;//object.position.z
        var bbMaterial = new THREE.MeshLambertMaterial({ color: "green", side: THREE.DoubleSide, wireframe: true, transparent: true, opacity: 0 });
        var bbGeo = new THREE.BoxGeometry(widX, heiY, lenZ, 5, 5);
        var bBox = new THREE.Mesh( bbGeo, bbMaterial );
        bBox.position.y = heiY/2
        bBox.lenZ = lenZ; bBox.widX = widX; bBox.heiY;
        var object3d = new THREE.Group();
        object3d.add(bBox);
        object3d.add(object)
        scene.add(object3d);
        
        object3d.position.set(STRUCTURE.START.LANDING.x+plus[0], STRUCTURE.START.LANDING.y+plus[1], STRUCTURE.START.LANDING.z+plus[2]);
        object3d.horizonXSpeed = -(0.2+Math.random()*0.5); 
        object3d.horizonZSpeed = 0; 
        object3d.verticalSpeed = 0;
        object3d.travelOrientation = "-Z";
        object3d.factorZ = -1;
        object3d.factorY = 0;
        object3d.factorX = 0;
        this.loadState = loadState = true;
        addToList.push(object3d);
    }, (loading)=>{       this.loadState = loadState = false;
    }, (error)=>{    alert(error); 
    }
    );
    }
    
    function dumpFbx(dir, name, plus, scale, addToList=noList){
    var asset_path = "http://localhost:8080/res/sprites/3d/"+dir
    var asset_name_fbx = name+".fbx"
    mLoader.fbxLoader(asset_path, asset_name_fbx, (object)=>{
        if(scale.length==0){  scaleFactor = 1/25; }
        if(scale[0]!=undefined){  scaleFactor = scale[0]; }
        object.scale.x *=scaleFactor; 
        object.scale.y *=scaleFactor;
        object.scale.z *=scaleFactor;
        object.rotation.y -= Math.PI/2;
        object.rotation.x -= Math.PI/2; 
        var widX = 12; var heiY = 10/2; var lenZ = 6;
        var posX = 0;//object.position.x;
        var posY = 0;//object.position.y;
        var posZ = 0;//object.position.z
        var bbMaterial = new THREE.MeshLambertMaterial({ color: "green", side: THREE.DoubleSide, wireframe: true, transparent: true, opacity: 0 });
        var bbGeo = new THREE.BoxGeometry(widX, heiY, lenZ, 5, 5);
        var bBox = new THREE.Mesh( bbGeo, bbMaterial );
        bBox.position.y = heiY/2
        bBox.lenZ = lenZ; bBox.widX = widX; bBox.heiY;
        var object3d = new THREE.Group();
        object3d.add(bBox);
        object3d.add(object)
        scene.add(object3d);
        
        object3d.position.set(STRUCTURE.START.LANDING.x+plus[0], STRUCTURE.START.LANDING.y+plus[1], STRUCTURE.START.LANDING.z+plus[2]);
        object3d.horizonXSpeed = -(0.2+Math.random()*0.5); 
        object3d.horizonZSpeed = 0; 
        object3d.verticalSpeed = 0;
        object3d.travelOrientation = "-Z";
        object3d.factorZ = -1;
        object3d.factorY = 0;
        object3d.factorX = 0;
        this.loadState = loadState = true;
        addToList.push(object3d);
    }, (loading)=>{       this.loadState = loadState = false;
    }, (error)=>{    alert(error); 
    }
    );
    }
    dumpMtl("Ultimate-Gun-Pack-July2019/OBJ/", "shotgun_3", [50,5,30], []);
    dumpMtl("Ultimate-Gun-Pack-July2019/OBJ/", "pistol_4", [50,5,30],[]);//Bd
    //dumpMtl("racing-kit-3d-model/Models/OBJ format/","racecargreen", [20, 5, 10],[], carsList);
    //dumpMtl("car-kit-3d-model/Models/OBJ format/", "firetruck", [10, 5, -5],[], carsList);
    dumpMtl("Realistic-Car-Pack-Nov2018/OBJ/", "normalcar2", [70, 5, -10],[], carsList);
    dumpMtl("Realistic-Car-Pack-Nov2018/OBJ/", "taxi", [70, 5, -10], [],carsList);
    dumpMtl("Realistic-Car-Pack-Nov2018/OBJ/", "normalcar1", [70, 5, -10],[], carsList);
    dumpMtl("Realistic-Car-Pack-Nov2018/OBJ/", "sportscar1", [70, 5, -10], [], carsList);
    dumpMtl("Realistic-Car-Pack-Nov2018/OBJ/", "sportscar2", [70, 5, -10], [], carsList);
    dumpMtl("Tank Pack - June 2019/OBJ/", "Tank1", [70, 5, -10], [1]);
    dumpMtl(".Updated Modular Dungeon - May 2019/OBJ/", "Table_big", [40,5, 30], []);
    //dumpMtl("cars-pack-quaternius/", "train", [70, 5, -10], []);//Bd
    //dumpMtl("dist/obj/", "4", [70, 5, -10], [1]);//Bd
    //dumpFbx("Realistic-Car-Pack-Nov2018/FBX/", "suv", [70, 5, -10], [], carsList);
    dumpFbx("Ultimate-Gun-Pack-July2019/FBX/", "shotgun_4", [40, 5, 30], []);
    dumpFbx("dist/fbx/", "12", [70, 5, 30], []);
    //dumpFbx("3138-Helicopter-3d-Model/", "helicopter", [70, 20, -10], []);
    dumpFbx("animated-characters-2/model/", "charactermedium", [70, 15, 30], []);
    
    
    
    
    
    
    
    
    
    /*
    asset_path = "http://localhost:8080/res/sprites/3d/hexagon-kit-3d-model/Models/OBJ format/";
    asset_name_obj = "building_castle.obj";//"Taxi.obj"
    asset_name_mtl = "building_castle.mtl";
    var mLoader = new ModelLoader(scene);
    mLoader.objLoader(asset_path, asset_name_obj, asset_name_mtl, (object)=>{
        object.position.set(STRUCTURE.START.LANDING.x+50, STRUCTURE.START.LANDING.y+5, STRUCTURE.START.LANDING.z);
        object.scale.x *=10;
        object.scale.y *=10;
        object.scale.z *=10; alert("Castle Loading done")
        scene.add(object);
    }, (loading)=>{   //alert(loading); 
    }, (error)=>{    alert(error); 
    }
    );
    
    
    asset_path = "http://localhost:8080/res/sprites/3d/uh-60-blackhawk-helicopter-obj/"
    asset_name_obj = "uh-60-blackhawk-helicopter.obj"
    asset_name_mtl = "uh-60-blackhawk-helicopter.mtl"
    var mLoader = new ModelLoader(scene);
    mLoader.objLoader(asset_path, asset_name_obj, asset_name_mtl, (object)=>{
        object.position.set(STRUCTURE.START.LANDING.x, STRUCTURE.START.LANDING.y+50, STRUCTURE.START.LANDING.z);
        object.scale.x *=3;
        object.scale.y *=3;
        object.scale.z *=3;
        scene.add(object);
    });
    
    
    
    
    asset_path = "http://localhost:8080/res/sprites/3d/Package/Plane_06/";
    asset_name_obj = "plane_06.obj"
    asset_name_mtl = "plane_06.mtl";
    mLoader.objLoader(asset_path, asset_name_obj, asset_name_mtl, (object)=>{
        object.position.set(STRUCTURE.START.LANDING.x, STRUCTURE.START.LANDING.y+50, STRUCTURE.START.LANDING.z);
        object.scale.x *=3;
        object.scale.y *=3;
        object.scale.z *=3;
        scene.add(object);
    });
    
    
    asset_path = "http://localhost:8080/res/sprites/3d/Assets/Assets1/";
    asset_name_obj = "restroom.obj";
    asset_name_mtl = "restroom.mtl";
    mLoader.objLoader(asset_path, asset_name_obj, asset_name_mtl, (object)=>{
        object.position.set(STRUCTURE.START.LANDING.x, STRUCTURE.START.LANDING.y, STRUCTURE.START.LANDING.z);
        object.scale.x *=3;
        object.scale.y *=3;
        object.scale.z *=3;
        scene.add(object);
    });
    
    
    asset_path = "http://localhost:8080/res/sprites/3d/Assets/Asset/";
    asset_name_obj = "cart.obj";
    asset_name_mtl = "cart.mtl";
    mLoader.objLoader(asset_path, asset_name_obj, asset_name_mtl, (object)=>{
        object.position.set(STRUCTURE.START.LANDING.x+20, STRUCTURE.START.LANDING.y, STRUCTURE.START.LANDING.z);
        object.scale.x *=3;
        object.scale.y *=3;
        object.scale.z *=3;
        scene.add(object);
    });
    
    
    asset_path = "http://localhost:8080/res/sprites/3d/terrain-first-obj/";
    asset_name_obj = "terrain-first.obj";
    asset_name_mtl = "terrain-first.mtl";
    asset_path = "http://localhost:8080/res/sprites/3d/building_dnt/";
    asset_name_obj = "building_dnt_v02.obj";
    asset_name_mtl = "building_dnt_v02.mtl";
    //asset_path = "http://localhost:8080/res/sprites/3d/low-poly-cars-3d-model/Low Poly Cars Pack 2/OBJ/";
    //asset_path = "/../../../res/sprites/3d/low-poly-cars-3d-model/Low Poly Cars Pack 1/OBJ/"; 
    //asset_name_obj = "raceCar.obj";
    //asset_name_mtl = "raceCar.mtl";   
    //asset_path = "http://localhost:8080/res/sprites/3d/Low_Poly_Cars_DevilsWorkShop_V02/OBJ/";
    //asset_name_obj = "Low_Poly_Vehicles_bus.obj";
    //asset_name_mtl = "null";
    
    
    
    mLoader.objLoader(asset_path, asset_name_obj, asset_name_mtl, (object)=>{
        object.position.set(STRUCTURE.START.LANDING.x, STRUCTURE.START.LANDING.y+20, STRUCTURE.START.LANDING.z);
        object.scale.x /=27;
        object.scale.y /=27;
        object.scale.z /=27;
        scene.add(object);
        //alert("Terrian Loaded");
    }, (loading)=>{     //alert(loading); 
    }, (error)=>{    alert(error); 
    }
    );
    
    
    
    
    
    
    
    
    asset_path="http://localhost:8080/res/sprites/3d/EnvironmentPack/Models/";
    asset_name_fbx = "SciFiCorridorsT.fbx"; 
    asset_path="http://localhost:8080/res/sprites/3d/FuturisticLowPolyCity/";
    asset_name_fbx = "FuturisticLowPolyCityByNiko.fbx"; 
    asset_path = "http://localhost:8080/res/sprites/3d/Assets/Assets1/";
    asset_name_fbx = "restroom.fbx";
    asset_path ="http://localhost:8080/res/sprites/3d/75-low-poly-buildings/";
    asset_name_fbx = "low-poly-buildings.fbx";
    asset_path ="http://localhost:8080/res/sprites/3d/99-low-poly-cars-free_fbx/Low Poly Cars (Free)_fbx/Models/";
    asset_name_fbx = "car_1.fbx"
    asset_path ="http://localhost:8080/res/sprites/3d/bikini-beach-girl-fbx/";
    asset_name_fbx = "bikini-beach-girl.fbx";
    
    
    mLoader.fbxLoader(asset_path, asset_name_fbx,
    (object)=>{
        
        object.traverse( function(child) {
        if(child instanceof THREE.Mesh) child.geometry.computeVertexNormals();
        }); 
        scene.add(object);
        object.position.set(STRUCTURE.START.LANDING.x+20, STRUCTURE.START.LANDING.y, STRUCTURE.START.LANDING.z+20);
        //object.scale.x /=27;
        //object.scale.y /=27;
        //object.scale.z /=27;
        alert("fbxLoader loaded; \n"+object.position.x);
    },
    (ld)=>{
        //alert("fbxLoader  "+ (ld.loaded/ld.total*100) +"%")     
    },
    (e)=>{
        alert(" fbxLoader error; "+e.stack+"; ");
    }
    );//EO mLoader
    */
    
    
    
    
    
    }catch(e){console.log(e)}
    

  
    
    
    
    
    
    
    
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
    skyBox = new THREE.Mesh( skyBoxGeometry, skyMaterial_ShadedColors() );    
    skyBox.position.set(STRUCTURE.START.X+STRUCTURE.WID/2, STRUCTURE.START.LANDING.y, STRUCTURE.START.Z+STRUCTURE.LEN/2 );
    scene.add(skyBox)
    
    
    
    this.STRUCTURE = STRUCTURE
    this.heroBall = heroBall;
    this.heroBoundBox = heroBoundBox
    this.mainLight = mainLight;
    this.spotLight = spotLight;
    this.skyBox = skyBox;
    this.texture = texture;
    this.block = block;
    this.blocks = blocks ;
    this.supers = supers;
    this.ramps = ramps;
    this.orbs = orbs
    this.tubes = tubes;
    this.loadState = loadState;
    this.carsList = carsList;
    
    
}//EO addGeos


