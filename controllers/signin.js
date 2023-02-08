const postSignIn = (knex, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('Invalid username or password');
  }
  knex.select('email', 'hash').from('signin').where('email', '=', email)
    .then(user => {
      const isValid = bcrypt.compareSync(password, user[0].hash);
      if (isValid) {
        knex.select('*').from('users').where('email', '=', email)
          .then(user => res.json(user[0]))
          .catch(err => res.status(400).json('Unable to get user'))
      } else {
        res.status(400).json('Invalid password')
      }
    })
    .catch(err => res.status(400).json('Invalid email'))
}

module.exports = { postSignIn };