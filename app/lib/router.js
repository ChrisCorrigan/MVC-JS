// router object accepts the app object as a parameter
class Router {
    constructor(app) {
        // put app on the instance of the router
        this.app = app;
        this.routes = [];

        // Browsers have a hash change event that detects when a url changes
        // We will set an event listener so we can action this change
        // - issue with 'this context: 
        // we have to bind the 'this' of the router to this.hashChange otherwise
        // it will get called in the 'this context of the window

        // 2 ways to do this - bind this to the this.hasChange property first, 
        // or (I prefer) when it gets passed to the event listener

        // Method one: 
        this.hashChange = this.hashChange.bind(this);
        window.addEventListener('hashchange', this.hashChange);
        // on initial loading of browser window, hashChange event hasn't fired yet, 
        // so also add listener when dom content is loaded
        window.addEventListener('DOMContentLoaded', this.hashChange);

        // Method 2: 
        //window.addEventListener('hashchange', this.hashChange.bind(this));
        // window.addEventListener('DOMContent', this.hashChange.bind(this));
        
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

        const route = this.routes.filter(route => hash.match(new RegExp(route.url)))[0];

        if(route) {
            this.params = new RegExp(route.url).exec(hash);
            this.app.showComponent(route.name);
        } else {
            // console.log('no route');
            this.app.showComponent();
        }
    }
}
    