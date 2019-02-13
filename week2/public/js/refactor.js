//router
var router = {
    overview: function () {
        api.get().then(data => {
            render.overview(data)
        })
    }
}
//api
var api = {
    get: function () {
        return new Promise(function (resolve, reject) {
            var url = 'https://api.got.show/api/houses/';

            var request = new XMLHttpRequest();
            request.open('GET', url, true)

            request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                    // Success!
                    var data = JSON.parse(request.responseText);
                    resolve(data)
                } else {
                    // We reached our target server, but it returned an error
                    reject(error)
                }
            };

            request.onerror = () => {
                // There was a connection error of some sort
                console.log('error')
            };

            request.send()
        });
    }
};

//render
var render = {
    overview: data => {
        var app = document.getElementById('container')

        data.forEach((house, i) => {
            var html = `
                <div class="card">
                <a href='/#${house._id}'>${house.name}</a>
                <p>region: ${house.region == undefined ? "no region" : house.region}</p>
                </div>`;
            app.insertAdjacentHTML('beforeend', html);

        })
    }
}
router.overview()