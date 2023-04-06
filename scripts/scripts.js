const Backbone = require("libs/backbone.js");

let Person = Backbone.Model.extend({

    default:{
        name: "John",
        Age: "33"
    }

});


let john = new Person();
