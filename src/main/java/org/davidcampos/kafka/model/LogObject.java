package org.davidcampos.kafka.model;

import java.time.LocalDateTime; // import the LocalDateTime class
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import org.davidcampos.kafka.db.Mongo;

import akka.japi.tuple.Tuple3;

public class LogObject {
    public LocalDateTime timestamp;
    public String userId;
    public String productId;
    public Boolean isEnter;
    public Long length;

    // enriched fields
    public String username;
    public String productName;
    public String categoryId;
    public String categoryName;

    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        .withZone(ZoneId.of("UTC"));
    
    public LogObject(String line) {
        String[] tokens = line.split(" ");
        this.userId = tokens[0];
        this.timestamp = LocalDateTime.parse(tokens[1], formatter);
        this.productId = tokens[2];
        this.isEnter = tokens[3].equals("true") ? true : false;
        this.length = Long.parseLong(tokens[4]);

        this.username = Mongo.getUserDetail(this.userId);

        Tuple3<String, String, String> productDetail = Mongo.getProductDetail(this.productId);
        this.productName = productDetail.t1();
        this.categoryId = productDetail.t2();
        this.categoryName = productDetail.t3();
    }
}
