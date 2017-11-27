if (localStorage.getItem('history') != undefined) {
    listHistory = JSON.parse(localStorage.getItem('history'));
    outHistory();
}

if (countCase === (countCommon + countUncommon + countRare + countLegendary)){
    if((countCommon * weightCommon + countUncommon *weightUncommon 
        + countRare * weightRare + countLegendary * weightLegendary)===100) {
        
        for(var i=1; i<=countCase; i++) {
            //создаёт массив элементов отображающий вероятности 
            // и их позиции
            //выводит стартовый список на страницу
            let element=getElement(i);
            element.setAttribute('weight',checkWeight(i));
            element.setAttribute( 'id',i);
            
            arrayCase.push(element);
            
            sliderUl.appendChild(element);
        }
        
        document.getElementById('startSpin').onclick = function () {
            if(!moveSlider) {
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
        }
    }
}
else{
    consol.log("Допущена ошибка в значении весов или количества кейсов")
}

document.getElementById('clearHistory').onclick = function clearHistory() {
    listHistory = [];
    localStorage.removeItem('history');
    document.getElementById('listHistory').innerHTML = "";
};

function randomItem() {
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
    //в зависимость от номера элемента возвращает для него вес
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