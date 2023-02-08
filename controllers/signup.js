const postSignUp = (req, res, knex, bcrypt) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json('Please fill all required fields')
  }
  const hash = bcrypt.hashSync(password);
  knex.transaction(trx => {
    return trx('signin').insert({
      email: email,
      hash: hash
    })
    .returning('email')
    .then(returnedEmail =>  {
      return trx('users').insert({
        name: name,
        email: returnedEmail[0].email,
        joined: new Date()
      })
      .returning('*')
      .then(user => res.json(user[0]))
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('Unable to register'))
}

module.exports = { postSignUp };