import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/userStore'
import { Button } from '../Button'
import styles from './Modal.module.css'

export const EndGame = ({ cardsToShow, onChoice }) => {
	const navigate = useNavigate()
	return (
		<div className={styles.modalContent}>
			<h1>You have matched all the cards!</h1>
			<p>Your choice:</p>
			<div className={styles.buttonsContainer}>
				<Button
					handler={() => {
						navigate('/user'), onChoice()
					}}
				>
					Change level
				</Button>
				<Button
					handler={() => {
						navigate('/'), onChoice()
					}}
				>
					Change player
				</Button>
				<Button
					handler={() => {
						navigate('/game', { state: { countCards: cardsToShow } }), onChoice()
					}}
				>
					Play again
				</Button>
			</div>
		</div>
	)
}
export const ConfirmExit = ({ onChoice }) => {
	const navigate = useNavigate()
	return (
		<div className={styles.modalContent}>
			<h1>If you exit now, your current score will be lost! </h1>
			<p>Your choice:</p>
			<div className={styles.buttonsContainer}>
				<Button
					handler={() => {
						navigate('/user'), onChoice()
					}}
				>
					Change level
				</Button>
				<Button
					handler={() => {
						navigate('/'), onChoice()
					}}
				>
					Change player
				</Button>
				<Button handler={() => onChoice()}>Continue game</Button>
			</div>
		</div>
	)
}
export const ConfirmDeleteUser = ({ name, onChoice }) => {
	const navigate = useNavigate()
	const { deleteUser } = useUserStore()

	return (
		<div className={styles.modalContent}>
			<h1>
				Are you sure you want to delete <br />
				{name}?
			</h1>
			<div className={styles.buttonsContainer}>
				<Button
					handler={() => {
						deleteUser(name), onChoice(), navigate('/')
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
			<h1>Please enter your name!</h1>

			<Button handler={() => onChoice()}>OK</Button>
		</div>
	)
}
export const MessageNameTaken = ({ onChoice }) => {
	return (
		<div className={styles.modalContent}>
			<h1>This name is already taken!</h1>
			<p> Please choose another.</p>

			<Button handler={() => onChoice()}>OK</Button>
		</div>
	)
}

ConfirmDeleteUser.propTypes = {
	name: PropTypes.string,
	onChoice: PropTypes.func
}
MessageNameTaken.propTypes = {
	onChoice: PropTypes.func
}

MessageEmptyName.propTypes = {
	onChoice: PropTypes.func
}

ConfirmExit.propTypes = {
	onChoice: PropTypes.func
}

EndGame.propTypes = {
	onChoice: PropTypes.func,
	cardsToShow: PropTypes.number
}
