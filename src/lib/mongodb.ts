import { MongoClient } from "mongodb";

const globalForMongo = globalThis as unknown as { mongoClient?: Promise<MongoClient> };

export async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  globalForMongo.mongoClient ??= new MongoClient(uri).connect();
  return (await globalForMongo.mongoClient).db();
}
