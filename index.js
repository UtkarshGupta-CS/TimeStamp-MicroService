const express = require('express');
let app = express();
const path = require('path');
const port = process.env.PORT || 3000;
let dateObj = {};

const monthConv = (monthNum) => {
  switch (monthNum) {
    case 1:
      return "January";

    case 2:
      return "February";

    case 3:
      return "March";

    case 4:
      return "April";

    case 5:
      return "May";

    case 6:
      return "June";

    case 7:
      return "July";

    case 8:
      return "August";

    case 9:
      return "September";

    case 10:
      return "October";

    case 11:
      return "November";

    case 12:
      return "December";

    default:
      break;
  }
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
})

app.get('/:query', (req, res) => {
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
        "unix": parseInt(input),
        "natural": monthConv(month) + " " + day + ", " + year
      }
    } else {
      const ts = new Date(input)
      const day = ts.getDate();
      const month = ts.getMonth() + 1;
      const year = ts.getFullYear();
      if (ts != 'Invalid Date') {
        dateObj = {
          "unix": ts.getTime() / 1000,
          "natural": monthConv(month) + " " + day + ", " + year
        }
      } else {
        dateObj = {
          "unix": null,
          "natural": null
        }
      }
    }
  }

  res.send(dateObj);
})


app.listen(port, (req, err) => {
  if (!err)
    console.log("listening to the port " + port)
})
