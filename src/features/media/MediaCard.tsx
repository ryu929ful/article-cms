"use client"

import { Media } from "@/src/types/MediaTypes"
import { Card, CardContent, CardMedia, Typography } from "@mui/material"

type Props = {
    media:Media
}

const MediaCard = ({media}:Props) => {
  return (
    <Card>
        <CardMedia
        component="img"
        image={media.url}
        alt={media.fileName}
        sx={{
            height:180,
            objectFit:"cover"
        }}
        />
        <CardContent>
            <Typography variant="h6" sx={{fontWeight:700,mb:3}}>
                {media.fileName}
            </Typography>
            <Typography sx={{mb:3}}>
                {(media.size / 1024).toFixed(1)} KB
            </Typography>
        </CardContent>

    </Card>
  )
}

export default MediaCard