
import { Controller, useFormContext } from 'react-hook-form'
import { ArticleFormValues } from '../validation/ArticleSchema'
import { Autocomplete, Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import dynamic  from 'next/dynamic'
import useCategoryList from '../hooks/useCategoryList'
import useTagList from '../hooks/useTagList'
import { useState } from 'react'
import  useSWR  from 'swr'
import fetchMediaList from '../lib/crud/Media/fetchMediaList'
import { Media } from '../types/MediaTypes'
import Loading from './Loading'

const ArticleDatePicker = dynamic(() => 
    import("./ArticleDatePicker"),
{ssr:false}
)

const SettingForm = () => {
    const {tag} = useTagList()

    const {category} = useCategoryList()

    const categories = category
    const tags = tag
    const {control,formState:{errors}} = useFormContext<ArticleFormValues>()
    const [open,setOpen] = useState<boolean>(false)
    const {data:medialist,isLoading,error} = useSWR<Media[]>(open ? "/media" : null,fetchMediaList)


    const handleClose = () => {
        setOpen(false)
    }
  return (
    <Paper elevation={3} sx={{p:3,flex:.5}}>
        <Typography variant="h6" sx={{fontWeight:700,mb:3}}>
            記事本文
        </Typography>
        <Stack spacing={3}>
            <Controller
            control={control}
            name='status'
            render={({field}) => (
                <TextField
                {...field}
                label="公開ステータス"
                select
                fullWidth
                error={!!errors.status}
                helperText={errors.status?.message}
                >
                    <MenuItem value="draft">下書き</MenuItem>
                    <MenuItem value="review">確認待ち</MenuItem>
                    <MenuItem value="published">公開中</MenuItem>
                </TextField>
            )}
            />
            <Controller
                control={control}
                name="author"
                render={({field}) => (
                    <TextField 
                    fullWidth
                    {...field}
                    error={!!errors.author}
                    helperText={errors.author?.message}
                    label="著者"
                    />
                )}
            />
            <ArticleDatePicker />
        </Stack>
        <Box sx={{
            borderTop:"1px solid #c5c5c5",
            mt:3,
            pt:3
        }}>
        <Typography variant="h6" sx={{fontWeight:700,mb:3}}>
            分類・メディア
        </Typography>
        <Stack spacing={3}>
            <Controller
            control={control}
            name="categoryCode"
            render={({ field, fieldState }) => (
                <Autocomplete
                options={categories}
                getOptionLabel={(option) => option.name}
                value={
                    categories.find(
                    (category) => category.code === field.value
                    ) ?? null
                }
                onChange={(_, newValue) => {
                    field.onChange(newValue?.code ?? "");
                }}
                isOptionEqualToValue={(option, value) =>
                    option.code === value.code
                }
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="カテゴリ"
                    placeholder="カテゴリを検索"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                    />
                )}
                />
            )}
            />
            <Controller
                control={control}
                name="tagCodes"
                render={({ field, fieldState }) => (
                    <Autocomplete
                    multiple
                    disableCloseOnSelect
                    options={tags}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) =>
                        option.code === value.code
                    }
                    value={tags.filter((tag) =>
                        (field.value ?? []).includes(tag.code)
                    )}
                    onChange={(_, newValue) => {
                        field.onChange(newValue.map((tag) => tag.code));
                    }}
                    renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;

                        return (
                        <li key={key} {...optionProps}>
                            <Checkbox
                            checked={selected}
                            sx={{ mr: 1 }}
                            />
                            {option.name}
                        </li>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="タグ"
                        placeholder="タグを検索"
                        onBlur={field.onBlur}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        />
                    )}
                    />
                )}
                />
                <Controller
                control={control}
                name='thumbnailUrl'
                render={({field}) => (
                    <Box>
                        <Button
                        variant='contained'
                        size='medium'
                        onClick={() => setOpen(true)}
                        >
                            サムネイルを選択
                        </Button>
                        <Dialog
                        fullWidth
                        maxWidth="sm"
                        open={open}
                        onClose={handleClose}
                        >
                            <DialogTitle>メディアライブラリ</DialogTitle>
                            <DialogContent
                            sx={{
                                display:"flex",
                                flexWrap:"wrap",
                                alignItems:"center",
                                justifyContent:"space-between",
                                rowGap:3
                            }}
                            >
                                {error && (
                                    <Typography color='error'>
                                        メディアの取得に失敗しました
                                    </Typography>
                                )}
                                {
                                    isLoading && <Loading />
                                }
                                {
                                    medialist?.map((item) => (
                                        <Box
                                        key={item.id}
                                        component={"img"}
                                        src={item.url}
                                        alt={item.fileName}
                                        onClick={() => {
                                            field.onChange(item.url)
                                            handleClose()
                                        }}
                                        sx={{
                                            width:170,
                                            height:120,
                                            objectFit:"cover"
                                        }}
                                        >

                                        </Box>
                                    ))
                                }
                            </DialogContent>

                        </Dialog>
                        {
                            field.value && (
                                <Box 
                                component={"img"}
                                src={field.value}
                                alt='画像プレビュー'
                                sx={{
                                    display:"block",
                                    width:200,
                                    height:140,
                                    objectFit:"cover",
                                    borderRadius:3,
                                    mt:2
                                }}
                                >

                                </Box>
                            )
                        }
                    </Box>
                )}
                />
        </Stack>
        </Box>
    </Paper>
  )
}

export default SettingForm