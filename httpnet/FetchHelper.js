import { Brewery } from "../models/Brewery";

export default class FetchHelper {
    
    fetchBreweries(keyword) {
        console.log(keyword);
        fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDiooLoAXwvs42CPdgVKhqRwjqiUHok8gs&location=33.753746,-84.386330&radius=10000&name=brewery&keyword=' + keyword)
            .then((response) => response.json().then(data => {
                res = []
                var results = JSON.parse(JSON.stringify(data)).results;
                results.forEach((val) => {
                    var b = new Brewery();
                    b.merge(val);
                    res.push(b);
                });
                return res;
            }));
    }
}