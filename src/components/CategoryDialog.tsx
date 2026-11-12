import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import type { CategoryFormValues } from '../validation/CategorySchema'

type Props = {
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    editId:null|string
}

const CategoryDialog = ({open,setOpen,editId}:Props) => {
    const {control,formState:{errors}} = useFormContext<CategoryFormValues>()
    const handleClose = () => {
        setOpen(false)
    }
    const isEditId = editId != null
  return (
    <Dialog sx={{p:3}} fullWidth maxWidth="sm" open={open} onClose={handleClose} >
            <DialogTitle>
                {isEditId ? ("カテゴリの編集") : ("カテゴリの追加")}
            </DialogTitle>
            <DialogContent>
                <Stack sx={{mt:3}} spacing={2}>
                <Controller
                name='name'
                control={control}
                render={({field}) => (
                    <TextField
                    {...field}
                    label="カテゴリ名"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    />
                )}
                />
                <Controller
                name='code'
                control={control}
                render={({field}) => (
                    <TextField
                    {...field}
                    label="カテゴリコード"
                    error={!!errors.code}
                    helperText={errors.code?.message}
                    />
                )}
                />
                </Stack>
            </DialogContent>
            <DialogActions sx={{}}>
                <Button onClick={handleClose}>
                    キャンセル
                </Button>
                <Button form="category-form" type='submit' variant='contained' size='medium'>
                    {isEditId ? ("更新") : ("追加")}
                </Button>
            </DialogActions>
    </Dialog>
  )
}

export default CategoryDialog