








GenerateAll = function(){
    
    

    
var arr_All = new Array();
var arr_E = [];
var nY = 7;
var nX = 14;
var options = ["MM", "MN", "NM", "SM", "MS"]
for(var i=0; nX>i; i++){
    var pickedInd = Math.floor(Math.random()*options.length);
    var picked = options[pickedInd];
    arr_All.push(picked);
    if(picked === "MM"){
        if(nX> i+2) options =["MM", "MN", "NM", "SM", "MS"];
        else{ options = ["MM", "MN", "NM"]; }
        //check if S is not on last row
    }
    if(picked === "MN") options = ["MM", "MM", "MN"];
    if(picked === "NM") options = ["MM", "MM", "NM"];
    if(picked === "SM") options = ["NM"];
    if(picked === "MS") options = ["MN"];
    //console.log(pickedInd)
    //console.log(options)
}





//console.log(JSON.stringify(arr_All))
this.arr_E = arr_E;
this.arr_All = arr_All;
} //();







