import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material"
import { useSearchParams,useRouter } from "next/navigation"
import useArticleList from "../hooks/useArticleList"
import Loading from "./Loading"

const PreviewPage = () => {
  const param = useSearchParams()
  const router = useRouter()
  const id = param.get("id")
  const {article,a_load} = useArticleList()
  if(a_load){
    return (
      <Loading />
    )
  }
  const target = article.find((item) => {
    return item.id === id
  })
  if(!target) return

  return (
    <Box
    sx={{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      width:"100%"
    }}
    >

    <Box sx={{
      maxWidth:1200,
      minWidth:700
    }}>
      <Box sx={{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between"
      }}>
        <Typography variant="h4" 
        sx={{
          fontWeight:700
        }}>
          記事プレビュー
        </Typography>
        <Button　onClick={() => router.push(`/articles/edit?id=${id}`)} variant="contained" size="medium">
          編集画面へ
        </Button>
      </Box>
    <Paper elevation={3} sx={{p:3 ,mt:3}}>
     <Stack spacing={3}>
      <Box sx={{
        display:"flex",
        gap:1,
        alignItems:"center"
      }}>
        <Chip size="small" label={target.categoryCode}/>
        <Chip size="small" label={target.status}/>
      </Box>
      <Typography variant="h3" 
      sx={{
        fontWeight:700
      }}>
        {target.title}
      </Typography>
      {
        target.thumbnailUrl && (
          <Box
          component={"img"}
          src={target.thumbnailUrl}
          alt="画像プレビュー"
          sx={{
            width:"100%",
            maxWidth:400,
            objectFit:"cover",
            borderRadius:2
          }}
          >

          </Box>
        )
      }
      <Typography component={"p"}>
        {target.author} ・ {target.updatedAt ? target.updatedAt : target.createdAt}
      </Typography>
      <Typography variant="h5">
        {
          target.summary
        }
      </Typography>
      <Typography sx={{
        whiteSpace:"pre-wrap"
      }} component={"p"}>
        {
          target.content
        }
      </Typography>
      <Stack spacing={1} direction={"row"}>
      {
        target.tagCodes.map((item) => (
          <Chip size="small" variant="outlined" key={item} label={item} />
        ))
      }
      </Stack>
     </Stack>
    </Paper>
    </Box>
    </Box>
  )
}

export default PreviewPage