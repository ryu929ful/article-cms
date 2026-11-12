"use client"

import { Box, Typography, Button } from "@mui/material"
import { useDropzone } from "react-dropzone"
import { useFormContext } from "react-hook-form"
import { useContext, useEffect, useRef, useState } from "react"
import type { MediaFormValues } from "@/src/validation/MediaSchema"


const MediaUploadForm = () => {
    const [previewUrl,setPreviewUrl] = useState<string | null>(null)
    const previeUrlRef = useRef<string | null>(null)
    const {watch,resetField,setValue} = useFormContext<MediaFormValues>()
    const {getInputProps,getRootProps,isDragActive} = useDropzone({
        accept:{
            "image/*":[]
        },
        multiple:false,
        onDrop:((item) => {
            const selectedFile = item[0]
            if(!selectedFile) return
            if(previeUrlRef.current){
                URL.revokeObjectURL(previeUrlRef.current)
            }
            const url = URL.createObjectURL(selectedFile)
            setPreviewUrl(url)
            previeUrlRef.current = url

            setValue("file",selectedFile,{
                shouldValidate:true,
                shouldDirty:true
            })
        })
    })

    const handleRemove = () => {
        const ok = window.confirm("画像を削除しますか？")
        if(ok){
            if(previeUrlRef.current){
                URL.revokeObjectURL(previeUrlRef.current)
            }
            setPreviewUrl(null)
            previeUrlRef.current = null
            resetField("file")
        }
    }

    useEffect(() => {
        return (() => {
            if(previeUrlRef.current){
                URL.revokeObjectURL(previeUrlRef.current)
            }
        })
    },[])

    const file = watch("file")
    return (
        <>
        <Box>
            <Box
            {...getRootProps()}
            sx={{
                border:"1px dashed #aaa",
                p:5,
                borderRadius:3,
                textAlign:"center",
                cursor:"pointer"
            }}
            >
                <input {...getInputProps()} />
                {
                    !isDragActive ? ("ここにファイルをドラッグ＆ドロップ") : ("ドロップ")
                }
            </Box>
            {
                previewUrl && (
                    <>
                    <Box
                    component={"img"}
                    src={previewUrl}
                    alt={file.name}
                    sx={{
                        width:200,
                        borderRadius:3,
                        mb:3,
                        mt:3
                    }}
                    >
                    </Box>
                    <Box sx={{
                        display:"flex",
                        alignItems:"center",
                        gap:3
                    }}>
                        <Button variant="outlined"
                        color="error"
                        size="medium"
                        onClick={handleRemove}
                        >
                            削除する
                        </Button>
                        <Typography>
                            ファイル名:{file.name}
                        </Typography>
                    </Box>
                    </>
                )
            }
        </Box>
        </>
    )
}

export default MediaUploadForm