# lanb-analog

为前端提供模拟测试数据  

[中文文档](./README.md)  
[English](./README-en.md)

## 特性  

### 轻量级  

Lanb-alalog是一个轻量级的小插件。
它仅仅只有2.15k，却可以对所有的ajax请求进行监控。  

### 拦截  

它依赖于Ajax-hook，如果你想要自定义自己的请求拦截器，那么该项目可以是一个很好的参考。  

## 开始  

该项目基于webpack构建，如果你是个爱折腾的人，那么你可以按照如下方法，来获得这个库。  

```sh
npm install
npm run start
```  

如果想马上获得这个库，那么你可以参考 ./dist/index.html  

我们只要像这样重写alalog这个参数  

```javascript
var analog = {};
analog.data = [
    {
        url: 'http://lanb-analog.com/list',
        data: [{ id: 1, name: "测试1" }, { id: 2, name: "测试2" }]
    }
]

```  

然后在我们请求Ajax的时候，url参数后的所有内容就会当成一个匹配项，如果正确匹配了，我们就会把data这个字段中的内容都作为结果返回。  

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

## 扩展  

```javascript
Analog.fn({
    // 需要被重写和扩展的方法
    open: (arg, xhr) => {
        console.log("%O", xhr)
    }
})
```  

我们将保留最最基本的功能，直到该方法被覆盖为止。  

## 社区

- [组织](https://github.com/lanb-code)  
- [加入讨论](https://github.com/lanb-code/lanb-analog/issues)  


## 许可证书  

[MIT](https://github.com/lanb-code/lanb-analog/blob/master/LICENSE)  

