import { createServer } from 'http'
import os from 'os'
import { set } from '../storage/index.mjs'
import { setupExpress } from '../express/index.mjs'
import { setupSocket } from '../socket/index.mjs'

const port = set('port', 3030)
const networks = Object.entries(os.networkInterfaces())
  .map(item => item[1])
  .flat()
  .filter(item => !item.internal)
  .filter(item => item.family === 'IPv4')

const serverIp = set('serverIp', networks[0].address)
const serverUrl = set('serverUrl', `http://${serverIp}:${port}/`)

export function server() {
  const app = setupExpress()
  const httpServer = createServer(app)

  setupSocket(httpServer)

  httpServer.listen(port)

  return {
    port,
    serverIp,
    serverUrl
  }
}
