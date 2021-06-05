package org.davidcampos.kafka.commons;

public class Commons {
    public final static String EXAMPLE_KAFKA_TOPIC = System.getenv("EXAMPLE_KAFKA_TOPIC") != null ?
            System.getenv("EXAMPLE_KAFKA_TOPIC") : "example";
    public final static String EXAMPLE_KAFKA_SERVER = System.getenv("EXAMPLE_KAFKA_SERVER") != null ?
            System.getenv("EXAMPLE_KAFKA_SERVER") : "localhost:29092";
    public final static String EXAMPLE_ZOOKEEPER_SERVER = System.getenv("EXAMPLE_ZOOKEEPER_SERVER") != null ?
            System.getenv("EXAMPLE_ZOOKEEPER_SERVER") : "localhost:32181";
    public final static String EXAMPLE_ELASTIC_SERVER = System.getenv("EXAMPLE_ELASTIC_SERVER") != null ?
            System.getenv("EXAMPLE_ELASTIC_SERVER") : "127.0.0.1";
    public final static String EXAMPLE_MONGODB_SERVER = System.getenv("EXAMPLE_MONGODB_SERVER") != null ?
            System.getenv("EXAMPLE_MONGODB_SERVER") : "127.0.0.1";
}
