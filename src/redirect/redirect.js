var time = 5;
var content = document.querySelector('h1')
var interval = setInterval(function() {
  time--
  if (time === 0) {
    content.innerText = 'Reloading!'
    clearInterval(interval)
    location.reload()
  } else {
    content.innerText = 'Retrying Redirect: ' + time
  }
  document.title = content.innerText
}, 1000);