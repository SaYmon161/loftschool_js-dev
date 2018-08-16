/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
import loadAndSortTowns from './index';
console.log(loadAndSortTowns());

// function loadTowns() {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();

//         xhr.onreadystatechange = function() {
//             if (xhr.readyState === 4) {
//                 if (xhr.status === 200) {
//                     let townsArray = JSON.parse(xhr.responseText);

//                     townsArray.sort((a, b) => {
//                         if (a.name > b.name) {
//                             return 1;
//                         }

//                         return -1;
//                     });

//                     resolve(townsArray);
//                 } else {
//                     reject('Не удалось загрузить города');
//                 }
//             }
//         };

//         xhr.open(
//             'GET',
//             'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json',
//             true
//         );

//         xhr.send();
//     });
// }

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    full = full.toLowerCase();
    chunk = chunk.toLowerCase();
    if (~full.indexOf(chunk)) {
        return true;
    }

    return false;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
const errorMessage = document.createElement('div');
const errorButton = document.createElement('button');

errorMessage.style.display = 'none';
errorButton.style.display = 'none';

errorButton.textContent = 'Повторить';

filterBlock.appendChild(errorMessage);
filterBlock.appendChild(errorButton);

loadAndSortTowns().then(() => {
    loadingBlock.style.display = 'none';
    filterBlock.style.display = 'block';
});
loadAndSortTowns().then(
    result => {
        filterInput.addEventListener('keyup', function() {
            if (filterInput.value === '') {
                filterResult.innerHTML = '';
            }
            filterResult.innerHTML = '';

            let subStr = filterInput.value;

            for (let item of result) {
                let town = item.name;

                if (isMatching(town, subStr) && subStr) {
                    const townsItem = document.createElement('div');

                    townsItem.textContent = town;
                    filterResult.appendChild(townsItem);
                }
            }

            // это обработчик нажатия кливиш в текстовом поле
        });
    },
    error => {
        errorMessage.textContent = error;
        filterInput.style.display = 'none';
        errorMessage.style.display = 'block';
        errorButton.style.display = 'block';
        errorButton.addEventListener('click', e => {
            e.preventDefault();
            loadAndSortTowns();
        });
    }
);

export { loadTowns, isMatching };
