import React from 'react'
import { useParams } from 'react-router-dom'
const ArticleDeail: React.FC = () => {
  const params = useParams()

  return <div>{params.id}</div>
}

export default ArticleDeail
