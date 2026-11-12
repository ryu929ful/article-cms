"use client"
import MediaUploadForm from './MediaUploadForm'
import { FormProvider, useForm } from 'react-hook-form'
import { mediaFormSchema, MediaFormValues } from '@/src/validation/MediaSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Typography } from '@mui/material'
import CreateMedia from '@/src/lib/crud/Media/CreateMedia'
import { useState } from 'react'
import Loading from '@/src/components/Loading'

const MediaCreate = () => {
    const [load,setLoad] = useState<boolean>(false)
    const methods = useForm<MediaFormValues>({
        mode:"onBlur",
        resolver:zodResolver(mediaFormSchema),
        defaultValues:{
            file:undefined
        }
    })
    const onSubmit = (data:MediaFormValues) => {
        if(!(data.file instanceof File)){
            console.error("画像が登録されていません")
            return
        }

        const reader = new FileReader()
        reader.onload = async () => {
            const base64 = reader.result

            if(typeof base64 !== "string") return
            try{
                setLoad(true)
                await CreateMedia({
                    fileName: data.file.name,
                    url: base64,
                    mimeType: data.file.type,
                    size: data.file.size,
                    createdAt: new Date().toLocaleDateString("ja-JP"),
                })
                await new Promise((resolve) => setTimeout(resolve,500))
                console.log("登録完了")
                methods.reset()

            } catch(err){
                setLoad(false)
                console.error(err)
            } finally {
                setLoad(false)
            }
        }
        reader.readAsDataURL(data.file)
    }
    if(load){
        return (
            <Loading />
        )
    }
  return (
    <FormProvider {...methods}>
        <Box sx={{
            p:3
        }}>
        <Typography variant='h4' sx={{fontWeight:700}}>
            画像新規登録
        </Typography>
        <Typography sx={{mt:3}}>画像を新規登録できます</Typography>
        <Box sx={{mt:3}} id='media-form' component={"form"} onSubmit={methods.handleSubmit(onSubmit, (errors) => {
    console.log("バリデーションエラー:", errors)
  })}>
        <MediaUploadForm />
        <Button sx={{mt:3}} size='medium' variant='contained' form="media-form" type='submit'>
            画像を登録する
        </Button>
        </Box>
        </Box>
    </FormProvider>
  )
}

export default MediaCreate