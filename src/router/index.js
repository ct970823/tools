import {
    HomeOutlined,
    QrcodeOutlined,
    FileTextOutlined,
    TableOutlined,
    WechatOutlined
} from '@ant-design/icons'

 const menuList = [
    {
        title: '首页', // 菜单标题名称
        key: '/welcome', // 对应的 path
        icon: <HomeOutlined/>, // 图标名称
        isPublic:true
    },
    {
        title: '小程序生成码',
        key: '/applets',
        icon: <QrcodeOutlined />
    },
     {
         title: 'H5跳转小程序',
         key: '/jump-mp',
         icon: <WechatOutlined />
     },
     {
         title: '富文本',
         key: '/richTextEditor',
         icon: <FileTextOutlined />
     },
     {
         title: '高级表格',
         key: '/proTable',
         icon: <TableOutlined />
     },
     {
         title: '上传',
         key: '/upload',
         icon: <TableOutlined />
     },
    // {
    //     title: '商品',
    //     key: '/products',
    //     icon: <ShopOutlined/>,
    //     children: [ // 子菜单列表
    //         {
    //             title: '品类管理',
    //             key: '/category',
    //             icon: <BarsOutlined/>
    //         },
    //         {
    //             title: '商品管理',
    //             key: '/product',
    //             icon: <ShoppingOutlined/>
    //         },
    //     ]
    // },
]
export default menuList
