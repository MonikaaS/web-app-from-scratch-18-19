# Week 1 - Hello API 🐒

Link naar mn applicatie:
[https://monikaas.github.io/web-app-from-scratch-18-19/week1/](https://monikaas.github.io/web-app-from-scratch-18-19/week1/)

# GoT API

Deze applicatie laat alle houses van [GoT](https://api.got.show/doc/) zien op een pagina. Momenteel kan je alleen nog de naam van een house zien en de regio waar het vandaan komt.

De API bevat informatie over de characters, regions, houses, events, episodes, cultures, continents, cities & ages.

## Get request (xhr)

De data haal ik op door middel van een `XMLHttpRequest`. De lijst met items wordt nog weg gescrheven door het gebruik van `element.innerHTML`.

Momenteel staat alles nog in 1 functie, wat de code onoverzichtelijk maakt. Uiteindelijk wil ik de data binnen gaan halen door middel van `promises`.

## To Do

- [x] Vindt een API
- [x] Haal de data op
- [x] Schrijf de data weg
- [ ] Code refactoren
- [ ] Interactie toevoegen
