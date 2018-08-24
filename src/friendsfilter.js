let storage = localStorage;

const filter = document.querySelector('.filter');

const mainContent = document.querySelector('.maincontent');

const saveButton = document.querySelector('.footer__save-button');

let leftSide = {
    friendsArray: [],
    leftSideElement: document.querySelector('#friends-left'),
    readFromStorage: function() {
        this.friendsArray = JSON.parse(storage.friendsLeftList || '[]');
    },
    saveToStorage: function() {
        storage.friendsLeftList = JSON.stringify(this.friendsArray);
    },
    getFriendsLists: function() {
        return this.friendsArray;
    },
    setFriendsLists: function(array) {
        this.friendsArray = array.slice();
    },
    renderTemplate: function(list = this.friendsArray) {
        const template = require('../friends.hbs');

        this.leftSideElement.innerHTML = template({
            items: list
        });
    },
    isMatching: function(full, chunk) {
        full = full.toLowerCase();
        chunk = chunk.toLowerCase();
        if (~full.indexOf(chunk)) {
            return true;
        }

        return false;
    },
    friendsFilter: function(input) {
        let subStr = input.value;

        if (!subStr) {
            this.renderTemplate();
        } else {
            let filteredFriends = [];

            this.friendsArray.forEach(item => {
                if (
                    this.isMatching(item.first_name, subStr) ||
          this.isMatching(item.last_name, subStr) ||
          this.isMatching(`${item.first_name} ${item.last_name}`, subStr)
                ) {
                    filteredFriends.push(item);
                }
            });
            this.renderTemplate(filteredFriends);
        }
    },
    moveFriend: function(friend) {
        const friendId = friend.dataset.id;

        friend.classList.add('right');
        friend.remove();
        rightSide.rightSideElement.appendChild(friend);

        this.friendsArray.forEach((item, i) => {
            if (item.id === parseInt(friendId)) {
                const movedFriend = this.friendsArray.splice(i, 1);
                
                rightSide.friendsArray = [...rightSide.friendsArray, ...movedFriend];
            }
        });
    }
};

let rightSide = {
    friendsArray: [],
    rightSideElement: document.querySelector('#friends-right'),
    readFromStorage: function() {
        this.friendsArray = JSON.parse(storage.friendsRightList || '[]');
    },
    saveToStorage: function() {
        storage.friendsRightList = JSON.stringify(this.friendsArray);
    },
    getFriendsLists: function() {
        return this.friendsArray;
    },
    setFriendsLists: function(array) {
        this.friendsArray = array.slice();
    },
    renderTemplate: function(list = this.friendsArray) {
        const template = require('../friends.hbs');

        this.rightSideElement.innerHTML = template({
            items: list
        });
    },
    isMatching: function(full, chunk) {
        full = full.toLowerCase();
        chunk = chunk.toLowerCase();
        if (~full.indexOf(chunk)) {
            return true;
        }

        return false;
    },
    friendsFilter: function(input) {
        let subStr = input.value;

        if (!subStr) {
            this.renderTemplate();
        } else {
            let filteredFriends = [];

            this.friendsArray.forEach(item => {
                if (
                    this.isMatching(item.first_name, subStr) ||
          this.isMatching(item.last_name, subStr) ||
          this.isMatching(`${item.first_name} ${item.last_name}`, subStr)
                ) {
                    filteredFriends.push(item);
                }
            });
            this.renderTemplate(filteredFriends);
        }
    },
    moveFriend: function(friend) {
        const friendId = friend.dataset.id;

        friend.classList.remove('right');
        friend.remove();
        leftSide.rightSideElement.appendChild(friend);

        this.friendsArray.forEach((item, i) => {
            if (item.id === parseInt(friendId)) {
                const movedFriend = this.friendsArray.splice(i, 1);
                
                leftSide.friendsArray = [...leftSide.friendsArray, ...movedFriend];
            }
        });
    }
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
        storage.VKfriends = JSON.stringify(friends.items);

        leftSide.readFromStorage();
        rightSide.readFromStorage();

        if (
            leftSide.friendsArray.length === 0 &&
      rightSide.friendsArray.length === 0
        ) {
            leftSide.setFriendsLists(friends.items);
        }

        leftSide.renderTemplate();
        rightSide.renderTemplate();
    });

filter.addEventListener('keyup', e => {
    const target = e.target;

    if (target.matches('#filter-left')) {
        leftSide.friendsFilter(target);
    } else if (target.matches('#filter-right')) {
        rightSide.friendsFilter(target);
    }
});

mainContent.addEventListener('click', e => {
    const target = e.target;

    if (target.matches('.friend__plus')) {
        const friend = target.closest('.friend');

        if (friend.classList.contains('right')) {
            rightSide.moveFriend(friend);
        } else {
            leftSide.moveFriend(friend);
        }
    }
    leftSide.friendsArray;
    rightSide.friendsArray;
});

saveButton.addEventListener('click', () => {
    console.log(leftSide.friendsArray);

    leftSide.saveToStorage();
    rightSide.saveToStorage();
});
