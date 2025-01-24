import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { levels } from '../../constants.js'
import { fullGameData, storedUser } from '../../store.jsx'

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
			<div>
				<Link
					to={'/'}
					className='level-button'
				>
					Change user
				</Link>
				{currentUser.icon}
				{currentUser.userName}
				<button
					type='button'
					onClick={() => deleteUser(currentUser.userName)}
				>
					delete user
				</button>
			</div>
			{/* ----------------------------- Level Selection ---------------------------- */}
			<div>
				{levels.map((level, index) => (
					// <Link
					// 	key={index}
					// 	to='/game'
					// 	state={{ countCards: level.countCards }}
					// 	className='level-button'
					// >
					// 	{level.level}
					// </Link>

					<button
						key={index}
						onClick={() => navigate('/game', { state: { countCards: level.countCards } })}
						className='level-button'
					>
						{level.level}
					</button>
				))}
			</div>
		</>
	)
}
