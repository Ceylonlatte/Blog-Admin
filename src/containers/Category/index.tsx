import { fetchCategoryList, deleteCategory } from '@/api'
import { CategoryListResponseData } from '@/types'
import React, { useEffect, useState } from 'react'
import style from './index.module.less'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, message, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import CategoryForm from './CategoryForm'
import { CREATE_CATEGORY_TITLE, ADD_STATUS_DATA, EDIT_STATUS_DATA } from '@/constant'

export interface StatusDataType {
  status: number
  title: string
}

const Category: React.FC = () => {
  const [initLoading, setInitLoading] = useState(true)
  const [list, setList] = useState<CategoryListResponseData[]>([])
  const [open, setOpen] = useState(false)
  const [statusData, setStatusData] = useState<StatusDataType>(ADD_STATUS_DATA)
  const [category, setCategory] = useState<CategoryListResponseData>({
    title: '',
    id: null,
  })

  const columns: ColumnsType<CategoryListResponseData> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '栏目名称',
      dataIndex: 'title',
      key: 'title',
      render: (title) => <a>{title}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <DeleteOutlined
            onClick={() => {
              onDelete(record.id)
            }}
          />
          <EditOutlined onClick={() => onEdit(record)} />
        </Space>
      ),
    },
  ]

  const fetchCategoryData = async () => {
    const res = await fetchCategoryList()
    setInitLoading(false)
    setList(res)
  }

  useEffect(() => {
    fetchCategoryData()
  }, [])

  const onDelete = async (id) => {
    try {
      await deleteCategory(id)
      message.success('删除成功')
      fetchCategoryData()
    } catch (error) {
      console.log(error)
    }
  }

  const onEdit = (record: React.SetStateAction<CategoryListResponseData>) => {
    setCategory(record)
    setStatusData(EDIT_STATUS_DATA)
    setOpen(true)
  }

  const onAddCategory = () => {
    setStatusData(ADD_STATUS_DATA)
    setOpen(true)
  }

  return (
    <>
      <div className={style.category}>
        <div className={style.categoryHeader}>
          <Button onClick={onAddCategory} type='primary'>
            {CREATE_CATEGORY_TITLE}
          </Button>
        </div>
        <Table
          rowKey={'id'}
          loading={initLoading}
          columns={columns}
          dataSource={list}
          size='small'
        />
      </div>
      <CategoryForm
        open={open}
        setOpen={setOpen}
        statusData={statusData}
        category={category}
        onReload={fetchCategoryData}
      />
    </>
  )
}

export default Category
