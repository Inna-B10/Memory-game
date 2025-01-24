import { atom } from 'jotai'

const data = JSON.parse(localStorage.getItem('memoryGame')) || []
export const fullGameData = atom(data)
const user = JSON.parse(localStorage.getItem('currentUserMG')) || {}
export const storedUser = atom(user)
