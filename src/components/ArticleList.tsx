"use client"
import { Add, Delete, Edit, Preview, Reviews } from '@mui/icons-material'
import { Box, Button, IconButton, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import useArticleList from '../hooks/useArticleList'
import Loading from './Loading'
import { useRouter } from 'next/navigation'
import useCategoryList from '../hooks/useCategoryList'

const ArticleList = () => {
    const {article,a_load} = useArticleList()
    const [key,setKey] = useState<string>("")
    const [status,setStatus] = useState<string>("")
    const {category} = useCategoryList()
    const [categoryInput,setCategoryInput] = useState<string>("")

    const onReset = () => {
        setKey("")
        setStatus("")
        setCategoryInput("")
        
    }
    const router = useRouter()
    const onDelete = async (id:string) => {
        const ok = window.confirm("商品を削除してもいいですか？")
        if(ok){
            try{
                const response = await fetch(`https://news-studio-api.onrender.com/categories/${id}`,{
                    method:"DELETE"
                })
                await new Promise((resolve) => setTimeout(resolve,500))
                if(!response.ok){
                    throw new Error("記事の削除に失敗しました")
                }
                window.location.reload()
            } catch(err) {
                console.error(err)
            }
            window.location.reload()
        }
    }
    const filteredArticleList = article.filter((item) => {
        const title = item.title.includes(key)
        const slug = item.slug.includes(key)
        const categoryKey = categoryInput === "" || item.categoryCode === categoryInput
        const statusKey = status === "" || item.status === status
        return (title || slug) && categoryKey && statusKey
    })
    const sortedArticles = [...article].sort(
    (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime()
)
    console.log(filteredArticleList)

    const articleNumber = article.length
    const publishedArticle = article.filter((item) => {
        return item.status === "published"
    }).length
    const reviewingArticle = article.filter((item) => {
        return item.status === "review"
    }).length
    const draftArticle = article.filter((item) => {
        return item.status === "draft"
    }).length

    if(a_load){
        return (
            <Loading />
        )
    }
  return (
    <Box>
        <Box sx={{
            display:"flex",
            alignItems:"center",
            justifyContent:"space-between"
        }}>
        <Box>
            <Typography variant='h4' sx={{fontWeight:700}}>
                記事一覧
            </Typography>
            <Typography component={"p"}>登録したニュース記事を検索・編集・管理できます</Typography>
        </Box>
        <Button onClick={() => router.push("/articles/new")} size='medium' variant='contained' startIcon={<Add />}>新規記事</Button>
        </Box>
        <Stack direction="row" spacing={2} sx={{
            flexWrap:"wrap",
            mt:3
        }}>
            <Paper 
            sx={
                { px: 3, py: 2, minWidth: 135, flex: 1 }
            }
             elevation={2}>
                <Typography>総記事</Typography>
                <Typography variant='h6' sx={{fontWeight:700}}>
                    {articleNumber}
                </Typography>
            </Paper>
            <Paper
                        sx={
                { px: 3, py: 2, minWidth: 135, flex: 1 }
            }
            elevation={2}>
                <Typography>公開中</Typography>
                <Typography variant='h6' sx={{fontWeight:700}}>
                    {publishedArticle}
                </Typography>
            </Paper>
            <Paper
                        sx={
                { px: 3, py: 2, minWidth: 135, flex: 1 }
            }
            elevation={2}>
                <Typography>確認待ち</Typography>
                <Typography variant='h6' sx={{fontWeight:700}}>
                    {reviewingArticle}
                </Typography>
            </Paper>
            <Paper
                        sx={
                { px: 3, py: 2, minWidth: 135, flex: 1 }
            }
            elevation={2}>
                <Typography>下書き</Typography>
                <Typography variant='h6' sx={{fontWeight:700}}>
                    {draftArticle}
                </Typography>
            </Paper>

        </Stack>
        <Paper elevation={2} sx={{p:3,mt:3}}>
        <Stack direction="row" spacing={2}>
            <TextField
            label="記事タイトル・スラッグ"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            sx={{
                flex:1,
            }} />
            <TextField
            label="カテゴリ"
            value={categoryInput}
            select
            onChange={(e) => setCategoryInput(e.target.value)}
            sx={{
                width:160
            }}>
                <MenuItem value="">選択してください</MenuItem>
                {
                    category.map((item) => (
                        <MenuItem key={item.id} value={item.code}>{item.name}</MenuItem>
                    ))
                }
            </TextField>
            <TextField
            label="公開状態"
            value={status}
            select
            onChange={(e) => setStatus(e.target.value)}
            sx={{
                width:160
            }}>
                
                <MenuItem value="">選択してください</MenuItem>
                <MenuItem value="published">公開済み</MenuItem>
                <MenuItem value="review">確認待ち</MenuItem>
                <MenuItem value="draft">下書き</MenuItem>
            </TextField>
            <Button onClick={onReset} variant='outlined' size='medium'>リセット</Button>
        </Stack>
        </Paper>
        <Paper elevation={3} sx={{mt:3}}>
        <Table>
            <TableHead sx={{
                background:"#f0f9fe"
            }}>
                <TableRow>
                    <TableCell>
                        <strong>記事タイトル</strong>
                    </TableCell>
                    <TableCell>
                        <strong>カテゴリ</strong>
                    </TableCell>
                    <TableCell>
                        <strong>公開状態</strong>
                    </TableCell>
                    <TableCell>
                        <strong>著者</strong>
                    </TableCell>
                    <TableCell>
                        <strong>更新日時</strong>
                    </TableCell>
                    <TableCell>
                        <strong>操作</strong>
                    </TableCell>
                </TableRow>

            </TableHead>
            <TableBody>
                {sortedArticles.map((item) => (
                <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{category.find((c) => {
                        return c.code === item.categoryCode
                    })?.name}</TableCell>
                    <TableCell>{item.status === "publish" ? ("公開済み"):
                        item.status === "review" ? ("確認待ち"):
                        ("下書き")
                        }</TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>{item.updatedAt}</TableCell>
                    <TableCell>
                        <IconButton onClick={() => router.push(`/articles/edit?id=${item.id}`)} color='primary'><Edit /></IconButton>
                        <IconButton onClick={() => router.push(`/articles/preview?id=${item.id}`)}><Preview /></IconButton>
                        <IconButton onClick={() => onDelete(item.id)} color='error'><Delete /></IconButton>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
        </Paper>
    </Box>
  )
}

export default ArticleList