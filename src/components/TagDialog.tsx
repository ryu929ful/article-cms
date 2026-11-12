import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TagFormValues } from '../validation/TagSchema'

type Props = {
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
    isEditId:boolean,
    setEditId:Dispatch<SetStateAction<string | null>>
}
const TagDialog = ({open,setOpen,isEditId,setEditId}:Props) => {

    const handleClose = () => {
        setOpen(false)
        setEditId(null)
    }
    const {control,formState:{errors}} = useFormContext<TagFormValues>()
  return (
    <Dialog open={open} sx={{p:3}} fullWidth maxWidth="sm" onClose={handleClose}>
        <Stack spacing={3}>
        <DialogTitle>{isEditId ? ("タグの編集") : ("タグの追加")}</DialogTitle>
        <DialogContent>
            <Stack spacing={2}>
                <Controller
                control={control}
                name='name'
                render={({field}) => (
                    <TextField
                    label="タグ名"
                    {...field}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    />
                )}
                />
                <Controller
                control={control}
                name='code'
                render={({field}) => (
                    <TextField
                    label="タグコード"
                    {...field}
                    error={!!errors.code}
                    helperText={errors.code?.message}
                    />
                )}
                />
            </Stack>
        </DialogContent>
        <DialogActions sx={{pb:3}}>
            <Button onClick={handleClose} variant='outlined' size='medium'>キャンセル</Button>
            <Button type='submit' form="tag-form" variant='contained' size='medium'>{isEditId ? ("変更") : ("追加")}</Button>
        </DialogActions>
        </Stack>
    </Dialog>
  )
}

export default TagDialog