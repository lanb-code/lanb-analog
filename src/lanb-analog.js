const ah = require('ajax-hook')

module.exports = (() => {
    // get URL value
    function get(search, name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
        var r = search.substr(1).match(reg)
        if (r != null)
            return (r[2])
        return null
    }


    function matchdata(analog, xhr) {
        let search = '?' + xhr.responseURL.split('?')[1]
        let url = get(search, 'url')
        for (let i = 0; i < analog.data.length; i++) {
            if (analog.data[i].url == url) {
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
            if (typeof analog == 'undefined') {
                let analog = {}
                analog.data = []
                matchdata(analog, xhr)
            } else {
                matchdata(analog, xhr)
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
})()