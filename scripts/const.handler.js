var moveSlider;//запущена ли анимация (true or false)
var resultSpin;//рандомная переменная которая будет выведена
var listHistory = [];//масcив в котором хранятся элементы истории
var arrayCase = [];//массив для хранения списка элементов

//количество countCase равна сумме всех кейсов
var countCase = 10;
var countCommon = 4;
var countUncommon = 3;
var countRare = 2;
var countLegendary=1;

//веса всех кейсов*количество в сумме должны давать 100
var weightCommon = 14;
var weightUncommon = 10;
var weightRare = 6;
var weightLegendary = 2;
