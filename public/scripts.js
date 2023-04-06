const Backbone = require('backbone');

const Person = Backbone.Model.extend({
    defaults: {
        name: 'John',
        age: 30
    }
});

const john = new Person();
console.log(john.toJSON());