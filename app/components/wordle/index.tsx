import { AppKeyboard } from "./app-keyboard"
import { WordInput } from "./app-word-input"

const WORD_SIZE = 5;

export const Wordle = () => {
  return (
    <>
      <WordInput size={WORD_SIZE} />
      <AppKeyboard />
    </>
  )
}