import styles from './UserData.module.css'

export function UserData({ user }) {
	return (
		<div className={styles.userCard}>
			<div>{user.userName}</div>
			<div>{user.icon}</div>
		</div>
	)
}
