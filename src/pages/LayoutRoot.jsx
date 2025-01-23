import { Outlet } from 'react-router-dom'

export function LayoutRoot() {
	return (
		<>
			<main>
				<Outlet />
			</main>
			<footer></footer>
		</>
	)
}
