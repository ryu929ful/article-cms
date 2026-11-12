"use client"
import { Box, CircularProgress } from "@mui/material";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/articles")
}
