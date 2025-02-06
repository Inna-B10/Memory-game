import { useEffect, useRef } from 'react'
import { NewScore } from '../components/modal/ModalContent'

export function useGameCompletion({
	matchedCards,
	cards,
	stopGame,
	updateUser,
	countMoves,
	level,
	gameDuration,
	openEndGame,
	currentUser
}) {
	const prevResultsRef = useRef(null) // store old results
	const messageRef = useRef(null) // store message

	//if prevResultsRef is empty,
	//save old results ONLY ONCE (at first render)
	useEffect(() => {
		if (!prevResultsRef.current && currentUser?.results) {
			prevResultsRef.current = { ...currentUser.results }
		}
	}, [currentUser])

	useEffect(() => {
		if (matchedCards.length && matchedCards.length === cards.length / 2) {
			stopGame()

			//check if is new record based on prevResultsRef
			const isNewRecord =
				prevResultsRef.current[level].moves === 0 ||
				countMoves < prevResultsRef.current[level].moves ||
				(countMoves === prevResultsRef.current[level].moves &&
					gameDuration < prevResultsRef.current[level].time)

			//Create message and save it in ref
			messageRef.current = isNewRecord ? (
				<NewScore
					moves={countMoves}
					time={gameDuration}
				/>
			) : null

			updateUser(countMoves, level, gameDuration)

			setTimeout(() => {
				openEndGame(messageRef.current)
			}, 1000)
		}
	}, [matchedCards, cards, stopGame, updateUser, countMoves, level, gameDuration, openEndGame])
}
