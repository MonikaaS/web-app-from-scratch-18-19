(function () {
    "use strict";

    //router
    var router = {
        overview: function () {
            api.get().then(data => {
                routie("/", () => {
                    render.overview(data);
                    console.log("dit is de home");
                });
            });
            routie("/");
        },
        detail: function () {
            routie("/:id", id => {
                render.detail(id);
                console.log("dit is de detail");
            });
        }
    };

    //api
    var api = {
        get: function () {
            return new Promise(function (resolve, reject) {
                var url = "https://api.got.show/api/houses/";

                var request = new XMLHttpRequest();
                request.open("GET", url, true);

                request.onload = id => {
                    if (request.status >= 200 && request.status < 400) {
                        // Success!
                        var data = JSON.parse(request.responseText);
                        resolve(data);

                        router.detail(id);
                        console.log(data);
                    } else {
                        // We reached our target server, but it returned an error
                        reject(error);
                    }
                };

                request.onerror = () => {
                    // There was a connection error of some sort
                    console.log("error");
                };

                request.send();
            });
        }
    };

    //render
    var render = {
        overview: data => {
            var app = document.getElementById("container");
            app.innerHTML = ''

            data.forEach((house, i) => {
                var html = `
                <div class="card">
                <a href="${
                  "#/" +
                  house._id}">${house.name}</a>
                <p>region: ${
                  house.region == undefined ? "no region" : house.region
                }</p>
                </div>`;
                app.insertAdjacentHTML("beforeend", html);
            });
        },
        detail: function (id) {
            var app = document.getElementById("container");
            app.innerHTML = ''
            console.log(id);
            var html = `
                <div class="card">
                <p>${id._id}</p>
                <p>region: ${
                  id.region == undefined ? "no region" : id.region
                }</p>
                <p>region: ${
                  id.coatOfArms == undefined ? "no coat of arms" : id.coatOfArms
                }</p>
                </div>`;
            app.insertAdjacentHTML("beforeend", html);
        }
    };

    // start the application
    router.overview();
})();