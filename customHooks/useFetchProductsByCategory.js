export const useFetchProductsByCategory = () => {
	let loading = false;
	let error = false;
	// PPC_List = Products per Category List
	let PPC_List = [];

	async function FetchProductsByCategory(id){
		try{
			loading = true;

			const req = await fetch(`/api/amazonProducts/bestOfCategory?categoryId=${id}`);

			if(!req.ok){
				throw new Error("Hmmmm, Something is not going Well");
			}

			const productsRes = await req.json();

			PPC_List = productsRes;
			console.log(PPC_List);

			loading = false;
			error = false;
		} catch(err) {
			loading = false;
			error = true;
		} finally {
			return {
				error,
				loading,
				PPC_List
			}
		}
	}

	return {
		FetchProductsByCategory
	};
}