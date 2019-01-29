import {make} from 'vuex-pathify'

const state = {
    messageType: null,
    mainMessage: null,
    subMessages: {}
}

const mutations = {
    ...make.mutations(state),
}

export default {
    namespaced: true,
    state,
    actions: {
        setErrorMessage({commit}, {message, errors}) {
            commit('SET_MESSAGE_TYPE', 'error')
            commit('SET_MAIN_MESSAGE', message)
            commit('SET_SUB_MESSAGES', errors)
            commit('loader/SET_LOADING', false, {root: true})
        },
        clearErrorMessage({commit}) {
            commit('SET_MESSAGE_TYPE', null)
            commit('SET_MAIN_MESSAGE', null)
            commit('SET_SUB_MESSAGES', null)
        }
    },
    mutations
}