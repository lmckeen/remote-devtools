import { Server } from 'socket.io'
import { isDevtools, setupDevtools, addDevtools } from '../devtools/index.mjs'
import { getClients, addClient } from '../client/index.mjs'
import { isInspector, setupInspector, sendInspectorBroadcast, addInspector } from '../inspect/index.mjs'

let io

export function setupSocket(httpServer) {
  io = new Server(httpServer, {
    ssl: true,
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
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
      sendInspectorBroadcast('site', site)
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