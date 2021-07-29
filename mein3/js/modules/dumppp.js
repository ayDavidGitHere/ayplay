
class CustomSinCurve extends THREE.Curve {
	constructor( scale = 1 ) {
		super();
		this.scale = scale;
	}
	getPoint( t, optionalTarget = new THREE.Vector3() ) {
		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;
		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
	}
}
    const path = new CustomSinCurve( 100 );
    const geometry = new THREE.TubeGeometry( path, 100, 2, 8, false );
    const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
    venue_tube = new THREE.Mesh( geometry, material );
    venue_tube.position.set(0, 50, 0); 
    venue_tube.rotation.set(10, 10, 10)
    scene.add( venue_tube );
    
    
    
    
    
    
    
    
    
    
function createText(text_3d){
    
    
    var movingText;
    var textGeometry;
    text_3d = text_3d.toUpperCase();
    var arr_text_3d = text_3d.split("");
    
    
    const fontLoader = new THREE.FontLoader();
    fontLoader.load('http://localhost:8080/res/js/threejs/fonts/helvetiker_regular.typeface.json', function(font){
        
        var texture = new THREE.CanvasTexture(twoD.a);  
        texture.wrapS = texture.wrapT
        //= THREE.ClampToEdgeWrapping;
        =THREE.RepeatWrapping;
	    texture.repeat.set( 0.05, 0.05 );
        //alert(getAll$Properties(texture));
        var materialColor = ["#000837", "#2D0011", "#1E031C", "#002300"][Math.floor(Math.random()*4)];
        var wireMaterial = new THREE.MeshPhongMaterial({
            //map: texture,
            color: materialColor,
            //wireframe: true,
        });
	    var materialArray = 
	    [ wireMaterial, wireMaterial, wireMaterial, wireMaterial ];
	    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
	    
	    var textPosition = {    x: -50, y:-50, z:0    };
	    var textWidthSum = 0;
        arr_text_3d.map(function(character, ind){
	    textGeometry = new THREE.TextGeometry( text_3d[ind], {
		    font: font,
		    size: 30,
		    height: 5,
		    curveSegments: 6,
		    bevelEnabled: true,
		    bevelThickness: 4,
		    bevelSize: 3,
		    bevelOffset: 0,
		    bevelSegments: 6
	    });
        movingText = new THREE.Mesh(textGeometry, textMaterial);
        movingText.
        position.set(textPosition.x, textPosition.y, textPosition.z);
        movingText.geometry.center();
        //movingText.rotation.z = Math.PI/(Math.random()*4)/4;
        movingText.rotation.y = +(Math.PI/(Math.random()*4))/4;
        movingText.rotation.x = -(Math.PI/(Math.random()*4))/4;
        scene.add(movingText);
	    arr_movingChar.push({mesh: movingText, disp: {rot: 45}})
        
	    var textGeom = movingText.geometry;
	    textGeom.computeBoundingBox();
	    var textWidth = 
	    textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
	    textPosition.x += textWidth;
	    textWidthSum += textWidth;
        })//EO map
        arr_movingChar.map(function(val){
            val.mesh.position.x -= -(0 - textPosition.x)/4;
        });
    });//fontLoader
    
    
    return movingText;
    }
    
    

    
    
    
    
    
    
    
    
    
    