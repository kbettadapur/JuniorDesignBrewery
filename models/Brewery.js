export default class Brewery {
    name;
    latitude;
    longitude;
    placeId;
    genRating;
    price;
    photo;

    merge(res) {
        this.name = res.name;
        this.latitude = res.geometry.location.lat;
        this.longitude = res.geometry.location.lng;
        this.placeId = res.place_id;
        this.genRating = res.rating;
        this.price = res.price_level;
        this.photo = res.photos[0].photo_reference;
    }
}