import styles from './UserButton.module.css'

export function UserButton({ user, onSelect }) {
	return (
		<button
			className={styles.userCard}
			onClick={() => onSelect(user)}
		>
			<div>{user.userName}</div>
			<div>{user.icon}</div>
		</button>
	)
}
