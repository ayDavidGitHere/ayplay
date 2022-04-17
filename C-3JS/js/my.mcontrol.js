class MControl{
    constructor(element = document) {
         this.ctx = this;
         this.hold_Page = false;
         this.touched = {
            A:false, B:false, C:false, D:false,
            left:false, right:false, 
            up:false, down:false,
            start: false, end:false,
            lastSeen:{x:0, y:0},
            moveCord:[],
            movement: false,
            moveDirection:null,
            moveDirectionX:null,
            moveDirectionY:null,
            moveX:null,
            moveY:null
         }
         this.touched_saved = JSON.parse(JSON.stringify(this.touched));
         this.register(element);
    }//EO constructor
    
    register(element){
         element.addEventListener("touchstart", e=>{
             if(this.hold_Page){  e.preventDefault();  }; 
             this.touched.end = false ;
             this.touched.moveCord = [];
             this.touched.movement = false;
             this.touched.moveDirectionX = null;
             this.touched.moveDirectionY = null;
             this.touched.left= false;  this.touched.right=false;
             this.touched.up= false; this.touched.down=false;
             
             
             this.touched.lastSeen.x = e.touches[0].pageX;
             this.touched.lastSeen.y = e.touches[0].pageY;
             
             this.touched.start = true;
         });
         element.addEventListener("touchend", e=>{ 
             //this.play(e);
         });
         element.addEventListener("touchmove", e=>{
             if(this.hold_Page){  e.preventDefault();  }
             this.touched.lastSeen.x = e.touches[0].pageX;
             this.touched.lastSeen.y = e.touches[0].pageY;
             this.touched.moveCord.push({ x: this.touched.lastSeen.x, y:this.touched.lastSeen.y});
             this.touched.movement = true;
             this.play(e)
         });
         
    }//EO register
    play(e){
        if(this.hold_Page){  e.preventDefault();  }
        if(this.touched.movement){  
            this.touched.moveX = this.touched.moveCord[0].x -
            this.touched.moveCord[this.touched.moveCord.length-1].x
            this.touched.moveY = this.touched.moveCord[0].y -
            this.touched.moveCord[this.touched.moveCord.length-1].y

            if(this.touched.moveX>0){   
                this.touched.left = true;   
                if(Math.abs(this.touched.moveX)>Math.abs(this.touched.moveY)){ 
                    this.touched.moveDirection = "left"
                }
            }
            else{  
                this.touched.right = true;
                if(Math.abs(this.touched.moveX)>Math.abs(this.touched.moveY)){ 
                    this.touched.moveDirection = "right"
                }
            } 
            if(this.touched.moveY>0){  
                this.touched.up = true;
                if(Math.abs(this.touched.moveY)>Math.abs(this.touched.moveX)){ 
                    this.touched.moveDirection = "up"
                }
            }
            else{  
                this.touched.down = true;
                if(Math.abs(this.touched.moveY)>Math.abs(this.touched.moveX)){ 
                    this.touched.moveDirection = "down"
                }
            }
                
        }//EO if
        this.touched.end = true;
    }
    holdPage(){ 
           this.hold_Page = true;
    }//holdPage
    
}