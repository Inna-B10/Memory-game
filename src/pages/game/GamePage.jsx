import { useEffect, useState } from 'react'
import styles from './GamePage.module.css'

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
	if (length >= 20) return 'grid_col_5'
	return 'grid_col_4'
}

/* -------------------------------- GetImages ------------------------------- */
//[!] count can be 6-easy level, 8-middle, 10-hard, 15-expert
async function getImages(count) {
	const images = Object.keys(import.meta.glob('/public/cards/*.{png,jpeg,jpg,svg}')).map(path =>
		path.replace('/public', '')
	)

	let shuffledPaths = shuffleArray(images)
	if (count < images.length) {
		shuffledPaths = shuffledPaths.slice(0, count)
	}

	let pairsArray = shuffledPaths.flatMap(item => {
		const filename = item.split('/').pop() //get full filename
		const id = filename.split('.')[0] //extract name without extension

		//creating pair of cards: the same file, but with unique id for each card in pair
		//[FIXME] CLEAN filename
		return [
			{ id: `${id}-n1`, name: filename, path: item }, //add name-n1 as id and full filename for each copy
			{ id: `${id}-n2`, name: filename, path: item }
		]
	})
	pairsArray = shuffleArray(pairsArray) //shuffle new array with card pairs

	return pairsArray
}

export function GamePage() {
	const [cards, setCards] = useState([])
	const [count, setCount] = useState()
	const [selectedCards, setSelectedCards] = useState([])
	const [matchedCards, setMatchedCards] = useState([])

	useEffect(() => {
		if (count > 0) {
			const fetchImages = async () => {
				const images = await getImages(count)
				setCards(images)
			}
			fetchImages()
		}
	}, [count])

	useEffect(() => {
		if (selectedCards.length > 0) {
			console.log('selected: ', selectedCards)
		}
	}, [selectedCards])

	useEffect(() => {
		if (matchedCards.length > 0) {
			console.log('matched: ', matchedCards)
		}
	}, [matchedCards])

	function handleClick(card) {
		//if already in selectedCards -> return
		if (selectedCards.find(item => item.id === card.id) || matchedCards.includes(card.name)) return

		if (selectedCards.length === 2 || selectedCards.length === 0) {
			setSelectedCards([{ id: card.id, name: card.name }])
		} else {
			if (selectedCards[0].name === card.name) {
				setMatchedCards(prevMatchedCards => [...prevMatchedCards, card.name])
				setSelectedCards([])
			} else {
				setSelectedCards(prevSelectedCards => [
					...prevSelectedCards,
					{ id: card.id, name: card.name }
				])
			}
		}
	}

	return (
		<>
			<div className={styles.levelButtons}>
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

			<div className={`${styles.grid} ${styles[getGridClass(cards.length)]}`}>
				{cards.map(card => (
					<img
						key={card.id}
						src={card.path}
						name={card.name}
						alt=''
						onClick={() => handleClick(card)}
					/>
				))}
			</div>
		</>
	)
}
