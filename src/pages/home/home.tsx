import React, {useState} from 'react';
import {Avatar} from 'antd';
import {Switch, Redirect, Route, Link, useLocation} from 'react-router-dom'
import Applets from "../applets/applets";
import JumpMp from "../jump-mp/jump-mp";
import wxConfig from '../wechat/wx-config'
import wxLogin from '../wechat/wx-login'
import wxPay from '../wechat/wx-pay'
import Welcome from '../welcome/welcome'
import NoFound from "../error/not-fond";
import RichTextEditor from "../richTextEditor/richTextEditor";
import TablePro from "../table-pro/table-pro";
import MyProgress from "../my-progress/my-progress";
import JsBarcode from "../js-barcode/js-barcode";
import HtmlToImg from "../html-to-img/html-to-img";
import MyUpload from "../my-upload/my-upload";
import type {ProSettings} from '@ant-design/pro-layout';
import ProLayout, {PageContainer, SettingDrawer} from '@ant-design/pro-layout';
import menuList from '../../router/index';
import {UserOutlined} from '@ant-design/icons';
import './home.less'


const content = (
    <Switch>
        <Redirect exact from='/' to='/welcome'/>
        <Route path='/welcome' component={Welcome}/>
        <Route path='/applets' component={Applets}/>
        <Route path='/jump-mp' component={JumpMp}/>
        <Route path='/wechat/wx-config' component={wxConfig}/>
        <Route path='/wechat/wx-login' component={wxLogin}/>
        <Route path='/wechat/wx-pay' component={wxPay}/>
        <Route path='/richTextEditor' component={RichTextEditor}/>
        <Route path='/proTable' component={TablePro}/>
        <Route path='/myProgress' component={MyProgress}/>
        <Route path='/jsBarcode' component={JsBarcode}/>
        <Route path='/HtmlToImg' component={HtmlToImg}/>
        <Route path='/myUpload' component={MyUpload}/>
        {/*上面没有一个匹配的，直接显示*/}
        <Route component={NoFound}/>
    </Switch>

);


function Home() {
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({fixSiderbar: true,});
    const pathname = useLocation().pathname
    // app.setting.themecolor.dust': '薄暮'
    //     app.setting.themecolor.volcano': '火山'
    //     app.setting.themecolor.sunset': '日暮'
    //     app.setting.themecolor.cyan': '明青'
    //     app.setting.themecolor.green': '极光绿'
    //     app.setting.themecolor.daybreak': '拂晓蓝（默认）'
    //     app.setting.themecolor.geekblue': '极客蓝'
    //     app.setting.themecolor.purple': '酱紫'
    return (
        <div
            id="test-pro-layout"
            style={{
                height: '100vh',
            }}
        >
            <ProLayout
                {...menuList}
                location={{
                    pathname,
                }}

                onMenuHeaderClick={(e) => console.log(e)}
                menuItemRender={(menuItemProps, defaultDom) => {
                    if (
                        menuItemProps.isUrl ||
                        !menuItemProps.path ||
                        pathname === menuItemProps.path
                    ) {
                        return defaultDom;
                    }
                    return <Link to={menuItemProps.path}>{defaultDom}</Link>;
                }}
                rightContentRender={() => (
                    <div>
                        <Avatar shape="square" size="small" icon={<UserOutlined/>}/>
                    </div>
                )}
                {...settings}
            >
                <PageContainer
                    header={{
                        title: ''
                    }}
                    style={{margin: '0'}}
                    content={content}
                >
                </PageContainer>
            </ProLayout>
            <SettingDrawer
                pathname={pathname}
                getContainer={() => document.getElementById('test-pro-layout')}
                settings={settings}
                onSettingChange={(changeSetting) => {
                    setSetting(changeSetting);
                }}
                disableUrlParams
            />
        </div>
    )
}

export default Home
