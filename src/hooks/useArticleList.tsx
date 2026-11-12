"use client"
import { useEffect, useState } from 'react'
import { Article } from '../types/ArticleTypes'

const useArticleList = () => {
    const [a_load,setA_load] = useState<boolean>(false)
    const [article,setArticle] = useState<Article[]>([])
    useEffect(() => {
        let active = true
        const fetchArticleList = async () => {
            try{
                console.log("記事一覧API取得開始")
                setA_load(true)
                const response = await fetch("https://news-studio-api.onrender.com/articles")
                await new Promise((resolve) => setTimeout(resolve,2000))
                if(!response.ok){
                    throw new Error("記事一覧を取得できませんでした")
                }
                const data = await response.json()
                setArticle(data)
                console.log("記事一覧API取得完了")
            } catch(err){
                if(active){
                    setA_load(false)
                    console.error(err)
                }
            } finally{
                if(active){
                    setA_load(false)
                }
            }

        }
        void fetchArticleList()
        return () => {
            active = false
        }
    },[])
  return {article,a_load}
}

export default useArticleList