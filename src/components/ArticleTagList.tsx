import { Add, Delete, Edit } from '@mui/icons-material'
import { Box, Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import useTagList from '../hooks/useTagList'
import Loading from './Loading'
import { FormProvider, useForm } from 'react-hook-form'
import { TagFormValues, TagSchema } from '../validation/TagSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import TagDialog from './TagDialog'
import type { Tag } from '../types/TagTypes'

const ArticleTagList = () => {
    const [key,setKey] = useState<string>("")
    const {t_load,tag} = useTagList()
    const [load,setLoad] = useState<boolean>(false)
    const [open,setOpen] = useState<boolean>(false)
    const [editId,setEditId] = useState<string | null>(null)

    const handleEdit = (id:string) => {
    const target = tag.find((item) => {
        return item.id === id
    })
    console.log(target)
    if(!target) return
    methods.reset({
        name:target.name,
        code:target.code
    })
        setEditId(id)
        setOpen(true)
    }
    const handleCreate = () => {
        setEditId(null)
        setOpen(true)
        methods.reset({
            name:"",
            code:""
        })
    }
    const handleDelete = async (id:string) => {
        const ok = window.confirm("タグを削除してもよろしいでしょうか？")
        if(ok){
            try{
                setLoad(true)
                const response = await fetch(`http://localhost:2003/tags/${id}`,{
                    method:"DELETE"
                })
                new Promise((resolve) => setTimeout(resolve,500))
                if(!response.ok){
                    throw new Error("タグの削除に失敗しました")
                }
                window.location.reload()
    
            } catch(err){
                console.error(err)
                setLoad(false)
            } finally {
                setLoad(false)
    
            }
            window.location.reload()
        }
    }
    const isEditId = editId != null

    const filteredtagList:Tag[] = tag.filter((item) => {
        const name = item.name.includes(key)
        const code = item.code.includes(key)
        return name || code
    })
    const sortedTagList = [...filteredtagList].sort((a,b) => {
        return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
    })
    const defaultValues = {
        name:"",
        code:""
    }
    const methods = useForm<TagFormValues>({
        mode:"onBlur",
        resolver:zodResolver(TagSchema),
        defaultValues
    })
    const onSubmit = async (data:TagFormValues) => {
        const url = isEditId ? 
        `http://localhost:2003/tags/${editId}`
        :"http://localhost:2003/tags"
        const body = isEditId ? {
            ...data,
            updatedAt:new Date().toLocaleDateString("ja-JP")
        } :{
            id:crypto.randomUUID(),
            ...data,
            upDatedAt:null,
            createdAt:new Date().toLocaleDateString("ja-JP")
        }
        try {
            setLoad(true)
            const response = await fetch(url,{
                method:isEditId ? "PATCH" : "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(body)
            })
            if(!response.ok){
                throw new Error("タグの更新に失敗しました")
            }
            window.location.reload()

        } catch(err){
            console.error(err)
            setLoad(false)
        } finally {
            setLoad(false)
        }

    }
    if(t_load || load){
        return(
            <Loading />
        )
    }
  return (
    <FormProvider {...methods}>
    <Box sx={{p:3}} component={"form"} id='tag-form' onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={3}>
            <Box sx={{
                display:"flex",
                alignItems:"center",
                justifyContent:"space-between"
            }}>
                <Box>
                    <Typography variant='h4' sx={{fontWeight:700}}>タグ管理</Typography>
                    <Typography sx={{mt:2}} component={"p"}>記事に紐づくタグを管理します</Typography>
                </Box>
                <Button onClick={() => handleCreate()} variant='contained' size='medium'>
                    <Add />
                    タグを追加
                </Button>
            </Box>
            <Paper elevation={3} sx={{
                p:3,
                display:"flex",
                gap:3,
                alignItems:"center",
                justifyContent:"left"
            }}>
                <TextField
                label="タグ名・タグコードで検索"
                sx={{
                    width:300
                }}
                value={key}
                onChange={(e) => setKey(e.target.value)}
                />
                <Button variant='outlined' size='medium'>
                    クリア
                </Button>
            </Paper>
            <Paper elevation={3} sx={{p:3}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>名称</strong></TableCell>
                            <TableCell><strong>コード</strong></TableCell>
                            <TableCell><strong>更新日</strong></TableCell>
                            <TableCell><strong>操作</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            sortedTagList.map((item) => (
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
    </Box>
    <TagDialog open={open} setEditId={setEditId} setOpen={setOpen} isEditId={isEditId}/>
    </FormProvider>
  )
}

export default ArticleTagList