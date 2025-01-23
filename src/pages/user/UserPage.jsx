import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../UserContext.jsx'
import { levels } from '../../constants.js'

export function UserPage() {
	const { userData } = useUser()
	const navigate = useNavigate()

	/* ---------------------------- If User Undefined --------------------------- */
	useEffect(() => {
		if (!userData) {
			navigate('/')
		}
	}, [userData, navigate])

	console.log(userData)

	// Render fallback if userData is not loaded
	if (!userData) return <div>Loading...</div>

	return (
		<>
			{/* -------------------------------- User Info ------------------------------- */}
			<div>
				{userData.icon} {userData.userName}
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
