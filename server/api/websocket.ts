const room = 'ROOM'

export default defineWebSocketHandler({
  open(peer) {
    console.log('Opened WS', peer)
    peer.subscribe(room)

    // OnConnect private message
    peer.send({
      type: 'ChatMessage',
      data: 'Welcome, unknown user!'
    })

    // OnConnect broadcast message
    peer.publish(room, {
      type: 'ChatMessage',
      data: 'Another user joined'
    })
  },
  close(peer) {
    console.log('Closed WS', peer)
  },
  error(peer, error) {
    console.log('Error on WS', peer, error)
  },
  message(peer, message) {
    console.log('Message on WS', peer, message)

    // Forward messages for now
    peer.publish(room, message.text())
  }
})
