// Clicking on a result will render a detailed result.
// Click on that result again will get you back to the overview
// The only global variables are the object literals that hold 

const app = {
    init: function () {
        console.log('App: Init');
        // TODO: Setup Hashchange/HistoryAPI URL listening
        router.handle(); // Reload the current page, or the homepage if no id and data is present
    },
    settings: {
        url: 'https://jsonplaceholder.typicode.com/todos/'
    }
}

const routes = { // This defines routes. It will be the place to request the proper data, and process any additional stuff with that data (filtering, sorting etc)
    overview: function () {
        console.log('Routes: overview');
        // This would be a nice place to start your loader
        api.get()
            .then(function (data) {
                // This would be a nice place to stop your loader
                render.overview(data);
            })
            .catch(function (error) {
                // TODO: Handle your error!
                // Did your loader stop?
            })
    },
    detail: function (id) {
        console.log('Routes: detail');
        // This would be a nice place to start your loader
        api.get(id)
            .then(function (data) {
                // This would be a nice place to stop your loader
                render.detail(data);
            })
            .catch(function (error) {
                // TODO: Handle your error!
                // Did your loader stop?
            })
    }
}

const router = { // This helps with routing, essentially connecting your app with your routes
    handle: function () {
        if (this.dataset && this.dataset.id) {
            console.log('Router: Handling for ' + this.dataset.id);
            routes.detail(this.dataset.id);
        } else {
            routes.overview();
        }
    }
    // This would be a nice place for a hashchange handler
}

const api = { // This handles all API stuff
    get: function (id = false) {
        // This would be a nice place to fetch data from a local cache or just call the api (if/else)
        return this.call(id);
    },
    call: function (id = false) {
        console.log('API: Get');
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            let apiUrl = app.settings.url;
            if (id !== false) {
                apiUrl += id;
            }
            xhr.open('GET', apiUrl);
            xhr.addEventListener('load', function () {
                const data = api.parse(xhr.response); // Since we use an eventlistener, the scope of 'this' changed
                // This would be a nice place to clean the data received (map?)
                // This would be a nice place to update your locally cached data
                resolve(data);
            });
            xhr.addEventListener('error', function () {
                reject('Oops!');
            });
            xhr.send();
        })
    },
    parse: function (stringData) {
        let data;
        try {
            data = JSON.parse(stringData);
        } catch (err) {
            return err;
        }
        return data; // This line will never be executed if we already returned an error
    }
}

const render = { // This would be your templating engine, please only loop your data. Any processing should be done in routes
    overview: function (data) {
        document.body.innerHTML = '';
        const wrapper = document.createElement('div');
        data.forEach(function (entry) {
            // Create elements, use transparency, whatever you settled for
            const item = document.createElement('p');
            item.innerText = entry.title;
            item.dataset.id = entry.id;
            item.addEventListener('click', router.handle);
            wrapper.appendChild(item);
        })
        document.body.appendChild(wrapper);
    },
    detail: function (data) {
        document.body.innerHTML = '';
        const item = document.createElement('h1');
        item.innerText = data.title;
        item.addEventListener('click', router.handle);
        document.body.appendChild(item);
    }
}
app.init();