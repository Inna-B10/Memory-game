import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../UserContext.jsx'
import { UserButton } from '../components/UserButton.jsx'
import styles from './HomePage.module.css'

export function HomePage() {
	const [newName, setNewName] = useState('')
	const [newAvatar, setNewAvatar] = useState('?')
	const [fullData, setFullData] = useState([])

	const navigate = useNavigate()
	const { setUserData } = useUser()
	function handleUserSelect(user) {
		setUserData(user) // save user's data in context
		navigate('/user') //go to userPage
	}

	useEffect(() => {
		const storedFullData = JSON.parse(localStorage.getItem('memoryGame')) || []
		setFullData(storedFullData)
	}, [])

	/* -------------------------------- New User -------------------------------- */
	const handleKeyDown = e => {
		if (e.key !== 'Enter') return
		createNewUser()
	}
	function createNewUser() {
		if (newName.trim() === '') {
			alert('Please enter your name!')
			return
		}

		const newUser = {
			id: fullData.length + 1,
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
		const updatedFullData = [...fullData, newUser]
		setFullData(updatedFullData)
		localStorage.setItem('memoryGame', JSON.stringify(updatedFullData))

		//Clear input field
		setNewName('')
	}

	return (
		<>
			<h2>HomePage</h2>
			{fullData.length > 0 && (
				<>
					<p>Existing users:</p>
					<div className={styles.existUsers}>
						{fullData.map(user => (
							<UserButton
								user={user}
								key={user.id}
								onSelect={handleUserSelect}
							/>
						))}
					</div>
				</>
			)}
			<label>Create new player</label>
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
			<p>Choose your avatar</p>
			<button
				type='button'
				value='🍎'
				onClick={e => setNewAvatar(e.target.value)}
			>
				🍎
			</button>
			<button
				type='button'
				value='🍇'
				onClick={e => setNewAvatar(e.target.value)}
			>
				🍇
			</button>
			<button
				type='button'
				value='🍓'
				onClick={e => setNewAvatar(e.target.value)}
			>
				🍓
			</button>
			<button
				type='button'
				value='🍍'
				onClick={e => setNewAvatar(e.target.value)}
			>
				🍍
			</button>
			<button
				type='button'
				value='🍉'
				onClick={e => setNewAvatar(e.target.value)}
			>
				🍉
			</button>
			<button onClick={createNewUser}>create</button>
		</>
	)
}
