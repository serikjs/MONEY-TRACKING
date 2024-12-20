import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { MdExittoapp , RiHome4Line, BiClipboardData, BiBank } from 'oh-vue-icons/icons'

addIcons(MdExittoapp , RiHome4Line, BiClipboardData, BiBank)

const app = createApp(App)

app.component('v-icon', OhVueIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
