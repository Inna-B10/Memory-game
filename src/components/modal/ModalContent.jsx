import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../../store/gameStore'
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
export const ConfirmDeleteUser = ({ icon, name, onChoice }) => {
	const navigate = useNavigate()
	const { deleteUser } = useUserStore()

	return (
		<div className={styles.modalContent}>
			<p className='textCenter'>
				Are you sure you want to delete <br />
				{icon} {name}?
			</p>
			<div className={styles.buttonsContainer}>
				<Button
					handler={() => {
						deleteUser(icon, name), onChoice(), navigate('/')
					}}
				>
					Yes
				</Button>
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

ConfirmDeleteUser.propTypes = {
	icon: PropTypes.string,
	name: PropTypes.string,
	onChoice: PropTypes.func
}

MessageNameTaken.propTypes = {
	onChoice: PropTypes.func
}
NewScore.propTypes = {
	moves: PropTypes.number,
	time: PropTypes.number
}

MessageEmptyName.propTypes = {
	onChoice: PropTypes.func
}

ConfirmExit.propTypes = {
	onChoice: PropTypes.func,
	resetTimer: PropTypes.func
}

EndGame.propTypes = {
	message: PropTypes.object,
	onChoice: PropTypes.func,
	cardsToShow: PropTypes.number
}
