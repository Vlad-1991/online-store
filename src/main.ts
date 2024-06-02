import { createApp } from 'vue'
import {createPinia, Pinia} from "pinia";
const pinia: Pinia = createPinia();
import App from './App.vue'
import router from './router'
import './theme.css'
import FontAwesomePlugin from "./plugins/FontAwesome"
export const BESTSELLER_COUNT: number = 10

createApp(App).use(pinia).use(router).use(FontAwesomePlugin).mount('#app')
