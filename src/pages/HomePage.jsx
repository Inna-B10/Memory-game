import cn from 'clsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button.jsx'
import stylesButton from '../components/Button.module.css'
import { Field } from '../components/Field.jsx'
import { Modal } from '../components/modal/Modal.jsx'
import { avatarOptions } from '../constants.js'
import { useUserStore } from '../store/userStore.jsx'
import styles from './HomePage.module.css'

export function HomePage() {
	const [newName, setNewName] = useState('')
	const [newAvatar, setNewAvatar] = useState('🍎')

	const { allUsers, addNewUser, currentUser, setCurrentUser } = useUserStore()
	const navigate = useNavigate()

	/* ------------------------------- Select User ------------------------------ */
	function selectExistUser(user) {
		setCurrentUser(user)
		navigate('/user')
	}

	/* -------------------------------- New User -------------------------------- */
	function selectNewAvatar(value) {
		setNewAvatar(value)
	}

	const handleKeyDown = e => {
		if (e.key !== 'Enter') return
		createNewUser()
	}

	function createNewUser(name, avatar) {
		const newUser = {
			userName: name.trim(),
			icon: avatar,
			// totalGames: 0,
			results: {
				easy: { time: 0, moves: 0 },
				middle: { time: 0, moves: 0 },
				hard: { time: 0, moves: 0 },
				expert: { time: 0, moves: 0 }
			}
		}
		addNewUser(newUser)

		setNewName('') //Clear input field
		setNewAvatar('🍎') // Reset avatar selection
	}

	return (
		<div className={styles.homePage}>
			<Modal />
			{allUsers.length > 0 && (
				<>
					<h1 className='textCenter'>Exist players:</h1>
					<section className={styles.buttonsContainer}>
						{allUsers.map(user => (
							<Button
								key={user.userName}
								handler={() => selectExistUser(user)}
								className={cn(`flex flexCenter`, {
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
			<Button
				handler={() => navigate('/game/rating')}
				className={stylesButton.smallButton}
			>
				Best score results
			</Button>
			<h2 className='textCenter'> Create new player:</h2>
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

			<Button handler={() => createNewUser(newName, newAvatar)}>Save</Button>
		</div>
	)
}
