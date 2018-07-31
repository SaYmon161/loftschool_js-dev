/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let newArr = [];

    for (let i = 0; i < array.length; i++) {
        newArr[i] = fn(array[i], i, array);
    }

    return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let prevValue;

    if (initial) {
        prevValue = fn(initial, array[0], 0, array);
    } else {
        prevValue = array[0];
    }
    for (let i = 1; i < array.length; i++) {
        prevValue = fn(prevValue, array[i], i, array);
    }

    return prevValue;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let keyArray = [];

    for (let key in obj) {
        if (key) {
            let upperKey = key.toUpperCase();

            keyArray.push(upperKey);
        }
    }

    return keyArray;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    let newArray = [];

    let end;
    let start;

    if (to) {
        if (to <= 0) {
            end = array.length + to - 1;
        } else if (to > 0 && to <= array.length) {
            end = to - 1;
        } else if (to > array.length) {
            end = array.length - 1;
        }
    } else if (to === undefined) {
        end = array.length - 1;
    }

    if (from) {
        if (from < 0) {
            start = array.length + from;
        } else {
            start = from;
        }
    } else if (from === undefined || from === 0) {
        start = 0;
    }

    for (let i = 0; i <= end; i++) {
        if (i >= start) {
            newArray.push(array[i]);
        }
    }

    return newArray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value * value;

            return target[prop];
        }
    });

    return proxy;
}

export { forEach, map, reduce, upperProps, slice, createProxy };
