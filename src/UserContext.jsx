import { createContext, useContext, useState } from 'react'

const UserContext = createContext()
export const useUser = () => useContext(UserContext)

export function UserProvider({ children }) {
	const [userData, setUserData] = useState(null)

	// const handleUserData = newUserData => {
	// 	setUserData(newUserData)
	// }
	return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>
}
