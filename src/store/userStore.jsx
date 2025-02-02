import { create } from 'zustand'
import { MessageEmptyName, MessageNameTaken, NewScore } from '../components/modal/ModalContent'
import { useModalStore } from './modalStore'
import { useRatingStore } from './ratingStore'

export const useUserStore = create(set => ({
	allUsers: JSON.parse(localStorage.getItem('memoryGame')) || [],
	currentUser: JSON.parse(localStorage.getItem('currentUserMG')) || null,

	/* ------------------------------ Add New User ------------------------------ */
	addNewUser: newUser => {
		set(state => {
			const { showModal, closeModal } = useModalStore.getState()

			//check if input not empty
			if (newUser.userName.trim() === '' || newUser.icon.trim() === '') {
				showModal(<MessageEmptyName onChoice={closeModal} />)
				return state
			}
			//check if userName already exits
			const isNameTaken = state.allUsers.some(user => user.userName === newUser.userName.trim())
			if (isNameTaken) {
				showModal(<MessageNameTaken onChoice={closeModal} />)
				return state
			}
			//add new user
			const updatedUsers = [...state.allUsers, newUser]
			localStorage.setItem('memoryGame', JSON.stringify(updatedUsers))
			return { allUsers: updatedUsers }
		})
	},
	/* ------------------------------- Delete User ------------------------------ */
	deleteUser: (icon, name) => {
		set(state => {
			const updatedUsers = state.allUsers.filter(user => user.userName !== name)
			localStorage.setItem('memoryGame', JSON.stringify(updatedUsers))

			//delete current user
			localStorage.removeItem('currentUserMG')

			//delete from rating
			const { deleteFromRating } = useRatingStore.getState()
			deleteFromRating(icon, name)

			return { allUsers: updatedUsers, currentUser: null }
		})
	},

	/* ------------------------------- Update User ------------------------------ */
	updateUser: (moves, level, time) => {
		set(state => {
			const { updateRating } = useRatingStore.getState()
			const { showModal, closeModal } = useModalStore.getState()

			//find the current user
			const currentUser = state.currentUser

			//get the current results for the level
			const currentLevelResult = currentUser.results[level]

			//update data for level if new result is better
			if (
				currentLevelResult.moves === 0 ||
				moves < currentLevelResult.moves ||
				(moves === currentLevelResult.moves && time < currentLevelResult.time)
			) {
				showModal(
					<NewScore
						onChoice={closeModal}
						moves={moves}
						time={time}
					/>
				)
				updateRating(level, currentUser.icon, currentUser.userName, time, moves)
				const updatedLevelResult = {
					time,
					moves
				}

				//update user results
				const updatedResults = {
					...currentUser.results,
					[level]: updatedLevelResult
				}

				//create an updated user
				const updatedUser = {
					...currentUser,
					// totalGames: currentUser.totalGames + 1,
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
			return state
		})
	},

	/* ------------------------------ Current User ------------------------------ */
	setCurrentUser: user => {
		set({ currentUser: user })
		localStorage.setItem('currentUserMG', JSON.stringify(user))
	}
}))
