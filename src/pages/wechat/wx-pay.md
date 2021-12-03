```js
// 判断当前浏览器环境
const environment = () => {
	const ua = navigator.userAgent.toLowerCase()
	const isWXWork = ua.match(/wxwork/i) == 'wxwork'
	const isWeixin = !isWXWork && ua.match(/micromessenger/i) == 'micromessenger'
	let isMobile = false
	let isDesktop = false
	if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|IEMobile)/i)) {
		isMobile = true
	} else {
		isDesktop = true
	}
	return { isWeixin, isMobile, isDesktop }
}

/**
 * 微信支付 （具体支付内容访问微信支付开发文档）
 * 微信浏览器端 ：通过 JS-SDK 拉起微信端微信支付实现支付
 * 其他浏览器端 ：通过访问微信返回的链接，实现拉起微信客户端实现支付。使用这个支付要在支付页增加 是否支付完成的提示，用于检测支付状态。
 * pc端 ：Native支付（主要是使用api生成二维码，用户通过扫一扫来完成支付） ，然后开启轮询，去查询支付结果，
 * 
 * @param businessSn 商户订单号 这个通过后端接口取到
 * @param openId 当前用户的openId（获取方式在登录处）
 * @returns {Promise<unknown>}
 */
const wxPay = (businessSn, openId) => {
	return new Promise(async (resolve, reject) => {
		const { isWeixin, isMobile, isDesktop } = environment()
		// pc端
		if (isDesktop) {
			vueDom.$toast('请使用手机微信浏览器打开', 'center')
			reject('isDesktop')
		} else if (isWeixin) {// 微信端 微信jsapi支付
			// 调用接口支付
			const result = await vueDom.request('getPayJsApiInfo', {
				businessSn,
				openId
			}, true)
            // 获取时间戳，前面，字符串，加密方式 通过这些字典拉起微信支付
			const { timeStamp, sign, nonceStr, signType } = result.content.data
			// 微信浏览器打开 调用jsapi接口
			wx.chooseWXPay({
				timestamp: timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				nonceStr, // 支付签名随机串，不长于 32 位
				package: result.content.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
				signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				paySign: sign, // 支付签名
				success: function (res) {
					// 支付成功后的回调函数
					resolve(res)
				},
				fail: function (err) {
					reject(err)
				},
				cancel: function (error) {
					reject(error)
				}
			});
		} else if (isMobile) { // 移动端（除微信浏览器） h5支付
			// 获取支付信息
			const result = await vueDom.request('getPayH5Info', {
				businessSn,
				payType: 2,
				ip: returnCitySN.cip,
				openId
			}, true)
            // 非微信浏览器的接口返回是一个链接
			const { mwebUrl } = result.content.data
            // 跳转链接并拼接回调地址
			window.location.href = `${ mwebUrl }&redirect_url=${ encodeURIComponent(`${ window.location.href }&businessSn=${ businessSn }&dialogShow=true`) }`
			resolve()
		}
	})
}
```
