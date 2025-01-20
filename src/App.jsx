import { useEffect, useState } from 'react'
import './App.css'

/* -------------------------- Fisher-Yates Shuffle -------------------------- */
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1)) //random index from 0 to i
		array[i] = [array[j], (array[j] = array[i])][0] //swapping elements
	}
	return array
}

/* ------------------------------- Grid Column ------------------------------ */
function getGridClass(length) {
	if (length >= 20) return 'grid-col-5'
	return 'grid-col-4'
}

/* -------------------------------- GetImages ------------------------------- */
//[!] count can be 6-easy level, 8-middle, 10-hard, 15-expert
async function getImages(count) {
	const images = Object.keys(import.meta.glob('/src/assets/cards/*.{png,jpeg,jpg,svg}'))
	console.log(images)

	let shuffledPaths = shuffleArray(images)
	if (count < images.length) {
		shuffledPaths = shuffledPaths.slice(0, count)
	}

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
	console.log(pairsArray)
	return pairsArray
}

function App() {
	// const [count, setCount] = useState(0)
	// const images = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍉']

	const [cards, setCards] = useState([])
	const [count, setCount] = useState()

	useEffect(() => {
		if (count > 0) {
			const fetchImages = async () => {
				const images = await getImages(count)
				setCards(images)
			}
			fetchImages()
		}
	}, [count])

	return (
		<>
			{/* <button onClick={() => setCount(count => count + 1)}>
				count is {count}
			</button> */}
			<div className='level-buttons'>
				<button
					value={6}
					onClick={e => setCount(e.target.value)}
				>
					easy
				</button>
				<button
					value={8}
					onClick={e => setCount(e.target.value)}
				>
					middle
				</button>
				<button
					value={10}
					onClick={e => setCount(e.target.value)}
				>
					hard
				</button>
				<button
					value={15}
					onClick={e => setCount(e.target.value)}
				>
					expert
				</button>
			</div>

			<div className={`grid ${getGridClass(cards.length)}`}>
				{cards.map(card => (
					<img
						key={card.id}
						src={card.path}
						// width='auto'
						alt=''
					/>
				))}
			</div>
		</>
	)
}

export default App
