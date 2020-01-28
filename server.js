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

// posts a new quote with a quote and person attribute that is input by the user
app.post('/api/quotes', (req, res, next) => {
    // creating new quote object from user queries
    const newQuote = {
        quote: req.query.quote,
        person: req.query.person
    }
    // if user entered in both a quote and a person then new quote is added to quotes array and then displayed for user
    if(newQuote.quote && newQuote.person) {
        quotes.push(newQuote);
        res.send({ quote: newQuote})
    } 
    // if the user fails to input both values then a 400 message is sent
    else {
        res.status(400).send();
    }
})

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));