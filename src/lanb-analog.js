const ah = require('ajax-hook')

module.exports = function () {
    function get(search, name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = search.substr(1).match(reg);
        if (r != null) return (r[2]); return null;
    }

    ah.hookAjax({
        //hook callbacks
        onreadystatechange: function (xhr) {
            console.log("onreadystatechange called: %O", xhr)
        },
        onload: function (xhr) {
            var search = '?' + xhr.responseURL.split('?')[1];
            var url = get(search, 'url');
            for (let i = 0; i < analog.data.length; i++) {
                if (analog.data[i].url == url) {
                    xhr.responseText = JSON.stringify(analog.data[i].data)
                }
            }
        },
        //hook function
        open: function (arg, xhr) {
            console.log("open called: %O", xhr)
        },
        onerror: function (xhr) {
            console.log("onerror called: %O", xhr)
        }
    })
}(window)