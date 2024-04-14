import type { MockMethod } from "vite-plugin-mock"
import Mock from "mockjs"
export default [
  {
    url: "/apis/login",
    method: "post",
    response: ({ query }) => {
      return {
        code: 200,
        message: "请求成功",
        data: {
          token: Mock.Random.string(20),
        },
      }
    },
  },
] as MockMethod[]
