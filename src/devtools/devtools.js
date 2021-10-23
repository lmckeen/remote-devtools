import { createInfiniteScroll } from './infiniteScroller/infiniteScroller.js' 

const consoleEl = document.querySelector('.console')
const worker = new Worker('/worker')

worker.postMessage({
  type: 'connect',
  val: sessionStorage.getItem('siteId')
})

worker.onmessage = ({ data }) => {
  const { type, val } = data

  switch (type) {
    case 'console':
      addToConsole(val)
      break
    default:
      break
  }
}

const consoleScroll = createInfiniteScroll(consoleEl)

function addToConsole(domString) {
  consoleScroll.append(document.createRange().createContextualFragment(domString))
}
