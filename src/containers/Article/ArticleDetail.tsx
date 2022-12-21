import { fetchArticleDetail, updateArticle } from '@/api'
import { ARTICLE_LIST_URL } from '@/constant'
import { Button, Form, message } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import style from './ArticleDetail.module.less'
import ArticleForm from './ArticleForm'

const ArticleDeail: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onSumbit = async () => {
    try {
      const values = await form.validateFields()
      await updateArticle(params.id, values)
      message.success('更新成功')
      navigate(ARTICLE_LIST_URL)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDetail = async () => {
    try {
      const res = await fetchArticleDetail(params.id)
      form.setFieldsValue({
        title: res.title,
        content: res.content,
        categoryId: res.categoryId,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDetail()
  }, [])

  return (
    <div className={style.container}>
      <ArticleForm form={form} />
      <div className={style.bottom}>
        <Button onClick={onSumbit} type='primary'>
          提交
        </Button>
      </div>
    </div>
  )
}

export default ArticleDeail
