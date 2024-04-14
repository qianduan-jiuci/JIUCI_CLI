import instance from "../plugins/http/instance"

type ResponseDataType = {
  name: string
  url: string
  picurl: string
}

type RequestDataType = {
  sort?: string
  mid?: number
  format?: string
}

export const getMusic = async (config?: RequestDataType) => {
  // instance.retry()
  return await instance.post<ResponseDataType, RequestDataType>("random.mussic")
}
