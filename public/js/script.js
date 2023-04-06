const Person = Backbone.Model.extend({
    defaults: {
        name: '',
        age: 0
    }
});

const People = Backbone.Collection.extend({
    model: Person
});

const people = new People([
    new Person({ name: 'Alice', age: 25 }),
    new Person({ name: 'Bob', age: 30 }),
    new Person({ name: 'Charlie', age: 35 })
]);

const PeopleView = Backbone.View.extend({
    el: '#people',
    initialize: function() {
        this.render();
    },
    render: function() {
        const template = _.template('<li><%= name %> (<%= age %>)</li>');
        this.$el.html(this.collection.map(function(person) {
            return template(person.toJSON());
        }));
    }
});

const peopleView = new PeopleView({ collection: people });