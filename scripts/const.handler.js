var moveSlider;//запущена ли анимация (true or false)
var resultSpin;//рандомная переменная которая будет выведена
var listHistory = [];//масcив в котором хранятся элементы истории
var aCase = [];//массив для хранения списка элементов

//Количество кейсов должно совпадать с количеством весов
//Важно! Веса всех кейсов*количество в сумме должны давать 100
//98 rare №10,№11
//legendary №12
var aCount = [5, 4, 2, 1];
var aWeight = [12,7,5,2];
var totalWieght=counterCase(0);
var countCase = counterCase(1);
console.log(countCase);
console.log(totalWieght);
function counterCase(selector) {
    var temp=0;
    
    if (aCount.length === aWeight.length) {
        for (var i = 0; i < aCount.length; i++) {
            
            if (selector === 1 ) {
                temp += aCount[i];
            } else {
                temp += aCount[i] * aWeight[i];
            }
        }
    }
    
    return temp;
}