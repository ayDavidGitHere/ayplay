
    
    
    
    
    
    
    
    




const color = "blue";
const intensity = 20;
const width = 100;
const height = 50;
const rectAtLight = new THREE.RectAreatLight(color, intensity, width, height);
rectAtLight.position.set(-170+50+20, 50+15+30, -105-25);
//rectAtLight.rotation.x = convDegRad(-90);
scene.add(rectAtLight);
    
    

    
    
    
    /*
    //MBA
    blocks.MBA = geosCustom.createBLK( [50, MB.height, 100], [-170, START_HEI, -105], "blocks_MBA" );
    //E1A
    blocks.E1A = geosCustom.createBLK( [40, E1.height, 50], [-170+50, START_HEI, -105] , "blocks_E1A");
    //MBB
    blocks.MBB = geosCustom.createBLK( [50, MB.height, 100], [-170+90, START_HEI, -105], "blocks_MBB" );
    //MBC
    blocks.MBC = geosCustom.createBLK( [290, MB.height, 100], [-170, START_HEI, -105-100], "blocks_MBC");
    //BRDG
    blocks.BG = geosCustom.createBLK( [30, BG.height, 50], [-170+200, START_HEI+MB.height-BG.height, -105-50], "blocks_BG" );
    //MBD
    blocks.MBD = geosCustom.createBLK( [80, MB.height, 50], [-170+200, START_HEI, -105], "blocks_MBD" );
    blocks.HIGHA = geosCustom.createBLK( [20, MB.height*2, 20], [-170+290-20, GROUND_FLOOR_HEI, -105-210+20+10] , "blocks_HIGHA");
    
    
    //ramps_rA
    ramps.rA = geosCustom.createRamp([40, 15, 50], [-170+50, START_HEI+15, -105-50], "ramps_rA", {"orient": [0, 1, 1]});
    //ramps.rA.material.color.set("slateblue");
    
    //ramps_rB
    ramps.rB = geosCustom.createRamp([40, 15, 50], [-170+50, GROUND_FLOOR_HEI+0, -105-50], "ramps_rB", {"orient": [-1, -2, 0]});
    ramps.rB.material.color.set(GEN_GEO_COLOR);;
    
    
    //ramps_rC
    ramps.rC = geosCustom.createRamp([20, 12, 30], [-170+200, GROUND_FLOOR_HEI+20, -105], "ramps_rB", {"orient": [1, 0, 0]});
    ramps.rC.material.color.set(GEN_GEO_COLOR);
    
    
    
    
    
    //orbsA
    orbs.A = 
    geosCustom.createOrb( [15, 30, 30], [-170+180+20, GROUND_FLOOR_HEI+15+100, -105-100-50], "orbs_A", {type: "IcosahedronGeometry", add: true});
    
    //tubeA
    tubes.A =
    geosCustom.createTube( [10, 20, 3, 8, false], [100, GROUND_FLOOR_HEI+20,  -105-25], "tube", {type: "Bridge"}); 
    //tubes.A.rotation.x-= Math.PI;
    */
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

$("#solve").click(
    function() {
        drawPolygon(pointsArray);
    }
);

/// <summary>
/// Draw a polygon in an array of coordinates.
/// </summary>
/// <param name="points">The coordinate array.</param>
function drawPolygon(points) {
    //check arguments for null values
    if(!points)
        return false;

    //store the upper-left point, it should be excluded when we sort our array
    var upper = getUpperLeft(pointsArray);

    //sort the array first so we can draw a clockwise polygon
    points.sort(pointSortDelegate);

    //debug
    //console.log(points);

    //draw the lines
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for(var i = 0; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y);
    }
    context.strokeStyle = "#F00";
    context.closePath();
    context.stroke();

    /// <summary>
    /// A custom sorting delegate that sorts point1 and point 2 based on their slope
    /// formed when a "line" is drawn from itself to the "upper-left" line.
    /// </summary>
    /// <param name="point1">The first point</param>
    /// <param name="point2">The second point</param>
    /// <returns>Sorting order of point1 or point2</returns>
    function pointSortDelegate(point1, point2) {

        //the upper point should be excluded from sorting algorithm
        if(point1 === upper)
            return -1;
        if(point2 === upper)
            return 1;

        //find the slopes between point1 and point2, that is, if it were drawn through the upper point
        var m1 = upper.GetSlope(point1);
        var m2 = upper.GetSlope(point2);

        //if point1 and point2 form the same line towards upper
        if(m1 === m2) {
            //the point closest to the upper point will be first
            return point1.GetDistance(upper) < point2.GetDistance(upper) ? -1 : 1;
        }

        //if point1 is to the right of upper and point2 is to the left
        if(m1 <= 0 && m2 > 0)
            return -1;

        //if point2 is to the left of upper and point2 is to the right
        if(m1 > 0 && m2 <= 0)
            return 1;

        //if both slopes are either positive or negative
        return m1 > m2 ? -1 : 1;
    }
}
    
    
    
