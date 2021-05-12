import React, {useEffect, useRef, useState} from 'react';
import {Tabs,Progress} from "antd";
import './my-progress.less'
const { TabPane } = Tabs;


export default function MyProgress () {
    // const [type,setType] = useState('line')
    // const [percent,setPercent] = useState(0) // 百分比
    // const [strokeWidth,setStrokeWidth] = useState(6) // 圆形进度条线的宽度，单位是进度条画布宽度的百分比 就是里面圆的宽度
    // const [width,setWidth] = useState(132) // 圆形进度条画布宽度，单位 px 就是外面圆的大小

    useEffect(()=>{
        const myCanvas = document.getElementById('myCanvas')
        const ctx = myCanvas.getContext('2d')
        // 绘制圆
        ctx.beginPath()
        ctx.arc(66,66,66,0,2*Math.PI)
        ctx.strokeStyle = '#f5f5f5'
        ctx.fillStyle = '#f5f5f5'
        ctx.fill();
        //绘制圆弧
        ctx.beginPath()
        // 为了使起始点在12点钟方向，起始点要设置为-0.5个PI度数，每次旋转的度数都要减去0.5个PI的度数
        ctx.arc(66,66,55,-0.5*Math.PI,(2*0.2-0.5)*Math.PI)
        ctx.lineWidth = 6
        ctx.lineCap = 'round'
        ctx.strokeStyle = '#1890ff'
        ctx.stroke();
        // 绘制文字
        ctx.beginPath()
        ctx.font="30px Arial";
        ctx.fillStyle = '#333333'
        ctx.fillText("20%",40,75);

    })

    return (
        <Tabs defaultActiveKey="3"className="my-progress">
            <TabPane tab="antd" key="1">
                <Progress
                    type="circle"
                    percent={0}
                    strokeWidth={6}
                    width={132}
                />
            </TabPane>
            <TabPane tab="svg" key="2">
                <svg xmlns="http://www.w3.org/2000/svg" className="svg-progress">
                    <circle className="svg-progress-circle1" cx="66" cy="66" r="66" />
                    <circle className="svg-progress-circle2" cx="66" cy="66" r="55"/>
                    <text x="30%" y="60%" className="svg-progress-text">20%</text>
                </svg>
            </TabPane>
            <TabPane tab="canvas" key="3">
                <canvas id="myCanvas" width="132" height="132" className="myCanvas"/>
            </TabPane>
        </Tabs>
    )
}

