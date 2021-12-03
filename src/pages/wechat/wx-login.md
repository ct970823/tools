```js
import Vue from 'vue'
// 获取页面参数
const GetQueryString = (name) =>{
	const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	const r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}

/**
 * 判断是否需要授权登录
 * @param appId 公众号appId
 * @param appSecret 公众号AppSecret
 * @returns {Promise<void>}
 */
const isWxLogin = (appId,appSecret) => {
  return new Promise(async (resolve,reject)=>{
    // 判断当前缓存中是否存在openId
    const openId = localStorage.getItem('openId')
    if(openId === 'undefined' || openId === 'null' || openId === 'NaN' || !openId){
      //判断url是否存在code
      const code = GetQueryString('code')
      if(code){
      	// 这里调用后端接口，将code传给后端拿到openId（appId和appSecret尽量不要前端传，如果需要传，加密后再传）
        const res = await Vue.request('getPlaceOrderOpenId', {
          appId,
          secret:appSecret,
          code
        })
        //  取到openId
        const openId = res.content.openId
        //  存到本地
        localStorage.setItem('openId',openId)
        resolve(true)
      }else{
        // 获取当前页面地址
        const redirect_uri = encodeURIComponent(location.href)
        // 跳转授权页面(snsapi_userinfo带授权弹窗，snsapi_base静默登录)
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxad17f400ed2b7292&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
        reject(false)
      }
    }else{
      resolve(true)
    }
  })

}
```
