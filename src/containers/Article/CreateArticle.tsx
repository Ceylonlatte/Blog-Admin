import React, { useEffect, useState } from 'react'
import style from './crateArticle.module.less'
import { Button, Col, Form, Input, message, Row, Select } from 'antd'
import RichEditor from './RichEditor'
import { createArticle, fetchCategoryList } from '@/api'
import { CategoryListResponseData } from '@/types'
import { Navigate, useNavigate } from 'react-router-dom'
import { ARTICLE_LIST_URL } from '@/constant'
import ArticleForm from './ArticleForm'

const CreateArticle: React.FC = () => {
  const [options, setOptions] = useState<CategoryListResponseData[]>([])
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onSumbit = async () => {
    try {
      const values = await form.validateFields()
      await createArticle(values)
      message.success('添加成功')
      navigate(ARTICLE_LIST_URL)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCategoryData = async () => {
    const res = await fetchCategoryList()
    setOptions(res)
  }

  useEffect(() => {
    fetchCategoryData()
  }, [])

  return (
    <>
      <div className={style.crateArticle}>
        <ArticleForm form={form} />
        <div className={style.bottom}>
          <Button onClick={onSumbit} type='primary'>
            创建文章
          </Button>
        </div>
      </div>
    </>
  )
}

export default CreateArticle
