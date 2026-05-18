export const ShufflingAlgo = (arr) => {
	const len = arr.length;

	for(let i = len; i > 0; i--){
		const randomItemIdx = Math.floor(Math.random() * i--);

		const ShiftingItem = arr[i];
		arr[i] = arr[randomItemIdx];
		arr[randomItemIdx] = ShiftingItem;
	}

	return arr;
}