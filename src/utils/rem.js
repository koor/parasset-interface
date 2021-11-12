function setRem() {
  const baseFontSize = 50
  const designWidth = 375
  let fontSize = (document.documentElement.clientWidth / designWidth) * baseFontSize
  if (fontSize > 106) fontSize = 106
  document.documentElement.style.fontSize = fontSize + 'px'
}

setRem()

window.onresize = function () {
  setRem()
}

export default setRem
