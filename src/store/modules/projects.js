import axios from "axios/index";
import {make} from 'vuex-pathify'

const state = {
    projects: [],
    openProjects: []
}

export default {
    namespaced: true,
    state,
    actions: {
        fetchProjects({commit}) {
            commit('loader/SET_LOADING', true, { root: true })
            axios.get('/projects').then(response => {
                commit('SET_PROJECTS', response.data)
                commit('loader/SET_LOADING', false, { root: true })
            })
        },
        fetchProject({commit}, id) {
            commit('loader/SET_LOADING', true, { root: true })
            return axios.get(`/projects/${id}`)
                .then(response => {
                    // commit('SET_CURRENT_PROJECT', response.data)
                    commit('loader/SET_LOADING', false, { root: true })
                    return response
                })
        },
        deleteProject({dispatch}, id) {
            return axios.delete(`/projects/${id}`).then(() => {
                dispatch('fetchProjects')
            })
        },
        editProject({commit, dispatch}, project) {
            commit('loader/SET_LOADING', true, { root: true })
            return axios.put('/projects', project)
                .then(() => {
                        dispatch('fetchProjects')
                    }
                )
        },
        createProject({commit, dispatch}, project) {
            commit('loader/SET_LOADING', true, { root: true })
            return axios.post('/projects', project)
                .then(() => {
                        dispatch('fetchProjects')
                    }
                )
        },
        addToOpenProjects({commit, state}, id) {
            const openProjects = [...state.openProjects]
            openProjects.push(id)
            commit('SET_OPEN_PROJECTS', openProjects)
        },
        removeFromOpenProjects({commit, state}, id) {
            const openProjects = [...state.openProjects]
            const index = openProjects.indexOf(id)
            openProjects.splice(index, 1)
            commit('SET_OPEN_PROJECTS', openProjects)
        },
        openAllProjects({commit, state}) {
            const ids = state.projects.map(project => project.id)
            commit('SET_OPEN_PROJECTS', ids)
        },
        closeAllProjects({commit}) {
            commit('SET_OPEN_PROJECTS', [])
        }
    },
    mutations: {
        ...make.mutations(['projects', 'openProjects']),
    }
}
