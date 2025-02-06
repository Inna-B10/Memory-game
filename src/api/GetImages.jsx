import { shuffleArray } from '../utils/shuffleArray'

export async function GetImages(countCard) {
	let images = []
	try {
		images = Object.keys(import.meta.glob('/public/cards/*.{png,jpeg,jpg,svg,webp,gif}')).map(
			path => path.replace('/public', '')
		)

		if (images.length === 0) {
			throw new Error('Images not found')
		}
	} catch (error) {
		console.error('Error while getting images:', error)
		return []
	}

	/* --------------------- Shuffle Array With Images Path --------------------- */
	let shuffledPaths = shuffleArray(images)
	if (countCard < images.length) {
		shuffledPaths = shuffledPaths.slice(0, countCard)
	}

	/* ---------------------- Create Array Of Card Pairs --------------------- */
	let pairsArray = shuffledPaths.flatMap(item => {
		const filename = item.split('/').pop() //get full filename
		const id = filename.split('.')[0] //extract name without extension

		//creating pair of cards: the same file, but with unique id for each card in pair
		return [
			{ id: `${id}-n1`, name: filename, path: item }, //add name-n1 as id and full filename for each copy
			{ id: `${id}-n2`, name: filename, path: item }
		]
	})
	pairsArray = shuffleArray(pairsArray) //shuffle new array with card pairs

	return pairsArray
}
