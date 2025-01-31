import { RatingRow } from '../../../components/RatingRow'
import { useRatingStore } from '../../../store/ratingStore'
import styles from './RantingPage.module.css'

export function RantingPage() {
	const { rating } = useRatingStore()

	return (
		<>
			<h1 className='textCenter'>Rating</h1>
			{rating && (
				<div className={styles.ratingContainer}>
					<span className={`${styles.titleColRow} ${styles.borderBottom}`}>Level</span>
					<span className={`${styles.titleColRow} ${styles.borderLeft} ${styles.borderBottom}`}>
						Player
					</span>
					<span className={`${styles.titleColRow} ${styles.borderLeft} ${styles.borderBottom}`}>
						Time
					</span>
					<span className={`${styles.titleColRow} ${styles.borderLeft} ${styles.borderBottom}`}>
						Moves
					</span>
					<span className={`${styles.titleColRow} ${styles.borderLeft} ${styles.borderBottom}`}>
						Score
					</span>

					{Object.entries(rating).map(([level, data]) => (
						<RatingRow
							key={level}
							level={level}
							data={data}
						/>
					))}
				</div>
			)}
		</>
	)
}
