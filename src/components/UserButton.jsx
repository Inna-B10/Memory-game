import cn from 'clsx'
import { useAtom } from 'jotai'
import PropTypes from 'prop-types'
import { storedUser } from '../store'

export function UserButton({ user, onSelect }) {
	const [currentUser] = useAtom(storedUser)
	const isSelected = user.userName === currentUser?.userName

	return (
		<button
			className={cn('flex', 'column', { ['selected']: isSelected })}
			onClick={() => onSelect?.(user)}
		>
			<div>{user.userName}</div>
			<div>{user.icon}</div>
		</button>
	)
}

UserButton.propTypes = {
	user: PropTypes.shape({
		userName: PropTypes.string.isRequired,
		icon: PropTypes.node.isRequired
	}).isRequired,
	onSelect: PropTypes.func.isRequired
}
