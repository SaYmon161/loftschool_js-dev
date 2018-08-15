import { resolve } from 'url';
import { rejects } from 'assert';

/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    let ms = seconds * 1000;

    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let towns = [];
        let townsArray = [];

        xhr.open(
            'GET',
            'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json',
            true
        );
        xhr.send();

        towns = xhr.responseText;

        for (let item of towns) {
            for (let key in item) {
                if (key) {
                    townsArray.push(item[key]);
                }
            }
        }

        townsArray.sort();

        if (xhr.status != 200) {
            reject();
        } else {
            resolve(townsArray);
        }
    });
}

export { delayPromise, loadAndSortTowns };
