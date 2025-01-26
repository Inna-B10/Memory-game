import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button.jsx'
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
		<>
			{/* -------------------------------- User Info ------------------------------- */}
			<div className='flex center'>
				<Button
					handler={() => navigate('/')}
					className='level-button'
				>
					Change user
				</Button>
				<h1>
					{currentUser.icon}
					{currentUser.userName}
				</h1>
				<Button
					type='button'
					handler={() => deleteUser(currentUser.userName)}
				>
					Delete user
				</Button>
			</div>
			{/* ----------------------------- Level Selection ---------------------------- */}
			<h2>Choose level:</h2>
			<div>
				{levels.map((level, index) => (
					<Button
						key={index}
						handler={() => navigate('/game', { state: { countCards: level.countCards } })}
						className={styles.levelButton}
					>
						{level.level}
					</Button>
				))}
			</div>
		</>
	)
}
