 
 
(function(){
if(window.Router$ !== undefined ) return;
var Router$ = {
    
render: (path) => {
    //alert("R.render "+window.$isrendered);
    window.$isrendered = true;
    let load = routes[path].load;
    fetch(load)
    .then(response=> response.text())
    .then(text=> {
    Router$.oldEls = 
    [...document.querySelectorAll("html script"),
     ...document.querySelectorAll("html>*"),
    ].map((el)=>{ el.setAttribute("unique", "true"); return el; });   
    //alert("777");
        
        
        
    text = text
    .replace(`<scr` + `ipt>`,
    `
    <scr` + `ipt>
document.addEventListener("DOMContentLoaded", function(event) {
    //alert("about to use");
    Router$.use();
});//refreshBut
    `)
    .replace(`</ht` + `ml>`,
    `
    <scr` + `ipt>
    Router$.addListeners();
    //check if is rendered.
    window.document.dispatchEvent(new Event("DOMContentLoaded", {
            bubbles: true,
            cancelable: true,
    }));//EO dispatchEvent
    console.log("routes", Router$);
    </scr` + `ipt>
    </ht` + `ml>
    `);
    document.close();
    document.write(text);
    })//EO fetch
    
},
addListeners: () => {
    //alert("R.listener "+window.$isrendered);
    [...document.querySelectorAll('[href^="/"]')].map((el) =>{
        el.innerText = el.href+';';
        el.addEventListener("click", evt => {
            evt.preventDefault();
            console.log(evt.target.href)
            let loc = ""
            //+ window.location.origin.toString().trim("/") 
            + evt.target.href;
            console.log(loc);
            const {pathname: path} = new URL( loc );
            Router$.push(path);
        });
    });//EO map
},//EO listener
push: (path) => {
    //alert("pushingstate")
    window.history.pushState({path}, path, path);
    Router$.render(path);
},
use: (routes = Router$.routes) => {
    //Set Routes
    Router$.routes = routes;
    //Remove Old Elements
    let ss = "";
    Router$.oldEls.map((el)=>{
        ss += ""
        +el.tagName+": "
        +el.outerHTML.slice(0,40).replace("\n","")+"...\n";
        if(el.getAttribute("noremove")!=null) return;
        //if(el.tagName == "BODY"){ alert("excluded... "+el.tagName); return}
        //el.parentNode.removeChild(el);
    });
    //alert("ss:  "+ss);
    Router$.oldEls = [];
    //Add listeners
    //alert("R.use "+window.$isrendered);
    window.onpopstate = e => { alert("onpopstate"); Router$.render(new URL(window.location.href).pathname)};
    let pathname = (new URL(window.location.href).pathname);
    if(window.$isrendered) return;
    //Render
    Router$.render(pathname);
    
},//EO use
oldEls: [],
}//EO Router$
window.Router$ = Router$;








var routes = {
    "/deadpass": {load: "fightarena.html"},
    "/deadrun": {load: "dungeonrun.html"},
    "/": {load: "index.html"},
} 
Router$.use(routes);
})();