import styles from './UserButton.module.css'

export function UserButton({ user, onSelect }) {
	return (
		<button
			className={styles.userCard}
			onClick={() => onSelect(user)}
		>
			<div className={styles.userName}>{user.userName}</div>
			<div className={styles.userAvatar}>{user.icon}</div>
		</button>
	)
}
