import {MongoClient} from "mongodb";

const mongodb_auth__uri = process.env.NEXT_PUBLIC_VERCEL__MONGODB__AUTH_URI;
let client;
let clientPromise;

if(!global._mongodbClientPromise){
	client = new MongoClient(mongodb_auth__uri);
	global._mongodbClientPromise = client.connect();
}

clientPromise = global._mongodbClientPromise;

export default clientPromise;