const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const db = require('./database/db');

const gameRouter = require('./routs/game');
const databaseRouter = require('./routs/database')
const weatherRouter = require('./routs/weather')

const { json } = require('express');

hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

db.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Mysql Connected...")
    }
})

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
const partialsPath = path.join(__dirname, './partials');


app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath)

// for(day=1;day<=30;day++){         
//     var create_table = `ALTER TABLE march2021 ADD ${day}March INT`;
//     db.query(create_table, function (err, result) {
//         if (err) throw err;

//     });
// }

// var total_hrs = `ALTER TABLE march2021 ADD Total_hrs INT`;
//     db.query(total_hrs, function (err, result) {
//         if (err) throw err;

//     });

//     var perhr_pay = `ALTER TABLE march2021 ADD Perhr_Pay INT`;
//     db.query(perhr_pay, function (err, result) {
//         if (err) throw err;

//     });

//     var total_pay = `ALTER TABLE march2021 ADD Total_Pay INT`;
//     db.query(total_pay, function (err, result) {
//         if (err) throw err;

//     });
app.use(gameRouter);
app.use(databaseRouter);
app.use(weatherRouter);

app.listen(8000, () => {
    console.log("Server started on port 8000");
});
