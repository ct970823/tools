import React, {Component} from 'react';
import {Button,Input,Space} from "antd";
import JsBarcode from 'jsbarcode'
import JSZip from 'jszip'

export default class jsBarcode extends Component {
    state = {
        code:''
    }

    barcode = React.createRef() as any


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
        // 将图片的src属性作为URL地址
        const url = this.barcode.current.src
        const a = document.createElement('a')
        const event = new MouseEvent('click')
        a.download = code || '下载图片名称'
        a.href = url
        a.dispatchEvent(event) //根据A标签的属性来搞事情
    }
    // 打包下载条形码
    handleDownloadPack = () => {
        const {code} = this.state
        const zip = new JSZip()
        for (let i = 1; i <= 10; i++) {
            zip.file(`${code}${i}.png`, this.barcode.current.src.split('data:image/png;base64,')[1], {
                base64: true
            });
        }
        // 生成zip文件并下载
        zip.generateAsync({
            type: 'blob'
        }).then(function(content) {
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
        const {code} = this.state
        return (
            <div>
                <Space>
                    <Input placeholder="请输入码的内容" value={code} onChange={({target:{value}})=>this.setState({code:value})}/>
                    <Button type='primary' onClick={this.handleGenerate}>生成</Button>
                    <Button type='primary' onClick={this.handleDownload}>下载</Button>
                    <Button type='primary' onClick={this.handleDownloadPack}>打包下载</Button>
                </Space>
                <img id="barcode" alt="条形码" ref={this.barcode} style={{display:'block'}}/>
            </div>
        )
    }
}
