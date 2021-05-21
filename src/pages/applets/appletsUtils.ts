// 小程序列表
export const appletsList = [
    {
        appId: 'wx9ea4f3d39281b19d',
        appSecret: '1240e0298eec8a6d53f4d09aae5203db',
        name: '数字新生活'
    }
]

export interface APPLETS {
    qrcodeName:string // 小程序码名字
    path:string // 小程序码页面链接
    applets:number // 小程序列表的下标
    codeWidth:number|string // 小程序码的大小
    scene?:string // 小程序码参数
}
