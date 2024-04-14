import { createApp } from "vue"
import "./style.css"
import "element-plus/dist/index.css"
import App from "./App.vue"
import { setupRouter } from "./router"
import { setupPinia } from "./store"
import "./plugins/mockjs"
const app = createApp(App)

setupRouter(app)
setupPinia(app)

app.mount("#app")
