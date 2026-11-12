"use client"
import { Box, Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import {FormProvider, useForm} from "react-hook-form"
import { ArticleFormValues, ArticleSchema } from '../validation/ArticleSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import BasicForm from './BasicForm'
import SettingForm from './SettingForm'
import { Add, Edit } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import useArticleList from '../hooks/useArticleList'
import useCategoryList from '../hooks/useCategoryList'
import useTagList from '../hooks/useTagList'

type Props = {
    editId?:string | null,
    editFormValues?:ArticleFormValues
}

const ArticleCreate = ({editId,editFormValues}:Props) => {
    const isEditId = editId != null
    console.log(isEditId)
    const {c_load} = useCategoryList()
    const {a_load} = useArticleList()
    const {t_load} = useTagList()
    const [load,setLoad] = useState<boolean>(false)
    const router = useRouter()
    const defaultValues:ArticleFormValues = {
            title: "",
            slug: "",
            summary: "",
            content: "",
            categoryCode: "",
            tagCodes: [""],
            status: "draft",
            author: "",
            publishAt:null,
            thumbnailUrl: ""
    }
    const methods = useForm<ArticleFormValues>({
        mode:"onBlur",
        resolver:zodResolver(ArticleSchema),
        defaultValues
    })
    useEffect(() => {
        if(isEditId&&editFormValues){
            methods.reset(editFormValues)
        }
    },[isEditId,editFormValues,methods.reset])
    const onSubmit = async (data:ArticleFormValues) => {
        const body = isEditId ? {
            ...data,
            updatedAt:new Date().toLocaleString("ja-JP")
        } : {
            id:crypto.randomUUID(),
            ...data,
            createdAt:new Date().toLocaleDateString("ja-JP"),
            updatedAt:new Date().toLocaleString("ja-JP")
        }
        const url = isEditId ? `https://news-studio-api.onrender.com/articles/${editId}` : "https://news-studio-api.onrender.com/articles"

        try{
            setLoad(true)
            const response = await fetch(url,{
                method:isEditId ? "PATCH":"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(body)
            })
            await new Promise((resolve) => setTimeout(resolve,500))
            if(!response.ok){
                throw new Error("記事登録に失敗しました")
            }
            router.push("/articles")
        } catch(error){
            setLoad(false)
            console.error(error)
        } finally {
            setLoad(false)
        }
    }
    if(load || a_load || c_load || t_load){
        return(
            <Loading />
        )
    }
  return (
    <FormProvider {...methods}>
    <Box component={"form"} onSubmit={methods.handleSubmit(onSubmit)} >
        <Box sx={{
            display:"flex",
            alignItems:"center",
            justifyContent:"space-between"
        }}>
        <Box>
            <Typography variant='h4' sx={{fontWeight:700}}>
                {isEditId ? ("記事編集"):("新規記事作成")}
            </Typography>
            <Typography component={"p"}>記事本文・分類・公開状態を設定します</Typography>
        </Box>
        <Button onClick={() => router.push("/articles")} size='medium' variant='outlined'>一覧へ戻る</Button>
        </Box>
        <Stack spacing={2} direction="row" sx={{mt:3}}>
            <BasicForm />
            <SettingForm />
        </Stack>
        <Box sx={{
            display:"flex",
            alignItems:"center",
            justifyContent:"right",
            gap:2,
            mt:3

        }}>
            <Button variant='outlined' onClick={() => router.push("/articles")}>キャンセル</Button>
            <Button variant='contained' type='submit' startIcon={isEditId ? <Edit /> :<Add />}>{isEditId?("変更（EDIT）"):("記事を登録（POST）")}</Button>
        </Box>
    </Box>
    </FormProvider>
  )
}

export default ArticleCreate