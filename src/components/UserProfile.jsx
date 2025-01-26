// import styles from './UserProfile.module.css'
import PropTypes from 'prop-types'

export function UserProfile({ user }) {
	const result = user.results
	return (
		<>
			<h2 className='title'>Best results:</h2>
			<div>
				Level easy: time:{result.easy.time} moves:{result.easy.moves}
			</div>
			<div>
				Level middle: time:{result.middle.time} moves:{result.middle.moves}
			</div>
			<div>
				Level hard: time:{result.hard.time} moves:{result.hard.moves}
			</div>
			<div>
				Level expert: time:{result.expert.time} moves:{result.expert.moves}
			</div>
			<div>Total games: {user.totalGames}</div>
		</>
	)
}

UserProfile.propTypes = {
	user: PropTypes.shape({
		userName: PropTypes.string.isRequired,
		icon: PropTypes.node.isRequired,
		results: PropTypes.shape({
			easy: PropTypes.shape({
				time: PropTypes.number.isRequired,
				moves: PropTypes.number.isRequired
			}),
			middle: PropTypes.shape({
				time: PropTypes.number.isRequired,
				moves: PropTypes.number.isRequired
			}),
			expert: PropTypes.shape({
				time: PropTypes.number.isRequired,
				moves: PropTypes.number.isRequired
			}),
			hard: PropTypes.shape({
				time: PropTypes.number.isRequired,
				moves: PropTypes.number.isRequired
			}).isRequired
		}),
		totalGames: PropTypes.number.isRequired
	}).isRequired
}
