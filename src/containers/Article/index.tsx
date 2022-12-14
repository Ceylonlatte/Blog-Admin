import { deleteArticle, fetchArticleList } from '@/api'
import {
  CREATE_ARTICLE_TITLE,
  CREATE_ARTICLE_URL,
  DELETE_BTN_TEXT,
  EDIT_BTN_TEXT,
} from '@/constant'
import { ArticleListItem, ArticleListResponseData } from '@/types'
import { Button, message, Space, Table } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './index.module.less'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const Article: React.FC = () => {
  interface TableParams {
    pagination?: TablePaginationConfig
  }

  const navigate = useNavigate()
  const [data, setData] = useState<ArticleListResponseData['data'] | []>([])
  const [loading, setLoading] = useState(false)
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  })
  const columns: ColumnsType<ArticleListItem> = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (_, record) => <a onClick={() => linkDetailPage(record)}>{record.title}</a>,
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
    },
    {
      title: 'UpdatedAt',
      dataIndex: 'updatedAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            icon={<DeleteOutlined />}
            shape='round'
            size='small'
            onClick={() => {
              onDeleteArticle(record.id)
            }}
          >
            {DELETE_BTN_TEXT}
          </Button>

          <Button
            type='primary'
            shape='round'
            icon={<EditOutlined />}
            size='small'
            onClick={() => {
              onEditArticle(record)
            }}
          >
            {EDIT_BTN_TEXT}
          </Button>
        </Space>
      ),
    },
  ]

  const linkDetailPage = (record) => {
    navigate(`/article/${record.id}`)
  }

  const fetchArticleData = async () => {
    setLoading(true)
    try {
      const res = await fetchArticleList({
        page: tableParams.pagination.current,
        pageSize: tableParams.pagination.pageSize,
      })
      const { meta, data } = res
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: meta.total,
        },
      })
      setData(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      pagination,
    })
  }

  const onCreateArticle = () => {
    navigate(CREATE_ARTICLE_URL)
  }

  const onEditArticle = (record) => {
    linkDetailPage(record)
  }

  const onDeleteArticle = async (articleId) => {
    try {
      await deleteArticle(articleId)
      message.success('????????????')
      fetchArticleData()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchArticleData()
  }, [JSON.stringify(tableParams)])

  return (
    <div className={style.article}>
      <div className={style.header}>
        <Button onClick={onCreateArticle} type='primary'>
          {CREATE_ARTICLE_TITLE}
        </Button>
      </div>
      <Table
        onChange={handleTableChange}
        rowKey={'id'}
        loading={loading}
        size='small'
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
      />
    </div>
  )
}

export default Article
