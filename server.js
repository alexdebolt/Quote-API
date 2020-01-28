const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

const quotesRouter = express.Router();
app.use('/api/quotes', quotesRouter);

quotesRouter.get('/random', (req, res, next) => {
    let randomQuote = getRandomElement(quotes);
    if(randomQuote) {
        res.send({quote: randomQuote});
    } else {
        res.status(404).send();
    }
})

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));