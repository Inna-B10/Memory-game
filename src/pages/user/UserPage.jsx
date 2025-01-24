import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../UserContext.jsx'
import { levels } from '../../constants.js'

export function UserPage() {
	const { userData, setUserData } = useUser()
	const navigate = useNavigate()

	/* ---------------------------- If User Undefined --------------------------- */
	useEffect(() => {
		if (!userData) {
			const storedUser = localStorage.getItem('currentUserMG')
			if (storedUser) {
				setUserData(JSON.parse(storedUser))
			} else {
				navigate('/')
			}
		}
	}, [userData, navigate, setUserData])

	console.log(userData)

	// Render fallback if userData is not loaded
	if (!userData) return <div>Loading...</div>

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
				{userData.icon}
				{userData.userName}
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
