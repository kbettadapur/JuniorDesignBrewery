export default class Brewery {
    name;
    latitude;
    longitude;
    placeId;
    genRating;

    merge(res) {
        this.name = res.name;
        this.latitude = res.geometry.location.lat;
        this.longitude = res.geometry.location.lng;
        this.placeId = res.place_id;
        this.genRating = res.rating;
    }
}