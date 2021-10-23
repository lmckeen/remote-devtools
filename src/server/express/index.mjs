import { get, set } from '../storage/index.mjs'
import express from 'express'
import path from 'path'

const app = express()
const dirname = path.resolve()

set('clientUrl', '')

export function setupExpress() {
  disableExpressCache()

  app.use(express.static(`${dirname}/dist`))

  app.get('/inspect', (req, res) => {
    res.sendFile(path.join(dirname, 'dist/inspect/'))
  })

  app.get('/devtools', (req, res) => {
    res.sendFile(path.join(dirname, 'dist/devtools/'))
  })

  app.get('/worker', (req, res) => {
    res.sendFile(path.join(dirname, 'dist/devtools/worker.js'))
  })  
  
  app.get('/client', (req, res) => {
    res.sendFile(path.join(dirname, 'dist/client/client.js'))
  })
  
  app.get('/', (req, res) => {
    if (get('clientUrl') === '') {
      res.sendFile(path.join(dirname, 'dist/redirect/'))
    } else {    
      res.redirect(`${get('clientUrl')}?inspect=${encodeURIComponent(get('serverUrl'))}`)
      set('clientUrl', '')
    }
  })
  
  app.get('*', (req, res) => {
    res.redirect('/') 
  })

  return app
}

function disableExpressCache() {
  app.set('etag', false)
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })
}
