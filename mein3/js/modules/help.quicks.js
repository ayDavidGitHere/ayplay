    
function Quicks(){
    
    
    return{
    font: "waiting",
    loadFont: function(loaderCallback){ 
        const context = this;
        const fontLoader = new THREE.FontLoader();
        fontLoader.load('http://localhost:8080/res/js/threejs/fonts/helvetiker_regular.typeface.json', function(font){
            context.font = font;
            loaderCallback()
        });//fontLoader
    }
    ,
    createText: function(text_3d){
        var ctx = this;
        var movingText;
        var textGeometry;
        var text_3d = text_3d;
    
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
	    textGeometry = new THREE.TextGeometry( text_3d, {
		    font: this.font,
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
        movingText.geometry.center();
	   
	    var textGeom = movingText.geometry;
	    textGeom.computeBoundingBox();
	    var textWidth = 
	    textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
    
        return movingText;
    }//EO createText
    
    
    }//EO return
    
    
    
}//EO quicks