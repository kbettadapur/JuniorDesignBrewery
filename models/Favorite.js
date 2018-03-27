export default class Favorite {
    name = "";
    id = "";
    latitude = 0;
    longitude = 0;
    photo = null;

    merge(res) {
        this.name = res.name;
        this.id = res.id;
        this.latitude = res.latitude;
        this.longitude = res.longitude;
        this.photo = res.photo;
    }
}