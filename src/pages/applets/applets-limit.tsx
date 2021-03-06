import React, {useState} from 'react'
import {Card, Form, Input, Button, Select} from 'antd';
import {appletsList,APPLETS} from './appletsUtils'
import {getAppletsLimit,getAccessToken,downloadPng} from "../../api";

// interface APPLETSLIMIT {
//     qrcodeName:string // 小程序码名字
//     path:string // 小程序码页面链接
//     applets:number // 小程序列表的下标
//     codeWidth:string // 小程序码的大小
// }


function AppletsLimit() {
    //定义状态
    const [loading, setLoading] = useState(false)
    // 提交
    const onFinish = async (values:APPLETS) => {
        const {qrcodeName, path, applets, codeWidth} = values
        const {appId, appSecret} = appletsList[applets]
        // 调用接口获取
        try {
            setLoading(true)
            const {access_token} = await getAccessToken(appId, appSecret)
            const  res = await getAppletsLimit(access_token, path, codeWidth)
            await downloadPng({
                buffer: res,
                qrcodeName,
                isQrcode: true
            })
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }

    };



    const Item = Form.Item
    const Option = Select.Option
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
    const tailLayout = {
        wrapperCol: {offset: 8, span: 16},
    };


    return (

        <Card title="生成小程序太阳码(有次数限制)" className="applets-card">

            <Form
                {...layout}
                initialValues={{remember: true}}
                onFinish={onFinish}
            >
                <Item
                    label="小程序"
                    name="applets"
                    rules={[{required: true, message: '请选择小程序!'}]}
                >
                    <Select placeholder="请选择小程序">
                        {
                            appletsList.map((item, index) => (
                                <Option value={index} key={index}>{item.name}</Option>
                            ))
                        }
                    </Select>
                </Item>

                <Item
                    label="太阳码名称"
                    name="qrcodeName"
                    rules={[{required: true, message: '请输入太阳码名称!'}]}
                >
                    <Input placeholder="请输入太阳码名称"/>
                </Item>

                <Item
                    label="页面路径"
                    name="path"
                    rules={[{required: true, message: '请输入页面路径!'}]}
                >
                    <Input placeholder="pages/shop/shop?id=2"/>
                </Item>
                <Item
                    label="太阳码宽度"
                    name="codeWidth"
                >
                    <Input type="number" placeholder="280-1280"/>
                </Item>

                <Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        生成
                    </Button>
                </Item>
            </Form>
        </Card>
    );
}

export default AppletsLimit
