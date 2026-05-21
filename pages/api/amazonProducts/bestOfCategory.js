import clientPromise from "@Lib/MongoDBConfig";

const mongodb_auth__uri = process.env.NEXT_PUBLIC_VERCEL__MONGODB__AUTH_URI;

export default async function handler(req, res){
	const {categoryId} = req.query;
	
	try{
		const client = await clientPromise;

		console.log('Pinged your deployment. You successfully connected to MongoDB!');

		const productsCollection = await client.db("AmazonProducts").collection("ProductsDataset");

		const searchQuery = !isNaN(+categoryId) ? {category_id: +categoryId} : {};
		const sortingQuery = {};

		const products = await productsCollection.find(searchQuery).sort(sortingQuery).limit(30).toArray();

		res.status(200).json(products);
	} catch(err){
		res.status(500).json({error: err.message});
	}
}