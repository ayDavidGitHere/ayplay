
class MHelp{
    
    static compareArr(arr, arrComp, callback){
        if( JSON.stringify(arr) == JSON.stringify(arrComp) ){
            callback()
        }
    }
    static randOpt(val, val2){
        return arguments[Math.floor(Math.random()*arguments.length)]
    }
    static getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    static convDegRad(deg){
        return deg*(Math.PI/180)
    }
    
}

