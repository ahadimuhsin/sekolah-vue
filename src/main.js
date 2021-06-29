import Vue from 'vue'
import App from './App.vue'

//import router
import router from './router'

//import moment
import moment from 'moment'
moment.locale('id')

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')

Vue.mixin({
    methods: {
        format_date(date) {
            if (date) {
                return moment(String(date)).format('dddd') + ", " + moment(String(date)).format('LL')
            }
        },
        format_time(timestamp) {
            if (timestamp) {
                return moment(String(timestamp)).format('dddd') + ", " + moment(String(timestamp)).format('LL') + " " + moment(String(timestamp)).format('h:mm:ss')
            }
        }
    }
})