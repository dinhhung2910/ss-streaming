const express = require('express');

const Product = require('../../models/product');
const {SaveImage} = require('../../utils/saveimage');
const productRouter = new express.Router();

productRouter.post('/', async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      cost: req.body.cost,
      description: req.body.description,
      category: req.body.categoryId,
    });

    if (req.body.image) {
      try {
        const imagePath = SaveImage(req.body.image);
        product.image = imagePath;
      } catch (e) {
        console.error(e);
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid image',
              param: 'avatar',
            },
          ],
        });
      }
    }

    await product.save();
    res.status(200).send(true);
  } catch (e) {
    console.error(e);
    res.status(500).send('server error');
  }
});

/**
 * Get all product
 */
productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find({}).populate('category');
    res.send(products);
  } catch (e) {
    console.error(e);
    res.status(500).send('Server error');
  }
});

module.exports = productRouter;
