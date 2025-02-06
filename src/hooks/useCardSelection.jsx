import { useCallback, useState } from 'react'

export function useCardSelection({ startGame, stopGame, resetTimer, isGameOn, fetchImages }) {
	const [selectedCards, setSelectedCards] = useState([])
	const [matchedCards, setMatchedCards] = useState([])
	const [countMoves, setCountMoves] = useState(0)

	/* ------------------------------ Flipping Card ----------------------------- */
	const turnCard = useCallback(
		card => {
			if (
				selectedCards.find(item => item.id === card.id) ||
				matchedCards.includes(card.name) ||
				selectedCards.length === 2
			) {
				return
			}

			if (selectedCards.length === 0) {
				if (!isGameOn) startGame()
				setSelectedCards([{ id: card.id, name: card.name }])
			} else {
				setCountMoves(prev => prev + 1)
				setSelectedCards(prevSelectedCards => [
					...prevSelectedCards,
					{ id: card.id, name: card.name }
				])

				if (selectedCards[0].name === card.name) {
					setTimeout(() => {
						setMatchedCards(prev => [...prev, card.name])
					}, 550)
					setTimeout(() => setSelectedCards([]), 560)
				} else {
					setTimeout(() => setSelectedCards([]), 800)
				}
			}
		},
		[selectedCards, matchedCards, isGameOn, startGame]
	)

	/* ------------------------------- Reset Game ------------------------------- */
	const resetGame = useCallback(() => {
		setSelectedCards([])
		setMatchedCards([])
		setCountMoves(0)
		stopGame()
		resetTimer()
		fetchImages()
	}, [stopGame, resetTimer, fetchImages])

	return { selectedCards, matchedCards, countMoves, turnCard, resetGame }
}
