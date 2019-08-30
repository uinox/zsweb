import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/output.css'
import './Editor.less';

 class Editor extends React.Component {


    state = {
        editorState: BraftEditor.createEditorState(`<p>${this.props.placeholder}</p>`),
        outputHTML:'<p></p>',
    };

     handleChange = (editorState) => {
         this.setState({
             editorState:editorState,
             outputHTML:editorState.toHTML()
         });
         // console.log(this.state.outputHTML);
         this.props.handleEditor(this.state.outputHTML);
     };

    render () {

        const controls = [
            /*{
                key: 'bold', // 使用key来指定控件类型
                title: '加粗选中文字哦', // 自定义控件title
                text: 'B', // 使用自定义文案来代替默认图标(B)，此处也可传入jsx
            },*/
            'undo', 'redo', 'separator',
            'font-size', 'line-height', 'letter-spacing', 'separator',
            'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
            'superscript', 'subscript', 'remove-styles', 'emoji',  'separator', 'text-indent', 'text-align', 'separator',
            'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
            'link', 'separator', 'hr', 'separator',
            'media', 'separator',
            'clear'
        ];

        return (
            <div >
                <BraftEditor controls={controls} className="braft-output-content" dangerouslySetInnerHTML={{__html: this.state.editorState}} value={this.state.editorState} onChange={this.handleChange}/>
            </div>

        )
    }





}

export default Editor;