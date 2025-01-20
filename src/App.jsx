import { HashRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LayoutRoot } from './pages/LayoutRoot'
import { NotFoundPage } from './pages/NotFoundPage'
import { GamePage } from './pages/game/GamePage'
import { ResultPage } from './pages/game/result/ResultPage'
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
						path='/game/result'
						element={<ResultPage />}
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
