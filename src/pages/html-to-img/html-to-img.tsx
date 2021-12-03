import React, {Component} from 'react';
import {Button, Space} from "antd";
import JsBarcode from 'jsbarcode'
import html2canvas from 'html2canvas'
import './html-to-img.less'
import {downLoadFile} from "../../utils/utils";

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
        downLoadFile(code, url)
    }
    // 打包下载条形码
    handleDownloadPack = async () => {
        const {code} = this.state
        const pageData = await this.htmlToCanvas()
        downLoadFile([code], [pageData], '集包码')
    }

    render() {
        return (
            <div className="container">
                <div className="tips">通过Html2canvas截取内容将其生成为canvas，然后下载</div>
                <Space style={{marginLeft: 10}}>
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
                    <img id="barcode" className="barcode" alt="条形码" ref={this.barcode} style={{display: 'block'}}/>
                </div>

            </div>
        )
    }
}
