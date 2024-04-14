import { loadEnv, ProxyOptions } from "vite"
import path from "path"
const envs = loadEnv("development", path.join(process.cwd(), "./env"), "VITE_")
const proxyDomin = envs.VITE_PROXY_DOMIN

/**
 * @description 根据环境变量的前缀为VITE_BASE_URL， 自动生成跨域
 * @returns {ProxyOptions} Record<string, string | ProxyOptions>
 */
export const proxySetting = () => {
  const proxyConfig = {} as Record<string, string | ProxyOptions>
  Object.entries(envs).forEach(([env, result]) => {
    if (env.includes("VITE_BASE_URL_")) {
      proxyConfig[result] = {
        target: proxyDomin, //目标源，目标服务器，真实请求地址
        changeOrigin: true, //支持跨域
        rewrite: (path: string) => path.replace(new RegExp("^/" + result.replace("/", result))), //重写真实路径 },
      }
    }
  })
  return proxyConfig
}
