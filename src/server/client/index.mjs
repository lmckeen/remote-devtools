import { sendInspectorBroadcast } from '../inspect/index.mjs'
import { send } from '../socket/index.mjs'

const clientRooms = {}
const clientRemoved = {}
const clientTimeouts = {}

export function addClient(client) {
  const { query, address } = client.handshake
  const { title, href, id } = query
  const ip = address.split(':').pop()
  let clientId = id || client.id

  if (clientRemoved[clientId]) {
    clearTimeout(clientTimeouts[clientId])
    clientRooms[clientId] = clientRemoved[clientId]
    delete clientRemoved[clientId]
  }

  client.join(clientId)

  if (clientRooms[clientId]) {
    client.join(clientId)
    sendInspectorBroadcast('site', clientRooms[clientId])
  } else {
    clientRooms[clientId] = {
      title,
      href,
      ip,
      id: clientId
    }
    sendInspectorBroadcast('site', clientRooms[clientId])
  }

  client.on('disconnect', () => {
    removeClient(clientId)

    sendInspectorBroadcast('remove', clientId)
  })

  client.on('console', data => {
    send(`${clientId}-devtools`, 'console', data)
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
