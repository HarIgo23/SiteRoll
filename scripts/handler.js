if (localStorage.getItem('history') != undefined) {
    listHistory = JSON.parse(localStorage.getItem('history'));
    outHistory();
}


if (totalWieght === 100) {
   
   for(var i=1; i<=countCase; i++) {
    //создаёт массив элементов отображающий вероятности 
    // и их позиции
    //выводит стартовый список на страницу
    let element=getElement(i);
            
    aCase.push(element);
            
    sliderUl.appendChild(element);
}
    outAwards();
    
    
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
else{
    console.log("Допущена ошибка в значении весов ");
}

document.getElementById('clearHistory').onclick = function clearHistory() {
    listHistory = [];
    localStorage.removeItem('history');
    document.getElementById('listHistory').innerHTML = "";
};
