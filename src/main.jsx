import { LazyMotion, domAnimation } from 'framer-motion'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<LazyMotion features={domAnimation}>
			<App />
		</LazyMotion>
	</React.StrictMode>
)
