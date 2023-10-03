const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Now working at ${PORT}`);
});

app.get("/", (req, res, next) => {
  res.send("welcome to the API");
});

app.get("/api/quotes/random", (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.send({ quote: randomQuote });
});

app.get("/api/quotes", (req, res, next) => {
  const { quote, person } = req.query;
  if (!person) {
    return res.send({ quotes: quotes });
  }
  if (person !== "") {
    const result = quotes.filter((quote) => quote.person === person);
    res.send({ quotes: result });
  }
});

app.post("/api/quotes", (req, res, next) => {
  const { quote, person } = req.query;
  if (quote === "" || person === "") {
    return res.status(400).send();
  }
  quotes.push(req.query);
  res.send({ quote: req.query });
});
