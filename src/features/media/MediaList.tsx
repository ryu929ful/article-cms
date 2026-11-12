"use client"
import Loading from "@/src/components/Loading"
import fetchMediaList from "@/src/lib/crud/Media/fetchMediaList"
import { Media } from "@/src/types/MediaTypes"
import { Alert, Box, Button, Grid, Typography } from "@mui/material"
import useSWR from "swr"
import MediaCard from "./MediaCard"
import { useRouter } from "next/navigation"
import { useState } from "react"

const MediaList = () => {
    const router = useRouter()
    const [laod,setLoad] = useState<boolean>(false)

    const {
        data = [],
        error,
        isLoading,
    } = useSWR<Media[]>("/media",fetchMediaList)
    if(error){
        return <Alert severity="error">メディア取得エラー</Alert>
    }
    if(isLoading){
        return (
            <Loading />
        )
    }
    const sortedMediaList = [...data].sort((a,b) => {
        return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
    })
    const handleDelete = async (id:string) => {
        const ok = window.confirm("選択した画像を削除してもよろしいでしょうか？")
        if(ok)
        try{
            setLoad(true)
            const response = await fetch(`http://localhost:2003/media/${id}`,{
                method:"DELETE"
            })
            await new Promise((resolve) => setTimeout(resolve,500))
            if(!response.ok){
                throw new Error("画像を削除できませんでした")
            }
            window.location.reload()
        } catch(err){
            setLoad(false)
            console.error(err)
        } finally{
            setLoad(false)
        }
    }
    if(laod){
        return (
            <Loading />
        )
    }
  return (
    <Box>
        <Box
        sx={{
            p:3,
        }}
        >
            <Box sx={{
                display:"flex",
                alignItems:"center",
                justifyContent:"space-between"
            }}>
            <Typography variant="h6" sx={{fontWeight:700,mb:3}}>
                メディア管理
            </Typography>
            <Button onClick={() => router.push("/media/new")} size="medium" variant="contained">
                画像登録
            </Button>
    
            </Box>
            <Typography>
                取得件数:{data.length}件
            </Typography>
            <Box sx={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center"
            }}>
                <Box
                sx={{
                    maxWidth:1000
                }}
                >
                {
                    data.length === 0 ? (
                        <Typography color="text.secondary">
                            メディアが登録されていません
                        </Typography>
                    ):(
                        <Grid container spacing={2} sx={{mt:2}}>
                            {sortedMediaList.map((media) => (
                                <Grid key={media.id} size={{xs:12,sm:6,md:4}}>
                                    <MediaCard media={media} />
                                    <Button sx={{mt:3}} color="error" variant="outlined" onClick={() => handleDelete(media.id)}>削除</Button>
                                </Grid>
                                
                            ))}
                        </Grid>
                    )
                }
                </Box>
            </Box>
    
        </Box>
    </Box>
      )
}

export default MediaList