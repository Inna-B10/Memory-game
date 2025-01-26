import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button.jsx'
import stylesButton from '../../components/Button.module.css'
import { UserProfile } from '../../components/UserProfile.jsx'
import { levels } from '../../constants.js'
import { fullGameData, storedUser } from '../../store.jsx'
import styles from './UserPage.module.css'

export function UserPage() {
	const [currentUser, setCurrentUser] = useAtom(storedUser)
	const [users, setUsers] = useAtom(fullGameData)
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

	// Render fallback if currentUser is not loaded
	if (!currentUser) return <div>Loading...</div>

	/* ------------------------------- Delete User ------------------------------ */
	//[TODO] modal message
	function deleteUser(name) {
		const updatedUsers = users.filter(user => user.userName !== name)
		setUsers(updatedUsers)
		localStorage.setItem('memoryGame', JSON.stringify(updatedUsers))

		//delete current user
		setCurrentUser(null)
		localStorage.removeItem('currentUserMG')

		navigate('/')
	}
	return (
		<div className={styles.userPage}>
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
					handler={() => deleteUser(currentUser.userName)}
					className={stylesButton.smallButton}
				>
					Delete player
				</Button>
			</div>
			{/* -------------------------------- User Info ------------------------------- */}
			<h1 className='title'>
				{currentUser.icon}
				{currentUser.userName}
			</h1>
			<section className={styles.userInfo}>
				<UserProfile user={currentUser} />
			</section>
			{/* ----------------------------- Level Selection ---------------------------- */}
			<h2 className='title'>Choose level:</h2>
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
