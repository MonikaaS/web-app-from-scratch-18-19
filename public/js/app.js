(function () {
    // voorbeeld gebruikt van razpudding on codepen: https://codepen.io/Razpudding/pen/wNZoNQ
    'use strict'

    var app = {
        init: function () {
            console.log('App: Init')
            router.handle()
        },
        settings: {
            url: 'https://api.got.show/api/houses/'
        }
    }

    var routes = { // Hier worden de pagina's per route gerenderd, de juiste data wordt hier opgehaald en eventueel gefilterd
        overview: function () {
            render.loader()
            console.log('Routes: overview')
            if (window.localStorage.length !== 0) {
                console.log('er is localStorage')
                var data = JSON.parse(localStorage.getItem('data'))
                render.overview(data)
            } else {
                console.log('geen localStorage')
                api.get().then(function (data) {
                        render.overview(data)
                    })
                    .catch(function (error) { //als de url ophalen mislukt, maar werkt niet echt goed
                        // TODO: Handle your error!
                        console.log(error)
                    })
            }
        },
        detail: function (id) {
            render.loader()
            console.log('Routes: detail')
            if (window.localStorage.length !== 0) {
                console.log('er is localStorage')
                var data = JSON.parse(localStorage.getItem('data'))
                var specificId = data.filter(function (item) {
                    return item.id == id
                })
                render.detail(specificId)
            } else { //dit werkt niet als er geen localstorage is
                api.get().then(function (data) {
                        console.log('geen localStorage')
                        console.log(data)
                        var specificId = data.filter(function (item) {
                            return item.id == id
                        })
                        render.detail(specificId)
                    })
                    .catch(function (error) { //als de url ophalen mislukt, maar werkt niet echt goed
                        // TODO: Handle your error!
                        console.log(error)
                    })
            }
        }
    }
    //api
    var api = {
        get: function (data) {
            return this.call(data)
            // hier wilde ik mijn local storage gaan fixen met een if else, maar dat werkt niet want ik krijg een api.get()...then is not a function in mn routes
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

                        api.store(data)
                        resolve(data)
                    } else { //status code moet ik nog doorgeven????
                        // We reached our target server, but it returned an error
                        reject(error)
                    }
                }

                request.onerror = function () {
                    // There was a connection error of some sort
                    //werkt nog niet helemaal
                    console.log('error')
                }
                request.send()
            })
        },
        parse: function (parseData) {
            var data
            try {
                data = JSON.parse(parseData)
                //data parsen is gelukt, dus return data
            } catch (err) {
                return err
                //als 't fout gaat catcht ie 'm!
            }
            return data
        },
        store: function (data) { //clean je data en store t in local storage
            var cleanedData = data.map(function (data) {
                return {
                    id: (data._id == undefined) ? 'no id' : data._id,
                    name: (data.name == undefined) ? 'no name' : data.name,
                    title: (data.title == undefined) ? 'no title' : data.title,
                    currentLord: (data.currentLord == undefined) ? 'no current lord' : data.currentLord,
                    overlord: (data.overlord == undefined) ? 'no overlord' : data.overlord,
                    coatOfArms: (data.coatOfArms == undefined) ? 'no coat of arms' : data.coatOfArms,
                    region: (data.region == undefined) ? 'no region' : data.region
                }
            })

            return localStorage.setItem('data', JSON.stringify(cleanedData))
        }
    }

    //render pagina's met template literals | hier niet je data gaan opschonen!
    var render = {
        overview: function (data) {
            var app = document.getElementById('container')
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
            var app = document.getElementById('container')
            app.innerHTML = ''

            console.log(id)
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
            var app = document.getElementById('container')
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
        }
    }

    //router beneden gezet, omdat anders de andere functies niet defined zijn
    //Hier worden de routes gehandeld en door naar routes verwezen
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