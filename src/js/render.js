import template from '../templates/friends.hbs';

let renderTemplate = function(list = this.friendsArray) {
    this.sideElement.innerHTML = template({
        items: list
    });

    if (this.sideElement.matches('#friends-right')) {
        const friends = this.sideElement.querySelectorAll('.friend');

        for (let item of friends) {
            item.classList.add('right');
        }
    }
};

export { renderTemplate };
