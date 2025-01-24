import { useAtom } from 'jotai'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserButton } from '../components/UserButton.jsx'
import { fullGameData, storedUser } from '../store.jsx'
import styles from './HomePage.module.css'

export function HomePage() {
	const [newName, setNewName] = useState('')
	const [newAvatar, setNewAvatar] = useState('🍎')

	const [data, setData] = useAtom(fullGameData)
	console.log(data)
	const [currentUser, setCurrentUser] = useAtom(storedUser)

	const navigate = useNavigate()

	/* ------------------------------- Select User ------------------------------ */
	function handleUserSelect(user) {
		localStorage.setItem('currentUserMG', JSON.stringify(user))
		setCurrentUser(user)
		navigate('/user') //go to userPage
	}

	/* -------------------------------- New User -------------------------------- */
	const handleKeyDown = e => {
		if (e.key !== 'Enter') return
		createNewUser()
	}
	function createNewUser() {
		if (newName.trim() === '') {
			//[TODO] modal message
			alert('Please enter your name!')
			return
		}
		//check if userName already exits
		//[TODO] modul message
		const isNameTaken = data.some(user => user.userName === newName.trim())
		if (isNameTaken) {
			alert('This name is already taken! Please choose another.')
			return
		}

		const newUser = {
			userName: newName.trim(),
			icon: newAvatar,
			totalGames: 0,
			results: {
				easy: { score: 0, count: 0 },
				middle: { score: 0, count: 0 },
				hard: { score: 0, count: 0 },
				expert: { score: 0, count: 0 }
			}
		}
		const updatedFullData = [...data, newUser]
		setData(updatedFullData)
		localStorage.setItem('memoryGame', JSON.stringify(updatedFullData))

		setNewName('') //Clear input field
		setNewAvatar('🍎') // Reset avatar selection
	}

	return (
		<div className={styles.homePage}>
			<h2>HomePage</h2>
			{data.length > 0 && (
				<>
					<p>Choose you profile:</p>
					<div className={styles.avatarSelector}>
						{data.map(user => (
							<UserButton
								key={user.userName}
								user={user}
								onSelect={handleUserSelect}
							/>
						))}
					</div>
				</>
			)}
			<div className={styles.createUser}>
				<label>Create new player:</label>
				<input
					type='text'
					placeholder='your name'
					name='name'
					maxLength={30}
					value={newName}
					onChange={e => {
						setNewName(e.target.value)
					}}
					onKeyDown={handleKeyDown}
				/>
				<p>Choose your avatar:</p>
				<div className={styles.avatarSelector}>
					{['🍎', '🍇', '🍓', '🍍', '🍉'].map(emoji => (
						<button
							key={emoji}
							type='button'
							value={emoji}
							className={`${styles.avatarButton} ${newAvatar === emoji ? styles.selected : ''}`}
							onClick={e => setNewAvatar(e.target.value)}
						>
							{emoji}
						</button>
					))}
				</div>

				<button
					onClick={createNewUser}
					className={styles.createButton}
				>
					Create
				</button>
			</div>
		</div>
	)
}
