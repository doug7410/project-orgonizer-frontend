import Vue from 'vue'
import Vuex from 'vuex'
import loader from './modules/loader'
import messages from './modules/messages'
import projects from './modules/projects'
import projectFilter from './modules/projectFilter'

import pathify from './pathify'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [ pathify.plugin ],
    strict: true,
    modules: {
        loader,
        projects,
        messages,
        projectFilter
    }
})

window.store = store
export default store