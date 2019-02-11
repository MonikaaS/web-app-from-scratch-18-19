//promise example use from: https://codepen.io/joostf/pen/OQxpxx
(function () {
    // set variables
    const url = 'https://api.got.show/api/houses/';
    const app = document.getElementById('root')

    // render data
    var render = data => {
        data.forEach((house, i) => {
            let html = `<div class="container"><div class="card"><h1>${house.name}</h1><p>${house.region == undefined ? "no region" : house.region}</p></div></div>`;
            app.insertAdjacentHTML('beforeend', html);
            console.log(house)
        });
    }

    var loadData = new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true)

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                const data = JSON.parse(request.responseText);
                resolve(data);
            } else {
                // We reached our target server, but it returned an error
                reject(error);
            }
        };

        request.onerror = () => {
            // There was a connection error of some sort
        };

        request.send();
    });

    loadData.then(data => {
        render(data);
    });
})();