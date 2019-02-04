'use strict'

//https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/ used this as exmple
var request = new XMLHttpRequest()

request.open('GET', 'https://api.thecatapi.com/v1/breeds', true)

request.onload = function () {
    var data = JSON.parse(this.response)

    data.forEach(cat => {
        console.log(cat.name)
    });
}

// Send the request
request.send()