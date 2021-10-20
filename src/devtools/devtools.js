const consoleEl = document.querySelector('.console')
const loadingEl = document.querySelector('.loading')
const worker = new Worker('/worker')

let lastScrollTop = 0

worker.postMessage({
  type: 'connect',
  val: sessionStorage.getItem('siteId')
})

worker.onmessage = ({ data }) => {
  const { type, val } = data

  switch (type) {
    case 'console':
      addToConsole(val)
      break;
    default:
      break;
  }
}

const consoleScroller = createInfiniteScroller(consoleEl)

function addToConsole(domString) {
  consoleScroller.append(
    document.createRange().createContextualFragment(domString)
  )
}

function createInfiniteScroller(scrollEl, chunkSize = 200) {
  const top = document.createElement('div')
  const chunk = document.createElement('div')
  const bottom = document.createElement('div')
  
  let lastChunk = chunk
  let visibleEl

  top.classList.add('sentinel-top')
  chunk.classList.add('chunk')
  bottom.classList.add('sentinel-bottom')

  chunk.dataset.active = true

  scrollEl.appendChild(top)
  scrollEl.appendChild(chunk)
  scrollEl.appendChild(bottom)

  function intersect(el) {
    const active = scrollEl.querySelector('[data-active=true]')
    const previous = active.previousElementSibling;
    const next = active.nextElementSibling;

    if (el.classList.contains('sentinel-top')) {
      if (!previous.previousElementSibling || !previous.previousElementSibling.hidden) return 
      previous.previousElementSibling.hidden = false
      previous.dataset.active = true
      active.dataset.active = false
      if (active.classList.contains('chunk')) {
        active.hidden = true
      }
      previous.scrollIntoView()
    } else {
      if (!next.hidden) return 
      next.hidden = false
      next.dataset.active = true
      active.dataset.active = false
      if (active.previousElementSibling.classList.contains('chunk')) {
        active.previousElementSibling.hidden = true
      }
      next.scrollIntoView()
    }
  }

  let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return
      } 

      visibleEl = entry.target
      intersect(visibleEl)
    })
  })

  observer.observe(top)
  observer.observe(bottom)

  return {
    append: (el) => {
      const top = window.scrollY + window.innerHeight

      if (lastChunk.childElementCount < chunkSize) {
        lastChunk.appendChild(el)
      } else {
        const chunk = document.createElement('div')
        
        chunk.classList.add('chunk')
        chunk.appendChild(el)
        chunk.hidden = true
      
        lastChunk.after(chunk)
        lastChunk = chunk

        if (visibleEl) {
          intersect(visibleEl)
        }
      }

      const scrollHeight = document.body.scrollHeight
      const scrollBuffer = 50

      if (top + scrollBuffer > lastScrollTop) {
        bottom.scrollIntoView()
      } else {
        visibleEl = undefined
      }

      lastScrollTop = scrollHeight
    }
  }
}