import cn from 'clsx'
import PropTypes, { string } from 'prop-types'
import styles from './Button.module.css'

export function Button({ handler, children, className, ...props }) {
	return (
		<button
			className={cn(styles.regular, className)}
			onClick={handler}
			{...props}
		>
			{children}
		</button>
	)
}

Button.propTypes = {
	className: string,
	children: PropTypes.node,
	handler: PropTypes.func.isRequired
}
