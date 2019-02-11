//promise example used from: https://scotch.io/tutorials/javascript-promises-for-dummies, https://codepen.io/joostf/pen/OQxpxx
(function () {
    'use strict'
    // set variables
    var url = 'https://api.got.show/api/houses/';
    var app = document.getElementById('container')

    // render data
    var render = data => {
        data.forEach((house, i) => {
            var html = `
            <div class="card">
            <a href='/#${house._id}'>${house.name}</a>
            <p>region: ${house.region == undefined ? "no region" : house.region}</p>
            </div>`;
            app.insertAdjacentHTML('beforeend', html);

        });
    }

    var loadData = new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true)

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var data = JSON.parse(request.responseText);
                resolve(data);
            } else {
                // We reached our target server, but it returned an error
                reject(error);
            }
        };

        request.onerror = () => {
            // There was a connection error of some sort
            console.log('error')
        };

        request.send();
    });

    loadData.then(data => {
        render(data);
    });

    routie('data._id', function () {
        console.log('het werkt')
    });

})();