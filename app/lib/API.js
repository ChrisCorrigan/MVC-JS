class API {
    constructor() {
        this.API_URL = 'https://barkwire-api.now.sh/dogs';
    }
    getDogs() {
        // fetch is built into the browser API
        return fetch(this.API_URL)
            .then(res => res.json());
    }
    getDog(id) {
        return fetch(`${this.API_URL}/${id}`)
            .then(res => res.json());
    }
}