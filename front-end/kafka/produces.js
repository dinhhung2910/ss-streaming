const kafka = require('kafka-node');
const Producer = kafka.Producer;

let client = null;
let producer = null;

const init = () => {
  client = new kafka.KafkaClient({
    kafkaHost: 'localhost:29092',
  });
  producer = new Producer(client);

  const topicsToCreate = [{
    topic: 'example',
    partitions: 1,
    replicationFactor: 1,
  }];

  producer.on('ready', function() {
    console.log('Producer is ready');
    producer.createTopics(topicsToCreate, (err, result) => {
      // err && console.err(err);
      // result && console.log(result);
    });
    // client.createTopics(topicsToCreate);
  });
};


const send = (message) => {
  const payload = [{
    topic: 'example',
    messages: message,
  }];
  producer.send(payload, (err, data) => {
    err && console.error(err);
    data && console.log(data);
  });
};

module.exports = {init, send};
