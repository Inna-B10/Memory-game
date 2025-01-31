import { HashRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LayoutRoot } from './pages/LayoutRoot'
import { NotFoundPage } from './pages/NotFoundPage'
import { GamePage } from './pages/game/GamePage'
import { RatingPage } from './pages/game/rating/RatingPage'
import { UserPage } from './pages/user/UserPage'

export default function App() {
	return (
		<HashRouter>
			<Routes>
				<Route
					path='/'
					element={<LayoutRoot />}
				>
					<Route
						index
						element={<HomePage />}
					/>
					<Route
						path='/user'
						element={<UserPage />}
					/>
					<Route
						path='/game'
						element={<GamePage />}
					/>
					<Route
						path='/game/rating'
						element={<RatingPage />}
					/>
					<Route
						path='*'
						element={<NotFoundPage />}
					/>
				</Route>
			</Routes>
		</HashRouter>
	)
}
