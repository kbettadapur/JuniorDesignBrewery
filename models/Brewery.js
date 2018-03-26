export default class Brewery {
    name = "";
    latitude = 0;
    longitude = 0;
    placeId = "";
    genRating = 0;
    price = 0;
    photo = null;

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