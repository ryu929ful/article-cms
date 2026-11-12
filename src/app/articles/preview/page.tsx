"use client"
import PreviewPage from '@/src/components/PreviwePage'
import { Suspense } from 'react'

const page = () => {
  return (
    <Suspense>
        <PreviewPage />
    </Suspense>
  )
}

export default page