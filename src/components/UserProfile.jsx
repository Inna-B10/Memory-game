// import styles from './UserProfile.module.css'
import PropTypes from 'prop-types'
import styles from './UserProfile.module.css'

export function UserProfile({ user }) {
	const result = user.results

	return (
		<>
			<h2 className='textCenter'>Best results:</h2>
			<div className={styles.resultsContainer}>
				<div className={styles.levelResults}>
					<h3>Level Easy</h3>
					<ul>
						<li>time: {result.easy.time}</li>
						<li> moves: {result.easy.moves}</li>
					</ul>
				</div>
				<div className={styles.levelResults}>
					<h3>Level Middle</h3>
					<ul>
						<li>time: {result.middle.time}</li>
						<li>moves: {result.middle.moves}</li>
					</ul>
				</div>
				<div className={styles.levelResults}>
					<h3>Level Hard</h3>{' '}
					<ul>
						<li>time: {result.hard.time}</li>
						<li>moves: {result.hard.moves}</li>
					</ul>
				</div>
				<div className={styles.levelResults}>
					<h3>Level Expert</h3>
					<ul>
						<li>time: {result.expert.time}</li>
						<li>moves: {result.expert.moves}</li>
					</ul>
				</div>
			</div>
			{/* <div>Total games: {user.totalGames}</div> */}
		</>
	)
}

UserProfile.propTypes = {
	user: PropTypes.shape({
		userName: PropTypes.string.isRequired,
		icon: PropTypes.node.isRequired,
		results: PropTypes.shape({
			easy: PropTypes.shape({
				time: PropTypes.number,
				moves: PropTypes.number
			}),
			middle: PropTypes.shape({
				time: PropTypes.number,
				moves: PropTypes.number
			}),
			expert: PropTypes.shape({
				time: PropTypes.number,
				moves: PropTypes.number
			}),
			hard: PropTypes.shape({
				time: PropTypes.number,
				moves: PropTypes.number
			}).isRequired
		})
		// totalGames: PropTypes.number.isRequired
	}).isRequired
}
