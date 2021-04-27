```jsx
import React, {Component} from 'react';
const { Panel } = Collapse;
export default class JumpMp extends Component {
    async componentDidMount() {
        const ua = navigator.userAgent.toLowerCase()
        const isWXWork = ua.match(/wxwork/i) == 'wxwork'
        const isWeixin = !isWXWork && ua.match(/micromessenger/i) == 'micromessenger'

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
    }


    render() {
        return (
            <div class="page full">
                <div id="wechat-web-container" class="hidden">
                    {/* <p class="">点击以下按钮打开 “小程序”</p> replace */}
                    {/* 跳转小程序的开放标签。文档 https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html */}
                    <wx-open-launch-weapp id="launch-btn" username="gh_9772a95a5070" path="pages/shop/shop?id=42&action=abc"> {/* replace */}
                        {/* 这里使用<script type="text/wxtag-template"></script>标签，避免template标签冲突 */}
                    <template>
                        <button style="width: 200px; height: 40px; text-align: center; font-size: 17px; display: block; margin: 0 auto; padding: 8px 24px; border: none; border-radius: 4px; background-color: #07c160; color:#fff;">打开小程序</button>
                    </template>
                    </wx-open-launch-weapp>
                </div>
                <div id="desktop-web-container" class="hidden">
                    <p class="">请在手机微信打开网页链接</p>
                </div>
            </div>
        )
    }
}

```
