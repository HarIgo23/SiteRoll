function startSpin(){
    var number=random();
    console.log(number);
    out(number);
}

function random(){
    var min=1;
    var max=100;
    var numRand=min-0.5 +Math.random()*(max-min+1);
    numRand=Math.round(numRand);
    if(numRand>=1&&numRand<=12)
        return 1;
    else if(numRand>12&&numRand<=24)
        return 2;
    else if(numRand>24&&numRand<=36)
        return 3;
    else if(numRand>36&&numRand<=48)
        return 4;
    else if(numRand>48&&numRand<=58)
        return 5;
    else if(numRand>58&&numRand<=68)
        return 6;
    else if(numRand>68&&numRand<=78)
        return 7;
    else if(numRand>78&&numRand<=86)
        return 8;
    else if(numRand>86&&numRand<=94)
        return 9;
    else if(numRand>94&&numRand<=100)
        return 10;
}
function out(num){
    var out='';
    out+='<img src="Image/';
    out+=num;
    out+='.jpg" alt="">';
    document.getElementById('out').innerHTML=out;
}