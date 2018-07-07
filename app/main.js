// create an instance of the App object as our app and pass in the 
// dom element to attach it to
const app = new App('#app');

// Create a dogs component, pass in name, model, view
// the model will be a dogs array
// view accepts a model and returns an HTML string using the model
app.addComponent({
    name: 'dogs',
    model: {
        dogs: []
    },
    view(model) {
        // template literal
        return 'There are ${model.dogs.length} dogs';
    }
})

// need a Router, pass app in to router so it will know how to 
// switch out components
const router = new Router(app);
// set route using regex to go to dogs component on url /dogs
router.addRoute('dogs', '^#/dogs$');

