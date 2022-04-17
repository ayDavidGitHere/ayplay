
Math.getSign = function(num){
    var sign = ((num<Math.abs(num))? -1:1)
    return sign
}

console.log ( Math.getSign(0) );



class Test  
{ 
  static prop = 3;
  static display1()  
  {  
    this.child = "child"
    return arguments[Math.floor(Math.random()*arguments.length)]
  }  
  static display2()  
  {  
    Test.child = "child"+this.child;  
  }
  static stc1 = function(){
      this.prp = 3;
  }
  static stc2 = function(){
      this.prp = 5;
  }
}
 
    
    Test["stc1"].prototype.newProp = "30";
    Test.stc2.prototype.newProp = "30";
    
    m = new Test.stc1(); //m.newProp = 5
    mm = new Test.stc1(); mm.newProp = 10;
    n = new Test.stc2(); n.newProp = 8;
    console.log(m.newProp, mm.newProp);//, n.newProp);
    
    
    
    

Tester = {
    glo: "glo",
    makeGlo: ()=>{
        this.glo = "glomake";
        console.log("makeGlo; "+this.glo)
    },
    
    arc: function(){
        Tester.makeGlo()
        return "arc; "+this.glo
    }
}
console.log(Tester.arc());

    // new Test.arc()
    //console.log(MHelp.clamp( 0, 1, -0.9));
    
    
    
/*
    function getResultantOf(x, y){
        return Math.sqrt( Math.pow(x, 2)+Math.pow(y, 2) )
    }
    
    
    //console.log(getResultantOf(-4, -3) )
    
    var dots = [{x:4, y:3}, {x:5, y:4}, {x:4, y:4}];
    var joiners = new Array(dots.length);
    dots.map((dot, ind)=>{
        joiners[ind] = []
        dots.map((others, othersInd)=>{
                joiners[ind].push({x: others.x, y: others.y})
        })
        joiners[ind].sort((a, b)=>{
            return getResultantOf(dot.x-a.x, dot.y-a.y) - getResultantOf(dot.x-b.x, dot.y-b.y)
        });
        console.log("sort dots closests to me")
        console.log(joiners[ind][0])
        console.log(joiners[ind][1])
    })
    
    */
    
    
    /*
    settings = {textPosition: "top"}
        settings.textPosition = ((settings.textPosition != "middle"||"left"||"right"||"top"||"bottom")?"middle":settings.textPosition)
    //console.log(settings.textPosition);
    
    function Middle(arg){
        if(!arg){
            return undefined;
        }
        this.mid = 3
    }
    Middle.prototype.medium = ()=>{
        
    }
    
    console.log(new Middle(false));
    */
    console.log("\n")
    function M(){
        this.meth = function(arg = "yee"){ console.log(arg); }
        this.prop = 3;
    }
    
function indexOfMinMax(arr) {
    if(arr.length===0){return -1;}
    var max = arr[0];var maxIndex = 0;
    var min = arr[0];var minIndex = 0;
    for (var i=1; i<arr.length; i++) {
        if(arr[i]>max){ maxIndex = i;    max = arr[i];}
        if(arr[i]<min){ minIndex = i;    min = arr[i];}
    }
    return {max: maxIndex, min: minIndex};
}
function closestToZero(arr) {
    if(arr.length===0){return -1;}
    var max = arr[0];var maxIndex = 0;
    var min = arr[0];var minIndex = 0;
    for (var i=1; i<arr.length; i++) {
        if(arr[i]>max){ maxIndex = i;    max = arr[i];}
        if(arr[i]<min){ minIndex = i;    min = arr[i];}
    }
    return {max: maxIndex, min: minIndex};
}
console.log(closestToZero([ 38, 5, 3, 70, 3, 10, 15, 4]))