import PropTypes from 'prop-types'
import styles from './Field.module.css'

export function Field({ label, placeholder, name, value, onChange, onKeyDown, ...props }) {
	return (
		<div>
			<input
				className={styles.userNameInput}
				type='text'
				placeholder={placeholder}
				value={value}
				name={name}
				maxLength={30}
				onChange={onChange}
				onKeyDown={onKeyDown}
				label={label}
				{...props}
			/>
		</div>
	)
}

Field.propTypes = {
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onKeyDown: PropTypes.func.isRequired
}
