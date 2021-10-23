let lastScrollTop = 0

function intersect(el, scrollEl) {
  const active = scrollEl.querySelector('[data-active=true]')
  const previous = active.previousElementSibling
  const next = active.nextElementSibling

  if (el.classList.contains('sentinel-top')) {
    if (!previous.previousElementSibling || !previous.previousElementSibling.hidden) {
      return 
    } 
    previous.previousElementSibling.hidden = false
    previous.dataset.active = true
    active.dataset.active = false
    if (active.classList.contains('chunk')) {
      active.hidden = true
    }
    previous.scrollIntoView()
  } else {
    if (!next.hidden) {
      return 
    } 
    next.hidden = false
    next.dataset.active = true
    active.dataset.active = false
    if (active.previousElementSibling.classList.contains('chunk')) {
      active.previousElementSibling.hidden = true
    }
    next.scrollIntoView()
  }
}

function setupDom(scrollEl) {
  const top = document.createElement('div')
  const chunk = document.createElement('div')
  const bottom = document.createElement('div')

  top.classList.add('sentinel-top')
  chunk.classList.add('chunk')
  bottom.classList.add('sentinel-bottom')

  chunk.dataset.active = true

  scrollEl.appendChild(top)
  scrollEl.appendChild(chunk)
  scrollEl.appendChild(bottom)

  return {
    top,
    chunk,
    bottom
  }
}

export function createInfiniteScroll(scrollEl, chunkSize = 200) {
  const { top, chunk, bottom } = setupDom(scrollEl)
  let lastChunk = chunk
  let visibleEl

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return
      } 

      visibleEl = entry.target
      intersect(visibleEl, scrollEl)
    })
  })

  observer.observe(top)
  observer.observe(bottom)

  return {
    append: el => {
      const topHeight = window.scrollY + window.innerHeight

      if (lastChunk.childElementCount < chunkSize) {
        lastChunk.appendChild(el)
      } else {
        const newChunk = document.createElement('div')
        
        newChunk.classList.add('chunk')
        newChunk.appendChild(el)
        newChunk.hidden = true
      
        lastChunk.after(newChunk)
        lastChunk = newChunk

        if (visibleEl) {
          intersect(visibleEl, scrollEl)
        }
      }

      const scrollHeight = document.body.scrollHeight
      const scrollBuffer = 50

      if (topHeight + scrollBuffer > lastScrollTop) {
        bottom.scrollIntoView()
      } else {
        visibleEl = undefined
      }

      lastScrollTop = scrollHeight
    }
  }
}
