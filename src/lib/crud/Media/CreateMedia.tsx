import { Media } from "@/src/types/MediaTypes"

type CreateMediaInput = Omit<Media,"id">

const CreateMedia = async (media:CreateMediaInput):Promise<Media> => {
    const response = await fetch("http://localhost:2003/media",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(media)
    })
    if(!response.ok){
        throw new Error("メディアの登録に失敗しました")
    }
  return response.json()
}

export default CreateMedia