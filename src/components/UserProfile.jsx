import PropTypes from 'prop-types'
import styles from './UserProfile.module.css'

export function UserProfile({ level, time, moves }) {
	return (
		<>
			<div className={styles.levelResults}>
				<h3>Level {level}</h3>
				<ul>
					<li>time: {time}</li>
					<li> moves: {moves}</li>
				</ul>
			</div>
		</>
	)
}

UserProfile.propTypes = {
	level: PropTypes.string.isRequired,
	time: PropTypes.number.isRequired,
	moves: PropTypes.number.isRequired
}
