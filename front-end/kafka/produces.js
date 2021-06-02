// import the `Kafka` instance from the kafkajs library
const {Kafka} = require('kafkajs');

// the client ID lets kafka know who's producing the messages
const clientId = 'web-client';
// we can define the list of brokers in the cluster
const brokers = ['0.0.0.0:32181'];
// this is the topic to which we want to write messages
const topic = 'example';

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({clientId, brokers});
const producer = kafka.producer();

const init = async () => {
  await producer.connect();
  console.log('Kafka producer connected.');
};

// we define an async function that writes a new message each second
const produce = async (content) => {
  // after the produce has connected, we start an interval timer
  try {
    // send a message to the configured topic with
    // the key and value formed from the current value of `i`
    await producer.send({
      topic,
      messages: [content],
    });

    // if the message is written successfully, log it and increment `i`
    i++;
  } catch (err) {
    console.error('could not write message ' + err);
  }
};

module.exports = {init, produce};
