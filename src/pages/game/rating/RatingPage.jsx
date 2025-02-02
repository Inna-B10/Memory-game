import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { RatingRow } from '../../../components/RatingRow'
import { useRatingStore } from '../../../store/ratingStore'
import styles from './RatingPage.module.css'

export function RatingPage() {
	const { rating } = useRatingStore()
	const navigate = useNavigate()
	return (
		<>
			<h1 className='textCenter'>Best Results:</h1>
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

					{Object.entries(rating).map(([level, data]) => (
						<RatingRow
							key={level}
							level={level}
							data={data}
						/>
					))}
				</div>
			)}
			<div className='textCenter'>
				<Button handler={() => navigate('/')}>Home</Button>
			</div>
		</>
	)
}
