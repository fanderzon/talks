var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send('Everything is awesome');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
