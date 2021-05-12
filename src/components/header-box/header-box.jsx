import React from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Layout} from "antd";
import {setCollapsed} from "../../redux/actions";
import {useSelector, useDispatch} from "react-redux";
import './header-box.less'
const {Header} = Layout;

function HeaderBox() {
    const collapsed = useSelector(state => state.collapsed)
    const dispatch = useDispatch()

    function toggle() {
        dispatch(setCollapsed(!collapsed))

    }

    return (
        <div>
            <Header className="site-layout-background header_fixed">
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: toggle,
                })}
            </Header>
            <div className="header_fixed_content"></div>
        </div>
    )
}

export default HeaderBox
