var imageFirstElement = listImage.firstElementChild;
imageFirstElement.style.marginLeft = "-110px";


var moveSlider;//запущена ли анимация (true or false)
var resultSpin;//рандомная переменная которая будет выведена
var listHistory = [];//масиив в котором хранятся элементы истории

if (localStorage.getItem('history') != undefined) {
    listHistory = JSON.parse(localStorage.getItem('history'));
    outHistory();
}

document.getElementById('startSpin').onclick = function () {
    if (!moveSlider) {
            moveSlider = true;
            var duration = generateDuration();
            motionSlider(duration);
            setTimeout(function () {
                moveSlider = false;
                addHistory();
                outHistory();
                document.getElementById('out').innerHTML = getImage(resultSpin);
                localStorage.setItem('history', JSON.stringify(listHistory));
            }, duration + 100);
    }
};

document.getElementById('clearHistory').onclick = function clearHistory() {
    listHistory = [];
    localStorage.removeItem('history');
    document.getElementById('listHistory').innerHTML = "";
};

function randomItem() {
    //веса у common-14%,uncommon-10%,rare-6%,legendary-2%
    //согласно весам возвращает цифру от 1-10
    var min = 1;
    var max = 100;
    var numRand = min - 0.5 + Math.random() * (max - min + 1);
    numRand = Math.round(numRand);
    if (numRand >= 1 && numRand <= 14) {
        return 1;
    } else if (numRand <= 28) {
        return 2;
    } else if (numRand <= 42) {
        return 3;
    } else if (numRand <= 56) {
        return 4;
    } else if (numRand <= 66) {
        return 5;
    } else if (numRand <= 76) {
        return 6;
    } else if (numRand <= 86) {
        return 7;
    } else if (numRand <= 92) {
        return 8;
    } else if (numRand <= 98) {
        return 9;
    } else if (numRand <= 100) {
        return 10;
    }
}

function getImage(number) {
    //собирает элемент image в зависимости от полученного номера
    var out = '';
    out += '<img src="Image/';
    out += number;
    out += '.jpg" alt="" ';
    switch (true) {
        case number >= 1 && number <= 4:
            out += 'class="common"';
            break;
        case number <= 7:
            out += 'class="uncommon"';
            break;
        case number <= 9:
            out += 'class="rare"';
            break;
        default:
            out += 'class="legendary"';
    }
    out += 'id="' + number + '">';
    return out;
}

function motionSlider(durationSpin) {
    //анимация слайдера и замена элементов слайдера 
    var begin = new Date();
    var countRepeat = 0;
    var timer = setInterval(function () {
        var timePassed = Date.now() - begin;
        
	if (timePassed >= durationSpin) {
        //записывает id элемента на котором остановился Slider как конечный результат рандома
        //И выходит из setInterval
        resultSpin = imageFirstElement.children[2].children[0].getAttribute('id');
        clearInterval(timer);
        
        return;
    }
        
        if (countRepeat < 10) {
            //заменяет все элементы на новые
            imageFirstElement.replaceChild(getElement(randomItem()), imageFirstElement.children[countRepeat]);
            countRepeat++;
        }
        
        imageFirstElement.appendChild(imageFirstElement.firstElementChild);
    }, 60);
}

function getElement(randomNumber) {
    //возвращает готовый к вставке на страницу элемент списка
    var temp = document.createElement('li');
    temp.innerHTML = getImage(randomNumber);
    
    return temp;
}

function generateDuration() {
    var time = Number(7 - 0.5 + Math.random() * (6)).toPrecision(3);//диапазон от 6.5 до 12.5
    
    return time * 100;//650ms до 1250 ms
}

function addHistory() {
    listHistory.unshift(getImage(resultSpin));
    
    if (listHistory.length > 10) {
        listHistory.pop();
    }
}

function outHistory() {
    var out = '';
    
    for (var key in listHistory)
        out += listHistory[key];
    document.getElementById('listHistory').innerHTML = out;
}
