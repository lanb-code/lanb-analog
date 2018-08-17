const ah = require('ajax-hook')

module.exports = (() => {
    function get(search, name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
        var r = search.substr(1).match(reg)
        if (r != null)
            return (r[2])
        return null
    }

    let defaultOption = {
        //hook callbacks
        onreadystatechange: (xhr) => {
            console.log("onreadystatechange called: %O", xhr)
        },
        onload: (xhr) => {
            var search = '?' + xhr.responseURL.split('?')[1];
            var url = get(search, 'url');
            for (let i = 0; i < analog.data.length; i++) {
                if (analog.data[i].url == url) {
                    xhr.responseText = JSON.stringify(analog.data[i].data)
                }
            }
        },
        //hook function
        open: (arg, xhr) => {
            console.log("open called: %O", xhr)
        },
        onerror: (xhr) => {
            console.log('onerror called: %O', xhr)
        }
    }

    ah.hookAjax(defaultOption)
    window.Analog = ah

    Analog.fn = (option) => {
        let newOption = Object.assign(defaultOption, option)
        Analog.hookAjax(newOption)
    }
})()