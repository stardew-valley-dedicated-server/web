import { useWebSocketClient } from '~/.output/ws/useWebSocketClient'

export const useWebSocketClientCodegen = ({ url }: { url: string }) => {
  return useWebSocketClient({ url })
}
