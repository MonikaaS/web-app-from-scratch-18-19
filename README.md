# Web App From Scratch @cmda-minor-web 18-19

Link naar mn applicatie:
[https://monikaas.github.io/web-app-from-scratch-18-19](https://monikaas.github.io/web-app-from-scratch-18-19)

# GoT API

![GoT Api](/images/Got.png)

Deze applicatie laat alle houses van [GoT](https://api.got.show/doc/) zien op een pagina. Momenteel kan je alleen nog de naam van een house zien en de regio waar het vandaan komt.

De API bevat informatie over de :

- characters
- regions
- houses
- events
- episodes
- cultures
- continents
- cities
- ages

## instaleren:

```
git clone: https://github.com/MonikaaS/web-app-from-scratch-18-19.git
cd web-app-from-scratch-18-19
```

## Get request promise based(xhr)

De data haal ik op door middel van een `promise` gebaseerd op een `XMLHttpRequest`. De lijst met items wordt nog weg gescrheven door het gebruik van `template literals`.

Mijn code is opgedeeld in `object literals`. Elk object interacteert met elkaar door middel van functies.

### data:

De data heb ik door middel van een `map` opgeschoont. Om mijn detail pagina's te laden, gebruik ik een `filter` die het geselecteerde id vergelijkt met die van de data lijst en als het `id` overeenkomt, haalt die het `object` eruit.

### routing:

Routing heb ik gefixt met behulp van ([routie](http://projects.jga.me/routie/))

## Actor diagram

Een diagram van de actoren van mijn applicatie
![GitHub Logo](/images/actor-diagram.jpg)

## Interaction diagram

Een diagram van hoe mijn code met elkaar interacteert in mijn applicatie
![GitHub Logo](/images/interaction-diagram.jpg)

## To Do

- [x] Vindt een API
- [x] Haal de data op
- [x] Schrijf de data weg
- [x] Code refactoren
- [x] router
- [x] render overiew
- [x] render detail
- [ ] local storage goed werkend krijgen
- [ ] tweede api call
- [ ] error pagian fixen
