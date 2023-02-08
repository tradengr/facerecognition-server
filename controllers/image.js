const putImage = (req, res, knex) => {
  const { id } = req.body;
  knex('users').where('id', '=', id)
    .increment('imageDetected', 1)
    .returning('imageDetected')
    .then(data => res.json(data[0].imageDetected))
    .catch(err => res.status(400).json(err))  
}

module.exports = { putImage };