let arr = [5, 4, 3, 2, 10];
let recList = [3,2];
arr = arr.filter((v)=>{
    if(recList.find((e)=>e===v)){return true; console.log("found")}
    return false;
});
console.log(arr)


arr = [{a: "a"}, {a: "a", b: "b"}];
arr.map((v, ind)=>console.log(ind))
let res = ("...", arr.find((a)=>a.a === "a"))
if(res !== undefined)console.log(res);
else console.log("...undefined")


        function find(arr, cond, result){
            let arrFound = [];
            arr.map((value)=>{
                if(cond(value))arrFound.push(value);
            });
            arrFound.map((v)=> {result(v);});
        }
                find([1,2,3,4], (p)=> p>2, (partClone)=>{
                    console.log("---", partClone)
                });//EO find




function maketext() {
  var text = "";
  var possible = "sis A B C D EFGHIJKLMNO PQR STUVWXYZ";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};
var list =`
BEGIN:VCARD
VERSION:2.1
N:;mummy;;;
FN:mummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08023336280
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;daddy;;;
FN:daddy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08033662673
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;bayo;;;
FN:nayo
SOUND;X-IRMC-N:;;;;
TEL;CELL:23483230994
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;christa;;;
FN:christa
SOUND;X-IRMC-N:;;;;
TEL;CELL:08036085253
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;david me;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:07033280723
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;david filo;;;
FN:david filo
SOUND;X-IRMC-N:;;;;
TEL;CELL:08033060960
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08028667816
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:07080801572
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:23464646407
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08097577438
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08024174948
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08056061147
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08043445456
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:07037372845
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08124268080
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08033260566
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08030737704
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08072971090
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08073656385
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08071585830
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08037861790
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08052928010
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:07053089679
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08065509127
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08033401866
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08150755950
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08022792040
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:07034649479
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08028794662
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08033105654
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08138069322
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08037044413
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;Sibayoummy;;;
FN:Sibayoummy
SOUND;X-IRMC-N:;;;;
TEL;CELL:08181028160
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;fakinyo;;;
FN:fakinyo
SOUND;X-IRMC-N:;;;;
TEL;CELL:08067968635
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;eberechi;;;
FN:eberechi
SOUND;X-IRMC-N:;;;;
TEL;CELL:08033661956
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;grant;;;
FN:grant
SOUND;X-IRMC-N:;;;;
TEL;CELL:08156040355
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;chukudi;;;
FN:chukudi
SOUND;X-IRMC-N:;;;;
TEL;CELL:08065726176
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;eliza;;;
FN:eliza
SOUND;X-IRMC-N:;;;;
TEL;CELL:08023257854
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;shina;;;
FN:shina
SOUND;X-IRMC-N:;;;;
TEL;CELL:07034397568
END:VCARD
BEGIN:VCARD
VERSION:2.1
N:;falade;;;
FN:falade
SOUND;X-IRMC-N:;;;;
TEL;CELL:
`;
let listn = list;
for(let i=0; 60>i; i++){
    let liste = listn;
    listn = liste.replace("Sibayoummy", maketext());
};
//console.log(listn);