var imageFirstElement=listImage.firstElementChild;
imageFirstElement.style.marginLeft="-100px";

var moveSlider;
var firstSpin=true;
var resultSpin;
var countResult=2;//при первом кручении всегда на девятый элемент падает

document.getElementById('startSpin').onclick = function(){
    if(!moveSlider)
        {   
            resultSpin=randomItem();
            moveSlider=true;
            startTime = new Date(0);
            endTime=200;
            speedSpin(startTime, endTime);
            setTimeout(function(){
                moveSlider=false;
                document.getElementById('out').innerHTML=out(resultSpin);
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
    checkCount(countResult);
    var countRepeat=0;
    var randomValue;
    var timer = setInterval(function() {
        var timePassed = Date.now() - begin;
		var durationSpin=duration*5-70;
	if (timePassed >= durationSpin) {
        //вместо третьего подставляет загаданный ранее и выходит из setInterval
        imageFirstElement.replaceChild(getElement(resultSpin),imageFirstElement.children[2]);
        clearInterval(timer);
        return;
    }
        if (countRepeat<10)
        {
			randomValue=randomItem();
            imageFirstElement.replaceChild(getElement(randomValue),imageFirstElement.children[countRepeat]);
            countRepeat++;
        }
        imageFirstElement.appendChild(imageFirstElement.firstElementChild);
            
    }, 60);
}
function getElement(randomNumber) {
    var temp=document.createElement('li');
    temp.innerHTML=out(randomNumber);
    return temp;
}
//в случае если count < 3 ,только для 60ms нужна 
function checkCount(count){
    switch(count){
		case 4:
            countResult=9;
		    return;
		case 3:
            countResult=8;
		    return 8;
        case 2:
            countResult=7;
            return 7;
        case 1:
            countResult=6;
            return 6;
        case 0:
            countResult=5;
            return 5;
        default:
            countResult-=5;
            return;
    }
}