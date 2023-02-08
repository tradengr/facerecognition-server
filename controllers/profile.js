const getProfile = (req, res, knex) => {
  const { id } = req.params;
  knex.select('*').from('users').where({id})
    .then(user => {
      (user.length) ? res.json(user[0]) : res.json('User does not exist')
    })
    .catch(err => res.status(400).json('Error finding user'))
}

module.exports = { getProfile };