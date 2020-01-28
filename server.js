const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// gets a random quote from quotes array in data.js
app.get('/api/quotes/random', (req, res, next) => {
    res.send({
        quote: getRandomElement(quotes)
    });
});

// returns all quotes if no query params and return all quotes by a specific person
app.get('/api/quotes', (req, res, next) => {
    //if a person is specified, filter and return only quotes by that person
    if(req.query.person != undefined) {
        const quotesByPerson = quotes.filter(quote => quote.person === req.query.person);
        res.send({
            quotes: quotesByPerson
        })
    } 
    // returns all quotes 
    else {
        res.send({
            quotes: quotes
        });
    }
});



app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));