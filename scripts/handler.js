var imageFirstElement=listImage.firstElementChild;
imageFirstElement.style.marginLeft="-110px";

var moveSlider;//запущена ли анимация (true or false)
var resultSpin;//рандомная переменная которая будет выведена

document.getElementById('startSpin').onclick = function(){
    if(!moveSlider)
        {   
            resultSpin=randomItem();
            moveSlider=true;
            startTime = new Date(0);
            endTime=200;
            motionSlider();
            setTimeout(function(){
                moveSlider=false;
                document.getElementById('out').innerHTML=out(resultSpin);
            },1000);
        }
    
}

function randomItem(){
    //веса у common-14%,uncommon-10%,rare-6%,legendary-2%
    //согласно весам возвращает цифру от 1-10
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
    //собирает элемент image в зависимости от полученного номера
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

function motionSlider() {
    //анимация слайдера и замена элементов слайдера 
    var begin = new Date();
    var countRepeat=0;
    var timer = setInterval(function() {
        var timePassed = Date.now() - begin;
		var durationSpin=930;
	if (timePassed >= durationSpin) {
        //вместо третьего подставляет загаданный ранее и выходит из setInterval
        imageFirstElement.replaceChild(getElement(resultSpin),imageFirstElement.children[2]);
        clearInterval(timer);
        return;
    }
        if (countRepeat<10)
        {
            imageFirstElement.replaceChild(getElement(randomItem()),imageFirstElement.children[countRepeat]);
            countRepeat++;
        }
        imageFirstElement.appendChild(imageFirstElement.firstElementChild);
            
    }, 60);
}
function getElement(randomNumber) {
    //возвращает готовый к вставке на страницу элемент списка
    var temp=document.createElement('li');
    temp.innerHTML=out(randomNumber);
    return temp;
}