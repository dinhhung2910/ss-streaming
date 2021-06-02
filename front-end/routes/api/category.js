const express = require('express');

const Category = require('../../models/category');
const categoryRouter = new express.Router();


/**
 * Get all user
 */
categoryRouter.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (e) {
    console.error(e);
    res.status(500).send('Server error');
  }
});

module.exports = categoryRouter;
