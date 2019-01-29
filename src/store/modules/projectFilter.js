import { make } from 'vuex-pathify'

const state = {
    searchTerm: '',
    projectType: 'all',
    projectTypes: [
        {name: 'internal', color: '#006f00'},
        {name: 'external', color: '#1d68a7'},
        {name: 'all', color: null}
    ],
}

export default {
    namespaced: true,
    state,
    getters: {
        filteredProjects: (state, getters, parentState) => {
            if (!parentState.projects.projects.length) {
                return parentState.projects.projects
            }

            // filter by search term
            return parentState.projects.projects.filter(project => {
                if (state.searchTerm === '') {
                    return true
                }

                const searchableFields = [project.name]

                if(project.servers.length) {
                    project.servers.filter(server => server.url).forEach(server => searchableFields.push(server.url))
                }

                return searchableFields.filter(field => field.toLowerCase().includes(state.searchTerm)).length > 0

            // filter by project type
            }).filter(project => {
                if (state.projectType === 'all') {
                    return true
                }

                return project.type === state.projectType
            })
        },
    },
    mutations: {
        ...make.mutations(state)
    }
}