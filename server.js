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
    host : 'postgres://nics:Xk6gt07aLeHwNWSzW7bgjWelzlI3rSn5@dpg-cfhp5ccgqg40klj2rvmg-a/facerecognition_tyeu',
    port : 5432,
    user : 'nics',
    password : 'Xk6gt07aLeHwNWSzW7bgjWelzlI3rSn5',
    database : 'facerecognition_tyeu'
  }
});


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.json('success'));
app.post('/signin', postSignIn(knex, bcrypt));
app.post('/signup', (req, res) => postSignUp(req, res, knex, bcrypt));
app.get('/profile/:id', (req, res) => getProfile(req, res, knex));
app.put('/image', (req, res) => putImage(req, res, knex));

app.listen(process.env.PORT || port, () => console.log(`App listening on port: ${process.env.PORT}`));