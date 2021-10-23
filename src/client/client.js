var queryParams = {}
var socket
var socketScript = document.createElement('script')

var log = console.log
var debug = console.debug
var dir = console.dir
var error = console.error
var info = console.info
var warn = console.warn

console.log = consoleData.bind(log)
console.debug = consoleData.bind(debug)
console.dir = consoleData.bind(dir)
console.error = consoleData.bind(error)
console.info = consoleData.bind(info)
console.warn = consoleData.bind(warn)

location.search
  .slice(1)
  .split('&')
  .forEach(function urlParamsToObject(param) {
    var vals = param.split('=')

    queryParams[vals[0]] = decodeURIComponent(vals[1])
  })

socketScript.src = queryParams.inspect + 'socket.io/socket.io.js'

function consoleData() {
  var args = Array.prototype.slice.call(arguments)
  var lineNumber = 0
  var errorArr
  var data

  try {
    throw new Error()
  } catch (err) {
    errorArr = err.stack.split('\n')[2].split(' ')

    lineNumber = errorArr[errorArr.length-1]
  }

  data = {
    name: this.name,
    line: lineNumber,
    args: JSON.stringify(args, function resolver(key, value) {
      if (typeof value === 'function') {
        return value.toString()
      } else if (value instanceof HTMLElement) {
        return value.toString()
      }
      return value
    })
  }

  if (socket && !window.consoleStorage) {
    socket.emit('console', data)
  } else {
    window.consoleStorage = window.consoleStorage || []
    window.consoleStorage.push(data)
  }

  this.apply(console, args)
}

socketScript.addEventListener('load', function socketLoad() {
  socket = window.io(queryParams.inspect, {
    query: {
      id: sessionStorage.getItem('id') || '',
      title: document.title,
      href: location.href
    }
  })

  socket.on('connect', function socketConnect() {
    if (sessionStorage.getItem('id') === null) {
      sessionStorage.setItem('id', socket.id)
    }

    if (!window.consoleStorage) {
      return 
    }

    window.consoleStorage.forEach(function socketConsole(item) {
      socket.emit('console', item)
    })

    delete window.consoleStorage
  })

  socket.on('reload', function socketReload() {
    location.reload() 
  })
})

document.head.appendChild(socketScript)
