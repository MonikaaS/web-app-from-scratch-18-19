(function () {
    "use strict"

    //api
    var api = {
        get: function () {
            return new Promise(function (resolve, reject) {
                var url = "https://api.got.show/api/houses/"

                var request = new XMLHttpRequest()
                request.open("GET", url, true)

                request.onload = function () {
                    if (request.status >= 200 && request.status < 400) {
                        // Success!
                        var data = JSON.parse(request.responseText)
                        resolve(data)
                    } else {
                        // We reached our target server, but it returned an error
                        reject(error);
                    }
                }

                request.onerror = function () {
                    // There was a connection error of some sort
                    console.log("error")
                }

                request.send();
            })
        }
    }

    //render
    var render = {
        overview: function (data) {
            var app = document.getElementById("container");
            app.innerHTML = ''

            data.forEach(function (house) {
                var html = `
                <div class="card">
                <a href="${"#/" + house._id}">${house.name}</a>
                <p>region: ${
                  house.region == undefined ? "no region" : house.region
                }</p>
                </div>`
                app.insertAdjacentHTML("beforeend", html)
            })
        },
        detail: function (id) {
            var app = document.getElementById("container");
            app.innerHTML = ''

            console.log(id)

            id.forEach(function (id) {
                var html = `
                <div class="card">
                <h2>${id.name}</h2>
                <p>title: ${
                    id.title == undefined ? "no title" : id.title
                }</p>
                <p>current lord: ${
                    id.currentLord == undefined ? "no current lord" : id.currentLord
                }</p>
                <p>overlord: ${
                    id.overlord == undefined ? "no overlord" : id.overlord
                }</p>
                <p>region: ${
                    id.region == undefined ? "no region" : id.region
                }</p>
                <p>coat of arms: ${
                    id.coatOfArms == undefined ? "no coat of arms" : id.coatOfArms
                }</p>
                </div>`
                app.insertAdjacentHTML("beforeend", html)
            })
        }
    }

    //routie
    routie({
        '/': function () {
            api.get().then(function (data) {
                render.overview(data)
                console.log("dit is de home")
            })
        },
        '/:id': function (id) {
            api.get().then(function (data) {
                var specificId = data.filter(function (item) {
                    return item._id == id
                })

                render.detail(specificId);
                console.log("dit is de detail")
            })
        }
    })
})()