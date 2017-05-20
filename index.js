const express = require('express');
let app = express();
const path = require('path');
const port = process.env.PORT || 3000;
let dateObj = {};
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
})

let d = new Date(1483056000000)
console.log(d)

app.get('/:input', (req, res) => {
  const input = decodeURI(req.url.substring(1));
  console.log(input + new Date(parseInt(input) * 1000) + new Date(input))
  if (new Date(parseInt(input) * 1000) == 'Invalid Date' && new Date(input) == 'Invalid Date') {
    dateObj = {
      "unix": null,
      "natural": null
    }
  } else {
    if (input.search(/\d{10}/) != -1) {
      const ts = new Date(parseInt(input) * 1000)
      const day = ts.getDate();
      const month = ts.getMonth() + 1;
      const year = ts.getFullYear();
      dateObj = {
        "unix": input,
        "natural": month + " " + day + "," + year
      }
    } else {
      const ts = new Date(input)
      const day = ts.getDate();
      const month = ts.getMonth() + 1;
      const year = ts.getFullYear();
      dateObj = {
        "unix": ts.getTime()/1000,
        "natural": month + " " + day + "," + year
      }
    }
  }
  // let d = Date.parse(month + " " + day + "," + year) / 1000;
  // console.log(d)

  res.send(dateObj);
})


app.listen(port, (req, err) => {
  if (!err)
    console.log("listening to the port " + port)
})
