import { Link } from 'react-router-dom'

export function UserPage() {
	return (
		<>
			<div>UserPage</div>

			{/* <div className={styles.levelButtons}>
				<button value={6} onClick={e => setCount(e.target.value)}>
					easy
				</button>
				<button value={8} onClick={e => setCount(e.target.value)}>
					middle
				</button>
				<button value={10} onClick={e => setCount(e.target.value)}>
					hard
				</button>
				<button value={15} onClick={e => setCount(e.target.value)}>
					expert
				</button>
			</div> */}

			<div className='levelButtons'>
				<button>
					<Link
						to='/game'
						state={{ countCards: 6 }}
					>
						easy
					</Link>
				</button>
				{/* <button value={8} onClick={e => setCount(e.target.value)}>
					middle
				</button>
				<button value={10} onClick={e => setCount(e.target.value)}>
					hard
				</button>
				<button value={15} onClick={e => setCount(e.target.value)}>
					expert
				</button> */}
			</div>
		</>
	)
}
