import Mock from "mockjs"
import type { MockjsMock } from "mockjs"
import type { MockMethod } from "vite-plugin-mock"
import loginMockData from "./login"
import UserMockData from "./user"

const data: MockjsMock = Mock.mock({
  "user|10": [
    {
      name: "@cname",
      "age|1-100": 1,
      color: Mock.Random.color(),
    },
  ],
})

export default [...loginMockData, ...UserMockData]
