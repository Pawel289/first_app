
let PersonDetails=Backbone.View.extend({
    tagName:"div",
    className:"client-details",

    template: _.template($("#personDetailsTemplate").html()),

    render:function(){

        let html = this.template(this.model.toJSON());
        this.$el.html(html);

        $("body").append(this.el);

    }
});
let Vent = _.extend({}, Backbone.Events);  //własne zdarzenie - wszystkie metody i właściwości z Backbone.Events zostaną przekopiowane na obiekt {} i zwrócone do Vent

Vent.on("update", function(model){

    alert(model.get("name")+ " został zaktualizowany");

});

let Person = Backbone.Model.extend({

    initialize: function (){
        this.on("change",function(){
            Vent.trigger("update",this);
        });
    },

    validate: function (attrs,options){
        if(attrs.name === ""){
            return "Imię nie może być puste";
        }
    }

});

let People = Backbone.Collection.extend({

    model: Person,
    url: "/clients",
    initialize: function(){
        this.fetch({reset:true});
    }

    /* sortowanie
    comparator: function(a,b){

        if(a.get("hobbies").length < b.get("hobbies").length){
            return -1;
        }else{
            return 1;
            }

    }*/
});

//widok dla poszczególnych elementów

let PersonView = Backbone.View.extend({

   tagName: "li",
   template: _.template($("#personTemplate").html()),    //_. odwołanie do funkcji underscore.js

    initialize: function(){
        this.listenTo(this.model, "remove", function(){
            this.remove();
        });
        this.listenTo(this.model,"change",this.render);

        this.listenTo(this.model, "invalid", function(model, error, options){
            console.log(error);
        });
    },

    render: function(){

       let html = this.template(this.model.toJSON());
       this.$el.html(html);


       return this;
    },

    events: {
        "click": "redirectToDetails"
    },

    redirectToDetails: function (){
       router.navigate("client/"+this.model.get("id"),{trigger:true});
    }

    /*
    events: {
        "click strong": "changeColor"
    },
    changeColor: function() {

       this.$("strong").css("color", "red");      // $el - li napisane w JQUERY   el - element li natywnie pobrany w JS


    }*/

});


//widok dla całej kolekcji

let PeopleView = Backbone.View.extend({
   tagName: "ul",

   initialize: function(){
     this.listenTo(this.collection, "add", this.render)
   },

   render:function(){
       this.$el.empty();
       this.collection.each(this.addOne,this);
       $("body").append(this.el);
       return this;
   },

   addOne: function(model){
       let view = new PersonView({model: model});

       this.$el.append(view.render().el);

   }

});

let people = new People(
    [
        {
            id: 1,
            name: "John",
            age: "33",
            hobbies: ["golf", "cars"]
        },
        {
            id: 2,
            name: "Alice",
            age: "31",
            hobbies: ["IT", "cars"]
        },
        {
            id: 3,
            name: "Kasia",
            age: "28",
            hobbies: ["sex"]
        }
    ]


);

let peopleView= new PeopleView({collection:people});
peopleView.render();

let Router = Backbone.Router.extend({


    //inny sposób routingu, możemy korzystać z wyrażeń rególarnych w js
    /*initialize:function(){
      this.route("client/:id","client-details",this.showClientDetails());
    },*/

    routes:{
        "client/:id": "showClientDetails"  //  /: dynamiczne parametry  (/:) parametr opcjonalny
    },

    showClientDetails: function(id){
        let model = people.get(id);
        let view=new PersonDetails({model:model});
        view.render();
    }
});

let router = new Router();
Backbone.history.start({pushState:true}); //pushState:true -zmienia adres URL ale nie wysyła żądania do serwera


/*
people.each(function(model){
    console.log(model.get("name"));
});*/
/*
people.max(function(model)
{
    console.log(model.get("age"));
});
*/
