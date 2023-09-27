const eitService = require('../services/eitService');

// Controller functions
const getAllEITs = (req, res) => {
  eitService.getAllEITs()
    .then((eits) => {
      res.json(eits);
    })
    .catch((error) => {
        console.log(error)
      res.status(500).json({ error: 'Error retrieving EITs' });
    });
};

const createEIT = (req, res) => {
  const { firstName, lastName, email,password } = req.body;
  console.log(password)
  eitService.createEIT(firstName, lastName, email,password)
    .then((result) => {
      res.json({ id: result.insertId });
    })
    .catch((error) => {
        console.log(error)
      res.status(500).json({ error: 'Error creating EIT' });
    });
};

module.exports = {
  getAllEITs,
  createEIT,
};