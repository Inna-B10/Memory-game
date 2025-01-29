import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { GetImages } from '../../api/GetImages'
import { Button } from '../../components/Button'
import stylesButton from '../../components/Button.module.css'
import { Card } from '../../components/Card'
import { Timer } from '../../components/Timer'
import { Modal } from '../../components/modal/Modal'
import { ConfirmExit, EndGame } from '../../components/modal/modalContent'
import { useGameStore } from '../../store/gameStore'
import { useModalStore } from '../../store/modalStore'
import { useUserStore } from '../../store/userStore'
import styles from './GamePage.module.css'

/* ------------------------------- Grid Column ------------------------------ */
const getGridClass = length => (length >= 20 ? 'grid_col_5' : 'grid_col_4')

export function GamePage() {
	const location = useLocation()
	const { countCards } = location.state || {}
	const cardsToShow = countCards ?? 2

	let level = 'easy'

	const [cards, setCards] = useState([])
	const [loading, setLoading] = useState(false)
	const [selectedCards, setSelectedCards] = useState([])
	const [matchedCards, setMatchedCards] = useState([])
	const [countMoves, setCountMoves] = useState(0)
	const { updateUser, currentUser } = useUserStore()
	const { startGame, stopGame, resetTimer, isGameOn, gameDuration } = useGameStore()
	const { showModal, closeModal } = useModalStore()

	switch (cardsToShow) {
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
	const fetchImages = useCallback(async () => {
		setLoading(true)
		const images = await GetImages(cardsToShow)
		setCards(images)
		setLoading(false)
	}, [cardsToShow])

	useEffect(() => {
		fetchImages()
	}, [fetchImages])
	/* ------------------------------- Reset Game ------------------------------- */
	const resetGame = useCallback(() => {
		setSelectedCards([])
		setMatchedCards([])
		setCountMoves(0)
		stopGame()
		resetTimer()
		fetchImages()
	}, [stopGame, resetTimer, fetchImages])
	/* --------------------------------- Modals --------------------------------- */
	const openChoice = () => {
		showModal(<ConfirmExit onChoice={closeModal} />)
	}
	const openEndGame = useCallback(() => {
		showModal(
			<EndGame
				cardsToShow={cardsToShow}
				onChoice={() => {
					closeModal(), resetGame()
				}}
			/>
		)
	}, [showModal, closeModal, cardsToShow, resetGame])

	/* ---------------------- Checking For Game Completion ---------------------- */
	useEffect(() => {
		if (matchedCards.length && matchedCards.length === cards.length / 2) {
			stopGame()
			updateUser(countMoves, level, gameDuration)
			setTimeout(() => {
				openEndGame()
			}, 1200)
		}
	}, [matchedCards, cards, updateUser, countMoves, level, stopGame, gameDuration, openEndGame])

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
				if (!isGameOn) {
					startGame()
				}
				setSelectedCards([{ id: card.id, name: card.name }])
			}
			// if second card
			else {
				setCountMoves(countMoves => countMoves + 1)
				setSelectedCards(prevSelectedCards => [
					...prevSelectedCards,
					{ id: card.id, name: card.name }
				])
				//if cards do match
				if (selectedCards[0].name === card.name) {
					setTimeout(() => {
						setMatchedCards(prevMatchedCards => [...prevMatchedCards, card.name])
					}, 550)
					setTimeout(() => setSelectedCards([]), 560)
					// if cards do not match
				} else {
					//flipp cards back
					setTimeout(() => setSelectedCards([]), 800)
				}
			}
		},
		[selectedCards, matchedCards, isGameOn, startGame]
	)
	console.log(cardsToShow)
	return (
		<>
			<div className={styles.userNameContainer}>
				<Button
					handler={() => {
						openChoice(), stopGame()
					}}
					className={stylesButton.smallButton}
				>
					Exit
				</Button>
				<h1>
					<span className='avatarSize'>{currentUser.icon}</span>
					{currentUser.userName}
				</h1>
				<Modal />
			</div>
			<div className={styles.statisticContainer}>
				<div>Level: {level}</div>
				<div>Moves: {countMoves}</div>
				<Timer />
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
							isGameOn={isGameOn}
						/>
					))
				)}
			</div>
		</>
	)
}
