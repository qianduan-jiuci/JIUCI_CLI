import { AxiosInstance, InternalAxiosRequestConfig } from "axios"
import { useloginStore } from "../../store/login"
import { setupPinia } from "../../store"
import { createApp } from "vue"
import { refreshToken } from "../../apis/auth"
import App from "../../App.vue"
const app = createApp(App)
setupPinia(app)

const { assess_token, refresh_token, setState } = useloginStore()

let isRefressing: boolean = false
let refreshSubscribers: Array<(token: string) => any | unknown> = []

export const refresh = async (originalRequest: InternalAxiosRequestConfig, instance: AxiosInstance) => {
  // token刷新
  // const originalRequest = notAuthConfig
  if (!isRefressing) {
    isRefressing = true
    // 发送刷新token的请求
    try {
      const res = await refreshToken({ assess_token, refresh_token })
      // 重新设置token
      setState({ assess_token: res.assess_token, resfresh_token: res.refresh_token })
      // 重新发送因为401失败的请求
      refreshSubscribers.forEach((subscriber) => subscriber(res.assess_token))

      // 重置条件
      refreshSubscribers = []
      isRefressing = false

      // 重新发送当前请求
      return instance.request(originalRequest)
    } catch (error) {
      // 重定向到登录也
      // location.href("/login")
      return Promise.reject("认证失败")
    }
  } else {
    // 正在刷新 token，将当前请求加入队列，等待刷新完成后再重新发送
    return new Promise((resolve) => {
      refreshSubscribers.push((newToken: string) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        resolve(instance.request(originalRequest))
      })
    })
  }
}
