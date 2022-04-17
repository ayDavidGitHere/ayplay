
let FBXLoader = function (modelUrl){
    let fbxLoader = new THREE.FBXLoader();
    let ctx = this;
    //let modelUrl =
    //window.addrs.res1+"/sprites/game-art/_3d/m1_and_pistol/"+"M1.fbx";
    //"http://localhost:8080/sprites/game-art/_3d/m1_and_pistol/"+"M1.fbx";
    console.log("FBXLoader", modelUrl);
    ctx.onload = function(){}
    ctx.onerror = function(){}
    fbxLoader.crossOrigin = true;
    fbxLoader.load(modelUrl,
        function(obj){
            //console.log("obj...");
            //console.log(obj);
            let bones = [];
            obj.traverse( function(child) {
                if(child instanceof THREE.Mesh) child.geometry.computeVertexNormals();
                if(child.isBone) bones.push(child.name);
                if(false && child instanceof THREE.SkinnedMesh){ 
                    console.log("skinnedmesh", child.name);
                    new THREE.Animation(child,child.geometry.animation).play();
                }
            });
            console.log(bones)
            ctx.object = obj;
            ctx.onload();
        },
        function(ld){
            //console.log("loading...");
            //console.log(ld);
        },
        function(err){
            //console.log("err...");
            //console.log(err);
            ctx.onerror();
        }
    )//EO fbxLoader
}//EO FBXLoader
    
    
    
let OBJLoader = function (modelUrl, materialUrl){
    let ctx = this;
    console.log(modelUrl);
    ctx.onload = function(){}
    ctx.onerror = function(){}
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.crossOrigin = true;
    mtlLoader.load(materialUrl, function(materials){  
            materials.preload();  
            var manager = new THREE.LoadingManager();
            manager.onProgress = function(item, loaded, total){
                //console.log("manager progress; "+item, loaded, total);
            };
            manager.onLoad = function() {
                //console.log("manager loaded;");
            };
            manager.onError = function(e) {
                //console.log("manager error:"+" "+e);
            };
            
            
            var objLoader = new THREE.OBJLoader(manager);
            objLoader.crossOrigin = true; 
            objLoader.setMaterials(materials);
            objLoader.load(modelUrl, function (object) {
                object.traverse( function(child) {
                    if(child instanceof THREE.Mesh) child.geometry.computeVertexNormals();
                }); 
                ctx.object = object;
                ctx.onload();
            },
            function(ld){
                //console.log(" objLoader  "+ (ld.loaded/ld.total*100) +"%");
            },
            function(e){
                //console.log(" objLoader error; "+e+"; ");
            });
        });//EO mtlLoader
}//EO OBJLoader

    /**
     * 
     * Seems to be xss buggy
     * 
     */
    
    
    
    
    
    
let ModelLoader = 
{
    FBXLoader: FBXLoader,
    OBJLoader: OBJLoader,
    
}//EO ModelLoader