//router

var router = {
    overview: function () {
        //stap 2
        api.get("overview");
    },
    detail: function (id) {}
};

//api
var api = {
    get: function (route) {
        //stap 3
        // fetch data from api
        this.parse(data); // this == api
    },
    store: function () {
        //stap 5
        //save data to object || localstorage
        render.overview(data);
    },
    parse: function (response) {
        //response omzetten naar objecten
        //stap 4
        this.store();
    },
    filter: function () {}
};

//render
var render = {
    overview: function (data) {},
    detail: function () {},
    overview: function (data) {}
};

//stap 1
// start applicatie
router.overview();