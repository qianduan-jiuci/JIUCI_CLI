import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { errorMap } from "./axios.error.map"
import axiosRetry from "axios-retry"
import { ElMessage } from "element-plus"
import { refresh } from "./refresh"

export class Request {
  private instance: AxiosInstance
  private defaultConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_BASE_URL_API || "",
    timeout: +import.meta.env.VITE_TIMEOUT,
    withCredentials: false, // 跨域请求是否携带cookie
  }
  constructor(config?: AxiosRequestConfig) {
    config = config ? { ...this.defaultConfig, ...config } : this.defaultConfig
    this.instance = axios.create(config)
    // this.retry()
    this.requestIntercaptor()
    this.reponseIntercaptor()
  }
  // 请求拦截器
  private requestIntercaptor() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("assess_token")
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error.message)
      },
    )
  }
  // 响应拦截器
  private reponseIntercaptor() {
    this.instance.interceptors.response.use(
      async (response) => {
        if (response.data.code === 401) {
          await refresh(response.config, this.instance)
        }
        return response.data
      },
      async (error: AxiosError) => {
        let message = Reflect.get(errorMap(), +(error.response?.status as number)) || "请求错误"
        ElMessage({
          showClose: true,
          message,
          type: "error",
        })
        switch (error.response?.status) {
          case 401:
            await refresh(error.response.config, this.instance)
            break
          case 404:
            break
          default:
            message = "请求错误，请重试"
            break
        }
        return Promise.reject(message)
      },
    )
  }

  // 针对错误请求进行重试
  private retry() {
    axiosRetry(this.instance, {
      retries: 2,
      shouldResetTimeout: true,
      retryCondition: (err) => axiosRetry.isNetworkOrIdempotentRequestError(err) || err.response?.status === 404,
      retryDelay: () => {
        return 0.6 * 1000
      },
    })
  }

  public request<T = any, D = any, R = Result<T>>(config: AxiosRequestConfig<D>): Promise<AxiosResponse<R>> {
    return this.instance.request(config)
  }

  public get<T = any, D = any, R = Result<T>>(url: string, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<R>> {
    return this.instance.get(url, config)
  }

  public post<T = any, D = any, R = Result<T>>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<R>> {
    return this.instance.post(url, data, config)
  }

  public put<T = any, D = any, R = Result<T>>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<R>> {
    return this.instance.put(url, data, config)
  }

  public delete<T = any, D = any, R = Result<T>>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<R>> {
    return this.instance.delete(url, config)
  }
}

export default new Request()
