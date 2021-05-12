import React from 'react';
import { Result, Button } from 'antd';
import {useHistory} from 'react-router-dom'
const NotFond = () => {
    const history = useHistory()
    function backHome () {
        history.replace('/')
    }
    return (
        <Result
            status="404"
            title="404"
            subTitle="抱歉，找不到该页面"
            extra={<Button type="primary" onClick={backHome}>回到首页</Button>}
        />
    )
}
export default NotFond
