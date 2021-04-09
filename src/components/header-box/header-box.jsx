import React from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Layout} from "antd";
import {setCollapsed} from "../../redux/actions";
import {useSelector, useDispatch} from "react-redux";

const {Header} = Layout;

function HeaderBox() {
    const collapsed = useSelector(state => state.collapsed)
    const dispatch = useDispatch()

    function toggle() {
        dispatch(setCollapsed(!collapsed))

    }

    return (
        <Header className="site-layout-background" style={{padding: 0}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: toggle,
            })}
        </Header>
    )
}

export default HeaderBox
