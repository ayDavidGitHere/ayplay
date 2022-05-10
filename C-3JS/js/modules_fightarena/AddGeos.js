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
    
    
    
    

    this.mainLight = mainLight;
    this.spotLight = spotLight;
    this.pointLight = pointLight;
    //this.skyBox = skyBox;
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    let addGeos = this;
    addGeos.tank = null;
    let tankModel =  new ModelLoader.FBXLoader(window.addrs.res2+"/C-3JS/sprites/3d/m1_and_pistol/"+ "M1.fbx");
    tankModel.onload = function(){
        addGeos.tank = tankModel.object;
        addGeos.tank.position.set( 0, 0, -200.123);
        addGeos.tank.scale.x *= 1/20;
        addGeos.tank.scale.y *= 1/20;
        addGeos.tank.scale.z *= 1/20;
        addGeos.tank.position.x = 0;
        addGeos.tank.position.z += 200;
        addGeos.tank.rotation.y += Math.PI/2
        //scene.add(addGeos.tank);
    }
    
    addGeos.pistol = null;
    let pistolModel =  new ModelLoader.FBXLoader(window.addrs.res2+"/C-3JS/sprites/3d/m1_and_pistol/"+ "Pistol Glock.fbx");
    pistolModel.onload = function(){
        addGeos.pistol = pistolModel.object;
        addGeos.pistol.position.set( 0, 0, -200.123);
        addGeos.pistol.scale.x *= 1/20;
        addGeos.pistol.scale.y *= 1/20;
        addGeos.pistol.scale.z *= 1/20;
        addGeos.pistol.position.x = 0;
        addGeos.pistol.position.z = 600;
        addGeos.pistol.rotation.y += Math.PI/2.5;
        //scene.add(addGeos.pistol);
        camProps.presentCam.position.z = addGeos.pistol.position.z+20;
        camProps.presentCam.position.y = addGeos.pistol.position.y+3;
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
    
    
    
    
    
    
    addGeos.dungeonParts = 
    [
    {name: "Arch.fbx", position: {}, rotation: {}, scale: {}, object:null},
    {name: "Arch_Door.fbx", position: {}, rotation: {y: 6.35/4}, scale: {}, object:null},
    {name: "Arch.fbx", position: {z: 252}, rotation: {}, scale: {}, object:null},
    {name: "Arch_bars.fbx", position: {z: 252}, rotation: {}, scale: {}, object:null},
    {name: "Banner.fbx", position: {z: 300-1, x: -6*1.3}, rotation: {}, scale: {}, object:null},
    {name: "Banner.fbx", position: {z: 300-1, x: 6*1.3}, rotation: {}, scale: {}, object:"Banner.fbx"},
    {name: "Trapdoor_open.fbx", position: {z: 280}, rotation: {}, scale: {}, object:null, hide: true},
    {name: "Statue_Horse.fbx", position: {z: 280, x: -15}, rotation: {y: Math.PI/2}, scale: {}, object:null},
    {name: "Statue_Horse2.fbx", position: {z: 280, x: 15}, rotation: {y: 3*Math.PI/2}, scale: {}, object:"Statue_Horse.fbx"},
    {name: "Wall_Modular.fbx", position: {z: 300, x: -6, y: 6}, rotation: {}, scale: {}, object:null, hide: true},/*
    //
    {name: "Column.fbx", position: {z: 300, x: -6*2, }, rotation: {}, scale: {}, object:null},
    {name: "Column2.fbx", position: {z: 300, x: 6*2, }, rotation: {}, scale: {}, object:"Column.fbx"},
    {name: "Column.fbx", position: {z: 300-6*3, x: -6*2, }, rotation: {}, scale: {}, object:"Column.fbx"},
    {name: "Column.fbx", position: {z: 300-6*3, x: 6*2, }, rotation: {}, scale: {}, object:"Column.fbx"},
    //
    {name: "Column.fbx", position: {z: 300-6*3, x: -(6*4.65), }, rotation: {}, scale: {}, object:"Column.fbx"},
    {name: "Column.fbx", position: {z: 300-6*3, x: 6*4+1, }, rotation: {}, scale: {}, object:"Column.fbx"},
    //Column BE
    {name: "Column.fbx", position: {z: 250, x: -(6*4.65), }, rotation: {}, scale: {}, object:"Column.fbx"},
    {name: "Column.fbx", position: {z: 250, x: 6*4+1, }, rotation: {}, scale: {}, object:"Column.fbx"},
    */
    {name: "Floor_Modular.fbx", position: {z: 250, x: 0, }, rotation: {}, scale: {}, object: null, hide: true},
    ];
    
    
    //flooring
    (function(){
    let floor = {w: 48, l: 36, x: -24, z: 252};
    let tilesize = {w: 24, l: 18};
    let scale = {x: (tilesize.w/4)*1/50, z: (tilesize.l/4)*1/50};
    let nooftilesinrow = floor.w/tilesize.w;
    let nooftilesincol = floor.l/tilesize.l;
    floor.x += tilesize.w/2;
    floor.z += tilesize.l/2;
    for(let i=0; nooftilesincol>i; i++){
        for(let j=0; nooftilesinrow>j; j++){
    addGeos.dungeonParts.push(
    {name: "Floor_Modular.fbx", position: {z: floor.z+i*tilesize.l, x: floor.x+j*tilesize.w, }, rotation: {}, scale: {x: scale.x, z: scale.z}, object:"Floor_Modular.fbx", type: "floor"},
    );//EO push
        }
    }//EO for
    })();
   //flooring
    (function(){
    let floor = {w: 24, l: 12, x: -12, z: 252+36};
    let tilesize = {w: 24, l: 12};
    let scale = {x: (tilesize.w/4)*1/50, z: (tilesize.l/4)*1/50};
    let nooftilesinrow = floor.w/tilesize.w;
    let nooftilesincol = floor.l/tilesize.l;
    floor.x += tilesize.w/2;
    floor.z += tilesize.l/2;
    for(let i=0; nooftilesincol>i; i++){
        for(let j=0; nooftilesinrow>j; j++){
    addGeos.dungeonParts.push(
    {name: "Floor_Modular.fbx", position: {z: floor.z+i*tilesize.l, x: floor.x+j*tilesize.w, }, rotation: {}, scale: {x: scale.x, z: scale.z}, object:"Floor_Modular.fbx", type: "floor"},
    );//EO push
        }
    }//EO for
    })();
   //wall long SE left
    (function(){
    let wall = {l: 36, h: 8, y: 0, z: 252};
    let tilesize = {h: 8, l: 18, b: 0};
    let scale = {x: (tilesize.l/4)*1/50, y: (tilesize.h/4)*1/50};
    let nooftilesinrow = wall.l/tilesize.l;
    let nooftilesincol = wall.h/tilesize.h;
    wall.z += tilesize.l/2;
    wall.y += tilesize.h/2;
    wall.x = -24+tilesize.b/2;
    for(let i=0; nooftilesincol>i; i++){
        for(let j=0; nooftilesinrow>j; j++){
    addGeos.dungeonParts.push(
    {name: "Wall_Modular.fbx", position: {z: wall.z+j*tilesize.l, y: wall.y+i*tilesize.h, x: wall.x}, rotation: {y: 3*Math.PI/2}, scale: {x: scale.x, y: scale.y}, object:"Wall_Modular.fbx"},
    );//EO push
        }
    }//EO for
    })();
   //wall long SE right
    (function(){
    let wall = {l: 36, h: 8, y: 0, z: 252};
    let tilesize = {h: 8, l: 18, b: 0};
    let scale = {x: (tilesize.l/4)*1/50, y: (tilesize.h/4)*1/50};
    let nooftilesinrow = wall.l/tilesize.l;
    let nooftilesincol = wall.h/tilesize.h;
    wall.z += tilesize.l/2;
    wall.y += tilesize.h/2;
    wall.x = 24+tilesize.b/2;
    for(let i=0; nooftilesincol>i; i++){
        for(let j=0; nooftilesinrow>j; j++){
    addGeos.dungeonParts.push(
    {name: "Wall_Modular.fbx", position: {z: wall.z+j*tilesize.l, y: wall.y+i*tilesize.h, x: wall.x}, rotation: {y: 3*Math.PI/2}, scale: {x: scale.x, y: scale.y}, object:"Wall_Modular.fbx"},
    );//EO push
        }
    }//EO for
    })();
    
   //wall short SE left
    (function(){
    let wall = {l: 12, h: 8, y: 0, z: 252+36};
    let tilesize = {h: 8, l: 12, b: 0};
    let scale = {x: (tilesize.l/4)*1/50, y: (tilesize.h/4)*1/50};
    let nooftilesinrow = wall.l/tilesize.l;
    let nooftilesincol = wall.h/tilesize.h;
    wall.z += tilesize.l/2;
    wall.y += tilesize.h/2;
    wall.x = -12+tilesize.b/2;
    for(let i=0; nooftilesincol>i; i++){
        for(let j=0; nooftilesinrow>j; j++){
    addGeos.dungeonParts.push(
    {name: "Wall_Modular.fbx", position: {z: wall.z+j*tilesize.l, y: wall.y+i*tilesize.h, x: wall.x}, rotation: {y: 3*Math.PI/2}, scale: {x: scale.x, y: scale.y}, object:"Wall_Modular.fbx"},
    );//EO push
        }
    }//EO for
    })();
   //wall short SE right
    (function(){
    let wall = {l: 12, h: 8, y: 0, z: 252+36};
    let tilesize = {h: 8, l: 12, b: 0};
    let scale = {x: (tilesize.l/4)*1/50, y: (tilesize.h/4)*1/50};
    let nooftilesinrow = wall.l/tilesize.l;
    let nooftilesincol = wall.h/tilesize.h;
    wall.z += tilesize.l/2;
    wall.y += tilesize.h/2;
    wall.x = 12+tilesize.b/2;
    for(let i=0; nooftilesincol>i; i++){
        for(let j=0; nooftilesinrow>j; j++){
    addGeos.dungeonParts.push(
    {name: "Wall_Modular.fbx", position: {z: wall.z+j*tilesize.l, y: wall.y+i*tilesize.h, x: wall.x}, rotation: {y: 3*Math.PI/2}, scale: {x: scale.x, y: scale.y}, object:"Wall_Modular.fbx"},
    );//EO push
        }
    }//EO for
    })();
    
    
    
    
   //wall BE side 1
    (function(){
    let wall = {w: 20, h: 8, y: 0, x: -24};
    let tilesize = {h: 8, w: 20};
    let scale = {x: (tilesize.w/4)*1/50, y: (tilesize.h/4)*1/50};
    let nooftilesinrow = wall.w/tilesize.w;
    let nooftilesincol = wall.h/tilesize.h;
    wall.x += tilesize.w/2;
    wall.y += tilesize.h/2;
    for(let i=0; nooftilesincol>i; i++){
        for(let j=0; nooftilesinrow>j; j++){
    addGeos.dungeonParts.push(
    {name: "Wall_Modular.fbx", position: {x: wall.x+j*tilesize.w, y: wall.y+i*tilesize.h, z: 252}, rotation: {},scale: {x: scale.x, y: scale.y},  object:"Wall_Modular.fbx"},
    );//EO push
        }
    }//EO for
    })();
    
   //wall BE side 2
    (function(){
    let wall = {w: 20, h: 8, y: 0, x: 4};
    let tilesize = {h: 8, w: 20};
    let scale = {x: (tilesize.w/4)*1/50, y: (tilesize.h/4)*1/50};
    let nooftilesinrow = wall.w/tilesize.w;
    let nooftilesincol = wall.h/tilesize.h;
    wall.x += tilesize.w/2;
    wall.y += tilesize.h/2;
    for(let i=0; nooftilesincol>i; i++){
        for(let j=0; nooftilesinrow>j; j++){
    addGeos.dungeonParts.push(
    {name: "Wall_Modular.fbx", position: {x: wall.x+j*tilesize.w, y: wall.y+i*tilesize.h, z: 252}, rotation: {},scale: {x: scale.x, y: scale.y},  object:"Wall_Modular.fbx"},
    );//EO push
        }
    }//EO for
    })();
    
    
    
    
   //wall FE side 1
    (function(){
    let wall = {w: 12, h: 8, y: 0, x: -24};
    let tilesize = {h: 8, w: 12};
    let scale = {x: (tilesize.w/4)*1/50, y: (tilesize.h/4)*1/50};
    let nooftilesinrow = wall.w/tilesize.w;
    let nooftilesincol = wall.h/tilesize.h;
    wall.x += tilesize.w/2;
    wall.y += tilesize.h/2;
    for(let i=0; nooftilesincol>i; i++){
        for(let j=0; nooftilesinrow>j; j++){
    addGeos.dungeonParts.push(
    {name: "Wall_Modular.fbx", position: {x: wall.x+j*tilesize.w, y: wall.y+i*tilesize.h, z: 252+36}, rotation: {},scale: {x: scale.x, y: scale.y},  object:"Wall_Modular.fbx"},
    );//EO push
        }
    }//EO for
    })();
    
   //wall FE side 2
    (function(){
    let wall = {w: 12, h: 8, y: 0, x: 12};
    let tilesize = {h: 8, w: 12};
    let scale = {x: (tilesize.w/4)*1/50, y: (tilesize.h/4)*1/50};
    let nooftilesinrow = wall.w/tilesize.w;
    let nooftilesincol = wall.h/tilesize.h;
    wall.x += tilesize.w/2;
    wall.y += tilesize.h/2;
    for(let i=0; nooftilesincol>i; i++){
        for(let j=0; nooftilesinrow>j; j++){
    addGeos.dungeonParts.push(
    {name: "Wall_Modular.fbx", position: {x: wall.x+j*tilesize.w, y: wall.y+i*tilesize.h, z: 252+36}, rotation: {},scale: {x: scale.x, y: scale.y},  object:"Wall_Modular.fbx"},
    );//EO push
        }
    }//EO for
    })();
    
    
    
    
   //wall FE side 1
    (function(){
    let wall = {w: 8, h: 8, y: 0, x: -12};
    let tilesize = {h: 8, w: 8};
    let scale = {x: (tilesize.w/4)*1/50, y: (tilesize.h/4)*1/50};
    let nooftilesinrow = wall.w/tilesize.w;
    let nooftilesincol = wall.h/tilesize.h;
    wall.x += tilesize.w/2;
    wall.y += tilesize.h/2;
    for(let i=0; nooftilesincol>i; i++){
        for(let j=0; nooftilesinrow>j; j++){
    addGeos.dungeonParts.push(
    {name: "Wall_Modular.fbx", position: {x: wall.x+j*tilesize.w, y: wall.y+i*tilesize.h, z: 252+48}, rotation: {},scale: {x: scale.x, y: scale.y},  object:"Wall_Modular.fbx"},
    );//EO push
        }
    }//EO for
    })();
    
   //wall FE side 2
    (function(){
    let wall = {w: 8, h: 8, y: 0, x: 4};
    let tilesize = {h: 8, w: 8};
    let scale = {x: (tilesize.w/4)*1/50, y: (tilesize.h/4)*1/50};
    let nooftilesinrow = wall.w/tilesize.w;
    let nooftilesincol = wall.h/tilesize.h;
    wall.x += tilesize.w/2;
    wall.y += tilesize.h/2;
    for(let i=0; nooftilesincol>i; i++){
        for(let j=0; nooftilesinrow>j; j++){
    addGeos.dungeonParts.push(
    {name: "Wall_Modular.fbx", position: {x: wall.x+j*tilesize.w, y: wall.y+i*tilesize.h, z: 252+48}, rotation: {},scale: {x: scale.x, y: scale.y},  object:"Wall_Modular.fbx"},
    );//EO push
        }
    }//EO for
    })();
    
    
    
    
    
    addGeos.dungeonParts.map((part, index)=>{
        if(part.object == null){
            part.model = new ModelLoader.FBXLoader(window.addrs.res2+"/C-3JS/sprites/3d/dungeon/FBX/"+ part.name);
            part.model.onload = function(){
                find(addGeos.dungeonParts, (p)=>p.object===part.name, (partClone)=>{
                    
                    if(partClone !== undefined){
                        console.log("...cloning geo")
                        partClone.model = {};
                        partClone.model.object = part.model.object.clone();
                        onLoad(partClone);
                    }//EO if undefined
                });//EO find
                onLoad(part);
            };
        }
        function onLoad(part_){ 
            part_.object = part_.model.object;
            part_.object.position.set( 0, 0, -200.123);
            part_.object.scale.x *= 1/50;
            part_.object.scale.y *= 1/50;
            part_.object.scale.z *= 1/50;
            part_.object.position.x = 0;
            part_.object.position.z = 300;
            //part_.object.rotation.y += Math.PI/2.5;
            if(part_.position.z!==undefined)
            part_.object.position.z = part_.position.z;
            if(part_.position.y!==undefined)
            part_.object.position.y = part_.position.y;
            if(part_.position.x!==undefined)
            part_.object.position.x = part_.position.x;
            if(part_.rotation.z!==undefined)
            part_.object.rotation.z = part_.rotation.z;
            if(part_.rotation.y!==undefined)
            part_.object.rotation.y = part_.rotation.y;
            if(part_.rotation.x!==undefined)
            part_.object.rotation.x = part_.rotation.x;
            if(part_.scale.z!==undefined)
            part_.object.scale.z = part_.scale.z;
            if(part_.scale.y!==undefined)
            part_.object.scale.y = part_.scale.y;
            if(part_.scale.x!==undefined)
            part_.object.scale.x = part_.scale.x;
            
            
            
            //part_.hide = (part_.type!="floor"?true:false);
            console.log(part_.hide, part_.type);
            if(part_.hide) return;
            scene.add(part_.object);
            part_.inscene = true;
        }
        function find(arr, cond, result){
            let arrFound = [];
            arr.map((value)=>{
                if(cond(value))arrFound.push(value);
            });
            arrFound.map((v)=> {result(v);});
        }
    })//EO
    
    
    
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
        addGeos.skeleton.rotation.y += Math.PI/2;
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
    
    
    
    
    
    
    
    //BO heroModel
    let heroModel =  new ModelLoader.FBXLoader(window.addrs.res2+"/C-3JS/sprites/3d/hero/"+ "hero.fbx");
    console.log("-----      ", window.addrs.res2+"/C-3JS/sprites/3d/hero/"+ "hero.fbx");
    heroModel.onload = function(){  
        addGeos.hero = heroModel.object;
        addGeos.hero.position.set( 0, 1, -200.123);
        addGeos.hero.scale.x *= 1/150;
        addGeos.hero.scale.y *= 1/150;
        addGeos.hero.scale.z *= 1/150;
        addGeos.hero.position.x = +0;
        addGeos.hero.position.z = 275+20;
        addGeos.hero.rotation.y += Math.PI;//-Math.PI/2;
        scene.add(addGeos.hero);
        console.log("hero...", addGeos.hero);
        var names = "hero: ";
        addGeos.hero.animations.map((animation, index)=>{
            names += "    {  "+index+": "+animation.name+"  }     ";
        });
        console.log(names);
        //BO add animation
        addGeos.hero.animationMixer = new THREE.AnimationMixer(addGeos.hero);
        addGeos.hero.animationMixer.timeScale *= 50;
        //idleAction
        addGeos.hero.idleAction = addGeos.hero.animationMixer
        .clipAction(addGeos.hero.animations[3]);
        //runDownAction
        addGeos.hero.runDownAction = addGeos.hero.animationMixer
        .clipAction(addGeos.hero.animations[3]);//1
        //runUpAction
        addGeos.hero.runUpAction = addGeos.hero.animationMixer
        .clipAction(addGeos.hero.animations[6]);//6
        //hit1Action
        addGeos.hero.hit1Action = addGeos.hero.animationMixer
        .clipAction(addGeos.hero.animations[7]);
        //setAction
        let actionsQ = [];
        addGeos.hero.animationMixer.addEventListener('finished',()=>{
            actionsQ[0].stop();
            actionsQ[0].reset();
            actionsQ.shift();
            if(actionsQ.length>=1){
                addGeos.hero.activeAction = actionsQ[0];
                addGeos.hero.activeAction.clampWhenFinished = true;
                addGeos.hero.activeAction.setLoop(THREE.LoopOnce);
                addGeos.hero.activeAction.play();
            }
        });
        addGeos.hero.setAction = function(action){
            if(actionsQ.length<1){
                addGeos.hero.activeAction = action;
                addGeos.hero.activeAction.clampWhenFinished = true;
                addGeos.hero.activeAction.setLoop(THREE.LoopOnce);
                addGeos.hero.activeAction.play();
            }
            actionsQ.push(action);
        }//EO setAction.
        addGeos.hero.setAction(addGeos.hero.idleAction);
        
        
        
        console.log("mixer...");
    }
    
    
    
    
    //BO hero2Model
    let hero2Model =  new ModelLoader.FBXLoader(window.addrs.res2+"/C-3JS/sprites/3d/SaxonWarrior/"+ "LowPolySaxonSoldier.fbx");
    console.log("-----      ", window.addrs.res2+"/C-3JS/sprites/3d/SaxonWarrior/"+ "LowPolySaxonSoldier.fbx");
    hero2Model.onload = function(){  
        addGeos.hero2 = hero2Model.object;
        addGeos.hero2.position.set( 0, 1, -200.123);
        addGeos.hero2.scale.x *= 1/25;
        addGeos.hero2.scale.y *= 1/25;
        addGeos.hero2.scale.z *= 1/25;
        addGeos.hero2.position.x = +5;
        addGeos.hero2.position.z = 275;
        addGeos.hero2.rotation.y += -Math.PI/2;
        addGeos.hero2.resourcePath = (window.addrs.res2+"/C-3JS/sprites/3d/SaxonWarrior/");
        scene.add(addGeos.hero2);
        console.log("hero2...", addGeos.hero2);
        var names = "hero2: ";
        addGeos.hero2.animations.map((animation, index)=>{
            names += "  |"+index+": "+animation.name;
        });
        console.log(names);
        //   |0: Armature|Run  |1: Armature|Walk  |2: Armature|Idle  |3: Body|Idle  |4: Armature|ArmatureAction  |5: Body|tempAttackStance  |6: Armature|hurt  |7: Armature|death  |8: Armature|tempAttackStance  |9: Armature|stab
    }
    
    
    
    
    
    
    /*
    let NinjaModel =  new ModelLoader.FBXLoader(window.addrs.res2+"/C-3JS/sprites/3d/Ninja/"+ "Ninja rigged.fbx");
    NinjaModel.onload = function(){
        addGeos.Ninja = NinjaModel.object;
        addGeos.Ninja.position.set( 0, 0, -200.123);
        addGeos.Ninja.scale.x *= 1/120;
        addGeos.Ninja.scale.y *= 1/120;
        addGeos.Ninja.scale.z *= 1/120;
        addGeos.Ninja.position.x = 0;
        addGeos.Ninja.position.z = 275+10;
        addGeos.Ninja.rotation.y += Math.PI;
        scene.add(addGeos.Ninja)
        console.log("Ninja...", addGeos.Ninja)
        //BO add animation
        const mixer = new THREE.AnimationMixer(addGeos.Ninja);
        mixer.clipAction(addGeos.Ninja.animations[2]).play();
        addGeos.Ninja.animationMixer = mixer;
        console.log("mixer...")
    }
    */
    
    
    
    
    
    
    
    let skyBoxProps = {topColor: "#333344", bottomColor: "#000000"} 
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
    
    
    
    
    
    
    
    
    
    
    
    
}//EO addGeos


