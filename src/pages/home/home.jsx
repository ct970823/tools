import React from 'react';
import {Layout,BackTop} from 'antd';
import {Switch, Redirect, Route} from 'react-router-dom'
import HeaderBox from '../../components/header-box/header-box'
import SliderBox from "../../components/slider-box/slider-box";
import Applets from "../applets/applets";
import JumpMp from "../jump-mp/jump-mp";
import Welcome from "../welcome/welcome";
import NoFound from "../error/not-fond";
import RichTextEditor from "../richTextEditor/richTextEditor";
import TablePro from "../table-pro/table-pro";
import MyProgress from "../my-progress/my-progress";
import Upload from "../upload/upload";
import './home.less'

const {Content} = Layout;

function Home() {
    return (
        <Layout>
            {/*左边菜单*/}
            <SliderBox/>
            <Layout className="site-layout">
                {/*头部*/}
                <HeaderBox/>
                {/*内容区*/}
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {/* 根据路由显示不同的页面 */}
                    <Switch>
                        <Redirect exact from='/' to='/welcome'/>
                        <Route path='/welcome' component={Welcome}/>
                        <Route path='/applets' component={Applets}/>
                        <Route path='/jump-mp' component={JumpMp}/>
                        <Route path='/richTextEditor' component={RichTextEditor}/>
                        <Route path='/proTable' component={TablePro}/>
                        <Route path='/myProgress' component={MyProgress}/>
                        <Route path='/upload' component={Upload}/>
                        {/*上面没有一个匹配的，直接显示*/}
                        <Route component={NoFound}/>
                    </Switch>
                    {/* 回到顶部 */}
                    <BackTop />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Home
