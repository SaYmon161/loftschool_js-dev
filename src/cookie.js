/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function isMatching(full, chunk) {
    full = full.toLowerCase();
    chunk = chunk.toLowerCase();
    if (~full.indexOf(chunk)) {
        return true;
    }

    return false;
}

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    let subStr = filterNameInput.value;

    if (!subStr) {
        buildTable(getCookie());
    } else {
        let filteredCookie = {};

        for (let key in getCookie()) {
            if (key) {
                if (isMatching(key, subStr)) {
                    filteredCookie[key] = getCookie()[key];
                }
            }
        }
        buildTable(filteredCookie);
    }
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    const cookieName = addNameInput.value;
    const cookieValue = addValueInput.value;

    setCookie(cookieName, cookieValue, {
        expires: 36000
    });

    addNameInput.value = '';
    addValueInput.value = '';

    buildTable(getCookie());
});

function getCookie() {
    let cookies = document.cookie.split('; ').reduce((prev, cur) => {
        const [name, value] = cur.split('=');

        prev[name] = value;

        return prev;
    }, {});

    return cookies;
}

function setCookie(name, value, options = {}) {
    let expires = options.expires;

    if (typeof expires === 'number' && expires) {
        let d = new Date();

        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + '=' + value;

    for (let propName in options) {
        if (propName) {
            updatedCookie += '; ' + propName;
            let propValue = options[propName];

            if (propValue !== true) {
                updatedCookie += '=' + propValue;
            }
        }
    }

    document.cookie = updatedCookie;
}

function buildTable(cookies = {}) {
    listTable.innerHTML = '';
    for (const key in cookies) {
        if (key) {
            const tableRow = document.createElement('tr');
            const tableCellName = document.createElement('th');
            const tableCellValue = document.createElement('th');
            const tableCellButton = document.createElement('th');
            const deleteButton = document.createElement('button');

            tableCellName.textContent = key;
            tableRow.appendChild(tableCellName);

            tableCellValue.textContent = cookies[key];
            tableRow.appendChild(tableCellValue);

            deleteButton.textContent = 'Удалить';
            tableCellButton.appendChild(deleteButton);
            tableRow.appendChild(tableCellButton);

            listTable.appendChild(tableRow);

            deleteButton.addEventListener('click', e => {
                e.preventDefault();

                setCookie(key, '', {
                    expires: -1
                });

                tableRow.remove();
            });
        }
    }
}

window.onload = buildTable(getCookie());
