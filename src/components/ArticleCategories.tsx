import React, { useState } from 'react'
import useCategoryList from '../hooks/useCategoryList'
import Loading from './Loading'
import { Box, Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { Add, Delete, Edit } from '@mui/icons-material'
import CategoryDialog from './CategoryDialog'
import { FormProvider, useForm } from 'react-hook-form'
import { CategoryFormValues, CategorySchema } from '../validation/CategorySchema'
import { zodResolver } from '@hookform/resolvers/zod'

const ArticleCategories = () => {
    const {category,c_load} = useCategoryList()
    const [key,setKey] = useState<string>("")
    const [load,setLoad] = useState<boolean>(false)
    const [open,setOpen] = useState<boolean>(false)
    const [editId,setEditId] = useState<string | null>(null)
    const defaultValues = {
        name:"",
        code:""
    }
    const methods = useForm<CategoryFormValues>({
        mode:"onBlur",
        resolver:zodResolver(CategorySchema),
        defaultValues
    })
    const filteredCategory = category.filter((item) => {
        const name = item.name.includes(key)
        const code = item.code.includes(key)
        return name || code
    })
    const sortedCategoryList = [...filteredCategory].sort((a,b) => {
        return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
    })
    const handleDelete = async (id:string) => {
        const ok = window.confirm("カテゴリを削除してもよろしいでしょうか？")
        if(ok){
            try{
                setLoad(true)
                const response = await fetch(`http://localhost:2003/categories/${id}`,{
                    method:"DELETE",
                })
                await new Promise((resolve) => setTimeout(resolve,500));
    
                if(!response.ok){
                    throw new Error("カテゴリリストの削除に失敗しました。")
                }
                window.location.reload()
            } catch(error){
                console.error(error)
                setLoad(false)
            } finally {
                setLoad(false)
            }
            window.location.reload()
        }
        

    }
    if(c_load || load){
        return (
            <Loading />
        )
    }
    const handleCreate = () => {
        setEditId(null)
        setOpen(true)
        methods.reset(defaultValues)

    }
    const handleEdit = (id:string) => {
        setEditId(id)
        setOpen(true)
        const target = category.find((item) => {
            return item.id === id
        })
        methods.reset({
            name:target?.name,
            code:target?.code
        })

    }
    const onSubmit = async (data:CategoryFormValues) => {
        const isEditId = editId != null
        const url = isEditId ? 
        `http://localhost:2003/categories/${editId}`:
        "http://localhost:2003/categories"
        const body = isEditId ? {
            ...data,
            updatedAt:new Date().toLocaleDateString("ja-JP")
        } : {
            id:crypto.randomUUID(),
            ...data,
            createdAt:new Date().toLocaleDateString("ja-JP")
        }
        try {
            setLoad(true)
            const response = await fetch(url,{
                method:isEditId ? "PATCH" :"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(body)
            })
            if(!response.ok){
                throw new Error("カテゴリのPOSTに失敗しました")
            }
            window.location.reload()
        } catch(error){
            console.error(error)
            setLoad(false)
        } finally {
            setLoad(false)
        }
        

    }
  return (
    <FormProvider {...methods}>
    <Box
    id='category-form'
    component={"form"} onSubmit={methods.handleSubmit(onSubmit)}
    >
        <Box
        sx={{
            display:"flex",
            alignItems:"center",
            justifyContent:"space-between"
        }}
        >
            <Box>
            <Typography sx={{
                fontWeight:700
            }} variant='h4'>カテゴリ管理</Typography>
            <Typography sx={{mt:2}} component={"p"}>記事に紐図くカテゴリを管理します</Typography>
            </Box>
            <Button
            variant='contained'
            size='medium'
            onClick={() => handleCreate()}
            ><Add />
            カテゴリを追加
            </Button>
        </Box>

        <Stack spacing={3} sx={{mt:3}}>
        <Paper
        elevation={3}
        sx={{
            mt:3,
            p:2,
            display:"flex",
            gap:3,
            justifyContent:"left",
            alignItems:"center"
        }}
        >
            <TextField　sx={{width:300}} value={key} onChange={(e) => setKey(e.target.value)} label="カテゴリ名・カテゴリコードで検索" />
            <Button onClick={() => setKey("")} variant='outlined' size='medium'>クリア</Button>
        </Paper>

        <Paper sx={{
            p:3,
        }} elevation={3}>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>名称</strong></TableCell>
                        <TableCell><strong>コード</strong></TableCell>
                        <TableCell><strong>更新日時</strong></TableCell>
                        <TableCell><strong>操作</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        sortedCategoryList.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.code}</TableCell>
                        <TableCell>{item.updatedAt ? item.updatedAt : item.createdAt}</TableCell>
                        <TableCell>
                            <IconButton onClick={() => handleEdit(item.id)} color='primary'>
                                <Edit />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(item.id)} color='error'>
                                <Delete />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Paper>
        </Stack>
        <CategoryDialog editId={editId} open={open} setOpen={setOpen} />
    </Box>
    </FormProvider>
  )
}

export default ArticleCategories