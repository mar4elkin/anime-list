var express = require("express");
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const Exister = require('./exister.js')
var cors = require('cors')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(cors())

let db = new sqlite3.Database('storage.db');
const tableCreate = `CREATE TABLE IF NOT EXISTS content (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, photo TEXT, rating TEXT, type TEXT, date TEXT)`


db.run(tableCreate);

app.listen(7000, () => {
    console.log("server hosted on: http://localhost:7000/");
});

app.get("/", (req, res, next) => {

    var sql = `SELECT * FROM content ORDER BY ID DESC`
    
    function returnRows(x) {
        res.json(x)
     } 

    db.all(sql, function(err, allRows) {
        returnRows(allRows);
    });
    
});

app.post("/", (req, res, next) => {
    
    let name   = { 'name': req.body.name };
    let photo  = { 'photo': req.body.photo };
    let rating = { 'rating': req.body.rating };
    let type   = { 'type': req.body.type };
    let date   = {'date': req.body.date}
    let reqArr = [name, photo, rating, type, date];
    let reqArrn = [req.body.name, req.body.photo, req.body.rating, req.body.type, req.body.date];
    let answersArr = [];

    var Exchecker = new Exister();
    
    for(var i = 0; i < reqArr.length; i++){
      for (var [key, value] of Object.entries(reqArr[i])){}
      let answer = Exchecker.checker(value)
      if (answer == false){
        res.json(key + " can't be empty")
        break
      }
      answersArr.push('1')
    }

    if (answersArr.length == reqArr.length){
        let tableInsert = `INSERT INTO content ('name', 'photo', 'rating', 'type', 'date') VALUES (?, ?, ?, ?, ?)`
        db.run(tableInsert, reqArrn);
        res.sendStatus(200);
    }

    //res.json(reqArr)
});