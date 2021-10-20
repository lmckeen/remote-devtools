importScripts('/socket.io/socket.io.js');

const logs = []
let currentIndex = 0
let domNodeString = ''

this.onmessage = ({ data }) => {
  const { type, val } = data

  switch (type) {
    case 'connect':
      createSocket(val)
      break;
    default:
      break;
  }
}

function createSocket(id) {
  const socket = io('/', {
    query: {
      siteId: id
    }
  })

  socket.on('console', ({ name, args, line }) => {
    logs.push({name, args, line})
    logger(name, args, line)
    currentIndex = logs.length
  })
}

function getLineNum(lineNum) {
  const urlParts = new URL(lineNum).pathname.split('/')
  const part = urlParts[urlParts.length-1] || '/' 
  const numParts = lineNum.split(':')
  return `${part}:${numParts[numParts.length-2]}:${numParts[numParts.length-1]}`
}

function logger(name, args, line) {
  if (domNodeString === '') {
    setTimeout(() => {
      this.postMessage({
        type: 'console',
        val: domNodeString
      })
      domNodeString = ''
    }, 100)
  }
  
  domNodeString += `
    <div class="item ${name}" style="--line-number:'${getLineNum(line)}'">
      ${args}
    </div>  
  `
}
