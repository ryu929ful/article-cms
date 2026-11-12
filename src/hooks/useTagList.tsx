import { useEffect, useState } from 'react'
import type { Tag } from '../types/TagTypes'

const useTagList = () => {
    const [tag,setTag] = useState<Tag[]>([])
    const [t_load,setT_load] = useState<boolean>(false)
    useEffect(() => {
        let active = true
        const fetchTagList = async () => {
            try{
                if(active){
                    setT_load(true)
                }
                const response = await fetch("https://news-studio-api.onrender.com/tags")
                await new Promise((resolve) => setTimeout(resolve,2000))
                if(!response.ok){
                    throw new Error("タグリストを読み込むことができませんでした")
                }
                const data = await response.json()
                setTag(data)
            } catch(err){
                console.error(err)
                if(active){
                    setT_load(false)
                }
            } finally {
                if(active){
                    setT_load(false)
                }
            }

        }
        void fetchTagList();
        () => {
            return active = false
        }
    },[])
  return {tag,t_load}
}

export default useTagList