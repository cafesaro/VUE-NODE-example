const {Client} = require('pg');
const options = {
    host : 'localhost',
    user : 'postgres',
    port : '5435',
    database : 'BASELOCALFINAL',
    password: '0000'
};

const database = new Client(options);

database.connect()
.then(Client => console.log('database conncected'))
.catch(error => console.error(error));

const query1 = database.query('select * from application');
const query2 = database.query('select * from review');
const queryresult1 = Promise.all([query1]);

Promise.all([query1,query2]).then
(results => {

    const queryresult1 = results[0].rows;
    const queryresult2 = results[1].rows;


}). catch(error => console.error(error));
console.log(queryresult1);


const express = require('express');
const app = express();
const morgan = require('morgan');

//middleware 
app.use(morgan('dev'));

//config
app.set('json spaces', 2);

//routes 
app.get('/job-application', (req, res) => {
    res.send(queryresult1);
})

//starting the server 
app.listen(3000, () => {

    console.log('server on port ${3000}');
})
