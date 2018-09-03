import { renderTemplate } from './render';

let isMatching = function(full, chunk) {
    full = full.toLowerCase();
    chunk = chunk.toLowerCase();
    if (~full.indexOf(chunk)) {
        return true;
    }

    return false;
};

let friendsFilter = function(input) {
    let subStr = input.value;

    if (!subStr) {
        renderTemplate.call(this);
    } else {
        let filteredFriends = [];

        this.friendsArray.forEach(item => {
            if (
                isMatching(item.first_name, subStr) ||
        isMatching(item.last_name, subStr) ||
        isMatching(`${item.first_name} ${item.last_name}`, subStr)
            ) {
                filteredFriends.push(item);
            }
        });
        renderTemplate.call(this, filteredFriends);
    }
};

export { friendsFilter, isMatching };
