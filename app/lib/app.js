class App {
    constructor(selector) {
        this.appElement = document.querySelector(selector);
        this.componentByName = {};
    }
    // keep all components inside the app obj and use name as the key
    addComponent(component) {
        this.componentByName[component.name] = component;
    }
}