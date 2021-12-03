import React, {Component} from 'react';
import {Button, Input, Space} from "antd";
import JsBarcode from 'jsbarcode'
import {downLoadFile} from "../../utils/utils";

export default class jsBarcode extends Component {
    state = {
        code: ''
    }

    barcode: any = React.createRef()


    componentDidMount() {
        JsBarcode("#barcode", '123');
    }

    //生成条形码
    handleGenerate = () => {
        const {code} = this.state
        JsBarcode("#barcode", code);
    }
    //下载条形码
    handleDownload = () => {
        const {code} = this.state
        downLoadFile(code, this.barcode.current.src)
    }
    // 打包下载条形码
    handleDownloadPack = () => {
        const {code} = this.state
        downLoadFile([code], [this.barcode.current.src])
    }

    render() {
        const {code} = this.state
        return (
            <div>
                <Space>
                    <Input placeholder="请输入码的内容" value={code}
                           onChange={({target: {value}}) => this.setState({code: value})}/>
                    <Button type='primary' onClick={this.handleGenerate}>生成</Button>
                    <Button type='primary' onClick={this.handleDownload}>下载</Button>
                    <Button type='primary' onClick={this.handleDownloadPack}>打包下载</Button>
                </Space>
                <img id="barcode" alt="条形码" ref={this.barcode} style={{display: 'block'}}/>
            </div>
        )
    }
}
