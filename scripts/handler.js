var countCase = 10;
var moveSlider;//запущена ли анимация (true or false)
var resultSpin;//рандомная переменная которая будет выведена
var listHistory = [];//масcив в котором хранятся элементы истории
var arrayCase = [];
var weightCommon = 14;
var weightUncommon = 10;
var weightRare = 6;
var weightLegendary = 2;
var countCommon = 4;
var countUncommon = 3;
var countRare = 2;
var countLegendary=1;

if (localStorage.getItem('history') != undefined) {
    listHistory = JSON.parse(localStorage.getItem('history'));
    outHistory();
}

for (var i=1; i<=countCase; i++) {
    let element=getElement(i);
    element.setAttribute('weight',checkWeight(i));
    element.setAttribute( 'id',i);
    arrayCase.push(element);
    sliderUl.appendChild(element);
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
    var summaryWeight = 0;
    var numRand = min - 0.5 + Math.random() * (max - min + 1);
    numRand = Math.round(numRand);
    console.log("numrand - " + numRand);
    for (var i = 1; i <= countCase; i++) {
        summaryWeight += parseInt(arrayCase[i-1].getAttribute("weight"),10);
        console.log(summaryWeight);
        if (numRand <= summaryWeight) {
            //parseInt(arrayCase[i-1].getAttribute("id"),10)
            return i;
        }
    }
}

function getImage(number) {
    //собирает элемент image в зависимости от полученного номера
    var out = '';
    out += '<img src="Image/' + number + '.jpg" alt="" ';
    
    switch (true) {
        case number >= 1 && number <= countCommon:
            out += 'class="common"';
            break;
        case number <= (countCommon + countUncommon):
            out += 'class="uncommon"';
            break;
        case number <= (countCommon + countUncommon + countRare):
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
        
        if (countRepeat < countCase) {
            //заменяет все элементы на новые
            listImage.firstElementChild.replaceChild(getElement(randomItem()), listImage.firstElementChild.children[countRepeat]);
            countRepeat++;
        }
        
        listImage.firstElementChild.appendChild(listImage.firstElementChild.firstElementChild);
    }, 60);
}

function getElement(randomNumber) {
    //возвращает готовый к вставке на страницу элемент списка
    var temp = document.createElement('li');
    temp.setAttribute("id", randomNumber);
    temp.setAttribute("weight",checkWeight(randomNumber));
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
    //вставляет на страницу собранный из массива
    //список изображений
    var out = '';
    
    for (var key in listHistory)
        out += listHistory[key];
    
    document.getElementById('listHistory').innerHTML = out;
}

function checkWeight(elementNumber){
    switch(true){
        case elementNumber >= 1 && elementNumber <= countCommon:
            return weightCommon;
        case elementNumber <= (countCommon + countUncommon):
            return weightUncommon;
        case elementNumber <= (countCommon + countUncommon + countRare):
            return weightRare;
        default:
            return weightLegendary;
    }
}