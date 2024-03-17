import { Types } from "../modules/auth"

export function objectToFormData(obj: Types.IApi.ProfileUpdate.Request) {
    const formData = new FormData()
  
    Object.entries(obj).forEach(([key, value]) => {
      formData.append(key, value)
    })
  
    return formData
  }