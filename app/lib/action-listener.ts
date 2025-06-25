export type ActionListener = (data: any) => void

export type ActionMap = Map<string, Array<ActionListener>>

export class MyActionListener {
  private listeners: ActionMap

  // Init the class
  constructor(state: ActionMap) {
    this.listeners = state
  }

  // registerListener registers a function to an action name. In case the action already exists, the new
  // listener should be added to the
  // already existing listeners
  // action - Action name
  // listener - Function to invoke upon action call
  registerListener(action: string, listener: (data: any) => void) {
    if (!this.listeners.has(action)) {
      this.listeners.set(action, [])
    }
    this.listeners.get(action)!.push(listener)
  }

  // When calling the removeListener all listeners are removed from the action
  // and the action itself is removed and can no longer be called.
  // action - the Action to remove
  removeListener(action: string) {
    this.listeners.delete(action)
  }

  // Invoke all registered listeners of the giving action with the passed data
  // In case the action is not registered,an exception thrown
  // action - The action name
  // data - The data to pass to all registered listeners as parameter
  emit(action: string, data: any) {
    if (!this.listeners.has(action)) {
      throw new Error(`Can't emit an event. Event "${action}" doesn't exits.`)
    }

    this.listeners.get(action)!.forEach((listener) => {
      listener(data)
    })
  }
}