import z from "zod";

export const CategorySchema = z.object({
    name:z.string().nonempty("カテゴリ名を入力してください"),
    code:z.string().nonempty("コードを入力してください")
})

export type CategoryFormValues = z.infer<typeof CategorySchema>