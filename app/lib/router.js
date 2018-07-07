// router object accepts the app object as a parameter
class Router {
    constructor(app) {
        // put app on the instance of the router
        this.app = app;
        this.routes = [];

        // we have to bind the 'this' of the router to this.hashChange because 
        // otherwise it will be 'this' of the window object when we add it to
        // the event listener below
        this.hashChange = this.hashChange.bind(this);

        // Browsers have a hash change event that detects when a url changes
        window.addEventListener('hashchange', this.hashChange);
    }
    // addRoute accepts name of component and url, stores routes into the 
    // router so it can find the new url when the url changes
    // each route we add gets pushed into the routes array
    addRoute(name, url) {
        this.routes.push({
            name,
            url
        })
    }
    hashChange() {
        // get the hash value from the location object 
        const hash = window.location.hash;
        // iterate over all routes, find the route where the hash matches 
        // the route url from routes (this will be the route to use to show)
        console.log(this);

        const route = this.routes.filter(route => hash.match(new RegExp(route.url)))[0];
        console.log(route);
    }
}
