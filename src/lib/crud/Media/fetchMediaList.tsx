import { Media } from "@/src/types/MediaTypes"

const fetchMediaList = async () => {
    const response = await fetch("http://localhost:2003/media")
    await new Promise((resolve) => setTimeout(resolve,2000))
    if(!response.ok){
        throw new Error("メディア一覧の取得に失敗しました")
    }
    const data:Media[] = await response.json()

  return data
}

export default fetchMediaList