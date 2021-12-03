import React, {Component} from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import wxLogin from "./wx-login.md";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

class WxLogin extends Component {

    state = {
        loginText:''
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
        const result = await fetch(wxLogin)
        const loginText = await result.text()
        this.setState({loginText})
    }

    render() {
        return (
            <ReactMarkdown remarkPlugins={[remarkGfm]} children={this.state.loginText} components={this.components}/>
        );
    }
}

export default WxLogin;
