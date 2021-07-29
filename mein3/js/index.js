
document.body.onload = function (argument) {
    //sphereMe();
    //word_3d();
    //hitBlock();
    droppy = new Droppy();


    $("refreshBut").onclick = function(){   
        var scriptSrc = "js/modules/droppy.js"
        var script = document.querySelectorAll("[src = '"+scriptSrc+"']")[0];
        
        alert(droppy)
        droppy.animate = null;
        setTimeout(function() {
        
        }, 1000);
    }
    
}//refreshBut