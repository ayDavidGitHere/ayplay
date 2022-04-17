     function GeosCustom(scene, collideMeshList, colorsObj){
     
     
     
    let GEN_GEO_COLOR = colorsObj.GEN_GEO_COLOR;
    let generalMaterial_Standard = new THREE.MeshStandardMaterial({ color: GEN_GEO_COLOR, metalness: 0.9, opacity: 0.45, transparent: false, side: THREE.DoubleSide });
    let generalMaterial_Lambert = new THREE.MeshLambertMaterial(
    { color: GEN_GEO_COLOR, opacity: 0.45, transparent: false, side: THREE.DoubleSide });
    let generalMaterial_Phong = new THREE.MeshPhongMaterial(
    { color: GEN_GEO_COLOR,  side: THREE.DoubleSide });
    let generalMaterial = generalMaterial_Phong;
    
    
    let setGeneralMaterial = function(genMaterial){
        generalMaterial = genMaterial;
    }
    
    
    let createBLK = function(dimen, posi, blockName){
    var widX = dimen[0], heiY = dimen[1], lenZ =dimen[2];
    var posX = posi[0], posY = posi[1], posZ = posi[2];
    let material = generalMaterial;
    //E2A
    var cuboidGeometry = new THREE.BoxGeometry(widX, heiY, lenZ);
    block = new THREE.Mesh( cuboidGeometry, material );    
    block.position.set(posX, posY, posZ);
    block.position.x += widX/2;
    block.position.y += heiY/2;
    block.position.z += lenZ/2; 
    scene.add( block );
        if(blockName != null){
            block.my = {name: blockName, type: "block"}
            collideMeshList.push(block)
        }
    return block;
    }
    
    
    
    
    
    
    
    
    
     
    //Ramp
    PrismGeometry = function ( vertices, height ) {
        var Shape = new THREE.Shape();
        ( function f( ctx ) {
            ctx.moveTo( vertices[0].x, vertices[0].y );
            for (var i=1; i < vertices.length; i++) {
                ctx.lineTo( vertices[i].x, vertices[i].y );
            }
            ctx.lineTo( vertices[0].x, vertices[0].y );
        } )( Shape );
        var settings = { };
        settings.amount = height;
        settings.bevelEnabled = false;
        THREE.ExtrudeGeometry.call( this, Shape, settings );
    };
    PrismGeometry.prototype= Object.create( THREE.ExtrudeGeometry.prototype );
    
    
    
    let createRamp = function(dimen, posi, rampName, settingsObj){
    var widX = dimen[0], heiY = dimen[1], lenZ =dimen[2];
    var posX = posi[0], posY = posi[1], posZ = posi[2];
    
    //ramp
    var A = new THREE.Vector2( 0, 0 );
    var B = new THREE.Vector2( 0, lenZ );
    var C = new THREE.Vector2( heiY, lenZ ); 
    var height = widX;        
    var geometry = new PrismGeometry( [ A, B, C ], height ); 
    var material = generalMaterial
    ramp = new THREE.Mesh( geometry, material );
    //default ramp orientation
    let orient = settingsObj.orient;
    let oX = orient[0]; let oY = orient[1]; let oZ = orient[2];
    oX = (oX+4)%4;    oY = (oY+4)%4;    oZ = (oZ+4)%4; 
    ramp.rotation.y = (-Math.PI/2)*orient[1]; 
    ramp.rotation.x = (-Math.PI/2)*orient[2]///Math.getSign(orient[1]);
    ramp.rotation.z = (-Math.PI/2)*orient[0]///Math.getSign(orient[1]); 
    ramp.position.set(
        posX
        +lenZ*Math.max(Math.cos(Math.PI/2*(oY)), 0 )
        +widX*Math.max(Math.sin(Math.PI/2*(oY)), 0 ) 
        ,
        posY,
        posZ
        +lenZ*Math.max(Math.cos(Math.PI/2*(oY+3)), 0)
        +widX*Math.max(Math.sin(Math.PI/2*(oY+3)), 0)
    );
    //don't know how the repositioning works but i derived it and it does
    scene.add( ramp );
    if(rampName != null){
        ramp.my = {name: rampName, type: "ramp", widX: widX, heiY: heiY, lenZ: lenZ, orientX: oX, orientY: oY, orientZ: oZ}
        collideMeshList.push(ramp)
    }
        
    return ramp;
    }
     
     
     
     
     
     
     
     
     
     
    //Orb
    let createOrb = function(dimen, posi, orbname, settingsObj){
    var radius = dimen[0], nV1 = dimen[1], nV2 =dimen[2];
    var posX = posi[0], posY = posi[1], posZ = posi[2];
    var ballGeometry = new THREE.SphereGeometry(radius, nV1, nV2);
    if(settingsObj.type = "IcosahedronGeometry"){
        ballGeometry = new THREE.IcosahedronGeometry(radius);
    }
    var wireMaterial = new THREE.MeshStandardMaterial({   wireframe: false,  color: GEN_GEO_COLOR,
        //specular: 0x00ffff, shininess: 50,
        opacity: 0.9,
        transparent: true
    });

      
    var orbBall = new THREE.Mesh(ballGeometry, wireMaterial);
    orbBall.position.set(posX, posY, posZ);

    scene.add(orbBall);
    
    
    if(settingsObj.add){
        orbBall.constructor.prototype.my = {name: orbname}
        collideMeshList.push(orbBall)
    }
    return orbBall;
    }
     
     
     
     
     
     
     
     
     
     
class CustomSinCurve extends THREE.Curve {
  constructor(scale, type) {
    super()
    this.type = type;
    this.scale = scale;
  }
  getPoint(t) {
    const tx = t * 3 - 1.5;
    const ty = Math.sin(2 * Math.PI * t);
    const tz = 2.0;
    if(this.type === "ZTUBE") return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
    if(this.type === "Bridge") return new THREE.Vector3(tx, Math.sin(Math.PI*t), tz).multiplyScalar(this.scale);
    alert(this.type)
  }
}//EO class CustomSinCurve
    
    
    
    //Tube
    let createTube = 
    function(dimen = [4, 20, 1, 8, false], posi, tubeName, settingsObj = {type: "ZTUBE"}){
        var path = new CustomSinCurve(dimen[0], settingsObj.type);
        var tubularSegments = dimen[1], radius =dimen[2], radialSegments = dimen[3], closed = dimen[4];
        var tubeGeometry = new THREE.TubeGeometry(path, tubularSegments, radius, radialSegments, closed);
        var wireMaterial = new THREE.MeshLambertMaterial({   wireframe: false,  color: GEN_GEO_COLOR,
            //specular: 0x00ffff, shininess: 50,
            opacity: 0.9,
            transparent: true
        });
        var tube = new THREE.Mesh(tubeGeometry, wireMaterial);
        tube.position.set(posi[0], posi[1], posi[2]);
        scene.add(tube);
    return tube;
    }
     
     
     
     
     
     
     
     return {
         createBLK: createBLK,
         createRamp: createRamp,
         createOrb: createOrb,
         createTube: createTube,
         setGeneralMaterial: setGeneralMaterial
     }
     }//EO all
     
     