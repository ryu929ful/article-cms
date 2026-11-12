import z from "zod";

export const TagSchema = z.object({
    name:z.string().nonempty("タグ名を入力してください"),
    code:z.string().nonempty("タグコードを入力してください")
})

export type TagFormValues = z.infer<typeof TagSchema>