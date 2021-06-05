/* eslint-disable max-len */
const express = require('express');
const {send} = require('../../kafka/produces');

const eventRouter = new express.Router();

eventRouter.post('/', (req, res) => {
  try {
    const {
      timestamp,
      userId,
      productId,
      isEnter,
      length,
    } = req.body.value;

    const eventString = `${userId} ${timestamp} ${productId} ${isEnter} ${length}`;

    send(eventString);

    res.status(200).send(true);
  } catch (e) {
    console.error(e);
    res.status(500).send('server error');
  }
});

module.exports = eventRouter;
