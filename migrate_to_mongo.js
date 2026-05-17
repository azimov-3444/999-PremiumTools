import { createClient } from '@supabase/supabase-js';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const MONGO_URI = 'mongodb+srv://Kyro_Project:azimov_3444@cluster0.mgauugq.mongodb.net/?appName=Cluster0';
const MONGO_DB_NAME = 'premium_tools_db';

const mongoClient = new MongoClient(MONGO_URI);

const tables = [
  'users',
  'categories',
  'products',
  'reviews',
  'carousel_items',
  'visit_stats'
];

async function migrate() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoClient.connect();
    const db = mongoClient.db(MONGO_DB_NAME);
    console.log(`Connected to MongoDB database: ${MONGO_DB_NAME}`);

    for (const table of tables) {
      console.log(`Fetching data from Supabase table: ${table}...`);
      let { data, error } = await supabase.from(table).select('*');
      
      if (error) {
        console.error(`Error fetching table ${table}:`, error);
        continue;
      }

      if (data && data.length > 0) {
        console.log(`Found ${data.length} records in ${table}. Inserting into MongoDB...`);
        const collection = db.collection(table);
        
        // Check if collection has data to avoid duplicating if we run it multiple times
        const count = await collection.countDocuments();
        if (count > 0) {
           console.log(`Collection ${table} already has ${count} records. Dropping collection to migrate fresh data...`);
           await collection.drop();
        }

        const result = await collection.insertMany(data);
        console.log(`Successfully inserted ${result.insertedCount} records into MongoDB collection: ${table}`);
      } else {
        console.log(`No records found in table ${table}. Skipping.`);
      }
    }
    
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoClient.close();
  }
}

migrate();
