    
    
    var animIndex = 2;
    var anim2;
    
    
    
    
    
    function runningPerson(rotCondition, sW, sH,bodyPosX = sW/5, bodyPosY_init = sH/2, bodyCol ="#af6e51" ){
        
          //style
          style.c("square")
          
          //scale person
          b.setTransform(1, 0, 0, 1, 0, 0);
          var scalPersonX = 1; var scalPersonY = 1
          b.translate( (1-scalPersonX)*(sW/2), (1-scalPersonY)*(sH/4) );
          b.scale(scalPersonX, scalPersonY);
            

    
          var returnAnim = 0;
    if(arL[animIndex].S == "end" || arL[animIndex+2].S == "end" ){
        if(rotCondition)animIndex = animIndex+2;
    }
    if(animIndex %4 == 0){  animMulti = -1;  returnAnim = 1.2 }
    else{   animMulti = 1;  returnAnim = 0;  }
    
    
    /*
    if( arL[200+mbtInd].S == "end" ){
        mbtMulti *= -1;
        if(mbtMulti == 1){
            mbtYes = false;
            mbtInd= 0;
            mbtFrom = 0;
            arL[200] = {I:0, S:"waiting"}
            arL[201] = {I:0, S:"waiting"};
        }
        else if(mbtMulti == -1){   
              mbtInd += 1;
              mbtFrom = sH/2;
        }
    }//EO if
    */
    
    
var anim1 = 1-anim(1, 10, 7000, 0)/10000;
anim2= 
returnAnim+(anim(animIndex, 0.75, 120, animIndex-2, "linear")/100)*animMulti;
var anim3 =   1.2-anim2; 

var anim199= anim(199, 10, 500, 0);
var moveByTouchY = 0;  /*
moveByTouchY =
(mbtYes)?
(mbtFrom+anim(200+mbtInd, 0.0625, sH/2, 200-1+mbtInd, "linear")*mbtMulti):0;

bodyDist = bodyDist+1//for clouds
txt("1pt font4", ""+mbtInd+"; "+mbtYes+"; "+mbtMulti+"; "+moveByTouchY, sW/10, sH/2, 0, 1000)
         */
        
        
        
        
        
        
        
        
        
        
        
        
    bodyWidth = sH/12; bodyLength = sH/7;
    
    bodyPosY = bodyPosY_init+anim2*5-moveByTouchY;
    //style.c("round")
      
    
    
    
    
    
    
        
    
    style.c("round")
    arm2Col = ("#af6e51"); arm2Width = sH/22; arm2Length = sH/7.5;
    arm2PosX = bodyPosX; arm2PosY = bodyPosY
    rotArm2 =  anim2*2;   
    transRotArm2X = arm2PosX;
    transRotArm2Y = arm2PosY;
         b.save()
         b.translate(transRotArm2X, transRotArm2Y);
         b.rotate(rotArm2);
         b.translate(-transRotArm2X, -transRotArm2Y);
    shadow.m(-0.2, 0.2, "black", sH/30)
    singleL(arm2PosX, arm2Length,arm2PosY, 0, arm2Col, arm2Width);
    shadow.r()
         //use restore for performance
         b.restore()
         //b.setTransform(1, 0, 0, 1, 0, 0);
       
    var rotArm2Modulus = rotArm2%6.3
         var arm2FullPosX = arm2PosX+ Math.cos(rotArm2Modulus)*arm2Length;
         var arm2FullPosY = arm2PosY+ Math.sin(rotArm2Modulus)*arm2Length;
         
    forearm2PosX = arm2FullPosX;
    forearm2PosY = arm2FullPosY;
    forearm2Length = sH/7.5;  forearm2Width =sH/25;
    rotforearm2 =  rotArm2-0.5;   
    transRotforearm2X = forearm2PosX;
    transRotforearm2Y = forearm2PosY;
         b.save()
         b.translate(transRotforearm2X, transRotforearm2Y);
         b.rotate(rotforearm2);
         b.translate(-transRotforearm2X, -transRotforearm2Y);
    shadow.m(0, 0.2, "black", sH/30)
    singleL(forearm2PosX, forearm2Length, forearm2PosY, 0, arm2Col, forearm2Width)
    shadow.r()
         
         b.restore()
         //b.setTransform(1, 0, 0, 1, 0, 0);
        
    
        
        
         
    leg2Col = ("#af6e51"); leg2Width = sH/20; leg2Length = sH/7.5;
    leg2PosX = bodyPosX; leg2PosY = bodyPosY+bodyLength
    rotleg2 =  -anim3+1.6;   
    transRotleg2X = leg2PosX;
    transRotleg2Y = leg2PosY;
         b.save()
         b.translate(transRotleg2X, transRotleg2Y);
         b.rotate(rotleg2);
         b.translate(-transRotleg2X, -transRotleg2Y);
    shadow.m(-0.2, 0.2, "black", sH/30)
    singleL(leg2PosX, leg2Length,leg2PosY, 0, leg2Col, leg2Width);
    shadow.r()
         
         b.restore()
         //b.setTransform(1, 0, 0, 1, 0, 0);
       
    var rotleg2Modulus = rotleg2%6.3
         var leg2FullPosX = (leg2PosX+ Math.cos(rotleg2Modulus)*leg2Length);
         var leg2FullPosY = (leg2PosY+ Math.sin(rotleg2Modulus)*leg2Length);
         
    foreleg2PosX = leg2FullPosX;
    foreleg2PosY = leg2FullPosY;
    foreleg2Length = sH/7.5;  foreleg2Width =sH/22;
    rotforeleg2 =  1.6+anim3;//rotleg2;   
    transRotforeleg2X = foreleg2PosX;
    transRotforeleg2Y = foreleg2PosY;
         b.save()
         b.translate(transRotforeleg2X, transRotforeleg2Y);
         b.rotate(rotforeleg2);
         b.translate(-transRotforeleg2X, -transRotforeleg2Y);
    shadow.m(0, 0.2, "black", sH/30)
    singleL(foreleg2PosX, foreleg2Length, foreleg2PosY, 0, leg2Col, foreleg2Width)
    shadow.r()
         
         b.restore()
         //b.setTransform(1, 0, 0, 1, 0, 0);

         
         
         
        
        
        
        
        
        
        //head
    style.c("square");
        shadow.m(-0.1, 0.1, "black", 10);
    singleL(bodyPosX, 0, bodyPosY-sH/20, -sH/20, bodyCol, sH/20);
    singleL(bodyPosX, 0, bodyPosY, -sH/15, bodyCol, sH/60);
        shadow.r()
        //torso
    style.c("round")
    singleL(bodyPosX, 0, bodyPosY, bodyLength, bodyCol, bodyWidth);
     
    
    
    
    
    
    
    
    style.c("round")
    legCol = ("#af6e51"); legWidth = leg2Width; legLength =leg2Length;
    legPosX = bodyPosX; legPosY = bodyPosY+bodyLength
    rotleg =  -anim2+1.6;   
    transRotlegX = legPosX;
    transRotlegY = legPosY;
         b.save()
         b.translate(transRotlegX, transRotlegY);
         b.rotate(rotleg);
         b.translate(-transRotlegX, -transRotlegY);
    shadow.m(-0.2, 0.2, "black", sH/30)
    singleL(legPosX, legLength,legPosY, 0, legCol, legWidth);
    shadow.r()
         
         b.restore()
         //b.setTransform(1, 0, 0, 1, 0, 0);
       
    var rotlegModulus = rotleg%6.3
         var legFullPosX = (legPosX+ Math.cos(rotlegModulus)*legLength);
         var legFullPosY = (legPosY+ Math.sin(rotlegModulus)*legLength);
         
    forelegPosX = legFullPosX;
    forelegPosY = legFullPosY;
    forelegLength = foreleg2Length;  forelegWidth =foreleg2Width;
    rotforeleg =  1.6+anim2;   
    transRotforelegX = forelegPosX;
    transRotforelegY = forelegPosY;
         b.save()
         b.translate(transRotforelegX, transRotforelegY);
         b.rotate(rotforeleg);
         b.translate(-transRotforelegX, -transRotforelegY);
    shadow.m(0, 0.2, "black", sH/30)
    singleL(forelegPosX, forelegLength, forelegPosY, 0, legCol, forelegWidth)
    shadow.r()
         
         b.restore()
         //b.setTransform(1, 0, 0, 1, 0, 0);

         
    
    
    
    
    
    armCol = ("#af6e51"); armWidth = arm2Width; armLength = arm2Length;
    armPosX = bodyPosX; armPosY = bodyPosY
    rotArm =  -anim2*2+3.2;   
    transRotArmX = armPosX;
    transRotArmY = armPosY; 
         b.save()
         b.translate(transRotArmX, transRotArmY);
         b.rotate(rotArm);
         b.translate(-transRotArmX, -transRotArmY);
    shadow.m(-0.2, 0.2, "black", sH/30)
    singleL(armPosX, armLength,armPosY, 0, armCol, armWidth);
    shadow.r()
         
         b.restore()
         //b.setTransform(1, 0, 0, 1, 0, 0);
       
    var rotArmModulus = rotArm%6.3
         var armFullPosX = armPosX+ Math.cos(rotArmModulus)*armLength;
         var armFullPosY = armPosY+ Math.sin(rotArmModulus)*armLength;
         
    forearmPosX = armFullPosX;
    forearmPosY = armFullPosY;
    forearmLength = forearm2Length;  forearmWidth =forearm2Width;
    rotforearm =  rotArm-0.5;   
    transRotforearmX = forearmPosX;
    transRotforearmY = forearmPosY;
         b.save()
         b.translate(transRotforearmX, transRotforearmY);
         b.rotate(rotforearm);
         b.translate(-transRotforearmX, -transRotforearmY);
    shadow.m(0, 0.2, "black", sH/30)
    singleL(forearmPosX, forearmLength, forearmPosY, 0, armCol, forearmWidth)
    shadow.r()
         
         b.restore()
         //b.setTransform(1, 0, 0, 1, 0, 0);
        
        
        
        
        
        
         
         /*
          b.translate(-(1-scalPersonX)*(sW/2)+20,-(1-scalPersonY)*(sH/4)-20 );
          b.scale(1/scalPersonX, 1/scalPersonY); */
         
         b.restore()
         //b.setTransform(1, 0, 0, 1, 0, 0);
         //end scale person
         
        }
        runningPerson();
         