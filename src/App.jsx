import { useEffect, useState } from 'react'
import './App.css'
import { APP_URL, CARDS_PATH } from './constants'

const imgPath = CARDS_PATH
// let fullArray = []
const getImages = async (count = 4) => {
	const images = Object.keys(import.meta.glob('./assets/cards/*.{png,jpeg,jpg,svg}'))
	console.log(images)
	const imagesPaths = Object.entries(images)
	console.log(imagesPaths)
	const shuffledPaths = imagesPaths.sort(() => Math.random() - 0.5)
	const selectedPaths = shuffledPaths.slice(0, count)

	// const loadedImages = selectedPaths.map(path => path[0])

	// console.log(selectedPaths)
	// console.log(loadedImages)
	let fullArray = selectedPaths.flatMap(item => {
		const filename = item[0].split('/').pop() //get the file name
		const id = filename.split('.')[0] //extract the identifier before the extension
		return [
			{ id: `${id}-n1`, path: item[0] }, //add a path for each copy
			{ id: `${id}-n2`, path: item[0] }
		]
	})

	console.log(fullArray)
	fullArray = fullArray.sort(() => Math.random() - 0.5)
	console.log(fullArray)
	// console.log(loadedImages)
	return fullArray
}

function App() {
	const [cards, setCards] = useState([])

	useEffect(() => {
		const fetchImages = async () => {
			const images = await getImages()
			setCards(images)
		}
		fetchImages()
	}, [])

	return (
		<>
			<div className='card'>
				{cards.map(card => (
					<img
						key={card.id}
						src={`${APP_URL}/src/${card.path}`}
						width={200}
						alt=''
					/>
				))}
			</div>
		</>
	)
}

export default App
