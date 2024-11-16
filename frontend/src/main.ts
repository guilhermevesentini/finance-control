import '@/assets/scss/main.scss'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/scss/theme/element-variables.scss';
import '@/assets/scss/Variables.scss';
import '@/assets/scss/base.scss';
import money from 'v-money3'
import ptbr from 'element-plus/dist/locale/pt-br';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElementPlus, { locale: ptbr });

app.config.globalProperties.$globalLoading = (options = {}) => {
  return app.config.globalProperties.$loading({    
    ...options,
  });
};

app.use(money)

app.mount('#app')
