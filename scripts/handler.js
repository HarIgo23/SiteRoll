var moveSlider;//запущена ли анимация (true or false)
var resultSpin;//рандомная переменная которая будет выведена
var listHistory = [];//масcив в котором хранятся элементы истории

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
    //соmmon-4 шт,uncommon-3 шт,rare-2 шт,legendary-1 шт
    //Важно! Сумма весов должна равняться 100 
    var min = 1;
    var max = 100;
    var commonWeight = 14;
    var uncommonWeight = 10;
    var rareWeight = 6;
    var legendaryWeight = 2;
    var numRand = min - 0.5 + Math.random() * (max - min + 1);
    numRand = Math.round(numRand);
    switch(true) {
        case numRand >= 1 && numRand <= commonWeight :
            return 1;
        case numRand <= 2 * commonWeight:
            return 2;
        case numRand <= 3 * commonWeight:
            return 3;
        case numRand <= 4 * commonWeight:
            return 4;
        case numRand <= (4 * commonWeight + uncommonWeight):
            return 5;
        case numRand <= (4 * commonWeight + 2 * uncommonWeight):
            return 6;
        case numRand <= (4 * commonWeight + 3 * uncommonWeight):
            return 7;
        case numRand <= (100 - legendaryWeight - rareWeight):
            return 8;
        case numRand <= (100 - legendaryWeight):
            return 9;
        default:
            return 10;
    }
}

function getImage(number) {
    //собирает элемент image в зависимости от полученного номера
    var out = '';
    out += '<img src="Image/' + number + '.jpg" alt="" ';
    
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
        resultSpin = listImage.firstElementChild.children[1].getAttribute('id');
        clearInterval(timer);
        
        return;
    }
        
        if (countRepeat < 10) {
            //заменяет все элементы на новые
            listImage.firstElementChild.replaceChild(getElement(), listImage.firstElementChild.children[countRepeat]);
            countRepeat++;
        }
        
        listImage.firstElementChild.appendChild(listImage.firstElementChild.firstElementChild);
    }, 60);
}

function getElement() {
    //возвращает готовый к вставке на страницу элемент списка
    var randomNumber=randomItem();
    var temp = document.createElement('li');
    temp.setAttribute("id", randomNumber);
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