function Point(x, y) { //constructor
    //member variables
    this.x = x;
    this.y = y;

    //public methods
    this.GetDistance = function(that) {
        var dX = that.x - this.x;
        var dY = that.y - this.y;
        return Math.sqrt((dX*dX) + (dY*dY));
    }

    this.GetSlope = function(that) {
        var dX = that.x - this.x;
        var dY = that.y - this.y;
        return dY/dX;
    }
}


/// <summary>
/// Draws the dot and call the function to store the coordinate.
/// </summary>
/// <param name="e">The click event object</param>
function drawDot(e) {
    var position = getMousePosition(canvas, e);
    posx = position.x;
    posy = position.y;

    //keep a running list of coordinates
    storeCoordinate(posx, posy);

    //draw the dot
    context.fillStyle = "#F00";
    context.fillRect(posx-3, posy-3, 6, 6); //avoid drawing circles as it is more resource intensive
}

/// <summary>
/// Get the mouse position of the click relative to the canvas.
/// </summary>
/// <param name="c">The canvas object</param>
/// <param name="e">The click event object</param>
/// <returns>An object containing and 'x' and 'y' coordinate.</returns>
function getMousePosition(c, e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left, y: e.clientY - rect.top
    };
}

/// <summary>
/// Store the x and y coordinates in the myDotsArray object.
/// </summary>
/// <param name="xVal">The 'x' value of the coordinate</param>
/// <param name="yVal">The 'y' value of the coordinate</param>
function storeCoordinate(xVal, yVal) {
    pointsArray.push(new Point(xVal, yVal));
}

/// <summary>
/// Get the upper left point from a coordinates array.  In case of a tie, get the left most point.
/// </summary>
/// <param name="points">The coordinates array</param>
/// <returns>The upper left point</returns>
function getUpperLeft(points) {
    var top = points[0];

    //loop through the array and get the upper left most point
    for(var i = 1; i < points.length; i++) {
        var temp = points[i];
        if(temp.y > top.y || (temp.y == top.y && temp.x < top.x)) {
            top = temp;
        }
    }
    return top;
}
    
    
    
    
    
    
    
    
const tCamera = new THREE.PerspectiveCamera( 100, 1, 0.1, 2000 );

// Floor
const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
const floorMaterial = new THREE.MeshLambertMaterial({color : 'lawngreen'});
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.position.set(500, 0, 500);
floorMesh.receiveShadow = true;
floorMesh.rotation.x = - Math.PI / 2; 
scene.add(floorMesh);

tCamera.position.set(1000, 300, 1000);
tCamera.lookAt(floorMesh.position);

// Materials
const bulletMaterial = new THREE.MeshLambertMaterial( { color: 0x808080 } );
const wallMaterial = new THREE.MeshLambertMaterial( { color: 'firebrick' } );
//const playerTexture = new THREE.Texture(playerImage);
//playerTexture.needsUpdate = true;
//const playerMaterial = new THREE.MeshLambertMaterial({map: playerTexture});
const playerMaterial = new THREE.MeshLambertMaterial({color: "blue"});
const textMaterial = new THREE.MeshBasicMaterial({ color: 0xf39800, side: THREE.DoubleSide });
const nicknameMaterial = new THREE.MeshBasicMaterial({ color: 'black', side: THREE.DoubleSide });

