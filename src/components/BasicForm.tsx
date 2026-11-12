import { Controller, useFormContext } from "react-hook-form"
import { ArticleFormValues } from "../validation/ArticleSchema"
import { Box, Paper, Stack, TextField, Typography } from "@mui/material"

const BasicForm = () => {
    const {control,formState:{errors}} = useFormContext<ArticleFormValues>()
  return (
    <Paper elevation={3} sx={{p:3,flex:1}} >
        <Typography variant="h6" sx={{fontWeight:700,mb:3}}>
            基本情報
        </Typography>
        <Stack spacing={2}>
        <Controller
        control={control}
        name="title"
        render={({field}) => (
            <TextField 
            fullWidth
            {...field}
            error={!!errors.title}
            helperText={errors.title?.message}
            label="記事タイトル"
            />
        )}
        />
        <Controller
        control={control}
        name="slug"
        render={({field}) => (
            <TextField 
            fullWidth
            {...field}
            error={!!errors.slug}
            helperText={errors.slug?.message}
            label="スラッグ（例 : new-figure-release）"
            />
        )}
        />
        <Controller
        control={control}
        name="summary"
        render={({field}) => (
            <TextField 
            fullWidth
            multiline
            rows={3}
            {...field}
            error={!!errors.summary}
            helperText={errors.summary?.message}
            label="記事概要"
            />
        )}
        />
        </Stack>
        <Box sx={{
            borderTop:"1px solid #c5c5c5",
            mt:5,
            pt:3
        }}>
        <Typography variant="h6" sx={{fontWeight:700,mb:3}}>
            記事本文
        </Typography>
        <Controller
        control={control}
        name="content"
        render={({field}) => (
            <TextField 
            {...field}
            rows={5}
            fullWidth
            multiline
            error={!!errors.content}
            helperText={errors.content?.message}
            label="本文（プレーンテキスト）"
            />
        )}
        />
        </Box>
    </Paper>
  )
}

export default BasicForm