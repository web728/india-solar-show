import mongoose from "mongoose";

/* =========================================================
   ENV
========================================================= */

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI environment variable is not configured.",
    );
  }

  return uri;
}

const MONGODB_URI = getMongoUri();

/* =========================================================
   TYPES
========================================================= */

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/* =========================================================
   GLOBAL CACHE
========================================================= */

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache =
  global.mongooseCache ?? {
    conn: null,
    promise: null,
  };

global.mongooseCache = cached;

/* =========================================================
   CONNECT
========================================================= */

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(
      MONGODB_URI,
      {
        bufferCommands: false,
        maxPoolSize: 10,
      },
    );
  }

  try {
    cached.conn = await cached.promise;

    return cached.conn;
  } catch (error) {
    cached.promise = null;

    console.error(
      "[MongoDB] Connection failed:",
      error,
    );

    throw error;
  }
}