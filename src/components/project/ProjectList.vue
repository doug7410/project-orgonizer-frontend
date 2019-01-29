<template>
    <div>
        <div class="row header">
            <div class="col-md-6">
                <h2>Project List</h2>
                <p>Viewing {{ filteredProjects.length }} of {{ projects.length }}</p>
                <div class="form-inline">
                    <div class="form-group">
                        <div class="form-check form-check-inline" v-for="(type, index) in projectTypes" :key="index">
                            <input class="form-check-input"
                                   type="radio"
                                   :id="type.name"
                                   name="type"
                                   :value="type.name"
                                   v-model="projectType"
                            >
                            <label class="form-check-label" :for="type.name">
                                {{ type.name | capitalize }}
                                <color-block :color="type.color"/>
                            </label>
                        </div>
                        <a href="#" class="clear-filters custom-button" @click.prevent="clearFilters">
                            Clear Filters
                            <i class="fas fa-ban"></i>
                        </a>
                    </div>
                </div>
                <div>
                    <small class="note"><i>note: You can double click a project to open it.</i></small>
                </div>
            </div>
            <div class="col-md-6">
                <div class="controls">
                    <div class="form-inline">
                        <div class="form-group search">
                            <input type="text"
                                   class="form-control"
                                   v-model="searchTerm"
                                   placeholder="search for projects ..."
                            >
                        </div>
                    </div>
                    <div class="open-close-links">
                        <a href="#" class="open-button" @click.prevent="openAllProjects">
                            Open All
                            <i class="far fa-envelope-open"></i>
                        </a>
                        <a href="#" class="close-button" @click.prevent="closeAllProjects">
                            Close All
                            <i class="far fa-envelope"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <project-card v-for="(project, index) in filteredProjects" :key="index" :project="project" />

        <p v-show="!filteredProjects.length" class="search-empty">
            There are no projects matching your search.
        </p>
    </div>
</template>

<script>
    import ProjectCard from './projectCard/ProjectCard'
    import ColorBlock from '../ColorBlock'
    import { get, call, sync } from 'vuex-pathify'

    export default {
        name: "project-list",
        mounted() {
            if(!this.projects.length) {
                this.fetchProjects()
            }
        },
        methods: {
            ...call('projects', ['fetchProjects', 'openAllProjects', 'closeAllProjects']),
            clearFilters() {
                this.searchTerm = ''
                this.projectType = 'all'
            }
        },
        computed: {
            ...get(['projectFilter/filteredProjects', 'projects/projects']),
            ...sync('projectFilter', [
                'searchTerm',
                'projectType',
                'projectTypes'
            ])
        },
        components: {
            ProjectCard,
            ColorBlock,
        }
    }
</script>

<style scoped>
    .header {
        margin-top: 15px;
    }

    .search-empty {
        font-size: 2.5rem;
        text-align: center;
        margin-top: 3rem;
        color: #4eadb3;
        font-weight: bold;
    }
    .open-close-links {
        left: 14px;
        position: relative;
        top: 61px;
    }

    .open-close-links a{
        margin-left: 10px;
    }

    .open-close-links a:hover {
        text-decoration: none;
    }

    .controls {
        float: right;
    }

    a.custom-button {
        color: #426b90;
    }
</style>