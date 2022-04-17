class ScrollEffects{
    static LogScrollPoint(Callback){
    let scroll_points = [...document.querySelectorAll("[scroll-point]")];
    let label_last = "";
    let focused = null;
    let pageHeight = document.body.clientHeight; 
    window.onscroll = function(evt){//works
        if(scroll_points.length>0){
        scroll_points.map((scroll_point, scroll_pointInd)=>{
            let bbox = scroll_point.getBoundingClientRect();
            if(focused==null){   
                focused = {elem: scroll_point, index: scroll_pointInd};
            }
            else if(bbox.top<pageHeight/2 && bbox.top+bbox.width>0){
                focused = {elem: scroll_point, index: scroll_pointInd};
            }
        });//EO map
        
        
        let scroll_point = scroll_points[focused.index];
        let label = scroll_point.getAttribute("scroll-point");
        if(label != label_last){        //performance block
            Callback(scroll_point, label, focused.index);
            label_last = label
        }//EO if
        }
    }//EO  onscroll
    //document.addEventListener("scroll", window.onscroll);
    if(scroll_points.length<1)
    console.warn("ScrollEffects.js is in this page, you should add scroll_point attribute to elements.");
    
    
    }//EO LogscrollPoint
    
}//EO class
/*
 * window.onscroll no dey fuck with html{}css...
 *
 */
 /*
  * every loggable element must have a unique scroll-point="" attribute
  */
