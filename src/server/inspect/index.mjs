import { get, set } from '../storage/index.mjs'
import { send } from '../socket/index.mjs'

const inspectorRooms = {}

let port
let serverIp

export function setupInspector() {
  port = get('port')
  serverIp = get('serverIp')
}

export function addInspector(inspector) {
  inspectorRooms[inspector.id] = {}

  inspector.on('address', url => {
    set('clientUrl', url)
  })

  inspector.on('reload', id => send(id, 'reload'))
}

export function broadcastToInspector(event, data) {
  for (const [key] of Object.entries(inspectorRooms)) {
    send(key, event, data)
  }
}

export function isInspector(client) {
  const { host, referer } = client.handshake.headers

  return (
    (
      host === `${serverIp}:${port}` || 
      host === `localhost:${port}` || 
      host === `127.0.0.1:${port}`
    ) && 
    referer.includes(`:${port}/inspect`)
  )
}
