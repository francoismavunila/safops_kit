const eitDAO = require('../dao/eitDAO');

// Service functions
const getAllEITs = () => {
  return eitDAO.getAllEITs();
};

const createEIT = (firstName, lastName, email,password) => {
  return eitDAO.createEIT(firstName, lastName, email,password);
};

module.exports = {
  getAllEITs,
  createEIT,
};