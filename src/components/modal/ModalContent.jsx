import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Button } from '../Button'
import styles from './Modal.module.css'

// export const endGame = () => {
// 	return (
// 		<div>
// 			<h2> All cards matched!</h2>
// 			<button onClick={() => alert('Change level')}>Change level</button>
// 			<button onClick={() => alert('Change player')}>Change player</button>
// 			<button onClick={() => alert('Play again')}>Play again</button>
// 		</div>
// 	)
// }

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

ConfirmExit.propTypes = {
	onChoice: PropTypes.func
}

EndGame.propTypes = {
	onChoice: PropTypes.func,
	cardsToShow: PropTypes.number
}
//  <p>Are you sure you want exit?</p>
//  <button onClick={()=>alert('OK')}>OK</button>
//  <button onClick={()=>alert('Nei')}>Nei</button>
