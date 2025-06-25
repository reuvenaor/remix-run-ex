import { useEffect, useCallback } from 'react'
import { KeyboardUI } from '~/components/wordle/ui-keyboard'
import { useActionListener } from '~/hooks/use-action-listener'
import { useWordStore } from '~/stores/word-slice'

export function AppKeyboard() {
  const { registerListener, emit } = useActionListener()
  const { handleKeyPress, handleDelete, handleSubmit } = useWordStore()

  useEffect(() => {
    registerListener('KEY_PRESS', handleKeyPress)
    registerListener('DELETE_KEY', handleDelete)
    registerListener('SUBMIT_WORD', handleSubmit)
  }, [registerListener, handleKeyPress, handleDelete, handleSubmit])

  const onKeyPress = useCallback(
    (key: string) => {
      emit('KEY_PRESS', key)
    },
    [emit],
  )

  const onSubmit = useCallback(() => {
    emit('SUBMIT_WORD', null)
  }, [emit])

  const onDelete = useCallback(() => {
    emit('DELETE_KEY', null)
  }, [emit])

  return (
    <KeyboardUI
      onKeyPress={onKeyPress}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  )
}
