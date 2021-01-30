import Vue from 'vue'
import Vuex from 'vuex'
import washCar from './modules/washCar'
import environment from './modules/environment'
import unloading from './modules/unloading'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        //app,
        washCar,
        environment,
        unloading
    },
    getters
})

export default store
