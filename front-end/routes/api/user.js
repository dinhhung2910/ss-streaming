const express = require('express');

const User = require('../../models/user');
const userRouter = new express.Router();


/**
 * Get all user
 */
userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    console.error(e);
    res.status(500).send('Server error');
  }
});

module.exports = userRouter;
