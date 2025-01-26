import cn from 'clsx'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button.jsx'
import stylesButton from '../components/Button.module.css'
import { Field } from '../components/Field.jsx'
import { avatarOptions } from '../constants.js'
import { fullGameData, storedUser } from '../store.jsx'
import styles from './HomePage.module.css'

export function HomePage() {
	const [newName, setNewName] = useState('')
	const [newAvatar, setNewAvatar] = useState('🍎')

	const [data, setData] = useAtom(fullGameData)
	const [currentUser, setCurrentUser] = useAtom(storedUser)

	console.log('data:', data, 'current:', currentUser)
	console.log('new avatar ', newAvatar)
	const navigate = useNavigate()

	/* ------------------------------- Select User ------------------------------ */
	function handleUserSelect(user) {
		localStorage.setItem('currentUserMG', JSON.stringify(user))
		setCurrentUser(user)
		navigate('/user') //go to userPage
	}

	function selectNewAvatar(value) {
		setNewAvatar(value)
	}
	function saveNewName(name) {
		console.log(name)
		setNewName(name)
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
							<Button
								key={user.userName}
								handler={() => handleUserSelect(user)}
								className={cn(`flex center ${stylesButton.regular}`, {
									[`${stylesButton.selected}`]: user.userName === currentUser?.userName
								})}
							>
								<span>{user.icon}</span>
								<span>{user.userName}</span>
							</Button>
						))}
					</div>
				</>
			)}
			<div className={styles.createUser}>
				<Field
					label='Create new player'
					placeholder='your name'
					name='user-name'
					value={newName}
					onChange={e => {
						setNewName(e.target.value)
					}}
					onKeyDown={handleKeyDown}
				/>
				<p>Choose your avatar:</p>
				<div className={styles.avatarSelector}>
					{avatarOptions.map(emoji => (
						<Button
							key={emoji}
							className={cn(`${stylesButton.regular}`, {
								[`${stylesButton.selected}`]: newAvatar === emoji
							})}
							handler={() => selectNewAvatar(emoji)}
						>
							{emoji}
						</Button>
					))}
				</div>

				<Button
					className={stylesButton.regular}
					handler={createNewUser}
				>
					Create
				</Button>
			</div>
		</div>
	)
}
