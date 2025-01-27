import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { GetImages } from '../../api/GetImages'
import { Card } from '../../components/Card'
import { userStore } from '../../store/userStore'
import styles from './GamePage.module.css'

/* ------------------------------- Grid Column ------------------------------ */
const getGridClass = length => (length >= 20 ? 'grid_col_5' : 'grid_col_4')

export function GamePage() {
	const location = useLocation()
	const { countCards } = location.state || {}
	let level = 'easy'

	const [cards, setCards] = useState([])
	const [loading, setLoading] = useState(false)
	const [selectedCards, setSelectedCards] = useState([])
	const [matchedCards, setMatchedCards] = useState([])
	const [countMoves, setCountMoves] = useState(0)
	const updateUser = userStore(state => state.updateUser)

	switch (countCards) {
		case 6:
			level = 'easy'
			break
		case 8:
			level = 'middle'
			break
		case 10:
			level = 'hard'
			break
		case 15:
			level = 'expert'
			break
	}

	/* ------------------------------- Load Images ------------------------------ */
	//[TODO] errors fetching images
	useEffect(() => {
		async function fetchImages() {
			setLoading(true)
			const images = await GetImages(countCards)
			setCards(images)
			setLoading(false)
		}
		fetchImages()
	}, [countCards])

	//[TODO] modal message
	/* ---------------------- Checking For Game Completion ---------------------- */
	useEffect(() => {
		if (matchedCards.length && matchedCards.length === cards.length / 2) {
			alert('Game finished!')
			updateUser(countMoves, level)
		}
	}, [matchedCards, cards, updateUser, countMoves, level])

	/* ------------------------- Processing Card Clicks ------------------------- */
	const turnCard = useCallback(
		card => {
			//if already in selectedCards/matchedCards or open 2 cards -> return
			if (
				selectedCards.find(item => item.id === card.id) ||
				matchedCards.includes(card.name) ||
				selectedCards.length == 2
			) {
				return
			}
			//if first card
			if (selectedCards.length === 0) {
				setSelectedCards([{ id: card.id, name: card.name }])
			}
			// if second card
			else {
				setCountMoves(countMoves => countMoves + 1)
				//if cards do match
				if (selectedCards[0].name === card.name) {
					setTimeout(
						() => setMatchedCards(prevMatchedCards => [...prevMatchedCards, card.name]),
						1000
					)
				}
				// if cards do not match
				setSelectedCards(prevSelectedCards => [
					...prevSelectedCards,
					{ id: card.id, name: card.name }
				])
				//flipp cards back
				setTimeout(() => setSelectedCards([]), 1200)
			}
		},
		[selectedCards, matchedCards]
	)

	return (
		<>
			<h1 className='title'>Level: {level}</h1>
			<div className='flex'>
				<div>Moves: {countMoves}</div>
				<div>Time:</div>
			</div>
			<div className={`${styles.grid} ${styles[getGridClass(cards.length)]}`}>
				{loading ? (
					<p>Loading...</p>
				) : (
					cards.map(card => (
						<Card
							key={card.id}
							card={card}
							turnCard={turnCard}
							selectedCards={selectedCards}
							matchedCards={matchedCards}
						/>
					))
				)}
			</div>
		</>
	)
}
