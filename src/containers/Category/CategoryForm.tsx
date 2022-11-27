import { createCategory as createCategoryApi, updateCategory as updateCategoryApi } from '@/api'
import { EDIT_STATUS } from '@/constant'
import { CategoryListResponseData } from '@/types'
import { Col, Form, Input, message, Modal, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { StatusDataType } from '.'

interface CategortDrawerProps {
  open: boolean
  setOpen: (open: CategortDrawerProps['open']) => void
  statusData: StatusDataType
  category: CategoryListResponseData
  onReload: () => Promise<void>
}
const CategortForm: React.FC<CategortDrawerProps> = ({
  open,
  setOpen,
  statusData,
  category,
  onReload,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const onClose = () => {
    setOpen(false)
  }

  const [form] = Form.useForm()

  const updateCategory = async (value, id) => {
    try {
      const { title } = value
      await updateCategoryApi(title, id)
      setConfirmLoading(false)
      onClose()
      message.success('修改成功')
      onReload()
      form.resetFields()
    } catch (error) {
      console.log(error)
    }
  }

  const createCategory = async (value) => {
    try {
      await createCategoryApi(value)
      setConfirmLoading(false)
      onClose()
      message.success('创建成功')
      onReload()
      form.resetFields()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    form.setFieldValue('title', category.title)
  }, [category])

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const { status } = statusData
        setConfirmLoading(true)
        if (status === EDIT_STATUS) {
          updateCategory(values, category.id)
        } else {
          createCategory(values)
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }
  return (
    <>
      <Modal
        open={open}
        title={statusData.title}
        okText='Submit'
        cancelText='Cancel'
        confirmLoading={confirmLoading}
        onCancel={onClose}
        onOk={onSubmit}
      >
        <Form form={form} layout='vertical'>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='title'
                label='category name'
                rules={[
                  {
                    required: true,
                    message: 'please enter category name',
                  },
                ]}
              >
                <Input placeholder='please enter category name' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default CategortForm
