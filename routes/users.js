'use strict'
const express = require('express'), router = express.Router();
const bcryptjs = require('bcryptjs');
const { userAuthentication } = require('./auth');
const User = require('../models').User;

function asyncHelper(callback) {
  return async(req, res, next) => {
    try {
      await callback(req,res,next);
    } catch(err) {
      next(err);
    }
  }
}

/* GET /api/users 200 - Get Users */
router.get('/users', userAuthentication, asyncHelper(async (req, res) => {
  const user = await User.findByPk(req.currentUser.id, {attributes: { exclude: ['password', 'createdAt', 'updatedAt']}});
  res.status(200).json(user);
}));

/* POST /api/users 201 - Create Users */
router.post('/users', asyncHelper(async (req, res, next) => {
  try {
    const user = await req.body;
    if (user.password) {
      user.password = bcryptjs.hashSync(user.password);
    }
    await User.create(user);
    res.status(201).location('/').end();
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      err.message = "Data is missing";
      err.status = 400;   
    }
    next(err);
  }
}));

module.exports = router;
