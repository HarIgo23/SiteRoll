var imageFirstElement=listImage.firstElementChild;
imageFirstElement.style.marginLeft="-100px";
var moveSlider;
var firstSpin=false;
//var inCheck=false;
var resultSpin;
var count =8;//при первом кручении всегда на девятый элемент падает
for(var i = 0; i < imageFirstElement.children.length; i++){
    imageFirstElement.children[i].setAttribute("numberPosition",i+1);
}
document.getElementById('startSpin').onclick = function(){
    if(!moveSlider)
        {   
            moveSlider=true;
            startTime = new Date(0);
            var time=Number(2-0.5 +Math.random()*3).toPrecision(3);//диапазон от 1.5 до 4.5 
            //endTime = new Date(time*100);//150ms до 450 ms
            endTime=200;
            //console.log(time);
            speedSpin(startTime, endTime);
            //setTimeout(function(){moveSlider=false},time*500);
            setTimeout(function(){
                moveSlider=false;
                document.getElementById('out').innerHTML=out(resultSpin+1);
            },1000);
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

function speedSpin(start, end) {
    var duration = end - start;
    var begin = new Date();
    var countRepeat=0;
    var randomValue;
    var timer = setInterval(function() {
        var timePassed = Date.now() - begin;
        
        if (timePassed >= duration*5) {
            clearInterval(timer); 
            return;
        };
        if(!firstSpin)
        {
            for(var i=5;i<=10;i++)
                imageFirstElement.appendChild(takeElem(i));
            firstSpin=true;
            resultSpin=8;
            count-=3;
        }
        //задаёт рандомные айтемы в яейках(не предсказуемо)
        /*if ((inCheck) && countRepeat<10)
        {
            console.log(inCheck);
            randomValue =randomItem();
            if(count==countRepeat)
            {
                resultSpin=randomValue;
                if(count==0)
                    count=9;
                count--;
            }
            imageFirstElement.replaceChild(takeElem(randomValue),imageFirstElement.children[countRepeat]);
            countRepeat++;
        }*/
        imageFirstElement.appendChild(imageFirstElement.firstElementChild);
            
    }, 60);//при 60 падает на 8 элемент (9) и на минус 4 элемента следующее кручение ,
    //при 50 падает на 1 элемент(2) и на минус 1 элемент следующее кручение
}
function takeElem(randomNumber) {
    var temp=document.createElement('li');
    temp.innerHTML=out(randomNumber);
    return temp;
}
//в случае если count < 3 ,только для 60ms нужна 
/*function checkCount(count){
    switch(count){
        case 3:
            return 9;
        case 2:
            return 8;
        case 1:
            return 7;
        default:
            return 0;
    }
}*/