// var cors = require('cors');
// const path = require('path');
// const express = require('express');
// const bodyParser = require('body-parser');

// var db = require('./database');

// const ENV = process.env.NODE_ENV;
// const PORT = process.env.PORT || 5000;

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));
// app.use(bodyParser.json());
// app.use(cors);

// app.use('api/owners/', require('./api/owners'));

// app.listen(PORT, () => {
//     console.log('Server linstening on port ' + PORT + '...');
// });

// db.query('SELECT NOW()', (err, res) => {
//     if (err.error) return console.log(err.error);
//     console.log('PostgreSQL connected!');
// });
// module.exports = app;

let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
const PORT = 5000;

let pool = new pg.Pool({
    user: 'zsztnpbvuacctg',
    password: '487c7abe7ab689f7d4c38692c25eb7eb0475f4a0a6f7c316308fcc922b948d30',
    database: 'dfuvh4cick4ngf',
    host: 'ec2-54-217-234-157.eu-west-1.compute.amazonaws.com',
    port: 5432,
    max: 20,
    ssl: true
})

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/api/find-user', (request, response)=>{
    var username = request.body.username;

    pool.connect(function(err, db, done){
        if(err){
            return response.status(400).send(err);
        }
        else{
            db.query('SELECT * FROM owners WHERE username=$1', [username], function(err, table) {
                done();
                if(err) {
                    return response.status(400).send(err);
                }
                else {
                    return response.status(200).send(table.rows);
                }
            })
        }
    })
})

app.post('/api/new-user', function(request, response){
    var username = request.body.username;
    var email = request.body.email;
    var password = request.body.password;
    let values = [username, email, password];
    pool.connect((err, db, done)=>{
        if(err){
            return response.status(400).send(err);
        }
        else{
            db.query('INSERT INTO owners (username, email, password) VALUES ($1, $2, $3)', [...values], (err, table)=>{
                done();
                if(err){
                    return response.status(400).send(err);
                }
                else{
                    console.log('INSERTED');
                    response.status(201).send({message: 'Data inserted'});
                }
            });
        }
    })
})

app.listen(PORT, () => console.log('Listening on port ' + PORT));