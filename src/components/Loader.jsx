import { m } from 'framer-motion'

const dotsVariant = {
	animate: {
		opacity: [0.3, 1, 0.3],
		y: [0, -5, 0],
		transition: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' }
	}
}

export default function Loader() {
	return (
		<div style={{ display: 'flex', gap: 8 }}>
			{[0, 1, 2].map(i => (
				<m.div
					key={i}
					variants={dotsVariant}
					animate='animate'
					transition={{ delay: i * 0.2 }}
					style={{
						width: 10,
						height: 10,
						backgroundColor: '#48137F',
						borderRadius: '50%'
					}}
				/>
			))}
		</div>
	)
}
