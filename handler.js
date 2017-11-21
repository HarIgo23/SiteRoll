document.getElementById('startSpin').onclick = function(){
    var number=random();
    out(number); 
}

function random(){
    var min=1;
    var max=100;
    var numRand=min-0.5 +Math.random()*(max-min+1);
    numRand=Math.round(numRand);
    if(numRand>=1&&numRand<=12)
        return 1;
    else if(numRand<=24)
        return 2;
    else if(numRand<=36)
        return 3;
    else if(numRand<=48)
        return 4;
    else if(numRand<=58)
        return 5;
    else if(numRand<=68)
        return 6;
    else if(numRand<=78)
        return 7;
    else if(numRand<=86)
        return 8;
    else if(numRand<=94)
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