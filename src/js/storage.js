let readFromStorage = function(storage) {
    this.friendsArray = JSON.parse(storage || '[]');
};

let saveToStorage = function() {
    let storage = JSON.stringify(this.friendsArray);

    return storage;
};

export { readFromStorage, saveToStorage };
