import { server } from './create/index.mjs'

const { serverUrl } = server()

console.log('\x1b[36m%s\x1b[0m', `Client: ${serverUrl}`)
console.log('\x1b[36m%s\x1b[0m', `Inspect: ${serverUrl}inspect\n`)

