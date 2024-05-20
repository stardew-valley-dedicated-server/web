import type { UseWebSocketOptions } from '@vueuse/core'

/**
 * Message base which needs to be implemented by each websocket message
 */
export interface WSMessageBase {
  type: string
}

/**
 * Generic type to infer message type from WSMessageBase implementation `type` property
 */
type MessageType<T extends WSMessageBase> = T['type']

/**
 * Generic type for message listener callbacks
 */
type MessageListenerCallback<T extends WSMessageBase> = (message: T) => void

type MessageListenerStopHandle = () => void

/**
 * Options for the composable
 */
type WebsocketClientOptions = {
  url: string
  websocketOptions?: UseWebSocketOptions
}

/**
 * Strongly typed and opinionated Nuxt3 Websocket composable.
 * Note: This composable is not suited for server-side usage, see constraints and remarks for `useWebSocket()`
 */
export const useWebSocketClient = ({ url, websocketOptions }: WebsocketClientOptions) => {
  // Prepare websocket connection, but open connection late via websocket-client plugin
  const { send: sendOriginal, data, status, open, close } = useWebSocket(url, {
    ...websocketOptions,
    immediate: false
  })

  const callbacks = new Map<string, MessageListenerCallback<WSMessageBase>[]>()

  // Listen for data changes and process incoming messages
  const onMessageReceivedStopHandle = watch(data, _onMessageReceived)

  // Cleanup when unmounting context
  // TODO: No longer using vue lifecycle hooks directly in here due to plugin, what to do?
  // onUnmounted(() => {
  //   dispose()
  // })

  /**
   * @param messageType
   * @param message
   * @return True when there are callbacks registered for this message type
   */
  function _callbacksInvoke(messageType: string, message: any) {
    const cbList = callbacks.get(messageType)
    cbList?.forEach(handler => handler(message))
    return !!cbList?.length
  }

  /**
   * @param messageRaw Serialized string containing a WSMessageBase implementation
   */
  function _deserialize(messageRaw: string) {
    const message = JSON.parse(messageRaw)
    console.log(`Deserialized message`, message)
    return message
  }

  /**
   * @param messageRaw Serialized string containing a WSMessageBase implementation
   */
  function _onMessageReceived(messageRaw: string) {
    console.log('Received message:', messageRaw)

    try {
      const message = _deserialize(messageRaw)

      // Call all handlers for the received message type.
      // Valid syntaxes:
      // * `on((message: BaseMessageImplementation) => { ... })`
      // * `on<BaseMessageImplementation>((message) => { ... })`
      const hasInvokedCallbacksNamed = _callbacksInvoke(message.type, message)

      // Execute all handlers associated with the WSMessageBase message type.
      // Valid syntaxes:
      // * `on((message) => { ... })`
      // * `on((message: WSMessageBase) => { ... })`.
      // * `on<WSMessageBase>((message) => { ... })`.
      const hasInvokedCallbacksBase = _callbacksInvoke('WSMessageBase', message)

      if (!hasInvokedCallbacksNamed && !hasInvokedCallbacksBase) {
        // TODO: This can be the cause because
        console.log('No listeners registered for message')
      }
    } catch (error) {
      console.error('Failed to deserialize message:', {
        error
      })
    }
  }

  /**
   * Sends a websocket message.
   */
  function send<T extends WSMessageBase>(details: Omit<T, 'type'>) {
    // TODO: Not sure if this works, or needs an actual instance of the type like it was in on()
    const type: MessageType<T> = (details as any).type
    const message: T = { ...details, type } as T
    const payload = JSON.stringify(message)
    console.log('Sending message:', message)
    sendOriginal(payload)
  }

  /**
   * Adds a listener for the given websocket message.
   * @param typeClass Reference to a class type that implements WSMessageBase
   * @param callback Invoked when the registered message type is received
   */
  function on<T extends WSMessageBase>(typeClass: new () => T, callback: MessageListenerCallback<T>): MessageListenerStopHandle {
    // Create a new instance of the provided class type,
    // so that we can infer the `type` string at runtime
    const instance = new typeClass()
    const messageType = instance.type

    console.log('Adding listener:', {
      messageType
    })

    // Init listener array
    if (!callbacks.has(messageType)) {
      callbacks.set(messageType, [])
    }

    // Add listener
    const typeCallbacks = callbacks.get(messageType) as MessageListenerCallback<T>[]
    typeCallbacks.push(callback)

    // Return a cleanup function to remove the callback
    return () => {
      const index = typeCallbacks.indexOf(callback)
      if (index !== -1) {
        typeCallbacks.splice(index, 1)
      }

      console.log('Removing listener:', {
        messageType,
        isAlreadyRemoved: index === -1
      })
    }
  }

  /**
   * Removes all registered listeners and closes the current websocket connection
   */
  function dispose() {
    onMessageReceivedStopHandle()
    callbacks.clear()
    close()
  }

  return {
    open,
    close,
    dispose,
    send,
    on,
    data,
    status
  }
}
