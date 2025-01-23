import { useEffect, useState } from 'react'
import { UserData } from '../components/UserData.jsx'
import styles from './HomePage.module.css'

export function HomePage() {
	// if (localStorage.memoryGame) {
	// 	console.log(gameData.length)
	// 	console.log(gameData)
	// } else {
	// 	localStorage.setItem('memoryGame', JSON.stringify([{ id: 1, name: 'user1', icon: '🍉' }]))
	// 	console.log('new')
	// }
	//
	// 	const gameData = JSON.parse(localStorage.getItem('memoryGame'))
	// 	console.log(gameData ? 'yes' : 'no')

	const [newName, setNewName] = useState('')
	const [newAvatar, setNewAvatar] = useState('🍉')
	const [gameData, setGameData] = useState([])

	const handleKeyDown = e => {
		if (e.key !== 'Enter') return
		createNewUser()
	}

	useEffect(() => {
		const storedGameData = JSON.parse(localStorage.getItem('memoryGame')) || []
		setGameData(storedGameData)
	}, [])

	function createNewUser() {
		if (newName.trim() === '') {
			alert('Please enter your name!')
			return
		}

		const newUser = {
			id: gameData.length + 1,
			userName: newName,
			icon: newAvatar,
			totalGames: 0,
			results: {
				easy: { score: 0, count: 0 },
				middle: { score: 0, count: 0 },
				hard: { score: 0, count: 0 },
				expert: { score: 0, count: 0 }
			}
		}
		const updatedGameData = [...gameData, newUser]
		setGameData(updatedGameData)
		localStorage.setItem('memoryGame', JSON.stringify(updatedGameData))

		//Clear input field
		setNewName('')
	}

	return (
		<>
			<h2>HomePage</h2>
			{gameData && (
				<>
					<p>Exist users:</p>
					<div className={styles.existUsers}>
						{gameData.map(user => (
							<UserData
								user={user}
								key={user.id}
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
