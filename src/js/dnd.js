import { isMatching } from './filter';

let dragFriend = function(id, moveTo, oppositeSide) {
    const friends = this.sideElement.querySelectorAll('.friend');
    const oppositeSideFriends = oppositeSide.sideElement.querySelectorAll(
        '.friend'
    );
    const subStr = this.filter.value;
    let filterOk = true;

    this.friendsArray.forEach((item, i) => {
        if (item.id == id) {
            if (subStr) {
                if (
                    !isMatching(item.first_name, subStr) ||
          !isMatching(item.last_name, subStr) ||
          !isMatching(`${item.first_name} ${item.last_name}`, subStr)
                ) {
                    filterOk = false;
                }
            }
        }
    });

    for (let friend of friends) {
        if (friend.dataset.id == id) {
            friend.classList.toggle('right');

            if (filterOk) {
                if (oppositeSideFriends.length === 0 || !moveTo) {
                    oppositeSide.sideElement.appendChild(friend);
                } else {
                    for (let oppositeSideFriend of oppositeSideFriends) {
                        if (oppositeSideFriend.dataset.id == moveTo) {
                            oppositeSide.sideElement.insertBefore(friend, oppositeSideFriend);
                        }
                    }
                }
            } else {
                friend.remove();
            }
        }
    }

    this.friendsArray.forEach((item, i) => {
        if (item.id == id) {
            const movedFriend = this.friendsArray.splice(i, 1);

            if (!moveTo) {
                moveTo = oppositeSide.friendsArray.length;
            } else {
                oppositeSide.friendsArray.forEach((item, i) => {
                    if (item.id === moveTo) {
                        moveTo = i;
                    }
                });
            }
            oppositeSide.friendsArray.splice(moveTo, 0, movedFriend[0]);
        }
    });
};

let sortFriend = function(id, moveTo) {
    const friends = this.sideElement.querySelectorAll('.friend');

    for (let friend of friends) {
        if (friend.dataset.id == id) {
            for (let moveToFriend of friends) {
                if (moveToFriend.dataset.id == moveTo) {
                    this.sideElement.insertBefore(friend, moveToFriend);
                } else if (!moveTo) {
                    this.sideElement.appendChild(friend);
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
};

export { dragFriend, sortFriend };
