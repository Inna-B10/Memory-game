import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button.jsx'
import stylesButton from '../../components/Button.module.css'
import Loader from '../../components/Loader.jsx'
import { UserProfile } from '../../components/UserProfile.jsx'
import { Modal } from '../../components/modal/Modal.jsx'
import { ConfirmDeleting } from '../../components/modal/ModalContent.jsx'
import { levels } from '../../constants.js'
import { useModalStore } from '../../store/modalStore.jsx'
import { useRatingStore } from '../../store/ratingStore.jsx'
import { useUserStore } from '../../store/userStore.jsx'
import styles from './UserPage.module.css'

export function UserPage() {
	const { currentUser, setCurrentUser } = useUserStore()
	const { showModal, closeModal } = useModalStore()
	const navigate = useNavigate()
	const { rating } = useRatingStore()

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

	// Render fallback if currentUser is not loaded
	if (!currentUser) return <Loader />

	/* ------------------------------- Delete User ------------------------------ */
	function deleteCurrentUser(avatar, name) {
		showModal(
			<ConfirmDeleting
				type='user'
				icon={avatar}
				name={name}
				onChoice={closeModal}
			/>
		)
	}
	return (
		<>
			<Helmet>
				<title>Profile: {currentUser.userName}</title>
			</Helmet>
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
						handler={() => deleteCurrentUser(currentUser.icon, currentUser.userName)}
						className={stylesButton.smallButton}
					>
						Delete player
					</Button>
				</div>
				{/* -------------------------------- User Info ------------------------------- */}

				<div className={styles.userName}>
					<h1>
						<span className='avatarSize'>{currentUser.icon}</span> {currentUser.userName}
					</h1>
				</div>

				<section className={styles.userInfo}>
					<h2 className='textCenter'>Your results:</h2>
					<div className={styles.resultsContainer}>
						{Object.entries(currentUser.results).map(([level, { time, moves }]) => {
							//check if user is in rank table
							let cup = false
							if (rating[level]?.userName === `${currentUser.icon} ${currentUser.userName}`) {
								cup = true
							}

							return (
								<UserProfile
									key={level}
									level={level}
									time={time}
									moves={moves}
									cup={cup}
								/>
							)
						})}
					</div>
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
		</>
	)
}
