import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/Memory-game/'
})

// export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
// 	if (command === 'serve') {
// 		return { base: './', plugins: [react()] }
// 	} else {
// 		return {
// 			plugins: [react()],
// 			base: '',
// 		}
// 	}
// })
