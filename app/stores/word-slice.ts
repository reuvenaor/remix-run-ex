import { create } from 'zustand'

type ValidationStatus = 'idle' | 'valid' | 'invalid'

interface WordState {
  word: string[]
  validationStatus: ValidationStatus
  handleKeyPress: (key: string) => void
  handleDelete: () => void
  handleSubmit: () => Promise<void>
  reset: () => void
}

const WORD_SIZE = 5

const initialState = {
  word: Array(WORD_SIZE).fill(''),
  validationStatus: 'idle' as ValidationStatus,
}

export const useWordStore = create<WordState>((set, get) => ({
  ...initialState,
  handleKeyPress: (key: string) => {
    const { word } = get()
    const newWord = [...word]
    const emptyIndex = newWord.findIndex((char) => char === '')
    if (emptyIndex !== -1) {
      newWord[emptyIndex] = key
      set({ word: newWord, validationStatus: 'idle' })
    }
  },
  handleDelete: () => {
    const { word } = get()
    const newWord = [...word]
    for (let i = newWord.length - 1; i >= 0; i--) {
      if (newWord[i] !== '') {
        newWord[i] = ''
        break
      }
    }
    set({ word: newWord, validationStatus: 'idle' })
  },
  handleSubmit: async () => {
    const { word } = get()
    const isFull = word.every((char) => char !== '')
    if (!isFull) {
      set({ validationStatus: 'invalid' })
      return
    }

    const wordToCheck = word.join('')
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToCheck}`,
      )
      if (response.ok) {
        set({ validationStatus: 'valid' })
      } else {
        set({ validationStatus: 'invalid' })
      }
    } catch (error) {
      console.error('Error validating word:', error)
      set({ validationStatus: 'invalid' })
    }
  },
  reset: () => set(initialState),
})) 