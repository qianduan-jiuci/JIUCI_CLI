import { defineStore } from "pinia"
import { ref } from "vue"
// setup store
export const useloginStore = defineStore(
  "login",
  () => {
    let assess_token = "aaa"
    let refresh_token = "sss"

    // 修改token相关信息
    function setState(data) {
      assess_token = data.assess_token
      refress_token = data.refress_token
    }

    return { assess_token, refresh_token, setState }
  },
  {
    persist: true,
  },
)
