import clientPromise from "@Lib/MongoDBConfig";

const mongodb_auth__uri = process.env.MONGODB_AUTH_URI;

export default async function handler(req, res){
	let {keyword, perPage, page} = req.query;

	try{
		const client = await clientPromise;

		const productsCollection = client.db("AmazonProducts").collection("ProductsDataset");
		console.log('Pinged your deployment. You successfully connected to MongoDB!');

		page = isNaN(+page) || +page < 1 ? 1 : +page;
		perPage = isNaN(+perPage) ? 20 : +perPage;

		const query = keyword ? {$text: {$search: keyword}} : {}

		const products = await productsCollection.find(query).skip((page-1) * perPage).limit(perPage || 20).toArray();
		console.log(`First ${perPage} Products`);
		console.log(products);

		res.status(200).json(products);
	} catch(err){
		res.status(500).json({error: err.message});
	}
}