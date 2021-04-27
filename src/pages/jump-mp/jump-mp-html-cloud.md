1. HTML

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
       <!-- 云开发 Web SDK -->
       <script src="https://res.wx.qq.com/open/js/cloudbase/1.1.0/cloud.js"></script>
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
           var isMobile = false
           var isDesktop = false
           if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|IEMobile)/i)) {
             isMobile = true
           } else {
             isDesktop = true
           }
   		
   
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
   
             wx.config({
               // debug: true, // 调试时可开启
               appId: 'wx9ea4f3d39281b19d', // <!-- replace -->
               timestamp: 0, // 必填，填任意数字即可
               nonceStr: 'nonceStr', // 必填，填任意非空字符串即可
               signature: 'signature', // 必填，填任意非空字符串即可
               jsApiList: ['chooseImage'], // 必填，随意一个接口即可
               openTagList:['wx-open-launch-weapp'], // 填入打开小程序的开放标签名
             })
           } else if (isDesktop) {
             // 在 pc 上则给提示引导到手机端打开
             var containerEl = document.getElementById('desktop-web-container')
             containerEl.classList.remove('hidden')
             containerEl.classList.add('full', 'desktop-web-container')
           }  else {
             // 其他手机浏览器
             var containerEl = document.getElementById('public-web-container')
             containerEl.classList.remove('hidden')
             containerEl.classList.add('full', 'public-web-container')
             var c = new cloud.Cloud({
               // 必填，表示是未登录模式
               identityless: true,
               // 资源方 AppID
               resourceAppid: 'wx9ea4f3d39281b19d', // <!-- replace -->
               // 资源方环境 ID
               resourceEnv: 'shuzishenghuo-8gt870c1fcd4d401', // <!-- replace -->
             })
             await c.init()
             window.c = c
   
             var buttonEl = document.getElementById('public-web-jump-button')
             var buttonLoadingEl = document.getElementById('public-web-jump-button-loading')
             // 如果需要一进来就弹窗提示打开就使用下面的代码
             // try {
             //   await openWeapp(() => {
             //     buttonEl.classList.remove('weui-btn_loading')
             //     buttonLoadingEl.classList.add('hidden')
             //   })
             // } catch (e) {
             //   buttonEl.classList.remove('weui-btn_loading')
             //   buttonLoadingEl.classList.add('hidden')
             //   throw e
             // }
           }
         })
   
         async function openWeapp({path,query,onBeforeJump}) {
           var c = window.c
           const res = await c.callFunction({
             name: 'public',
             data: {
               action: 'getUrlScheme',
   			path,
   			query
             },
           })
           console.warn(res)
           if (onBeforeJump) {
             onBeforeJump()
           }
           location.href = res.result.openlink
         }
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
   
         <div id="public-web-container" class="hidden">
           <p class="">点击以下按钮打开 “小程序”</p> <!-- replace -->
           <a id="public-web-jump-button1" href="javascript:" class="weui-btn weui-btn_primary weui-btn_loading btn btn1" onclick="openWeapp({path:'/pages/shop/shop',query:'id=42'})">
             <!-- <span id="public-web-jump-button-loading1" class="weui-primary-loading weui-primary-loading_transparent"><i class="weui-primary-loading__dot"></i></span> -->
               打开小程序
           </a>
         </div>
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
           <p class="">请在手机打开网页链接</p>
         </div>
       </div>
     </body>
   </html>
   
   ```


2. 云函数

   > 小程序中创建cloudfunctions 文件夹，在project.config.json文件中添加一下内容 "cloudfunctionTemplateRoot": "cloudfunctionTemplate",然后创建新的云函数，修改index文件内容，更新线上云函数

   ```javascript
   // 云函数入口文件
   const cloud = require('wx-server-sdk')
   
   cloud.init()
   
   // 云函数入口函数
   exports.main = async (event, context) => {
     const wxContext = cloud.getWXContext()
   
     switch (event.action) {
       case 'getUrlScheme': {
         return getUrlScheme({path:event.path,query:event.query})
       }
     }
   
     return 'action not found'
   }
   
   async function getUrlScheme({path,query}) {
     return cloud.openapi.urlscheme.generate({
       jumpWxa: {
         path, // <!-- replace -->
         query
       },
       // 如果想不过期则置为 false，并可以存到数据库
       isExpire: false,
       // 一分钟有效期
       expireTime: parseInt(Date.now() / 1000 + 60),
     })
   }
   ```

