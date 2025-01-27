import { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { formatTime } from '../utils/formatTime'

export function Timer() {
	const { gameDuration, isGameOn, incrementTime } = useGameStore()

	useEffect(() => {
		let timer

		if (isGameOn) {
			timer = setInterval(() => {
				incrementTime()
			}, 1000) //increase the time every second
		} else {
			clearInterval(timer)
		}
		return () => clearInterval(timer)
	}, [isGameOn, incrementTime])

	return <div>Timer: {formatTime(gameDuration)}</div>
}
