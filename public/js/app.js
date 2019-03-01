(function () {
    'use strict'

    var app = {
        init: function () {
            console.log('App: Init');
            router.handle();
        },
        settings: {
            url: 'https://api.got.show/api/houses/'
        }
    }

    const routes = { // This defines routes. It will be the place to request the proper data, and process any additional stuff with that data (filtering, sorting etc)
        overview: function () {
            console.log('Routes: overview');
            if (window.localStorage.length !== 0) {
                console.log("er is localStorage");
                var data = JSON.parse(localStorage.getItem("data"));
                render.overview(data);
            } else {
                render.loader()
                console.log("geen localStorage")
                api.get().then(function (data) {
                        render.overview(data)
                        return data;
                    })
                    .catch(function (error) {
                        // TODO: Handle your error!
                        // Did your loader stop?
                    })
            }
        },
        detail: function (id) {
            console.log('Routes: detail')
            if (window.localStorage.length !== 0) {
                console.log("er is localStorage")
                var data = JSON.parse(localStorage.getItem("data"))
                var specificId = data.filter(function (item) {
                    return item.id == id
                })
                render.detail(specificId)
            } else {
                render.loader()
                api.get().then(function (data) {
                        console.log("geen localStorage")
                        var specificId = data.filter(function (item) {
                            return item.id == id
                        })
                        render.detail(specificId)
                    })
                    .catch(function (error) {
                        // TODO: Handle your error!
                        // Did your loader stop?
                    })
            }
        }
    }
    //api
    var api = {
        get: function (data) {
            return this.call(data);
            // This would be a nice place to fetch data from a local cache or just call the api (if/else)
        },
        call: function () {
            return new Promise(function (resolve, reject) {
                var url = app.settings.url

                var request = new XMLHttpRequest()
                request.open('GET', url, true)

                request.onload = function () {
                    if (request.status >= 200 && request.status < 400) {
                        // Success!
                        var data = api.parse(request.response)

                        var cleanedData = []
                        data.map(function (data) {
                            cleanedData.push({
                                id: (data._id == undefined) ? 'no id' : data._id,
                                name: (data.name == undefined) ? 'no name' : data.name,
                                title: (data.title == undefined) ? 'no title' : data.title,
                                currentLord: (data.currentLord == undefined) ? 'no current lord' : data.currentLord,
                                overlord: (data.overlord == undefined) ? 'no overlord' : data.overlord,
                                coatOfArms: (data.coatOfArms == undefined) ? 'no coat of arms' : data.coatOfArms,
                                region: (data.region == undefined) ? 'no region' : data.region
                            })
                        })
                        api.store(cleanedData);
                        resolve(cleanedData)

                        console.log(cleanedData)
                    } else {
                        // We reached our target server, but it returned an error
                        reject(error);
                    }
                }

                request.onerror = function () {
                    // There was a connection error of some sort
                    console.log('error')
                }

                request.send();
            })
        },
        parse: function (parseData) {
            var data;
            try {
                data = JSON.parse(parseData)
            } catch (err) {
                return err
            }
            return data
        },
        store: function (data) {
            return localStorage.setItem("data", JSON.stringify(data));
        }
    }

    //render
    var render = {
        overview: function (data) {
            var app = document.getElementById('container');
            app.innerHTML = ''

            data.forEach(function (house) {
                var html = `
                <div class='card'>
                <a href='${'#/' + house.id}'>${house.name}</a>
                <p>region: ${house.region}</p>
                </div>`
                app.insertAdjacentHTML('beforeend', html)
            })
        },
        detail: function (id) {
            var app = document.getElementById('container');
            app.innerHTML = ''

            id.forEach(function (id) {
                var html = `
                <div class='card'>
                <h2>${id.name}</h2>
                <p>title: ${id.title}</p>
                <p>current lord: ${id.currentLord}</p>
                <p>overlord: ${id.overlord}</p>
                <p>region: ${id.region}</p>
                <p>coat of arms: ${id.coatOfArms}</p>
                </div>`
                app.insertAdjacentHTML('beforeend', html)
            })
        },
        loader: function () {
            var app = document.getElementById('container');
            app.innerHTML = ''

            console.log('loading')
            var html = `
            <div class='spinner'>
            <div class='rect1'></div>
            <div class='rect2'></div>
            <div class='rect3'></div>
            <div class='rect4'></div>
            <div class='rect5'></div>
          </div>`
            app.insertAdjacentHTML('beforeend', html)
        },
        error: function () {
            var app = document.getElementById('container');
            app.innerHTML = ''

            var html = `
            <h1>Oops! pagina laden niet gelukt</h1>
          </div>`
            app.insertAdjacentHTML('beforeend', html)
        }
    }

    //router beneden gezet, omdat anders de andere functies niet defined zijn
    var router = {
        handle: function () {
            routie({
                '': function () {
                    routes.overview()
                },
                '/:id': function (id) {
                    routes.detail(id)
                }
            })
        }
    }

    app.init()
})()