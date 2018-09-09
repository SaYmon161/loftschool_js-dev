export function createPlacemark(object, comment) {
    const placemark = new ymaps.Placemark(object.coords);

    placemark.properties.set('type', 'geoMarker');

    if (comment) {
        placemark.properties.set('balloonContentHeader', `${comment.place}`);
        placemark.properties.set(
            'balloonContentBody',
            `<a href="#" data-lat="${object.coords[0]}" data-long="${
                object.coords[1]
            }" class="baloon-link">    ${object.address}    <a>    <br>    ${
                comment.feedback
            }`
        );
        placemark.properties.set('balloonContentFooter', `${comment.date}`);
    }

    return placemark;
}
