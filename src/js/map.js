function mapInit() {
    ymaps.ready(() => {
        let myMap = new ymaps.Map('map', {
            center: [47.2221092, 39.718555924],
            zoom: 15
        });

        let BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="baloon">' +
        '<div class="baloon__header">' +
        'Невский пр., 78, Санкт-Петербург, 191025' +
        '</div>' +
        '<div class="feedback">' +
        '<ul class="feedback__list">' +
        '<li class="feedback__item">' +
        '<div class="feedback__info">' +
        '<span class="feedback__name">svetlana</span>' +
        '<span class="feedback__place">Шоколадница</span>' +
        '<span class="feedback__date">13.12.2015</span>' +
        '</div>' +
        '<div class="feedback__text">' +
        'Очень хорошее место!' +
        '</div>' +
        '</li>' +
        '<li class="feedback__item">' +
        '<div class="feedback__info">' +
        '<span class="feedback__name">Сергей Мелюков</span>' +
        '<span class="feedback__place">Красный куб</span>' +
        '<span class="feedback__date">13.12.2015</span>' +
        '</div>' +
        '<div class="feedback__text">' +
        'Очень хорошее место!' +
        '</div>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<br>' +
        '<div class="baloon__form">' +
        '<form action="POST" class="form">' +
        '<h1 class="form__title">ВАШ ОТЗЫВ</h1>' +
        '<input type="text" class="form__name" placeholder="Ваше имя">' +
        '<input type="text" class="form__place" placeholder="Укажите имя">' +
        '<textarea name="feedback" id="" cols="30" rows="10" class="form__textarea" placeholder="Поделитесь впечатлениями"></textarea>' +
        '<button class="form__btn">Добавить</button>' +
        '</form>' +
        '</div>' +
        '</div>'
        );

        myMap.events.add('click', function(e) {
            let coords = e.get('coords');

            myMap.balloon.open(
                coords,
                {},
                {
                    balloonContentLayout: BalloonContentLayout
                }
            );
        });

        let clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedVioletClusterIcons',
            clusterDisableClickZoom: true,
            openBalloonOnClick: false
        });

        myMap.geoObjects.add(clusterer);
    });
}

export { mapInit };
