/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    let newDiv = document.createElement('div');

    newDiv.style.width = `${Math.random() * 500}px`;
    newDiv.style.height = `${Math.random() * 500}px`;
    newDiv.style.background = `rgb(${Math.random() * 255}, ${Math.random() *
    255}, ${Math.random() * 255})`;
    newDiv.style.position = 'absolute';
    newDiv.style.top = `${Math.random() * (window.innerHeight - 500)}px`;
    newDiv.style.left = `${Math.random() * (window.innerWidth - 500)}px`;
    newDiv.classList.add('draggable-div');
    newDiv.setAttribute('draggable', 'true');

    return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.addEventListener('dragstart', e => {
        let targetDiv;
        // let id = 'id' + Math.round(Math.random() * 1000);

        if (e.target.classList.contains('draggable-div')) {
            targetDiv = e.target;
        } else {
            return;
        }

        targetDiv.setAttribute('dragged', '');
        targetDiv.style.zIndex = '100';
        let shiftX = e.clientX - targetDiv.getBoundingClientRect().left;
        let shiftY = e.clientY - targetDiv.getBoundingClientRect().top;

        e.dataTransfer.setData('shiftX', `${shiftX}`);
        e.dataTransfer.setData('shiftY', `${shiftY}`);
    });
    document.addEventListener('dragover', e => {
        e.preventDefault();
    });
    document.addEventListener('drop', e => {
        let targetDiv = document.querySelector('[dragged]');

        targetDiv.style.top = `${e.clientY - e.dataTransfer.getData('shiftY')}px`;

        targetDiv.style.left = `${e.clientX - e.dataTransfer.getData('shiftX')}px`;

        targetDiv.style.zIndex = 'auto';

        targetDiv.removeAttribute('dragged');
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(homeworkContainer);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export { createDiv };
