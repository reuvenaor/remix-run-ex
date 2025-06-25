import { useEffect, useCallback } from 'react'
import { KeyboardUI } from '~/components/wordle/ui-keyboard'
import { useActionListener } from '~/hooks/use-action-listener'
import { useWordStore } from '~/stores/word-slice'


enum KeyboardAction {
  KEY_PRESS = 'KEY_PRESS',
  DELETE_KEY = 'DELETE_KEY',
  SUBMIT_WORD = 'SUBMIT_WORD',
}

export function AppKeyboard() {
  const { registerListener, emit } = useActionListener()
  const { handleKeyPress, handleDelete, handleSubmit } = useWordStore()

  useEffect(() => {
    registerListener(KeyboardAction.KEY_PRESS, handleKeyPress)
    registerListener(KeyboardAction.DELETE_KEY, handleDelete)
    registerListener(KeyboardAction.SUBMIT_WORD, handleSubmit)
  }, [registerListener, handleKeyPress, handleDelete, handleSubmit])

  const onKeyPress = useCallback(
    (key: string) => {
      emit(KeyboardAction.KEY_PRESS, key)
    },
    [emit],
  )

  const onSubmit = useCallback(() => {
    emit(KeyboardAction.SUBMIT_WORD, null)
  }, [emit])

  const onDelete = useCallback(() => {
    emit(KeyboardAction.DELETE_KEY, null)
  }, [emit])

  return (
    <KeyboardUI
      onKeyPress={onKeyPress}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  )
}
