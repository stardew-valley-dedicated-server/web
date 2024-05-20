import { useWebSocketClientCodegen } from '~/composables/useWebSocketClientCodegen'

export default defineNuxtPlugin({
  name: 'websocket-client',
  async setup() {
    console.log('A')
    const ws = useWebSocketClientCodegen({
      url: `ws://${location.host}/api/websocket`
    })
    console.log('B')

    return {
      provide: {
        ws
      }
    }
  },
  hooks: {
    'page:finish'() {
      console.log('C')
      // Late init to allow registering listeners before the first onConnect message
      useNuxtApp().$ws.open()
      console.log('D')
    }
  }
})
