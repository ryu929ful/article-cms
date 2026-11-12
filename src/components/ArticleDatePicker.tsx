"use client"
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {  useController, useFormContext } from "react-hook-form";
import { ArticleFormValues } from "../validation/ArticleSchema";

const ArticleDatePicker = () => {
  const {control} = useFormContext<ArticleFormValues>()
  const {field,fieldState} = useController({
    name:"publishAt",
    control
  })
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
        <DatePicker 
        {...field}
        label="公開日を選択"
        value={field.value ? dayjs(field.value) : null}
        onChange={(newDate) => {
          field.onChange(newDate?.isValid() ? newDate.format("YYYY-MM-DD"):null)
        }}
        format="YYYY/MM/DD"
        slotProps={{
          textField:{
            error:!!fieldState.error,
            helperText:fieldState.error?.message,
            onBlur:field.onBlur,
            inputRef:field.ref
          }
        }}
        />
    </LocalizationProvider>
  )
}

export default ArticleDatePicker