

;(function () {
    let src = './js/Modules/ScrollEffects.js';
    document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
})();



const Main = (function(){
var gbColor = "linear-gradient(to bottom, #00081744, #00081744)";
ScrollEffects.LogScrollPoint(function(element, label, index){
    if(element.style.background !== gbColor)
    element.style.background = gbColor;
});
})//EO Main

;document.addEventListener("DOMContentLoaded", Main);
