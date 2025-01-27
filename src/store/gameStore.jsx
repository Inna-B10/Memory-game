import { create } from 'zustand'

export const useGameStore = create(set => ({
	gameDuration: 0,
	isGameOn: false,
	startGame: () => set({ gameDuration: 0, isGameOn: true }),
	stopGame: () => set({ isGameOn: false }),
	incrementTime: () => set(state => ({ gameDuration: state.gameDuration + 1 }))
}))
