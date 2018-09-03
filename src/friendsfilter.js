import './styles/style.css';

import { readFromStorage, saveToStorage } from './js/storage';

import { renderTemplate } from './js/render';

import { friendsFilter } from './js/filter';

import { dragFriend, sortFriend } from './js/dnd';

const filter = document.querySelector('.filter');

const mainContent = document.querySelector('.maincontent');

const saveButton = document.querySelector('.footer__save-button');

let leftSide = {
    friendsArray: [],
    sideElement: document.querySelector('#friends-left'),
    storage: localStorage.leftSide,
    filter: document.querySelector('#filter-right')
};

let rightSide = {
    friendsArray: [],
    sideElement: document.querySelector('#friends-right'),
    storage: localStorage.rightSide,
    filter: document.querySelector('#filter-left')
};

VK.init({
    apiId: 6666943
});

function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            if (data.session) {
                resolve(data.session);
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    });
}

function callAPI(method, params) {
    params.v = '5.76';

    return new Promise((resolve, reject) => {
        VK.api(method, params, data => {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.response);
            }
        });
    });
}

auth()
    .then(() => {
        return callAPI('friends.get', { fields: 'photo_50' });
    })
    .then(friends => {
        readFromStorage.call(leftSide, localStorage.leftSide);
        readFromStorage.call(rightSide, localStorage.rightSide);

        if (
            leftSide.friendsArray.length === 0 &&
      rightSide.friendsArray.length === 0
        ) {
            leftSide.friendsArray = friends.items;
        }

        renderTemplate.call(leftSide);
        renderTemplate.call(rightSide);
    });

filter.addEventListener('keyup', e => {
    const target = e.target;

    if (target.matches('#filter-left')) {
        friendsFilter.call(leftSide, target);
    } else if (target.matches('#filter-right')) {
        friendsFilter.call(rightSide, target);
    }
});

mainContent.addEventListener('click', e => {
    const target = e.target;

    if (target.matches('.friend__plus')) {
        const friend = target.closest('.friend');

        if (friend.classList.contains('right')) {
            dragFriend.call(rightSide, friend.dataset.id, null, leftSide);
        } else {
            dragFriend.call(leftSide, friend.dataset.id, null, rightSide);
        }
    }
    leftSide.friendsArray;
    rightSide.friendsArray;
});

saveButton.addEventListener('click', () => {
    localStorage.leftSide = saveToStorage.call(leftSide);
    localStorage.rightSide = saveToStorage.call(rightSide);
    alert('Списки друзей сохранены!');
});

mainContent.addEventListener('dragstart', e => {
    if (!e.target.matches('.friend')) {
        e.preventDefault;
    } else {
        e.dataTransfer.setData('id', e.target.dataset.id);
        e.dataTransfer.setData('startSide', e.target.closest('.friends').id);
    }
});

mainContent.addEventListener('dragover', e => {
    e.preventDefault();
});

mainContent.addEventListener('dragenter', e => {
    let friends = e.target.closest('.friends');
    let placeholder = document.createElement('div');
    let placeholders = document.querySelectorAll('.placeholder');

    if (!e.target.matches('.placeholder')) {
        Array.from(placeholders).forEach(placeholder => {
            placeholder.remove();
        });
    }

    placeholder.classList.add('placeholder');

    let friend = e.target.closest('.friend');

    if (e.target.matches('.friend')) {
        if (e.offsetY <= friend.offsetHeight / 2) {
            friend.parentElement.insertBefore(placeholder, friend);
        } else {
            if (friend.nextElementSibling) {
                friend.parentElement.insertBefore(
                    placeholder,
                    friend.nextElementSibling
                );
            } else if (!friend.nextElementSibling || friends.children.length === 0) {
                friends.appendChild(placeholder);
            }
        }
    } else if (e.target.matches('.friends')) {
        friends.appendChild(placeholder);
    }
});

mainContent.addEventListener('drop', e => {
    const id = e.dataTransfer.getData('id');
    const placeholder = document.querySelector('.placeholder');
    let placeholders = document.querySelectorAll('.placeholder');
    let moveToId;
    const startSide = e.dataTransfer.getData('startSide');

    if (placeholder.nextElementSibling) {
        moveToId = parseInt(placeholder.nextElementSibling.dataset.id);
    } else {
        moveToId = null;
    }

    if (e.target.closest('.maincontent__right')) {
        if (e.target.closest(`#${startSide}`)) {
            sortFriend.call(rightSide, id, moveToId);
        } else {
            dragFriend.call(leftSide, id, moveToId, rightSide);
        }
    } else if (e.target.closest('.maincontent__left')) {
        if (e.target.closest(`#${startSide}`)) {
            sortFriend.call(leftSide, id, moveToId);
        } else {
            dragFriend.call(rightSide, id, moveToId, leftSide);
        }
    }

    Array.from(placeholders).forEach(placeholder => {
        placeholder.remove();
    });
});

document.addEventListener('dragend', () => {
    let placeholders = document.querySelectorAll('.placeholder');

    Array.from(placeholders).forEach(placeholder => {
        placeholder.remove();
    });
});
