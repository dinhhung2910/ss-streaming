const express = require('express');
const {produce} = require('../../kafka/produces');

const eventRouter = new express.Router();

eventRouter.post('/', (req, res) => {
  try {
    produce(req.body);
    res.status(200).send(true);
  } catch (e) {
    console.error(e);
    res.status(500).send('server error');
  }
});

module.exports = eventRouter;
