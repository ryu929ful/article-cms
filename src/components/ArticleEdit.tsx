import { useSearchParams } from 'next/navigation'
import ArticleCreate from './ArticleCreate'
import useArticleList from '../hooks/useArticleList'
import { ArticleFormValues } from '../validation/ArticleSchema'

const ArticleEdit = () => {
    const param = useSearchParams()
    const id = param.get("id")
    console.log("この記事のid",id)
        const {article} = useArticleList()
        const editTarget = article.find((item) => {
        return item.id === id
    })
    if(!editTarget) return
    const status = editTarget.status
    const valiadStatus:ArticleFormValues["status"] = 
    status === "draft" ||
    status === "review" || 
    status === "published" ? status : "draft"
    if(!editTarget) return
    const editFormValues = {
        title: editTarget.title,
        slug: editTarget.slug,
        summary: editTarget.summary,
        content: editTarget.content,
        categoryCode: editTarget.categoryCode,
        tagCodes: editTarget.tagCodes,
        status: valiadStatus,
        author: editTarget.author,
        publishAt:editTarget.publishAt,
        thumbnailUrl: editTarget.thumbnailUrl
    }
  return (
    <ArticleCreate editId={id} editFormValues={editFormValues}/>
  )
}

export default ArticleEdit