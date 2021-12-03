import {
    HomeOutlined,
    QrcodeOutlined,
    FileTextOutlined,
    TableOutlined,
    WechatOutlined,
    Loading3QuartersOutlined,
    CloudUploadOutlined,
    BarcodeOutlined,
    Html5Outlined
} from '@ant-design/icons'

export interface ROUTERTYPE {
    name: String; // 菜单标题名称
    path: String; // 对应的 path
    icon: JSX.Element; // 图标名称
    routes?: ROUTERTYPE[]
    isPublic?: Boolean
}


const menuList =
    {
        route: {
            path: '/',
            routes: [
                {
                    name: '首页', // 菜单标题名称
                    path: '/welcome', // 对应的 path
                    icon: <HomeOutlined/>, // 图标名称
                    component: './welcome',
                    isPublic: true
                },
                {
                    name: '小程序生成码',
                    path: '/applets',
                    icon: <QrcodeOutlined/>,
                    component: './applets',
                },
                {
                    name: 'H5跳转小程序',
                    path: '/jump-mp',
                    icon: <WechatOutlined/>,
                    component: './jump-mp',
                },
                {
                    name: '微信',
                    path: '/wechat',
                    icon: <WechatOutlined/>,
                    routes:[
                        {
                            name: '接口注入',
                            path: 'wx-config',
                            component: './wx-config',
                        },
                        {
                            name: '登录',
                            path: 'wx-login',
                            component: './wx-login',
                        },
                        {
                            name: '支付',
                            path: 'wx-pay',
                            component: './wx-pay',
                        }
                    ]
                },
                {
                    name: '富文本',
                    path: '/richTextEditor',
                    icon: <FileTextOutlined/>,
                    component: './richTextEditor',
                },
                {
                    name: '高级表格',
                    path: '/proTable',
                    icon: <TableOutlined/>,
                    component: './proTable',
                },
                {
                    name: '进度条',
                    path: '/MyProgress',
                    icon: <Loading3QuartersOutlined/>,
                    component: './MyProgress',
                },
                {
                    name: '条形码',
                    path: '/JsBarcode',
                    icon: <BarcodeOutlined/>,
                    component: './JsBarcode',
                },
                {
                    name: 'html转canvas',
                    path: '/HtmlToImg',
                    icon: <Html5Outlined/>,
                    component: './HtmlToImg',
                },
                {
                    name: '上传',
                    path: '/MyUpload',
                    icon: <CloudUploadOutlined/>,
                    component: './MyUpload',
                },
                // {
                //     name: '商品',
                //     path: '/products',
                //     icon: <ShopOutlined/>,
                //     routes: [ // 子菜单列表
                //         {
                //             name: '品类管理',
                //             path: '/category',
                //             icon: <BarsOutlined/>
                //         },
                //         {
                //             name: '商品管理',
                //             path: '/product',
                //             icon: <ShoppingOutlined/>
                //         },
                //     ]
                // },
            ]
        }
    }

export default menuList
