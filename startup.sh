./wait-for-it.sh -s -t 30 $EXAMPLE_ZOOKEEPER_SERVER -- \
./wait-for-it.sh -s -t 30 $EXAMPLE_KAFKA_SERVER -- \
./wait-for-it.sh -s -t 30 $EXAMPLE_ELASTIC_SERVER:9200 -- \
./wait-for-it.sh -s -t 30 $EXAMPLE_MONGODB_SERVER:27017 -- \
java -Xmx512m -jar kafka-spark-flink-example.jar
