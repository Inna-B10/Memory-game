import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { RatingRow } from '../../../components/RatingRow'
import { Modal } from '../../../components/modal/Modal.jsx'
import { ConfirmDeleting } from '../../../components/modal/ModalContent'
import { useModalStore } from '../../../store/modalStore.jsx'
import { useRatingStore } from '../../../store/ratingStore'
import styles from './RatingPage.module.css'

export function RatingPage() {
	const { sortedRatings, getSortedRatings } = useRatingStore()
	const { showModal, closeModal } = useModalStore()
	const navigate = useNavigate()

	/* ---------------------------- Get Sorted Rating --------------------------- */
	useEffect(() => {
		getSortedRatings()
	}, [getSortedRatings])

	/* ---------------------------------- Reset --------------------------------- */
	const resetRatingMG = () => {
		showModal(
			<ConfirmDeleting
				type='rating'
				onChoice={closeModal}
			/>
		)
	}

	return (
		<>
			<h1 className='textCenter'>Best Results:</h1>
			{/* ---------------------------------- Modal --------------------------------- */}
			<Modal />
			{sortedRatings && (
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

					{Object.entries(sortedRatings).map(([level, data]) => (
						<RatingRow
							key={level}
							level={level}
							data={data}
						/>
					))}
				</div>
			)}
			<div className={styles.buttonsContainer}>
				<Button
					handler={() => {
						navigate('/'), closeModal()
					}}
				>
					Back home
				</Button>
				<Button handler={resetRatingMG}>Reset rating</Button>
			</div>
		</>
	)
}
