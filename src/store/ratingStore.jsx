import { create } from 'zustand'

export const useRatingStore = create(set => ({
	ratingMG: JSON.parse(localStorage.getItem('ratingMG')) || [],

	/* --------------------------------- Update --------------------------------- */
	updateRating: (level, userName, time, moves, score) => {
		let updatedLevelScore
		set(state => {
			// if (!state.ratingMG) {
			// 	state.createRating()
			// }

			const currentLevelScore = state.ratingMG[level]?.score ? state.ratingMG[level].score : 0
			if (score < currentLevelScore || currentLevelScore === 0) {
				updatedLevelScore = {
					userName: userName,
					time: time,
					moves: moves,
					score: score
				}
				//update level best score
				const updatedRating = {
					...state.ratingMG,
					[level]: updatedLevelScore
				}
				localStorage.setItem('ratingMG', JSON.stringify(updatedRating))

				return { ratingMG: updatedRating }
			}

			return state
		})
	},
	/* ------------------------------- Create New ------------------------------ */
	createRating: () => {
		const ratingMG = {
			easy: { userName: '', time: 0, moves: 0, score: 0 },
			middle: { userName: '', time: 0, moves: 0, score: 0 },
			hard: { userName: '', time: 0, moves: 0, score: 0 },
			expert: { userName: '', time: 0, moves: 0, score: 0 }
		}

		localStorage.setItem('ratingMG', JSON.stringify(ratingMG))
		set({ ratingMG: ratingMG })
	}
}))
