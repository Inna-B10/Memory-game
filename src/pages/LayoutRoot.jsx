import { Outlet } from 'react-router-dom'

export function LayoutRoot() {
	return (
		<>
			<main>
				<h1>LayoutRoot</h1>
				<Outlet />
			</main>
			<footer></footer>
		</>
	)
}
