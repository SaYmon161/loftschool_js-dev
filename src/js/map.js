import baloonTemplate from '../templates/baloon.hbs';
import { generateComments } from '../js/generateComments';
import { createPlacemark } from '../js/createPlacemark';

let placemarkArr = [];

function mapInit() {
    ymaps.ready(() => {
        let myMap = new ymaps.Map(
            'map',
            {
                center: [47.2221092, 39.718555924],
                zoom: 15,
                behaviors: ['default', 'scrollZoom']
            },
            {
                searchControlProvider: 'yandex#search'
            }
        );

        myMap.events.add('click', function(e) {
            let clickCoords = e.get('coords');
            let myGeoCoder = ymaps.geocode(clickCoords);
            let position = e.get('position');

            myGeoCoder.then(res => {
                let obj = new Object();

                obj.coords = clickCoords;
                obj.address = res.geoObjects.get(0).properties.get('text');
                obj.comments = [];

                openBaloon(obj, position);
            });
        });

        myMap.geoObjects.events.add('click', e => {
            const marker = e.get('target');
            const type = marker.properties.get('type');
            const markerCoords = marker.geometry.getCoordinates();
            let position = e.get('position');

            if (type === 'geoMarker') {
                e.preventDefault();

                for (let item of placemarkArr) {
                    if (
                        item.coords[0] === markerCoords[0] &&
            item.coords[1] === markerCoords[1]
                    ) {
                        openBaloon(item, position);
                    }
                }
            }
        });

        let customItemContentLayout = ymaps.templateLayoutFactory.createClass(
            '<h2 class=baloon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
        '<div class=baloon_body>{{ properties.balloonContentBody|raw }}</div>' +
        '<div class=baloon_footer>{{ properties.balloonContentFooter|raw }}</div>',
            {
                build: function() {
                    customItemContentLayout.superclass.build.call(this);

                    let parent = this.getParentElement();
                    let link = parent.querySelector('.baloon-link');

                    link.addEventListener('click', this.onLinkClick.bind(link));
                },
                clear: function() {
                    let parent = this.getParentElement();
                    let link = parent.querySelector('.baloon-link');

                    link.removeEventListener('click', this.onLinkClick.bind(link));
                    customItemContentLayout.superclass.clear.call(this);
                },

                onLinkClick: function(e) {
                    const position = [];
                    const lat = parseFloat(this.dataset.lat);
                    const long = parseFloat(this.dataset.long);

                    position.push(e.pageX);
                    position.push(e.pageY);
                    clusterer.balloon.close();

                    for (let item of placemarkArr) {
                        if (item.coords[0] === lat && item.coords[1] === long) {
                            openBaloon(item, position);
                        }
                    }
                }
            }
        );

        const clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedOrangeClusterIcons',
            clusterBalloonContentLayout: 'cluster#balloonCarousel',
            clusterBalloonItemContentLayout: customItemContentLayout,
            clusterBalloonPanelMaxMapArea: 0,
            clusterBalloonContentLayoutWidth: 200,
            clusterBalloonContentLayoutHeight: 130,
            clusterBalloonPagerSize: 5,
            groupByCoordinates: false,

            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
        });

        function openBaloon(object, position) {
            const baloon = document.querySelector('.baloon');

            let windowWidth = window.innerWidth;
            let windowHeight = window.innerHeight;

            let baloonWidth = baloon.offsetWidth;
            let baloonHeight = baloon.offsetHeight;

            baloon.style.left = `${position[0] + 15}px`;
            baloon.style.top = `${position[1] - 15}px`;

            if (position[0] + baloonWidth > windowWidth) {
                baloon.style.left = `${position[0] - baloonWidth - 15}px`;
            }

            if (position[1] + baloonHeight > windowHeight) {
                baloon.style.top = `${windowHeight - baloonHeight}px`;
            }

            baloon.classList.remove('hidden');
            baloon.innerHTML = baloonTemplate(object);
            generateComments(object.comments);

            const save = document.querySelector('#save');

            save.addEventListener('click', e => {
                e.preventDefault();

                addFeedback(object);

                generateComments(object.comments);
            });

            const close = document.querySelector('.close');

            close.addEventListener('click', () => {
                baloon.innerHTML = '';

                baloon.classList.add('hidden');
            });
        }

        function addFeedback(object) {
            const form = document.querySelector('.form');
            let comment = new Object();

            if (
                form.name.value == '' ||
        form.place.value == '' ||
        form.feedback.value == ''
            ) {
                alert('Все поля должны быть заполнены!!!');
            } else {
                comment.name = form.name.value;
                comment.place = form.place.value;
                comment.feedback = form.feedback.value;
                const dateNow = new Date();

                form.reset();

                comment.date = `${dateNow.getDate()}.${dateNow.getUTCMonth() +
          1}.${dateNow.getFullYear()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;
                object.comments.push(comment);

                let newPlacemark = createPlacemark(object, comment);

                clusterer.add(newPlacemark);

                myMap.geoObjects.add(clusterer);

                placemarkArr.push(object);
            }
        }
    });
}

export { mapInit };
