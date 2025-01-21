import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { GetImages } from '../../api/GetImages'
import { Card } from '../../components/Card'
import styles from './GamePage.module.css'

/* ------------------------------- Grid Column ------------------------------ */
const getGridClass = length => (length >= 20 ? 'grid_col_5' : 'grid_col_4')

export function GamePage() {
	const location = useLocation()
	const { countCards } = location.state || {}

	const [cards, setCards] = useState([])
	const [loading, setLoading] = useState(false)
	const [selectedCards, setSelectedCards] = useState([])
	const [matchedCards, setMatchedCards] = useState([])

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

	/* ---------------------- Checking For Game Completion ---------------------- */
	useEffect(() => {
		if (matchedCards.length && matchedCards.length === cards.length / 2) {
			console.log('finish')
		}
	}, [matchedCards, cards])

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
				//if cards do match
				if (selectedCards[0].name === card.name) {
					setMatchedCards(prevMatchedCards => [...prevMatchedCards, card.name])
				}
				// if cards do not match
				setSelectedCards(prevSelectedCards => [
					...prevSelectedCards,
					{ id: card.id, name: card.name }
				])
				//flipp cards back
				setTimeout(() => setSelectedCards([]), 1500)
			}
		},
		[selectedCards, matchedCards]
	)

	return (
		<>
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
