import { create } from 'zustand'

export const useRatingStore = create(set => ({
	rating: JSON.parse(localStorage.getItem('ratingMG')) || [],

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
	deleteFromRating: (icon, name) => {
		set(state => {
			const updatedRating = Object.fromEntries(
				Object.entries(state.rating).filter(([_, data]) => data.userName !== `${icon} ${name}`)
			)
			localStorage.setItem('ratingMG', JSON.stringify(updatedRating))
			return { rating: updatedRating }
		})
	}
}))
