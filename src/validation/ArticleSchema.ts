import {z} from "zod"
export const ArticleSchema = z.object({
        title: z.string().nonempty("記事タイトルを入力してください"),
        slug: z.string().nonempty("スラッグを入力してください"),
        summary: z.string().nonempty("概要は必須です"),
        content: z.string().nonempty("本文は必須です"),
        categoryCode: z.string().nonempty("カテゴリを選択してください"),
        tagCodes: z.array(z.string()),
        status: z.enum(["published","review","draft"],{
            error:"正しく選択してください"
        }),
        publishAt:z.string().nullable(),
        author: z.string().nonempty("本文は必須です"),
        thumbnailUrl:z.string()
})

export type ArticleFormValues =  z.infer<typeof ArticleSchema>