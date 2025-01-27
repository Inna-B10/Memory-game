import { create } from 'zustand'

export const useUserStore = create(set => ({
	allUsers: JSON.parse(localStorage.getItem('memoryGame')) || [],
	currentUser: JSON.parse(localStorage.getItem('currentUserMG')) || null,

	//[TODO] modal messages
	/* ------------------------------ Add New User ------------------------------ */
	addNewUser: newUser => {
		set(state => {
			//check if input not empty
			if (newUser.userName.trim() === '') {
				alert('Please enter your name!')
				return state
			}
			//check if userName already exits
			const isNameTaken = state.allUsers.some(user => user.userName === newUser.userName.trim())
			if (isNameTaken) {
				alert('This name is already taken! Please choose another.')
				return state
			}
			//add new user
			const updatedUsers = [...state.allUsers, newUser]
			localStorage.setItem('memoryGame', JSON.stringify(updatedUsers))
			return { allUsers: updatedUsers }
		})
	},
	/* ------------------------------- Delete User ------------------------------ */
	deleteUser: name => {
		set(state => {
			const updatedUsers = state.allUsers.filter(user => user.userName !== name)
			localStorage.setItem('memoryGame', JSON.stringify(updatedUsers))

			//delete current user
			localStorage.removeItem('currentUserMG')

			return { allUsers: updatedUsers, currentUser: null }
		})
	},

	/* ------------------------------- Update User ------------------------------ */
	updateUser: (moves, level) => {
		set(
			state => {
				// const newScore = time / moves

				//find the current user
				const currentUser = state.currentUser

				//get the current results for the level
				const currentLevelResult = currentUser.results[level]

				//update data for level if new result is better
				// if (currentLevelResult.score === 0 || newScore < currentLevelResult.score) {
				const updatedLevelResult = {
					time: 0,
					moves,
					// score: newScore
					score: 0
				}

				//update user results
				const updatedResults = {
					...currentUser.results,
					[level]: updatedLevelResult
				}

				//create an updated user
				const updatedUser = {
					...currentUser,
					totalGames: currentUser.totalGames + 1,
					results: updatedResults
				}

				//update user in list with all users
				const updatedAllUsers = state.allUsers.map(user =>
					user.userName === currentUser.userName ? updatedUser : user
				)

				//save changes to local storage
				localStorage.setItem('memoryGame', JSON.stringify(updatedAllUsers))
				localStorage.setItem('currentUserMG', JSON.stringify(updatedUser))

				return { allUsers: updatedAllUsers, currentUser: updatedUser }
			}
			//if the result is not better
			// console.log('New score is not better than the current one.')
			// return state
			// }
		)
	},

	/* ------------------------------ Current User ------------------------------ */
	setCurrentUser: user => {
		set({ currentUser: user })
		localStorage.setItem('currentUserMG', JSON.stringify(user))
	}
}))
