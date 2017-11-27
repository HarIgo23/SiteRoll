var moveSlider;//запущена ли анимация (true or false)
var resultSpin;//рандомная переменная которая будет выведена
var listHistory = [];//масcив в котором хранятся элементы истории
var arrayCase = [];//массив для хранения списка элементов

//Важно! Количество countCase равна сумме всех кейсов
var countCase = 12;
var countCommon = 5;
var countUncommon = 4;
var countRare = 2;
var countLegendary=1;

//Важно! Веса всех кейсов*количество в сумме должны давать 100
var weightCommon = 12;//60
var weightUncommon = 7;//88
var weightRare = 5;//98 rare №10,№11
var weightLegendary = 2;//legendary №12
