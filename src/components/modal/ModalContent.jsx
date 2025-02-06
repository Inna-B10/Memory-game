import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../../store/gameStore'
import { useRatingStore } from '../../store/ratingStore'
import { useUserStore } from '../../store/userStore'
import { Button } from '../Button'
import stylesButton from '../Button.module.css'
import styles from './Modal.module.css'

export const EndGame = ({ message, cardsToShow, onChoice }) => {
	const navigate = useNavigate()
	return (
		<div className={styles.modalContent}>
			{/* if new record */}
			{message ? message : <p className={styles.titleMessage}>You have matched all the cards!</p>}

			<div className={styles.buttonsContainer}>
				<Button
					handler={() => {
						navigate('/user'), onChoice()
					}}
					className={stylesButton.smallButton}
				>
					Change level
				</Button>
				<Button
					handler={() => {
						navigate('/'), onChoice()
					}}
					className={stylesButton.smallButton}
				>
					Change player
				</Button>
				<Button
					handler={() => {
						navigate('/game', { state: { countCards: cardsToShow } }), onChoice()
					}}
					className={stylesButton.smallButton}
				>
					Play again
				</Button>
			</div>
		</div>
	)
}
export const ConfirmExit = ({ onChoice }) => {
	const { continueGame, resetTimer } = useGameStore()
	const navigate = useNavigate()
	return (
		<div className={styles.modalContent}>
			<p className={styles.titleMessage}>If you exit now, your current score will be lost! </p>
			<p>Your choice:</p>
			<div className={styles.buttonsContainer}>
				<Button
					handler={() => {
						resetTimer(), navigate('/user'), onChoice()
					}}
					className={stylesButton.smallButton}
				>
					Change level
				</Button>
				<Button
					handler={() => {
						resetTimer(), navigate('/'), onChoice()
					}}
					className={stylesButton.smallButton}
				>
					Change player
				</Button>
				<Button
					handler={() => {
						onChoice(), continueGame()
					}}
					className={stylesButton.smallButton}
				>
					Continue game
				</Button>
			</div>
		</div>
	)
}
export const ConfirmDeleting = ({ icon, name, onChoice, type }) => {
	const navigate = useNavigate()
	const isUser = type === 'user'
	const { deleteUser } = useUserStore()
	const { resetRating } = useRatingStore()
	const onClick = isUser
		? () => {
				deleteUser(icon, name), onChoice(), navigate('/')
			}
		: () => {
				resetRating(), onChoice()
			}

	return (
		<div className={styles.modalContent}>
			<p className='textCenter'>
				{isUser
					? `Are you sure you want to delete
				${icon} ${name}?`
					: `Are you sure you want to reset rating?`}
			</p>
			<div className={styles.buttonsContainer}>
				<Button handler={onClick}>Yes</Button>
				<Button handler={() => onChoice()}>No</Button>
			</div>
		</div>
	)
}
export const MessageEmptyName = ({ onChoice }) => {
	return (
		<div className={styles.modalContent}>
			<p className='textCenter'>Please enter your name and/or choose avatar!</p>

			<Button handler={() => onChoice()}>OK</Button>
		</div>
	)
}
export const MessageNameTaken = ({ onChoice }) => {
	return (
		<div className={styles.modalContent}>
			<p className='textCenter'>This name is already taken!</p>
			<p> Please choose another.</p>

			<Button handler={() => onChoice()}>OK</Button>
		</div>
	)
}
export const NewScore = ({ moves, time }) => {
	return (
		<>
			<p className={styles.titleMessage}>Congratulation!</p>
			<p>
				You finished the game in {moves} moves within {time} seconds
			</p>
		</>
	)
}

ConfirmDeleting.propTypes = {
	type: PropTypes.string.isRequired,
	icon: PropTypes.string,
	name: PropTypes.string,
	onChoice: PropTypes.func.isRequired
}

MessageNameTaken.propTypes = {
	onChoice: PropTypes.func.isRequired
}

NewScore.propTypes = {
	moves: PropTypes.number.isRequired,
	time: PropTypes.number.isRequired
}

MessageEmptyName.propTypes = {
	onChoice: PropTypes.func.isRequired
}

ConfirmExit.propTypes = {
	onChoice: PropTypes.func.isRequired,
	resetTimer: PropTypes.func
}

EndGame.propTypes = {
	message: PropTypes.object,
	onChoice: PropTypes.func.isRequired,
	cardsToShow: PropTypes.number
}
