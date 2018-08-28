let storage = localStorage;

const filter = document.querySelector('.filter');

const mainContent = document.querySelector('.maincontent');

const saveButton = document.querySelector('.footer__save-button');

let leftSide = {
    friendsArray: [],
    oppositeSide: rightSide,
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
    dragFriend: function(id, moveTo) {
        const friends = this.leftSideElement.querySelectorAll('.friend');
        const rightFriends = rightSide.rightSideElement.querySelectorAll('.friend');

        for (let friend of friends) {
            if (friend.dataset.id == id) {
                friend.classList.toggle('right');

                for (let rightFriend of rightFriends) {
                    if (rightFriend.dataset.id == moveTo) {
                        rightSide.rightSideElement.insertBefore(friend, rightFriend);
                    } else if (!moveTo) {
                        rightSide.rightSideElement.appendChild(friend);
                    }
                }
            }
        }

        this.friendsArray.forEach((item, i) => {
            if (item.id == id) {
                const movedFriend = this.friendsArray.splice(i, 1);

                if (!moveTo) {
                    moveTo = rightSide.friendsArray.length;
                } else {
                    rightSide.friendsArray.forEach((item, i) => {
                        if (item.id === moveTo) {
                            moveTo = i;
                        }
                    });
                }
                rightSide.friendsArray.splice(moveTo, 0, movedFriend[0]);
            }
        });
    },
    sortFriend(id, moveTo) {
        const friends = this.leftSideElement.querySelectorAll('.friend');

        for (let friend of friends) {
            if (friend.dataset.id == id) {
                for (let moveToFriend of friends) {
                    if (moveToFriend.dataset.id == moveTo) {
                        this.leftSideElement.insertBefore(friend, moveToFriend);
                    } else if (!moveTo) {
                        this.leftSideElement.appendChild(friend);
                    }
                }
            }
        }

        this.friendsArray.forEach((item, i) => {
            if (item.id == id) {
                const movedFriend = this.friendsArray.splice(i, 1);

                if (!moveTo) {
                    moveTo = this.friendsArray.length;
                } else {
                    this.friendsArray.forEach((item, i) => {
                        if (item.id === moveTo) {
                            moveTo = i;
                        }
                    });
                }
                this.friendsArray.splice(moveTo, 0, movedFriend[0]);
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

        const friends = this.rightSideElement.querySelectorAll('.friend');

        for (let item of friends) {
            item.classList.add('right');
        }
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
    dragFriend: function(id, moveTo) {
        const friends = this.rightSideElement.querySelectorAll('.friend');
        const leftFriends = leftSide.leftSideElement.querySelectorAll('.friend');

        for (let friend of friends) {
            if (friend.dataset.id == id) {
                friend.classList.toggle('right');

                for (let leftFriend of leftFriends) {
                    if (leftFriend.dataset.id == moveTo) {
                        leftSide.leftSideElement.insertBefore(friend, leftFriend);
                    } else if (!moveTo) {
                        leftSide.leftSideElement.appendChild(friend);
                    }
                }
            }
        }

        this.friendsArray.forEach((item, i) => {
            if (item.id == id) {
                const movedFriend = this.friendsArray.splice(i, 1);

                if (!moveTo) {
                    moveTo = leftSide.friendsArray.length;
                } else {
                    leftSide.friendsArray.forEach((item, i) => {
                        if (item.id === moveTo) {
                            moveTo = i;
                        }
                    });
                }
                leftSide.friendsArray.splice(moveTo, 0, movedFriend[0]);
            }
        });
    },
    sortFriend(id, moveTo) {
        const friends = this.rightSideElement.querySelectorAll('.friend');

        for (let friend of friends) {
            if (friend.dataset.id == id) {
                for (let moveToFriend of friends) {
                    if (moveToFriend.dataset.id == moveTo) {
                        this.rightSideElement.insertBefore(friend, moveToFriend);
                    } else if (!moveTo) {
                        this.rightSideElement.appendChild(friend);
                    }
                }
            }
        }

        this.friendsArray.forEach((item, i) => {
            if (item.id == id) {
                const movedFriend = this.friendsArray.splice(i, 1);

                if (!moveTo) {
                    moveTo = this.friendsArray.length;
                } else {
                    this.friendsArray.forEach((item, i) => {
                        if (item.id === moveTo) {
                            moveTo = i;
                        }
                    });
                }
                this.friendsArray.splice(moveTo, 0, movedFriend[0]);
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
            rightSide.dragFriend(friend.dataset.id);
        } else {
            leftSide.dragFriend(friend.dataset.id);
        }
    }
    leftSide.friendsArray;
    rightSide.friendsArray;
});

saveButton.addEventListener('click', () => {
    leftSide.saveToStorage();
    rightSide.saveToStorage();
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

    if (!e.target.matches('.friend')) {
        return;
    }

    let placeholder = document.createElement('div');
    let placeholders = document.querySelectorAll('.placeholder');

    Array.from(placeholders).forEach(placeholder => {
        placeholder.remove();
    });

    placeholder.classList.add('placeholder');

    let friend = e.target.closest('.friend');

    if (e.offsetY <= friend.offsetHeight / 2) {
        friend.parentElement.insertBefore(placeholder, friend);
    } else {
        if (friend.nextElementSibling) {
            friend.parentElement.insertBefore(placeholder, friend.nextElementSibling);
        } else {
            friends.appendChild(placeholder);
        }
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
        moveToId = parseInt(placeholder.previousElementSibling.dataset.id);
    }

    if (e.target.closest('.maincontent__right')) {
        if (e.target.closest(`#${startSide}`)) {
            rightSide.sortFriend(id, moveToId);
        } else {
            leftSide.dragFriend(id, moveToId);
        }
    } else if (e.target.closest('.maincontent__left')) {
        if (e.target.closest(`#${startSide}`)) {
            leftSide.sortFriend(id, moveToId);
        } else {
            rightSide.dragFriend(id, moveToId);
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
