import { Media } from "@/src/types/MediaTypes"

const fetchMediaList = async () => {
    const response = await fetch("https://news-studio-api.onrender.com/media")
    await new Promise((resolve) => setTimeout(resolve,2000))
    if(!response.ok){
        throw new Error("メディア一覧の取得に失敗しました")
    }
    const data:Media[] = await response.json()

  return data
}

export default fetchMediaList