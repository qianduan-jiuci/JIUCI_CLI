import type { MockMethod } from "vite-plugin-mock"
import Mock from "mockjs"
export default [
  {
    url: "/apis/get",
    method: "get",
    response: ({ query }) => {
      return {
        code: 200,
        message: "请求成功",
        data: {
          name: "张三",
          age: 25,
        },
      }
    },
  },
] as MockMethod[]
