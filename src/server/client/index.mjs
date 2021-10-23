import { broadcastToInspector } from '../inspect/index.mjs'
import { send } from '../socket/index.mjs'

const clientRooms = {}
const clientRemoved = {}
const clientTimeouts = {}

export function addClient(client) {
  const { query, address } = client.handshake
  const { title, href, id } = query
  const ip = address.split(':').pop()
  const clientId = id || client.id

  if (clientRemoved[clientId]) {
    clearTimeout(clientTimeouts[clientId])
    clientRooms[clientId] = clientRemoved[clientId]
    delete clientRemoved[clientId]
  }

  client.join(clientId)

  if (clientRooms[clientId]) {
    client.join(clientId)
    broadcastToInspector('site', clientRooms[clientId])
  } else {
    clientRooms[clientId] = {
      title,
      href,
      ip,
      id: clientId
    }
    broadcastToInspector('site', clientRooms[clientId])
  }

  client.on('disconnect', () => {
    removeClient(clientId)

    broadcastToInspector('remove', clientId)
  })

  client.onAny((type, data) => {
    send(`${clientId}-devtools`, type, data)
  })
}

export function removeClient(id) {
  clientRemoved[id] = clientRooms[id]
  delete clientRooms[id]

  clientTimeouts[id] = setTimeout(() => {
    delete clientRemoved[id]
  }, 60000)
}

export function getClients() {
  const clients = []
  
  for (const [key, value] of Object.entries(clientRooms)) {
    value.id = key
    clients.push(value)
  }

  return clients
}
