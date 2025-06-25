import { useCallback, useEffect, useRef } from 'react'
import { MyActionListener, type ActionListener, type ActionMap } from '~/lib/action-listener'

export function useActionListener(
) {
  // *** Design decision:
  // State will be shared across all instances of the hook
  // This is because we want to be able to emit events from any component
  // and have all components react to the same events
  const state = useRef<null | ActionMap>(null)
  const actionListener = useRef<null | MyActionListener>(null)

  const registerListener = useCallback((action: string, listener: ActionListener) => {
    actionListener?.current?.registerListener(action, listener)
  }, [])

  const removeListener = useCallback((action: string) => {
    actionListener?.current?.removeListener(action)
  }, [])

  const emit = useCallback((action: string, data: any) => {
    actionListener?.current?.emit(action, data)
  }, [])

  useEffect(() => {
    if (!state.current) state.current = new Map()
    if (!actionListener.current) actionListener.current = new MyActionListener(state.current)

    console.log('Event Listener created')

    return () => {
      if (!state.current || !actionListener.current) return;
      for (const [action, _listeners] of state.current) {
        actionListener.current.removeListener(action)
      }
      state.current.clear();
      state.current = null;
      actionListener.current = null;
      console.log('Event Listener destroyed')
    }
  }, [])

  return { registerListener, removeListener, emit }

} 