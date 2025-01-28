import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button.jsx'
import stylesButton from '../../components/Button.module.css'
import { UserProfile } from '../../components/UserProfile.jsx'
import { Modal } from '../../components/modal/Modal.jsx'
import { ConfirmDeleteUser } from '../../components/modal/modalContent.jsx'
import { levels } from '../../constants.js'
import { useModalStore } from '../../store/modalStore.jsx'
import { useUserStore } from '../../store/userStore.jsx'
import styles from './UserPage.module.css'

export function UserPage() {
	const { currentUser, setCurrentUser } = useUserStore()
	const { showModal, closeModal } = useModalStore.getState()
	const navigate = useNavigate()

	/* ---------------------------- If User Undefined --------------------------- */
	useEffect(() => {
		if (!currentUser) {
			const storedUser = localStorage.getItem('currentUserMG')
			if (storedUser) {
				setCurrentUser(JSON.parse(storedUser))
			} else {
				navigate('/')
			}
		}
	}, [currentUser, navigate, setCurrentUser])

	//[TODO] loader
	// Render fallback if currentUser is not loaded
	if (!currentUser) return <div>Loading...</div>

	/* ------------------------------- Delete User ------------------------------ */
	function deleteCurrentUser(name) {
		showModal(
			<ConfirmDeleteUser
				name={name}
				onChoice={closeModal}
			/>
		)
	}
	return (
		<div className={styles.userPage}>
			{/* ---------------------------------- Modal --------------------------------- */}
			<Modal />
			{/* ---------------------------- Handle Player Btn --------------------------- */}
			<div className={styles.funcBtnContainer}>
				<Button
					handler={() => navigate('/')}
					className={stylesButton.smallButton}
				>
					Change player
				</Button>
				<Button
					type='button'
					handler={() => deleteCurrentUser(currentUser.userName)}
					className={stylesButton.smallButton}
				>
					Delete player
				</Button>
			</div>
			{/* -------------------------------- User Info ------------------------------- */}
			<h1 className='textCenter'>
				{currentUser.icon}
				{currentUser.userName}
			</h1>
			<section className={styles.userInfo}>
				<UserProfile user={currentUser} />
			</section>
			{/* ----------------------------- Level Selection ---------------------------- */}
			<h2 className='textCenter'>Choose level:</h2>
			<div className={styles.levelButtonsContainer}>
				{levels.map((level, index) => (
					<Button
						key={index}
						handler={() => navigate('/game', { state: { countCards: level.countCards } })}
					>
						{level.level}
					</Button>
				))}
			</div>
		</div>
	)
}
