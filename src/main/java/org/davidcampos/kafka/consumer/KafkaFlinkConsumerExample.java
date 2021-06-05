package org.davidcampos.kafka.consumer;


import org.apache.flink.api.common.functions.FlatMapFunction;
import org.apache.flink.api.common.serialization.SimpleStringSchema;
import org.apache.flink.api.java.tuple.Tuple5;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaConsumer010;
import org.apache.flink.util.Collector;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.apache.flink.api.common.functions.RuntimeContext;
import org.apache.flink.streaming.connectors.elasticsearch.RequestIndexer;

import org.apache.http.HttpHost;

import org.apache.flink.streaming.connectors.elasticsearch.ElasticsearchSinkFunction;
import org.apache.flink.streaming.connectors.elasticsearch7.ElasticsearchSink;

import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.Requests;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.davidcampos.kafka.commons.Commons;
// import org.davidcampos.kafka.db.Mongo;
import org.davidcampos.kafka.model.LogObject;

public class KafkaFlinkConsumerExample {
    private static final Logger logger = LogManager.getLogger(KafkaFlinkConsumerExample.class);

    public static void main(final String... args) {
        // Create execution environment
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

        // Properties
        final Properties props = new Properties();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, Commons.EXAMPLE_KAFKA_SERVER);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "FlinkConsumerGroup");

        DataStream<String> messageStream = env.addSource(new FlinkKafkaConsumer010<>(Commons.EXAMPLE_KAFKA_TOPIC, new SimpleStringSchema(), props));
        DataStream<LogObject> parsedStream = messageStream
            .map(en -> new LogObject(en))
            .filter(en -> !en.isEnter);
        
        // add elasticsearch as a sink
        List<HttpHost> httpHosts = new ArrayList<>();
        httpHosts.add(new HttpHost(Commons.EXAMPLE_ELASTIC_SERVER, 9200, "http"));
        // use a ElasticsearchSink.Builder to create an ElasticsearchSink
        ElasticsearchSink.Builder<LogObject> esSinkBuilder = new ElasticsearchSink.Builder<>(
            httpHosts,
            new ElasticsearchSinkFunction<LogObject>() {
                public IndexRequest createIndexRequest(LogObject element) {
                    Map<String, Object> json = new HashMap<>();
                    json.put("productId", element.productId);
                    json.put("userId", element.userId);
                    json.put("timestamp", element.timestamp.toString());
                    json.put("uptime", element.length);
                    json.put("username", element.username);
                    json.put("productName", element.productName);
                    json.put("categoryId", element.categoryId);
                    json.put("categoryName", element.categoryName);

                    return Requests.indexRequest()
                            .index("user-tracking")
                            .type("my-type")
                            .source(json);
                }
                
                @Override
                public void process(LogObject element, RuntimeContext ctx, RequestIndexer indexer) {
                    indexer.add(createIndexRequest(element));
                }
            }
        );
        
        // configuration for the bulk requests; this instructs the sink to emit after every element, otherwise they would be buffered
        esSinkBuilder.setBulkFlushMaxActions(1);

        // finally, build and add the sink to the job's pipeline
        parsedStream.addSink(esSinkBuilder.build());

        // Split up the lines in pairs (2-tuples) containing: (word,1)
        parsedStream.flatMap(new Tokenizer())
                // group by the tuple field "0" and sum up tuple field "1"
                .keyBy(2)
                .sum(4)
                .print();

        try {
            env.execute();
        } catch (Exception e) {
            logger.error("An error occurred.", e);
        }
    }

    public static final class Tokenizer implements FlatMapFunction<
        LogObject, 
        Tuple5<String, LocalDateTime, String, Boolean, Long>> {

        @Override
        public void flatMap(LogObject value, Collector<Tuple5<String, LocalDateTime, String, Boolean, Long>> out) {

            // Mongo.getUserDetail(value.userId);

            // normalize and split the line
            out.collect(new Tuple5<>(
                value.userId,
                value.timestamp,
                value.productId,
                value.isEnter,
                value.length
            ));
        }
    }
}
