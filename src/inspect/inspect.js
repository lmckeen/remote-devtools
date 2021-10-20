const inspectList = document.querySelector('.inspect-list')
const load = document.querySelector('.load')
const tabCheck = document.querySelector('.use-tabs')
const socket = io()
const removeTimeout = {}
let openAsTab = JSON.parse(localStorage.getItem('openAsTab'))

if (typeof openAsTab !== 'boolean') {
  openAsTab = false
  localStorage.setItem('openAsTab', false)
}

tabCheck.checked = openAsTab

tabCheck.addEventListener('change', e => {
  openAsTab = e.target.checked
  localStorage.setItem('openAsTab', openAsTab)
})

load.addEventListener('click', () => {
  const address = document.querySelector('input')

  try {
    address.classList.remove('error')
    new URL(address.value)
    socket.emit('address', address.value)
  } catch(e) {
    address.classList.add('error')
  }
})

socket.on('site', site => {
  const itemDom = document.querySelector(`[data-id="${site.id}"]`)

  if (itemDom) {
    itemDom.classList.remove('disable')
    if (itemDom.childElementCount > 0) {
      clearTimeout(removeTimeout[site.id])
      return
    }
  }

  const item = itemDom || document.createElement('div')
  const ip = document.createElement('h3')
  const title = document.createElement('div')
  const href = document.createElement('div')
  const inspect = document.createElement('button')
  const reload = document.createElement('button')

  item.dataset.id = site.id
  
  item.classList.add('item')
  ip.classList.add('ip')
  title.classList.add('title')
  href.classList.add('href')
  inspect.classList.add('inspect')
  reload.classList.add('reload')

  ip.innerText = site.ip
  title.innerText = site.title
  href.innerText = site.href
  inspect.innerText = 'inspect'
  reload.innerText = 'reload'

  item.append(ip)
  item.append(title)
  item.append(href)
  item.append(inspect)
  item.append(reload)

  reload.addEventListener('click', () => socket.emit('reload', site.id))
  inspect.addEventListener('click', () => {
    let devtoolsWindow

    if (openAsTab) {
      devtoolsWindow = window.open('', site.id)
    } else {
      devtoolsWindow = window.open('', site.id, 'width=800,height=700')
    }

    devtoolsWindow.focus()

    if (devtoolsWindow.location.host === '') {
      devtoolsWindow.location = '/devtools'
      devtoolsWindow.sessionStorage.setItem('siteId', site.id)
    }
  })

  if (!itemDom) {
    inspectList.append(item)
  }
})

socket.on('remove', id => {
  const item = document.querySelector(`[data-id="${id}"]`)
  
  if (!item) return

  item.classList.add('disable')

  removeTimeout[id] = setTimeout(() => {
    item.innerHTML = ''
  }, 60000)
})