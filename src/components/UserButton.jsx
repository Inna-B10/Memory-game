import { useAtom } from 'jotai'
import { storedUser } from '../store'
import styles from './UserButton.module.css'

export function UserButton({ user, onSelect }) {
	const [currentUser] = useAtom(storedUser)

	return (
		<button
			className={`${styles.userCard} ${styles.avatarButton} ${user.userName === currentUser?.userName ? styles.selected : ''}`}
			onClick={() => onSelect(user)}
		>
			<div className={styles.userName}>{user.userName}</div>
			<div className={styles.userAvatar}>{user.icon}</div>
		</button>
	)
}
