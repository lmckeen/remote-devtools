import { addClient, getClients } from '../client/index.mjs'
import { addDevtools, isDevtools, setupDevtools } from '../devtools/index.mjs'
import { addInspector, broadcastToInspector, isInspector, setupInspector } from '../inspect/index.mjs'
import { Server } from 'socket.io'

let io

export function setupSocket(httpServer) {
  io = new Server(httpServer, {
    ssl: true,
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  setupInspector()
  setupDevtools()

  io.on('connection', connection)
  
  return io
}

function connection(client) {
  if (isInspector(client)) {
    addInspector(client)
    getClients().forEach(site => {
      broadcastToInspector('site', site)
    })
    client.on('disconnect', () => {})
  } else if (isDevtools(client)) {
    addDevtools(client)
  } else {
    addClient(client)
  }
}

export function send(id, event, data) {
  io.to(id).emit(event, data)
}
