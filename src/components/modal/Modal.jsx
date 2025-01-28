import { AnimatePresence, m } from 'framer-motion'
import { useModalStore } from '../../store/modalStore'
import styles from './Modal.module.css'

export function Modal() {
	const { isOpen, content, closeModal } = useModalStore()

	return (
		<AnimatePresence>
			{isOpen && (
				<m.div
					className={styles.modalOverlay}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={closeModal}
				>
					<m.div
						className={styles.modalContent}
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.8 }}
						onClick={e => e.stopPropagation()}
					>
						{content}
					</m.div>
				</m.div>
			)}
		</AnimatePresence>
	)
}
