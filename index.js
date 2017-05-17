const express = require('express');
let app = express()
let timeInMs = Date.now();
const path = require('path');
const port = process.env.PORT || 3000;
console.log(timeInMs)

let ts = Math.round((new Date()).getTime() / 1000);

console.log(ts)

let date = new Date(ts*1000)

console.log(String(date))

const year = String(date).substring(11,15)
const month = String(date).substring(4,7)
const day = String(date).substring(8,10)

console.log(month + " " + day + "," + year)

const dateObj = {
   "unix": ts,
   "natural": month + " " + day + "," + year
}

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
})

app.get('/:input', (req, res) => {
  const date = req.url.substring(1)
  
  console.log(date)
  res.send("fuck u");
})


app.listen(port, (req, err) => {
  if(!err)
    console.log("listening to the port " + port)
})
