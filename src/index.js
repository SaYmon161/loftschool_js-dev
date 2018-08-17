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

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let townsArray = JSON.parse(xhr.responseText);

                    townsArray.sort((a, b) => {
                        if (a.name > b.name) {
                            return 1;
                        }

                        return -1;
                    });

                    resolve(townsArray);
                } else {
                    reject('Не удалось загрузить города');
                }
            }
        };

        xhr.open(
            'GET',
            'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json',
            true
        );

        xhr.send();
    });
}

export { delayPromise, loadAndSortTowns };
