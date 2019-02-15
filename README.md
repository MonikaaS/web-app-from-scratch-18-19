# Web App From Scratch @cmda-minor-web 18-19

Link naar mn applicatie:
[https://monikaas.github.io/web-app-from-scratch-18-19/week1/](https://monikaas.github.io/web-app-from-scratch-18-19/week1/)

# GoT API

Deze applicatie laat alle houses van [GoT](https://api.got.show/doc/) zien op een pagina. Momenteel kan je alleen nog de naam van een house zien en de regio waar het vandaan komt.

De API bevat informatie over de characters, regions, houses, events, episodes, cultures, continents, cities & ages.

## Get request promise based(xhr)

De data haal ik op door middel van een `promise` gebaseerd op een `XMLHttpRequest`. De lijst met items wordt nog weg gescrheven door het gebruik van `template literals`.

Mijn code is opgedeeld in `object literals`. Elk object interacteert met elkaar door middel van functies.

## Actor diagram

Een diagram van de actoren van mijn applicatie
![GitHub Logo](/images/actor-diagram-v1.jpg)

## Interaction diagram

Een diagram van hoe mijn code met elkaar interacteert in mijn applicatie
![GitHub Logo](/images/interaction-diagram-v1.jpg)

## To Do

- [x] Vindt een API
- [x] Haal de data op
- [x] Schrijf de data weg
- [ ] Code refactoren
- [x] router
- [ ] render overiew
- [ ] render detail
