import { AppKeyboard } from "./app-keyboard"
import { WordInput } from "./app-word-input"
import { WORD_SIZE } from "~/types/wordle"

export const Wordle = () => {
  return (
    <>
      <WordInput size={WORD_SIZE} />
      <AppKeyboard />
    </>
  )
}