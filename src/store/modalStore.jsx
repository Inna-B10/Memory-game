import { create } from 'zustand'

export const useModalStore = create(set => ({
	isOpen: false,
	content: null,
	showModal: content => set({ isOpen: true, content }),
	closeModal: () => set({ isOpen: false, content: null })
}))
