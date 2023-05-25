# Luokittelukone
## Sovellus kuvien luokitteluun

Luokittelukone on räätälöitävissä oleva sovellus, jolla voi lisätä ja poistaa kuville annettuja luokituksia. Tällä versiolla on mahdollista luokitella viemäriputkien kuvia niissä esiintyvien vikojen, täyttöasteen ja materiaalin mukaan.

## Asennus paikallisesti omaan järjestelmään

Kloonaa frontendin repositorio (tämä)
```
npm install
npm start
```

Kloonaa backendin repositorio [https://github.com/mpaajanen/imagelabel](https://github.com/mpaajanen/imagelabel)
```
npm install
npm run app
```

## Tietokanta

Tietokanta on luotu [MongoDB](https://www.mongodb.com/):llä. Luo oma kanta ja lisää backendissä config-kansioon default.json seuraavin tiedoin:
```
{
    "mongoURI":
        "mongodb+srv://<tunnus>:<salasana>@<host>?retryWrites=true&w=majority"
}
```
Kantaan on mahdollista lisätä kuvatietoja isoja määriä kerrallaan esimerkiksi REST clientin avulla.

Kuvat-kokoelmassa säilötään ainostaan kuvan nimi ja taulukko luokista. Kuvan nimi toimii linkkinä kuvaan. 

Käyttäjät-kokoelmassa on käyttäjänimi ja suojattu salasana.

## Luokiteltavat kuvat
Sovelluksella luokiteltavat kuvat säilötään staattisesti public/images-kansioon.

## Käytettyjä kirjastoja
- [MaterialUI](https://mui.com/)
- [React Query](https://tanstack.com/query/latest/)
- [Axios](https://axios-http.com/)