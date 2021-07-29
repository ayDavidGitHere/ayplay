var ModelLoader = (function(scene){



    var loadFbxModel;
    var loadObjMtlModel;
                var ambientLight = new THREE.AmbientLight( "white" );
                scene.add( ambientLight );
                var spotLight = new THREE.SpotLight (0xff7979);
                spotLight.position.set(2, 2, 5);
                spotLight.target.position.set(2, 0, 4);
                scene.add( spotLight )
                var dLight = new THREE.DirectionalLight( 0xffffff );
                dLight.position.set( 1, 1, 1 );
                scene.add( dLight );
                var dirLight = new THREE.DirectionalLight( 0xffffff );
                dirLight.position.set( -500, -500, -1 );
                scene.add( dirLight );
        
  
        


    loadFbxModel = (function(){
        try{
        asset_path = "http://localhost:8080/res/sprites/3d/75-low-poly-buildings/"
        asset_name_fbx = "low-poly-buildings.fbx";
        asset_path = "http://localhost:8080/res/sprites/3d/bikini-beach-girl-fbx/";
        asset_name_fbx = "bikini-beach-girl.fbx";
        asset_path = "http://localhost:8080/res/sprites/3d/Low_Poly_Cars_DevilsWorkShop_V02/FBX%202013/"
        asset_name_fbx ="Low_Poly_Vehicles_bus.fbx";
        
        
        
        
        var fbxLoader = new THREE.FBXLoader();
        //fbxLoader.setPath(asset_path);
        fbxLoader.load(asset_path+""+asset_name_fbx,
            function (object) { names = "names= "; anims ="anims= "
                object.traverse( function(child) {
                    if(child instanceof THREE.Mesh) child.geometry.computeVertexNormals();
                    if(child.isBone) alert(child.name);
                    //if(child.name =="Body"){    boner = child;  }
                    names+=child.name+"; "; anims += child.animations+"; "
                });
                
                //alert(names); alert(anims);
            scene.add(object);
            movingFbxModel = object;
            movingFbxModel.scale.x *=0.2;
                movingFbxModel.scale.y *=0.2;
                movingFbxModel.scale.z *=0.2;
                alert("fbxLoader loaded; ");
            },
            function(ld){
                alert("fbxLoader  "+ (ld.loaded/ld.total*100) +"%")     
            },
            function(e){
                alert(" fbxLoader error; "+e+"; ");
        });
        }catch(e){  alert("loadFbxModelError: "+e);    }
    });
        
    loadObjMtlModel = (function(){
        try{
        asset_path = "http://localhost:8080/res/sprites/3d/terrain-first-obj/"
        asset_name = "terrain-first.obj"
        asset_name_mtl = "terrain-first.mtl"
        
        asset_path = "http://localhost:8080/res/sprites/3d/low-poly-fox-by-pixelmannen-obj/";
        asset_name = "low-poly-fox-by-pixelmannen.obj";
        asset_name_mtl = "low-poly-fox-by-pixelmannen.mtl";
        
        asset_path = "http://localhost:8080/res/sprites/3d/Low_Poly_Cars_DevilsWorkShop_V02/OBJ/"
        asset_name ="Low_Poly_Vehicles_bus.obj";
        asset_name_mtl ="Low_Poly_Vehicles_bus.mtl";
        
        asset_path = "http://localhost:8080/res/sprites/3d/low-poly-cars-3d-model/"
        asset_name = "Low%20Poly%20Cars%20Pack%201/OBJ/Taxi.obj"
        asset_name_mtl = "Low%20Poly%20Cars%20Pack%201/OBJ/Taxi.mtl"
        
        asset_path = "http://localhost:8080/res/sprites/3d/uh-60-blackhawk-helicopter-obj/"
        asset_name = "uh-60-blackhawk-helicopter.obj"
        asset_name_mtl = "uh-60-blackhawk-helicopter.mtl"

        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath(asset_path);  
        mtlLoader.load(asset_name_mtl, function(materials){  
            materials.preload();  
            var manager = new THREE.LoadingManager();
            manager.onProgress = function(item, loaded, total){
                alert("manager progress; "+item, loaded, total);
            };
            manager.onLoad = function() {
                alert("manager loaded;");
            };
            manager.onError = function(e) {
                alert("manager error:"+" "+e);
            };
            
            
            var objLoader = new THREE.OBJLoader(manager);
            objLoader.crossOrigin = true; 
            objLoader.setMaterials(materials);
            objLoader.setPath(asset_path);
            objLoader.load(asset_name,
            function (object) {
                object.traverse( function(child) {
                    if(child instanceof THREE.Mesh) child.geometry.computeVertexNormals();
                }); 
                scene.add(object);
                movingObjModel = object; 
                movingObjModel.scale.x *=5;
                movingObjModel.scale.y *=5;
                movingObjModel.scale.z *=5;
                alert("objLoader loaded; ");
            },
            function(ld){
                alert("objLoader  "+ (ld.loaded/ld.total*100) +"%")     
            },
            function(e){
                alert(" objLoader error; "+e+"; ");
                //alert(getAll$Properties(e.message))
            });
        });//EO mtlLoader
        }catch(e){      alert("loadFbxModelError: "+e)      }
    });
        
        
    


    return {loadFbxModel:loadFbxModel, loadObjMtlModel:loadObjMtlModel}
});//EO ModelLoader