// tLight
const tLight = new THREE.DirectionalLight(0xffffff, 1);
tLight.position.set(-100, 300, -100);
tLight.castShadow = true;
tLight.shadow.Camera.left = -2000;
tLight.shadow.Camera.right = 2000;
tLight.shadow.Camera.top = 2000;
tLight.shadow.Camera.bottom = -2000;
tLight.shadow.Camera.far = 2000;
tLight.shadow.mapSize.width = 2048;
tLight.shadow.mapSize.height = 2048;
scene.add(tLight);
const ambient = new THREE.AmbientLight(0x808080);
scene.add(ambient);




  /******************/
    let fontSize = CR/450*28;
    let firstText = 
    new CDraw.text("bold +*"+fontSize+"pt arial", "firzt Text", CW/2, CH/2, "_red", 1000)
    scene.add(firstText);
    
    let randomParticles = [];
    
    setTimeout(function() {
    CDraw.getOpaquePixels(0, CW, 0, CH, function(oPixelPosition){
    scene.remove(firstText);    console.log(oPixelPosition.length)
    oPixelPosition.map((val, ind)=>{
        var randmity = 1-590/oPixelPosition.length;
        var dispersionX = 30*CH/300;
        if(Math.random()> randmity){
        var particle = new CDraw.arc(
            val.x-dispersionX+Math.random()*dispersionX,
            CH/(1.5-Math.random()*0.5),
            CR/3000*(4+4/MHelp.randOpt(-2,+2,+2.5)),
            0, 6.3,
            "_blue");
        particle.destination = {x: val.x, y: val.y};
        particle.speed = (0.4+Math.random()*0.5)*CR/450;
        scene.add(particle);
        randomParticles.push(particle);
        }
    });
    update();
    })
    }, 500);

   
    function update(){
        //console.log(randomParticles[300].destination)
        randomParticles.map((particle, particleInd)=>{
            if(particle.x<particle.destination.x){  
                particle.x+=particle.speed/4;    }
            if(particle.x>particle.destination.x){  
                particle.x-=particle.speed/4;    }
            if(particle.y<particle.destination.y){  
                particle.y+=particle.speed;    }
            if(particle.y>particle.destination.y){  
                particle.y-=particle.speed;    }
        });
        
    requestAnimationFrame(update)
    }//EO updateFrame
    
    
    
    /*
    let dots = new Array(5);
    for(let ind=0; dots.length>ind; ind++){ 
        dots[ind] = new CDraw.arc(
            CW/10*MHelp.randOpt(1, 2, 3, 4, 5, 6, 7, 8, 9),
            CH/10*MHelp.randOpt(1, 2, 3, 4, 5, 6, 7, 8, 9),
            CR/3000*MHelp.randOpt(5, 15, 20, 10),
            0, 6.3,
            MHelp.randOpt("rgba(255, 255, 255, "+0.3+")") );
        dots[ind].moveDir = MHelp.randOpt(30, 60, 120, 150, 210, 240, 300, 330);
        dots[ind].modus = 0
        scene.add(dots[ind]);
        
    }
    
    
    let joiners = new Array(dots.length);
    dots.map((dot, ind)=>{
        joiners[ind] = []
        dots.map((others, othersInd)=>{
                joiners[ind].push({x: others.x, y: others.y})
        })
        joiners[ind].sort((a, b)=>{
            return MHelp.resultantOf(dot.x-a.x, dot.y-a.y) - MHelp.resultantOf(dot.x-b.x, dot.y-b.y)
        });
        
        let dotsProx1
        = MHelp.resultantOf(dot.x-joiners[ind][1].x, dot.y-joiners[ind][1].y);
        let joiner1 = 
        new CDraw.line(dot.x, joiners[ind][1].x, dot.y, joiners[ind][1].y, "white", 2*(1-dotsProx1/CW) );
        let dotsProx2
        = MHelp.resultantOf(dot.x-joiners[ind][2].x, dot.y-joiners[ind][2].y);
        let joiner2 = 
        new CDraw.line(dot.x, joiners[ind][2].x, dot.y, joiners[ind][2].y, "white", 2*(1-dotsProx2/CW) );
        
        scene.add(joiner1);
        scene.add(joiner2)
    })
    */
    /****************/
    

    
    
            if(crashObj.collisionRes[collidesInd].distance<= heroBall.my.radius){
                heroBall.position.y += (heroBall.my.radius-crashObj.collisionRes[collidesInd].distance)*Math.abs(normY)
                heroBall.position.x += (heroBall.my.radius-crashObj.collisionRes[collidesInd].distance)* -normX
                heroBall.position.z += (heroBall.my.radius-crashObj.collisionRes[collidesInd].distance)* -normZ
            //4 is heroball radius
            }//EO if