// create an instance of the App object as our app and pass in the 
// dom element to attach it to
const app = new App('#app');

// create an api object to get data
const api = new API();

const dogTemplate = (dog) => `
<section class="dog-listing">
  <a href="#/dogs/${dog.id}">
    <h3 class="name">${dog.name}</h3>
    <section>
      <figure>
        <img src="${dog.imageUrl}" alt="${dog.name}" />
        <figcaption>${dog.imageCaption}</figcaption>
      </figure>
      <p>${dog.description}</p>
    </section>
  </a>
</section>
`;

// Create a dogs component, pass in name, model, view
// the model will be a dogs array
// view accepts a model and returns an HTML string using the model
app.addComponent({
    name: 'dogs',
    model: {
        dogs: []
    },
    view(model) {
        const dogsHTML = model.dogs.reduce((html, dog) => html + `<li>${dogTemplate(dog)}</li>`, '')
        return `
            <ul class='dog'>
                ${dogsHTML}
            </ul>
        `;
        // template literal (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
        // return `There are ${model.dogs.length} dogs`;
        // return 'There are ' + model.dogs.length + ' dogs';
    },
    controller(model) {
        // whenever app shows a component, it will call the controller function 
        // before updating the view
        // controller accepts model so it can update it
        api
            .getDogs()
            .then(result => {
                console.log('getDogs result: ', result);
                model.dogs = result.dogs;
                app.updateView();
            });
    }
})

app.addComponent({
    name: 'dog',
    model: {
        dog: {}
    }, 
    view(model) {
        return dogTemplate(model.dog)
    },
    controller(model) {
        // get dog by ID
        api
            .getDog(router.params[1])
            .then(result => {
                model.dog = result.dog;
            })
    }
})

// need a Router, pass app in to router so it will know how to 
// switch out components
const router = new Router(app);

// set route using regex to go to dogs component on url /dogs
router.addRoute('dogs', '^#/dogs$');

// route for single dog
router.addRoute('dog', '^#/dogs/([0-9]*)$');

