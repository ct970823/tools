import React, {Component} from 'react';
import { Collapse } from 'antd';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {prism} from 'react-syntax-highlighter/dist/esm/styles/prism'
import JumpMpHtmlCloud from './jump-mp-html-cloud.md'
import JumpMpHtmlJsapi from './jump-mp-html-jsapi.md'
import JumpMpVueJsapi from './jump-mp-vue-jsapi.md'
import JumpMpReactJsapi from './jump-mp-react-jsapi.md'
const { Panel } = Collapse;
export default class JumpMp extends Component {

    state = {
        htmlCloud:``,//纯HTML (使用云函数)
        htmlJsapi:'',// 纯HTML (使用jsapi)
        vueJsapi:'',// Vue (使用jsapi)
        reactJsapi:''// React (使用jsapi)
    }


    // 代码高亮
    components = {
        code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
                <SyntaxHighlighter style={prism} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
            ) : (
                <code className={className} {...props} />
            )
        }
    }


    async componentDidMount() {
        // 纯HTML (使用云函数)
        const result1 = await fetch(JumpMpHtmlCloud)
        const htmlCloud = await result1.text()
        // 纯HTML (使用jsapi)
        const result2 = await fetch(JumpMpHtmlJsapi)
        const htmlJsapi = await result2.text()
        // Vue (使用jsapi)
        const result3 = await fetch(JumpMpVueJsapi)
        const vueJsapi = await result3.text()
        // React (使用jsapi)
        const result4 = await fetch(JumpMpReactJsapi)
        const reactJsapi = await result4.text()
        this.setState({htmlCloud,htmlJsapi,vueJsapi,reactJsapi})
    }


    render() {
        const {htmlCloud,htmlJsapi,vueJsapi,reactJsapi} = this.state
        return (

            <Collapse >
                <Panel header="纯HTML (使用云函数)" key="1">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} children={htmlCloud} components={this.components}/>
                </Panel>
                <Panel header="纯HTML (使用jsapi)" key="2">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} children={htmlJsapi} components={this.components}/>
                </Panel>
                <Panel header="Vue (使用jsapi)" key="3">
                    <p>Vue的方式除了template的方式有所不同，其他与html形式一致</p>
                    <p>为了避免template标签冲突的问题，可使用<script type="text/wxtag-template"></script>进行代替，来包裹插槽模版和样式</p>
                    <p>开放标签属于自定义标签，Vue会给予未知标签的警告，可通过配置Vue.config.ignoredElements来忽略Vue对开放标签的检查。</p>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} children={vueJsapi} components={this.components}/>
                </Panel>
                <Panel header="React (使用jsapi)" key="4">
                    <p>React形式的与html形式并无区别，直接使用即可</p>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} children={reactJsapi} components={this.components}/>
                </Panel>
            </Collapse>
        )
    }
}
