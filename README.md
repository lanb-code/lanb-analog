# lanb-analog

providing analog data for the FE

[中文文档](./README-zh.md)

## Features

### Lightweight

Lanb-alalog is a lightweight plug-in. It is only **2.15k**, but it can monitor all Ajax requests.

### Intercepting

It depends on Ajax-hook. It relies on Ajax-hook, and if you want to customize your request interceptor, the project can be a good reference

## Get Started

The project is built on webpack, and if you're a toss-and-turn person, you can get the library in the following ways.

```sh
npm install
npm run start
```

If you want to get this library right away, you can refer to ./dist/index.html.

We just need to rewrite the alalog parameter like this.
```javascript
var analog = {};
analog.data = [
    {
        url: 'http://lanb-analog.com/list',
        data: [{ id: 1, name: "测试1" }, { id: 2, name: "测试2" }]
    }
]

```

Then when we request ajax, everything after the URL parameter is treated as a match, and if it matches, we return everything in the data field as a result.

```javascript
$.ajax({
    url: '?url=http://lanb-analog.com/list',
    type: 'post',
    dataType: 'json',
    success(result) {
        console.log(result)
    }, error(xhr) {
        console.log(xhr.responseJSON)
    },
})   
```

## Community

- [GitHub organization](https://github.com/lanb-code)
- [Join gitter discuss](https://github.com/lanb-code/lanb-analog/issues)

## License

[MIT](https://github.com/lanb-code/lanb-analog/blob/master/LICENSE)
