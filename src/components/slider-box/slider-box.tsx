import React, {useState} from "react";
import {Layout, Menu} from "antd";
import menuList from "../../router";
// import {useSelector} from 'react-redux'
// import {setHeadTitle} from "../../redux/actions";
// import {ROUTERTYPE} from '../../router'
// import './slider-box.less'
//
// const {Link, useLocation} = require('react-router-dom')
// const {Sider} = Layout;
// const {SubMenu, Item} = Menu
//
//
// function SliderBox() {
//     //5.1以上版本使用useLocation.pathname来获取当前地址
//     const path = useLocation().pathname
//     const collapsed = useSelector((state: { collapsed: true }) => state.collapsed)
//     const [openKey, setOpenKey] = useState<string>('')
//
//     function getMenuNodes(routes?: ROUTERTYPE[]) {
//         return menuList.reduce((pre: any[], item: ROUTERTYPE) => {
//             // 如果当前用户有item权限，显示对应的菜单项
//             // if(this.hasAuth(item)){
//             if (!item.routes) {
//                 //当前显示的item
//                 if (item.path === path || path.indexOf(item.path) === 0) {
//                     setHeadTitle(item.name)
//                 }
//                 // 向pre添加<Menu.Item>
//                 pre.push((
//                     // @ts-ignore
//                     <Item key={item.path} icon={item.icon}>
//                         <Link to={item.path} onClick={() => setHeadTitle(item.name)}>
//                             {item.name}
//                         </Link>
//                     </Item>
//                 ))
//             } else {
//                 // 向pre添加<SubMenu>
//                 // 查找一个与当前请求路径匹配的子Item
//                 const cItem = item.routes.find(cItem => path.indexOf(cItem.path) === 0)
//                 // 如果存在，说明当前item的字列表需要打开
//                 if (cItem) {
//                     setOpenKey(item.path as string)
//                 }
//
//                 pre.push((
//                     // @ts-ignore
//                     <SubMenu key={item.path} icon={item.icon} title={item.title}>
//                         {
//                             // 递归调用
//                             getMenuNodes(item.routes)
//                         }
//                     </SubMenu>
//                 ))
//             }
//             // }
//
//             //一定要返回pre
//             return pre
//         }, [])
//     }
//
//     // console.log(useLocation().pathname)
//
//
//     return (
//         <div>
//             <Sider
//                 className="slide-box"
//                 trigger={null}
//                 collapsible
//                 collapsed={collapsed}
//             >
//                 <div className="logo"/>
//                 <Menu
//                     theme="dark"
//                     mode="inline"
//                     selectedKeys={[path]}
//                     defaultSelectedKeys={[openKey]}>
//                     {
//                         getMenuNodes()
//                     }
//                 </Menu>
//             </Sider>
//             <div className={`slide_fixed_content ${collapsed ? 'slide_fixed_content_collapsed' : ''}`}/>
//         </div>
//     )
// }
//
// export default SliderBox
