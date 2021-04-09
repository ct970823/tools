import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {Layout, Menu} from "antd";
import menuList from "../../router";
import {useSelector} from 'react-redux'
import {setHeadTitle} from "../../redux/actions";

const {Sider} = Layout;
const {SubMenu, Item} = Menu

function SliderBox() {
    //5.1以上版本使用useLocation.pathname来获取当前地址
    const path = useLocation().pathname
    const collapsed = useSelector(state => state.collapsed)
    const [openKey, setOpenKey] = useState('')

    function getMenuNodes() {
        return menuList.reduce((pre, item) => {
            // 如果当前用户有item权限，显示对应的菜单项
            // if(this.hasAuth(item)){
            if (!item.children) {
                //当前显示的item
                if (item.key === path || path.indexOf(item.key) === 0) {
                    setHeadTitle(item.title)
                }
                // 向pre添加<Menu.Item>
                pre.push((
                    <Item key={item.key} icon={item.icon}>
                        <Link to={item.key} onClick={() => setHeadTitle(item.title)}>
                            {item.title}
                        </Link>
                    </Item>
                ))
            } else {
                // 向pre添加<SubMenu>
                // 查找一个与当前请求路径匹配的子Item
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                // 如果存在，说明当前item的字列表需要打开
                if (cItem) {
                    setOpenKey(item.key)
                }
                pre.push((
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {
                            // 递归调用
                            getMenuNodes(item.children)
                        }
                    </SubMenu>
                ))
            }
            // }

            //一定要返回pre
            return pre
        }, [])
    }

    // console.log(useLocation().pathname)
    return (
        <Sider className="slide-box" trigger={null} collapsible collapsed={collapsed}>
            <div className="logo"/>
            <Menu theme="dark" mode="inline" selectedKeys={[path]} defaultSelectedKeys={[openKey]}>
                {
                    getMenuNodes()
                }
            </Menu>
        </Sider>
    )
}

export default SliderBox
