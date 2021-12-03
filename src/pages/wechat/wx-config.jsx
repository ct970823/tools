import React, {Component} from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {prism} from 'react-syntax-highlighter/dist/esm/styles/prism'
import wxConfig from './config.md'

class WxConfig extends Component {

    state = {
        config:''
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
        const result = await fetch(wxConfig)
        const config = await result.text()
        this.setState({config})
    }

    render() {
        return (
           <ReactMarkdown remarkPlugins={[remarkGfm]} children={this.state.config} components={this.components}/>
        );
    }
}

export default WxConfig;
