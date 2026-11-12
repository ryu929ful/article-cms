"use client"
import ArticleEdit from '@/src/components/ArticleEdit'
import { Suspense } from 'react'

const page = () => {
  return (
    <Suspense>
        <ArticleEdit />
    </Suspense>
  )
}

export default page