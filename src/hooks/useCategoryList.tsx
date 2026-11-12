import { useEffect, useState } from "react"
import { Category } from "../types/CategoryTypes"
const useCategoryList = () => {
    const [category,setCategory] = useState<Category[]>([]);
    const [c_load,setC_load] = useState<boolean>(false)

    useEffect(() => {
        let active = true
        const fetchCategoryList = async () => {
            try{
                if(active){
                    setC_load(true)
                }
                console.log("カテゴリリスト取得")
                const response = await fetch("https://news-studio-api.onrender.com/categories")
                await new Promise((resolve) => setTimeout(resolve,2000))
                if(!response.ok){
                    throw new Error("カテゴリリストの読み込みに失敗しました")
                }
                const data = await response.json()
                setCategory(data)
        
            } catch(error){
                console.error(error)
                if(active){
                    setC_load(false)
                }
            } finally {
                if(active){
                    setC_load(false)
                }
            }
        }
        void fetchCategoryList();
        (() => {
            return active = false
        })
    },[])
  return {category,c_load}
}

export default useCategoryList