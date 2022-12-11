import { createApp } from 'vue'
import './style.css'
import { createRouter, createWebHistory} from "vue-router"
import App from "./App.vue"

import About from "./pages/About.vue";
import Privacy from "./pages/missRirica/privacy.vue";
import Term from "./pages/missRirica/term.vue";
const routes = [
    { path: '/', component: About },
    { path: '/missRirica/privacy', component: Privacy },
    { path: '/missRirica/terms', component: Term },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

// 5. Create and mount the root instance.
const app = createApp(App)
app.use(router)
app.mount('#app')

