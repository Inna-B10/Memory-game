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
	function selectExistUser(user) {
		localStorage.setItem('currentUserMG', JSON.stringify(user))
		setCurrentUser(user)
		navigate('/user') //go to userPage
	}

	/* -------------------------------- New User -------------------------------- */
	function selectNewAvatar(value) {
		setNewAvatar(value)
	}

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
				easy: { time: 0, moves: 0 },
				middle: { time: 0, moves: 0 },
				hard: { time: 0, moves: 0 },
				expert: { time: 0, moves: 0 }
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
			{data.length > 0 && (
				<>
					<h1 className='title'>Exist players:</h1>
					<section className={styles.buttonsContainer}>
						{data.map(user => (
							<Button
								key={user.userName}
								handler={() => selectExistUser(user)}
								className={cn(`flex center`, {
									[`${stylesButton.selected}`]: user.userName === currentUser?.userName
								})}
							>
								<span>{user.icon}</span>
								<span>{user.userName}</span>
							</Button>
						))}
					</section>
				</>
			)}
			<h2 className='title'> Create new player:</h2>
			<section className={styles.newUserContainer}>
				<Field
					label='Enter your name'
					placeholder='Enter your name'
					name='user-name'
					value={newName}
					onChange={e => {
						setNewName(e.target.value)
					}}
					onKeyDown={handleKeyDown}
				/>
				<div>Choose your avatar:</div>
				<div className={styles.buttonsContainer}>
					{avatarOptions.map(emoji => (
						<Button
							key={emoji}
							className={cn(stylesButton.avatarButtons, {
								[`${stylesButton.selected}`]: newAvatar === emoji
							})}
							handler={() => selectNewAvatar(emoji)}
						>
							{emoji}
						</Button>
					))}
				</div>
			</section>

			<Button handler={createNewUser}>Save</Button>
		</div>
	)
}
