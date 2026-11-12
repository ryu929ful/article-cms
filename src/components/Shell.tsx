"use client"
import React, { ReactNode } from 'react'
import {AppBar, Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography} from "@mui/material"
import { Article, Category, Dashboard, Image, LocalOffer, PostAdd } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from 'next/navigation';
const Shell = ({children}:{children:ReactNode}) => {
    const path = usePathname()
const items = [
  { label: "記事一覧", href: "/articles", icon: <Article /> },
  { label: "記事作成", href: "/articles/new", icon: <PostAdd /> },
  { label: "カテゴリ管理", href: "/articles/categories", icon: <Category /> },
  { label: "タグ管理", href: "/articles/tags", icon: <LocalOffer /> },
  { label: "メディア管理", href: "/media", icon: <Image /> }
];
  return (
    <Box
    sx={{
        display:"flex",
        minHeight: "100vh",
        bgcolor: "#f4f6fa" 
    }}
    >
        <AppBar position="fixed" elevation={0} sx={{
       zIndex: theme => theme.zIndex.drawer + 1,
        bgcolor: "#142743" ,
        }}>
            <Box sx={{
                        display:"flex",
                    alignItems:"center",
                    justifyContent:"left",
                            height:"64px",
                            ml:"20px"
            }}>
            <Dashboard sx={{ mr: 1.5 }} />
            <Typography variant="h6" sx={{
                fontWeight:750
            }}>News Studio</Typography>
            <Typography sx={{ ml: 2, opacity: .7 }} variant="body2">コンテンツ管理システム</Typography>
            </Box>
        </AppBar>
        <Drawer variant='permanent' 
        sx={{
            flexShrink:0,
            height:"100vh",
            width: 236,
            "& .MuiDrawer-paper": {
            width: 236,
            boxSizing: "border-box"
        }
        }}>
            <Toolbar />
            <Box sx={{
                p:2
            }}>
            <Typography sx={{px:1}} variant="overline" color="text.secondary">CONTENT</Typography>
            </Box>
            <List sx={{ px: 1.5 }}>
                {items.map(item => (
                        <ListItemButton key={item.href} component={Link} href={item.href} selected={path === item.href} sx={{
                            mb: 0.5, 
                            borderRadius: 2, 
                            '&.Mui-selected': {
                                bgcolor: '#e7effe', 
                                color: '#1649a4' 
                            } 
                            }}>
                            <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                )
            )}
            </List>
        </Drawer>
        <Box component={"main"} sx={{flexGrow:1}}>
        <Toolbar />
        <Box sx={{p:3}}>
        <div className='body'>{children}</div>
        </Box>
        </Box>
    </Box>
  )
}

export default Shell