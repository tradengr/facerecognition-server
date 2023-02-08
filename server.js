const { postSignIn } = require('./controllers/signin');
const { postSignUp } = require('./controllers/signup');
const { getProfile } = require('./controllers/profile');
const { putImage } = require('./controllers/image');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'nics',
    password : 'nics0303',
    database : 'facerecognition'
  }
});ls


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.json('success'));
app.post('/signin', postSignIn(knex, bcrypt));
app.post('/signup', (req, res) => postSignUp(req, res, knex, bcrypt));
app.get('/profile/:id', (req, res) => getProfile(req, res, knex));
app.put('/image', (req, res) => putImage(req, res, knex));

app.listen(process.env.PORT || port, () => console.log(`App listening on port: ${process.env.PORT}`));