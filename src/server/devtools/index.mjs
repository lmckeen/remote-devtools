import { get } from '../storage/index.mjs'

let port
let serverIp

export function setupDevtools() {
  port = get('port')
  serverIp = get('serverIp')
}

export function isDevtools(client) {
  const { host, referer } = client.handshake.headers

  return (
    (
      host === `${serverIp}:${port}` || 
      host === `localhost:${port}` || 
      host === `127.0.0.1:${port}`
    ) && 
    referer.includes(`:${port}/worker`)
  )
}

export function addDevtools(client) {
  const { query } = client.handshake
  const { siteId } = query

  client.join(`${siteId}-devtools`)
}