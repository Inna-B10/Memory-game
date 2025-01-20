import cn from 'clsx'
import PropTypes, { array } from 'prop-types'
import styles from './Card.module.css'

export function Card({ card, turnCard, matchedCards, selectedCards }) {
	const isSelected = selectedCards.find(item => item.id === card.id)
	const isMatched = matchedCards.includes(card.name)

	return (
		<img
			key={card.id}
			src={card.path}
			name={card.name}
			alt=''
			className={cn(
				styles.card,
				{ [styles.matchedCards]: isMatched },
				{ [styles.selectedCards]: isSelected }
			)}
			onClick={() => turnCard(card)}
		/>
	)
}

Card.propTypes = {
	card: PropTypes.shape({
		id: PropTypes.string.isRequired,
		path: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
	turnCard: PropTypes.func.isRequired,
	matchedCards: array.isRequired,
	selectedCards: array.isRequired,
}
