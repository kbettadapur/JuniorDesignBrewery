export default class Favorite {
    name = "";
    id = "";
    
    merge(res) {
        this.name = res.name;
        this.id = res.id;
    }
}