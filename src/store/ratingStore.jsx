import { create } from 'zustand'
import { levels } from '../constants'
import { useUserStore } from './userStore'

export const levelOrder = levels.map(row => row.level)

export const useRatingStore = create(set => ({
	sortedRatings: {},

	/* ---------------------- Get Rating From LocalStorage ---------------------- */
	rating: JSON.parse(localStorage.getItem('ratingMG')) || {},

	/* ------------------------------ Update Rating ----------------------------- */
	updateRating: (level, avatar, userName, time, moves) => {
		set(state => {
			//check if ratingMG and current level exist in localStorage
			const currentLevelMoves = state.rating[level]?.moves ? state.rating[level].moves : 0
			const currentLevelTime = state.rating[level]?.time ? state.rating[level].time : 0

			if (
				currentLevelMoves === 0 ||
				moves < currentLevelMoves ||
				(moves === currentLevelMoves && time < currentLevelTime)
			) {
				const updatedLevel = {
					userName: `${avatar} ${userName}`,
					time: time,
					moves: moves
				}

				//update level best score
				const updatedRating = {
					...state.rating,
					[level]: updatedLevel
				}

				//save new value in localStorage
				localStorage.setItem('ratingMG', JSON.stringify(updatedRating))

				return { rating: updatedRating }
			}

			//if new result is not better than stored in localStorage
			return state
		})
	},

	/* --------------------------- Delete From Rating --------------------------- */
	//in case user was deleted
	deleteFromRating: (icon, name) => {
		set(state => {
			const updatedRating = Object.fromEntries(
				Object.entries(state.rating).filter(([_, data]) => data.userName !== `${icon} ${name}`)
			)
			localStorage.setItem('ratingMG', JSON.stringify(updatedRating))
			return { rating: updatedRating }
		})
	},

	/* ------------------------------ Reset Rating ------------------------------ */
	resetRating: () => {
		set(() => {
			const { allUsers } = useUserStore.getState()

			allUsers.forEach(user => {
				Object.keys(user.results).forEach(level => {
					user.results[level] = { time: 0, moves: 0 }
				})
			})

			localStorage.removeItem('ratingMG')
			localStorage.setItem('memoryGame', JSON.stringify(allUsers))

			return { allUsers: allUsers, rating: null }
		})
	},

	/* ------------------------------- Sort Rating ------------------------------ */
	//from easy to expert

	getSortedRatings: () => {
		set(state => {
			const sorted = {}

			levelOrder.forEach(level => {
				if (state.rating[level]) {
					sorted[level] = state.rating[level]
				}
			})

			return { sortedRatings: sorted }
		})
	}
}))
