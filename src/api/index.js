/*
* 请求api
* */
import request from './request';
/**
 * @Description: 小程序 地址前面要带/api/
 * @author Tao Chen
 * @date 2021/4/9
*/
// 获取access_token
export const getAccessToken = (appId, appSecret) => request(`/api/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`)

// 下载二维码
export const downloadPng = params => {
    return new Promise(resolve => {
        const {buffer, qrcodeName, isQrcode} = params
        let blob = new Blob([buffer], {type: 'image/png'});
        let downloadElement = document.createElement('a');
        let href = window.URL.createObjectURL(blob); // 创建下载的链接
        downloadElement.href = href;
        downloadElement.download = qrcodeName ? qrcodeName : isQrcode ? '二维码' : '小程序码'; // 下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); // 点击下载
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
        resolve(true)
    })
}

// 小程序二维码 （有次数限制）
export const getQrcodeLimit = (access_token, path, codeWidth) => request(`/api/cgi-bin/wxaapp/createwxaqrcode?access_token=${access_token}`,{
    method:'post',
    data:{path,width: codeWidth ? codeWidth : 430},
    responseType: "arrayBuffer"
})
// 小程序码 （有次数限制）
export const getAppletsLimit = (access_token, path, codeWidth) => request(`/api/wxa/getwxacode?access_token=${access_token}`,{
    method:'post',
    data:{path,width: codeWidth ? codeWidth : 430},
    responseType: "arrayBuffer"
})
// 小程序码 （无次数限制）
export const getAppletsUnLimit = (access_token, path, scene, codeWidth) => request(`/api/wxa/getwxacodeunlimit?access_token=${access_token}`,{
    method:'post',
    data:{
        scene: scene ? scene : "",
        page: path,
        width: codeWidth ? codeWidth : 430,
        auto_color: false,//自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调
        line_color: {"r": 0, "g": 0, "b": 0},//auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示
        is_hyaline: false, // 是否需要透明底色，为 true 时，生成透明底色的小程序码
     },
    responseType: "arrayBuffer"
})
