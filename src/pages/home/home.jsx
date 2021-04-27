import React from 'react';
import {Layout} from 'antd';
import {Switch, Redirect, Route} from 'react-router-dom'
import HeaderBox from '../../components/header-box/header-box'
import SliderBox from "../../components/slider-box/slider-box";
import Applets from "../applets/applets";
import JumpMp from "../jump-mp/jump-mp";
import Welcome from "../welcome/welcome";
import NoFoundPage from "../error/404";
import RichTextEditor from "../richTextEditor/richTextEditor";
import ProTable from "../pro-table/pro-table";
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
                    <Switch>
                        <Redirect exact from='/' to='/welcome'/>
                        <Route path='/welcome' component={Welcome}/>
                        <Route path='/applets' component={Applets}/>
                        <Route path='/jump-mp' component={JumpMp}/>
                        <Route path='/richTextEditor' component={RichTextEditor}/>
                        <Route path='/proTable' component={ProTable}/>
                        <Route path='/upload' component={Upload}/>
                        {/*上面没有一个匹配的，直接显示*/}
                        <Route component={NoFoundPage}/>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Home
