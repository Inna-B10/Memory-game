/* -------------------------- Fisher-Yates Shuffle -------------------------- */
export function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1)) //random index from 0 to i
		array[i] = [array[j], (array[j] = array[i])][0] //swapping elements
	}
	return array
}
