import React, { useEffect, useState } from 'react'
import { Col, Form, Input, Row, Select } from 'antd'
import RichEditor from './RichEditor'
import { fetchCategoryList } from '@/api'
import { CategoryListResponseData } from '@/types'
import style from './ArticleForm.module.less'
import { FormInstance, FormItemProps } from 'antd/es/form'

const ArticleForm: React.FC<{
  form: FormInstance<any>
}> = ({ form }) => {
  const [options, setOptions] = useState<CategoryListResponseData[]>([])
  const fetchCategoryData = async () => {
    const res = await fetchCategoryList()
    setOptions(res)
  }

  useEffect(() => {
    fetchCategoryData()
  }, [])

  return (
    <>
      <div className={style.form}>
        <Form form={form} layout='inline'>
          <Row className={style.cutoumRow}>
            <Col flex={2}>
              <Form.Item
                className={style.title}
                label='TITLE'
                name='title'
                rules={[{ required: true, message: 'Please input title!' }]}
              >
                <Input placeholder='input title' />
              </Form.Item>
            </Col>
            <Col flex={3}>
              <Form.Item
                label='CATEGORY'
                name='categoryId'
                rules={[{ required: true, message: 'Please selected category!' }]}
              >
                <Select fieldNames={{ label: 'title', value: 'id' }} options={options} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            style={{ width: '100%' }}
            name='content'
            rules={[{ required: true, message: 'Please input content!' }]}
          >
            <RichEditor value='123' />
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default ArticleForm
