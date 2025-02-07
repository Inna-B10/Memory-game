import PropTypes from 'prop-types'
import styles from '../pages/game/rating/RatingPage.module.css'

export function RatingRow({ level, data }) {
	const levelName = level.charAt(0).toUpperCase() + level.slice(1)

	return (
		<>
			<span className={`${styles.titleColRow} ${styles.borderBottom}`}>{levelName}</span>
			{Object.entries(data).map((key, index) => {
				return (
					<span
						className={`${styles.borderLeft} ${styles.borderBottom}`}
						key={index}
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
		moves: PropTypes.number
	}).isRequired
}
