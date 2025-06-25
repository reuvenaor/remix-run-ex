import { type WordInputProps, WordInputUI } from '~/components/word-input-ui'
import { useWordStore } from '~/stores/word-slice'

export function WordInput({ size = 5 }: Pick<WordInputProps, 'size'>) {
  const { word, validationStatus } = useWordStore()

  return <WordInputUI word={word} size={size} status={validationStatus} />
}