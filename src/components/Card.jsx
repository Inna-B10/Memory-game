import cn from 'clsx'
import { m } from 'framer-motion'
import PropTypes, { array } from 'prop-types'
import styles from './Card.module.css'

export function Card({ card, turnCard, matchedCards, selectedCards, isGameOn }) {
	const isSelected = selectedCards.find(item => item.id === card.id)
	const isMatched = matchedCards.includes(card.name)

	const handleClick = () => {
		if (!isMatched && !isSelected) {
			turnCard(card)
		}
	}

	return (
		<m.div
			className={styles.cardContainer}
			onClick={handleClick}
		>
			<m.div
				className={cn(styles.cardInner, { [styles.flipped]: isSelected || isMatched })}
				animate={{
					rotateY: isSelected || isMatched ? 180 : 0
				}}
				transition={{ duration: 0.6 }}
			>
				<m.div
					className={styles.cardFront}
					whileHover={!isMatched && !isSelected ? { scale: 1.05 } : ''}
				>
					<img
						src='/back.png'
						alt='Back of card'
					/>
				</m.div>
				<m.div className={styles.cardBack}>
					<img
						key={card.id}
						src={card.path}
						name={card.name}
						alt=''
						className={cn(
							styles.card,
							{ [styles.selectedCards]: !isGameOn },
							{ [styles.matchedCards]: isMatched },
							{ [styles.selectedCards]: isSelected }
						)}
					/>
				</m.div>
			</m.div>
		</m.div>
	)
}

Card.propTypes = {
	card: PropTypes.shape({
		id: PropTypes.string.isRequired,
		path: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired,
	turnCard: PropTypes.func.isRequired,
	matchedCards: array.isRequired,
	selectedCards: array.isRequired,
	isGameOn: PropTypes.bool.isRequired
}
