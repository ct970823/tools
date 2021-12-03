import React, { Component } from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import WxPay from "./wx-pay.md";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default class wxPay extends Component {

	state = {
		payText:''
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
		const result = await fetch(WxPay)
		const payText = await result.text()
		this.setState({payText})
	}

	render() {
		return (
			<ReactMarkdown remarkPlugins={[remarkGfm]} children={this.state.payText} components={this.components}/>
		);
	}
}
