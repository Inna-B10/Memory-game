import PropTypes, { string } from 'prop-types'

export function Button({ handler, children, className, ...props }) {
	return (
		<button
			className={className}
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
