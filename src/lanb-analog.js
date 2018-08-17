const ah = require('ajax-hook')
require('url-search-params-polyfill')

module.exports = ((window) => {

  // check browser environment
  if (typeof window === 'undefined') {
    console.error('lanb-analog.js: Make sure you are in browser environment.')
    return;
  }

  // get URL value
  function get (search, name) {
    let params = new URLSearchParams(search)
    if (params.has(name)) return params.get(name)
    else return null
  }

  // match analog data
  function matchData (analog, xhr) {
    let search = '?' + xhr.responseURL.split('?')[1]
    let url = get(search, 'url')
    for (let i = 0; i < analog.data.length; i++) {
      if (analog.data[i].url === url) {
        xhr.responseText = JSON.stringify(analog.data[i].data)
      }
    }
  }

  // default alalog option
  let defaultOption = {
    // hook callbacks
    onreadystatechange: (xhr) => {
      console.log("onreadystatechange called: %O", xhr)
    },
    onload: (xhr) => {
      if (typeof analog === 'undefined') {
        let analog = {}
        analog.data = []
        matchData(analog, xhr)
      } else {
        matchData(analog, xhr)
      }

    },
    // hook function
    open: (arg, xhr) => {
      console.log("open called: %O", xhr)
    },
    onerror: (xhr) => {
      console.log('onerror called: %O', xhr)
    }
  }

  ah.hookAjax(defaultOption)

  // exposed object
  window.Analog = ah

  // extension method
  Analog.fn = (option) => {
    let newOption = Object.assign(defaultOption, option)
    Analog.hookAjax(newOption)
  }

})(window)