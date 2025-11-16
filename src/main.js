import { createApp } from 'vue'
import App from './App.vue'
import router from '../router'
import { createI18n } from 'vue-i18n'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/style.css'
import en from './locale/en.json'
import it from './locale/it.json'

const i18n = createI18n({
    legacy: false,
    locale: "it",
    fallbackLocale: "en",
    messages: {
        it,
        en
    }
})

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')
