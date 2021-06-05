package org.davidcampos.kafka.db;

import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;

import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.davidcampos.kafka.commons.Commons;

import akka.japi.tuple.Tuple3;

import java.util.Arrays;

import com.mongodb.BasicDBObject;
import com.mongodb.Block;
import com.mongodb.DBObject;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoCursor;
import static com.mongodb.client.model.Filters.*;
import com.mongodb.client.result.DeleteResult;
import static com.mongodb.client.model.Updates.*;
import com.mongodb.client.result.UpdateResult;
import java.util.ArrayList;
import java.util.List;

public class Mongo {
    public static MongoDatabase database = null;

    public static final String username = "admin";
    public static final String authenticationDatabase = "stream";
    public static final String password = "incorrect";
    public static final String host = Commons.EXAMPLE_MONGODB_SERVER;

    public static void init(){
        if (Mongo.database != null) {
            return;
        }

        MongoClient mongoClient = null;

        try {
            MongoCredential credential = MongoCredential.createCredential(
                username,
                authenticationDatabase, 
                password.toCharArray());
            mongoClient = MongoClients.create(
                MongoClientSettings.builder()
                .applyToClusterSettings(builder ->
                        builder.hosts(Arrays.asList(new ServerAddress(host, 27017))))
                .credential(credential)
                .build()
            );

            System.out.println("Connected mongodb");
        } catch (Exception e) {

        }
        

        Mongo.database = mongoClient.getDatabase("stream");
    }

    // product name, category Id, category name
    public static Tuple3<String, String, String> getProductDetail(String productId) {
        init();

        try {
            MongoCollection<BasicDBObject> lstProducts = database.getCollection("products", BasicDBObject.class);
            MongoCollection<BasicDBObject> lstCategories = database.getCollection("categories", BasicDBObject.class);

            BasicDBObject searchQuery = new BasicDBObject();
    
            searchQuery.put("_id", new ObjectId(productId));
    
            // search for product
            DBObject doc = lstProducts.find(searchQuery).first();
            String productName = doc.get("name").toString();
            String categoryId = doc.get("category").toString();

            // search for category
            searchQuery.replace("_id", new ObjectId(categoryId));
            DBObject cat = lstCategories.find(searchQuery).first();
            String categoryName = cat.get("name").toString();

            return new Tuple3<>(productName, categoryId, categoryName);
        } catch (Exception e2) {
            return new Tuple3<>("undefined", "undefined", "undefined");
        }
    }

    public static String getUserDetail(String userId) {
        init();

        try {
            MongoCollection<BasicDBObject> collection = database.getCollection("users", BasicDBObject.class);
            BasicDBObject searchQuery = new BasicDBObject();
    
            searchQuery.put("_id", new ObjectId(userId));
    
            DBObject doc = collection.find(searchQuery).first();
            String userFullname = doc.get("fullname").toString();

            return userFullname;
        } catch (Exception e2) {
            return "undefined";
        }
    }
}
