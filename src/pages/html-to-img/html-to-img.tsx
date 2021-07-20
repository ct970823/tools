import React, {Component} from 'react';
import {Button, Input, Space} from "antd";
import JsBarcode from 'jsbarcode'
import JSZip from 'jszip'
import html2canvas from 'html2canvas'
import './html-to-img.less'
import {HexBase64BinaryEncoding} from "crypto";

export default class HtmlToImg extends Component {
    state = {
        code: 'JBD2021072009380001'
    }

    barcode: any = React.createRef()


    componentDidMount() {
        this.handleGenerate()
    }

    //生成条形码
    handleGenerate = () => {
        const {code} = this.state
        JsBarcode("#barcode", code, {
            fontOptions: "bold"
        });
    }

    // html转canvas
    htmlToCanvas: () => any = () => {
        return new Promise((resolve) => {
            const capture = document.querySelector("#capture")
            html2canvas(capture as HTMLElement).then(canvas => {
                resolve(canvas.toDataURL('image/png', 1.0))
            })
        })
    }

    //下载条形码
    handleDownload = async () => {
        const {code} = this.state
        // 将图片的src属性作为URL地址
        const url = await this.htmlToCanvas()
        const a = document.createElement('a')
        const event = new MouseEvent('click')
        a.download = code || '下载图片名称'
        a.href = url
        a.dispatchEvent(event) //根据A标签的属性来搞事情
    }
    // 打包下载条形码
    handleDownloadPack = async () => {
        const {code} = this.state
        const pageData = await this.htmlToCanvas()
        const zip = new JSZip()
        zip.file(`${code}.png`, pageData.split('data:image/png;base64,')[1], {
            base64: true
        });
        // 生成zip文件并下载
        zip.generateAsync({
            type: 'blob'
        }).then(function (content) {
            // 下载的文件名
            const filename = '条形码.zip';
            // 创建隐藏的可下载链接
            const eleLink = document.createElement('a');
            eleLink.download = filename;
            eleLink.style.display = 'none';
            // 下载内容转变成blob地址
            eleLink.href = URL.createObjectURL(content);
            // 触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            // 然后移除
            document.body.removeChild(eleLink);
        });
    }

    render() {
        return (
            <div className="container">
                <div className="tips">通过Html2canvas截取内容将其生成为canvas，然后下载</div>
                <Space>
                    <Button type='primary' onClick={this.handleDownload}>下载</Button>
                    <Button type='primary' onClick={this.handleDownloadPack}>打包下载</Button>
                </Space>
                <div className="pic" id="capture">
                    <div className="title">长兴城配物联</div>
                    <div className="line"/>
                    <div className="content">
                        <p>S16</p>
                        <p>水口镇</p>
                    </div>
                    <img id="barcode" alt="条形码" ref={this.barcode} style={{display: 'block'}}/>
                </div>

            </div>
        )
    }
}
