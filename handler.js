document.getElementById('startSpin').onclick = function(){
    var number=randomItem();
    out(number); 
}

function randomItem(){
    //веса у common-14%,uncommon-9%,rare-7%,legendary-3%
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
    else if(numRand<=65)
        return 5;
    else if(numRand<=74)
        return 6;
    else if(numRand<=83)
        return 7;
    else if(numRand<=90)
        return 8;
    else if(numRand<=97)
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
        case num >=1 && num<=4:
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
    out+='>'
    document.getElementById('out').innerHTML=out;
}