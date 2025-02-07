import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation, useNavigate } from 'react-router-dom'
import { GetImages } from '../../api/GetImages'
import { Button } from '../../components/Button'
import stylesButton from '../../components/Button.module.css'
import { Card } from '../../components/Card'
import Loader from '../../components/Loader'
import { Timer } from '../../components/Timer'
import { Modal } from '../../components/modal/Modal'
import { ConfirmExit, EndGame } from '../../components/modal/ModalContent'
import { levels } from '../../constants'
import { useCardSelection } from '../../hooks/useCardSelection'
import { useGameCompletion } from '../../hooks/useGameCompletion'
import { useGameStore } from '../../store/gameStore'
import { useModalStore } from '../../store/modalStore'
import { useUserStore } from '../../store/userStore'
import styles from './GamePage.module.css'

/* ------------------------------- Grid Column ------------------------------ */
const getGridClass = length => (length >= 20 ? 'grid_col_5' : 'grid_col_4')

export function GamePage() {
	const [cards, setCards] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const { updateUser, currentUser } = useUserStore()
	const { startGame, stopGame, resetTimer, isGameOn, gameDuration } = useGameStore()
	const { showModal, closeModal } = useModalStore()
	const navigate = useNavigate()

	useEffect(() => {
		if (!currentUser) {
			navigate('/')
		}
	}, [currentUser, navigate])

	/* ------------------------------ Chosen Level ------------------------------ */
	const { countCards = 6 } = useLocation().state || {}
	const level = levels.find(l => l.countCards === countCards)?.level || 'easy'

	/* ------------------------------- Load Images ------------------------------ */
	const fetchImages = useCallback(async () => {
		setLoading(true)
		setError(null)
		try {
			const images = await GetImages(countCards)
			if (images.length === 0) {
				throw new Error('No images available')
			}
			setCards(images)
		} catch (error) {
			console.error('Error fetching images:', error)
			setError('Failed to load images')
		} finally {
			setLoading(false)
		}
	}, [countCards])

	useEffect(() => {
		fetchImages()
	}, [fetchImages])

	/* ---------------- Processing Clicks On Cards And Reset Game --------------- */
	const { selectedCards, matchedCards, countMoves, turnCard, resetGame } = useCardSelection({
		startGame,
		stopGame,
		resetTimer,
		isGameOn,
		fetchImages
	})

	/* --------------------------------- Modals --------------------------------- */
	const openChoice = () => {
		showModal(<ConfirmExit onChoice={closeModal} />)
	}
	const openEndGame = useCallback(
		message => {
			showModal(
				<EndGame
					message={message}
					cardsToShow={countCards}
					onChoice={() => {
						closeModal(), resetGame()
					}}
				/>
			)
		},
		[showModal, closeModal, countCards, resetGame]
	)

	/* ---------------------- Checking For Game Completion ---------------------- */
	useGameCompletion({
		matchedCards,
		cards,
		stopGame,
		updateUser,
		countMoves,
		level,
		gameDuration,
		openEndGame,
		currentUser
	})

	if (loading) {
		return <Loader />
	}

	/* -------------------------- If No Images Fetched -------------------------- */
	if (error || cards.length === 0) {
		return (
			<section className='errorMessage'>
				<p>{error ? error : 'No cards found!'}</p>
				<Button handler={() => navigate('/')}>Back home</Button>
			</section>
		)
	}

	return (
		<>
			<Helmet>
				<title>
					Level: {level} | {currentUser.userName}{' '}
				</title>
			</Helmet>
			<div className={styles.userNameContainer}>
				<Button
					handler={() => {
						openChoice(), stopGame()
					}}
					className={stylesButton.smallButton}
				>
					Exit
				</Button>
				<div className='flex flexCenter'>
					<h1>
						<span className='avatarSize'>{currentUser?.icon}</span> {currentUser?.userName}
					</h1>
				</div>
				<Modal />
			</div>
			<div className={styles.statisticContainer}>
				<div>🎓 Level: {level}</div>
				<div>➰ Moves: {countMoves}</div>
				<Timer />
			</div>
			<div className={`${styles.grid} ${styles[getGridClass(cards.length)]}`}>
				{loading ? (
					<Loader />
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
