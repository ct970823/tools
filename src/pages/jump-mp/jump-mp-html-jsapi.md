##### 由于jsapi只能在微信浏览器中使用，所以只判断是否是微信浏览器

```html
<html>
  <head>
    <title>打开小程序</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <script>
      window.onerror = e => {
        console.error(e)
        alert('发生错误' + e)
      }
    </script>
    <!-- weui 样式 -->
    <link rel="stylesheet" href="https://res.wx.qq.com/open/libs/weui/2.4.1/weui.min.css"></link>
    <!-- 调试用的移动端 console -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/eruda"></script> -->
    <!-- <script>eruda.init();</script> -->
    <!-- 公众号 JSSDK -->
    <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
    <script>
      function docReady(fn) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
          fn()
        } else {
          document.addEventListener('DOMContentLoaded', fn);
        }
      }

      docReady(async function() {
        var ua = navigator.userAgent.toLowerCase()
        var isWXWork = ua.match(/wxwork/i) == 'wxwork'
        var isWeixin = !isWXWork && ua.match(/micromessenger/i) == 'micromessenger'

        if (isWeixin) {
          // 微信浏览器
          var containerEl = document.getElementById('wechat-web-container')
          containerEl.classList.remove('hidden')
          containerEl.classList.add('full', 'wechat-web-container')

          var launchBtn = document.getElementById('launch-btn')
          launchBtn.addEventListener('ready', function (e) {
            console.log('开放标签 ready')
          })
          launchBtn.addEventListener('launch', function (e) {
            console.log('开放标签 success')
          })
          launchBtn.addEventListener('error', function (e) {
            console.log('开放标签 fail', e.detail)
          })
			
            
          // 这里需要调用后端接口获取参数 
          
          wx.config({
            // debug: true, // 调试时可开启
            appId: '公众号的唯一标识', // <!-- replace -->
            timestamp: 0, // 必填，填任意数字即可
            nonceStr: 'nonceStr', // 必填，填任意非空字符串即可
            signature: 'signature', // 必填，填任意非空字符串即可
            jsApiList: ['chooseImage'], // 必填，随意一个接口即可
            openTagList:['wx-open-launch-weapp'], // 填入打开小程序的开放标签名
          })
        } else {
          // 在 pc 上则给提示引导到手机端打开
          var containerEl = document.getElementById('desktop-web-container')
          containerEl.classList.remove('hidden')
          containerEl.classList.add('full', 'desktop-web-container')
        }
      })
    </script>
    <style>
      .hidden {
        display: none;
      }

      .full {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }

      .public-web-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .public-web-container p {
        position: absolute;
        top: 40%;
      }

      .public-web-container a {
        position: absolute;
        bottom: 45%;
      }

      .wechat-web-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .wechat-web-container p {
        position: absolute;
        top: 40%;
      }

      .wechat-web-container wx-open-launch-weapp {
        position: absolute;
        bottom: 45%;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .desktop-web-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .desktop-web-container p {
        position: absolute;
        top: 40%;
      }
      .product{
        position: absolute;
        bottom: 37% !important;
      }
	  .public-web-container .btn{
		  width: 200px;
	  }
    </style>
  </head>
  <body>
    <div class="page full">
      <div id="wechat-web-container" class="hidden">
        <p class="">点击以下按钮打开 “小程序”</p> <!-- replace -->
        <!-- 跳转小程序的开放标签。文档 https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html -->
        <wx-open-launch-weapp id="launch-btn" username="gh_9772a95a5070" path="pages/shop/shop?id=42&action=abc"> <!-- replace -->
          <template>
            <button style="width: 200px; height: 40px; text-align: center; font-size: 17px; display: block; margin: 0 auto; padding: 8px 24px; border: none; border-radius: 4px; background-color: #07c160; color:#fff;">打开小程序</button>
          </template>
        </wx-open-launch-weapp>
      </div>
      <div id="desktop-web-container" class="hidden">
        <p class="">请在手机微信打开网页链接</p>
      </div>
    </div>
  </body>
</html>

```

