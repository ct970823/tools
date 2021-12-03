```js
// 先引入微信的JS-SDK (https://res.wx.qq.com/open/js/jweixin-1.6.0.js)
// 使用wx.config注入权限验证配置 ,所有需要使用JS-SDK的页面都必须先注入配置信息（同一个url仅需调用一次）
// 这里的签名和随机字符串后端传递

wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId, // 必填，公众号的唯一标识
    timestamp:timestamp, // 必填，生成签名的时间戳
    nonceStr:noncestr, // 必填，生成签名的随机串
    signature,// 必填，签名
    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表chooseWXPay
});
```
