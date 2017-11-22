var imageFirstElement=listImage.firstElementChild;
imageFirstElement.style.marginLeft="-100px";
var moveSlider;
for(var i = 0; i < imageFirstElement.children.length; i++){
    imageFirstElement.children[i].setAttribute("numberPosition",i+1);
}
console.log(listAwards.children[3].children[0]);
document.getElementById('startSpin').onclick = function(){
    if(moveSlider!==true)
        {
            var number=randomItem();
            document.getElementById('out').innerHTML=out(number);
            moveSlider=true;
            startTime = new Date(0);
            var time=Number(2-0.5 +Math.random()*3).toPrecision(3);//диапазон от 1.5 до 4.5 
            //endTime = new Date(time*100);//150ms до 450 ms
            endTime=200;
            //console.log(time);
            speedSpin(startTime, endTime,number);
            //setTimeout(function(){moveSlider=false},time*500);
            setTimeout(function(){moveSlider=false},1000);
            console.log(imageFirstElement.children[6]);
        }
    
}

function randomItem(){
    //веса у common-14%,uncommon-10%,rare-6%,legendary-2%
    var min=1;
    var max=100;
    var numRand=min-0.5 +Math.random()*(max-min+1);
    numRand=Math.round(numRand);
    if(numRand>=1&&numRand<=14)
        return 1;
    else if(numRand<=28)
        return 2;
    else if(numRand<=42)
        return 3;
    else if(numRand<=56)
        return 4;
    else if(numRand<=66)
        return 5;
    else if(numRand<=76)
        return 6;
    else if(numRand<=86)
        return 7;
    else if(numRand<=92)
        return 8;
    else if(numRand<=98)
        return 9;
    else if(numRand<=100)
        return 10;
}
function out(num){
    var out='';
    out+='<img src="Image/';
    out+=num;
    out+='.jpg" alt="" ';
    switch(true){
        case num>=1 && num<=4:
            out+='class="common"';
            break;
        case num<=7:
            out+='class="uncommon"';
            break;
        case num<=9:
            out+='class="rare"';
            break;
        default:
            out+='class="legendary"';
    }
    out+='>';
    return out;
}

function speedSpin(start, end,number) {
    var duration = end - start;
    var begin = new Date();
    var timer = setInterval(function() {
        var timePassed = Date.now() - begin;    
        
            if (timePassed >= duration*5) {
                clearInterval(timer); 
                return;
              }
            //imageFirstElement.insertBefore(takeElem(), imageFirstElement [9]);
            for(var i=5;i<=10;i++)
                imageFirstElement.appendChild(takeElem(i));
            imageFirstElement.appendChild(imageFirstElement.firstElementChild);
            
    }, 50);
}
function takeElem(randomNumber) {
    //var randomNumber=randomItem();
    var temp=document.createElement('li');
    temp.innerHTML=out(randomNumber);
    return temp;
}
    