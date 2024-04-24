import { createApp } from 'vue'
import {createPinia, Pinia} from "pinia";
const pinia: Pinia = createPinia();
import App from './App.vue'
import router from './router'
import './theme.css'
import FontAwesomePlugin from "./plugins/FontAwesome"

createApp(App).use(router).use(pinia).use(FontAwesomePlugin).mount('#app')
