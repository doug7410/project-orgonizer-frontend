import { make } from 'vuex-pathify'

const state = {
    loading: false
}

export default {
    namespaced: true,
    state,
    mutations: {
        ...make.mutations(state)
    }
}