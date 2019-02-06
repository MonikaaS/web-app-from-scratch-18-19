'use strict'

//https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/ used this as an example
const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

var request = new XMLHttpRequest()

request.open('GET', 'https://api.got.show/api/houses/', true)

request.onload = function () {
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
        data.forEach(characters => {

            const card = document.createElement('div')
            card.setAttribute('class', 'card')

            const h1 = document.createElement('h1')
            h1.innerHTML = characters.name

            const p = document.createElement('p')
            p.innerHTML = characters.region

            container.appendChild(card)

            card.appendChild(h1)
            card.appendChild(p)
            console.log(characters)
            //cat.name, cat.discription, cat.origin, cat.temperament, cat.weight.metric
        })
    } else {
        console.log('error')
    }
}

// Send the request
request.send()