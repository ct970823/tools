/*
* 用来指定商品详情的富文本编辑器
* */
import React from 'react'
import BraftEditor from 'braft-editor'
import {Button, message} from 'antd'
// import {CopyToClipboard} from 'react-copy-to-clipboard'

import 'braft-editor/dist/index.css'
import './richTextEditor.less'
import 'braft-editor/dist/output.css'
const CopyToClipboard = require('react-copy-to-clipboard')
class RichTextEditor extends React.Component {
    state = {
        editorState: BraftEditor.createEditorState(null),
        htmlString:'',
        copied: false
    }

    // async componentDidMount () {
    //     // Assume here to get the editor content in html format from the server
    //     const htmlContent = await fetchEditorContent()
    //     // Use BraftEditor.createEditorState to convert html strings to editorState data needed by the editor
    //     this.setState({
    //         editorState: BraftEditor.createEditorState(htmlContent)
    //     })
    // }

    submitContent = async () => {
        // Pressing ctrl + s when the editor has focus will execute this method
        // Before the editor content is submitted to the server, you can directly call editorState.toHTML () to get the HTML content
        // const htmlContent = this.state.editorState.toHTML()
        this.conversion()
        // const result = await saveEditorContent(htmlContent)
    }

    handleEditorChange = (editorState:any) => {
        this.setState({ editorState,copied:false })
    }

    conversion = () => {
        const htmlString = this.state.editorState.toHTML()
        this.setState({htmlString})
    }

    copyHtml = async () => {
        this.setState({copied: true})
            await message.success('复制成功')
    }

    render () {

        const { editorState,htmlString } = this.state

        return (
            <div className="richTextEditor">
                <Button type="primary" style={{marginRight:10}} onClick={this.conversion}>转HTML</Button>
                <CopyToClipboard text={htmlString} onCopy={this.copyHtml}>
                    <Button type="primary" >复制HTML</Button>
                </CopyToClipboard>

                <div className="richTextEditorBox">
                    <BraftEditor
                        value={editorState}
                        onChange={this.handleEditorChange}
                        onSave={this.submitContent}
                    />
                </div>
                {/*<div>{{htmlString}}</div>*/}
                {/*<div className="braft-output-content" dangerouslySetInnerHTML={{__html: htmlString}} />*/}
                {/*<Input value={htmlString}/>*/}

            </div>
        )

    }
}

export default RichTextEditor
