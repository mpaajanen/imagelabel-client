# Luokittelukone
## Sovellus kuvien luokitteluun

Luokittelukone on räätälöitävissä oleva sovellus, jolla voi lisätä ja poistaa kuville annettuja luokituksia. Tällä versiolla on mahdollista luokitella viemäriputkien kuvia niissä esiintyvien vikojen, täyttöasteen ja materiaalin mukaan.

## Testattava demo
Sovellus on käynnissä osoitteessa: [imlabel.fly.dev/](https://imlabel.fly.dev/).

Kirjautuminen onnistuu tunnuksilla demo/demo.

## Asennus paikallisesti omaan järjestelmään

Frontend
```
git clone https://github.com/mpaajanen/imagelabel-client
cd imagelabel-client
npm install
npm start
```

Backend ([github.com/mpaajanen/imagelabel](https://github.com/mpaajanen/imagelabel))
```
git clone https://github.com/mpaajanen/imagelabel
cd imagelabel
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

## Toiminta
Kirjautumisen jälkeen käyttäjä voi tarkastella kaikkien kuvien luokittelun tilaa. Kuhunkin kuvaan voi siirtyä omasta linkistään ja linkin vieressä on kuvalle annetut luokittelut.

Kuvanäkymässä on nappulat edelliseen ja seuraavan kuvaan siirtymiseksi.

Käytettävissä olevat luokitukset on kovakoodattu. Käyttäjä ei voi lisätä tai poistaa niitä kokonaan sovelluksesta.

Luokittelunappulaa painamalla sen tila vaihtuu päälle/pois.

Kuvalistauksesta on mahdollista mennä lisäämään uusia kuvalinkkejä, mutta nykytilassaan sovellus käyttää vain ennalta ladattuja kuvia.

## Käytettyjä kirjastoja
- [MaterialUI](https://mui.com/)
- [React Query](https://tanstack.com/query/latest/)
- [Axios](https://axios-http.com/)