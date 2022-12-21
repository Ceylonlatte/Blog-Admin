import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useEffect, useState } from 'react'
import { message } from 'antd'

interface RichEditorProps {
  value?: string
  onChange?: (value: string) => void
  detailData?: { content: string; id: string; title: string }
}

const RichEditor: React.FC<RichEditorProps> = ({ value = '', onChange, detailData }) => {
  useEffect(() => {
    setHtml(value)
  }, [value])
  const triggerChange = (value: string) => {
    onChange?.(value)
  }

  const onEditChange = (editor) => {
    setHtml(editor.getHtml())

    triggerChange(editor.getHtml())
  }

  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  // 编辑器内容
  const [html, setHtml] = useState('')

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {},
  }

  type InsertFnType = (data: { url: string }) => void

  editorConfig.MENU_CONF['uploadImage'] = {
    server: `${process.env.REACT_APP_REQUEST_URL}/api/upload/uploadFile`,
    fieldName: 'file',
    // 自定义插入图片
    customInsert(res: any, insertFn: InsertFnType) {
      // TS 语法
      console.log(res)
      insertFn(res.data.url)
    },
    // 单个文件上传失败
    onFailed(file: File, res: any) {
      message.error(`${file.name} 上传失败`, res)
    },

    // 上传错误，或者触发 timeout 超时
    onError(file: File, err: any, res: any) {
      message.error(`${file.name} 上传出错`, err, res)
    },
  }
  return (
    <>
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode='default'
        style={{
          borderTop: '1px solid rgba(58, 53, 65, 0.12)',
          borderBottom: '1px solid rgba(58, 53, 65, 0.12)',
        }}
      />

      <Editor
        defaultConfig={editorConfig}
        value={html}
        onCreated={setEditor}
        onChange={onEditChange}
        mode='default'
        style={{ height: '500px', overflowY: 'hidden' }}
      />
    </>
  )
}

export default RichEditor
