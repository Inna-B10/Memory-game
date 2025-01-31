import { create } from 'zustand'

export const useRatingStore = create(set => ({
	rating: JSON.parse(localStorage.getItem('ratingMG')) || [],

	/* --------------------------------- Update --------------------------------- */
	updateRating: (level, userName, time, moves, score) => {
		set(state => {
			//check if ratingMG and current level exist in localStorage
			const currentLevelScore = state.rating[level]?.score ? state.rating[level].score : 0

			if (score < currentLevelScore || currentLevelScore === 0) {
				const updatedLevelScore = {
					userName: userName,
					time: time,
					moves: moves,
					score: score
				}

				//update level best score
				const updatedRating = {
					...state.rating,
					[level]: updatedLevelScore
				}

				//save new value in localStorage
				localStorage.setItem('ratingMG', JSON.stringify(updatedRating))

				return { rating: updatedRating }
			}

			//if new score > score in localStorage
			return state
		})
	}
}))
