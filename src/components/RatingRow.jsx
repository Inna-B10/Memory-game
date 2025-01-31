import PropTypes from 'prop-types'
import styles from '../pages/game/ranting/RantingPage.module.css'

export function RatingRow({ level, data }) {
	return (
		<>
			<span className={`${styles.titleColRow} ${styles.borderBottom}`}>{level}</span>
			{Object.entries(data).map((key, value) => {
				return (
					<span
						className={`${styles.borderLeft} ${styles.borderBottom}`}
						key={value}
					>
						{key[1]}
					</span>
				)
			})}
		</>
	)
}

RatingRow.propTypes = {
	level: PropTypes.string.isRequired,
	data: PropTypes.shape({
		userName: PropTypes.string,
		time: PropTypes.number,
		moves: PropTypes.number,
		score: PropTypes.number
	}).isRequired
}
