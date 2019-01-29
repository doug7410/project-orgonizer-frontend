<template>
    <div class="card">
        <div :class="['card-header', project.type]" @dblclick="toggleProject">
            {{ project.name }} - <a target="_blank" :href="project.repository">{{project.repository}}</a>
            <div class="action-buttons">
                <a href="#" @click.prevent="toggleProject" >
                    <i class="fas fa-chevron-down" v-if="!showCard"></i>
                    <i class="fas fa-chevron-up" v-else></i>
                </a>
                <router-link :to="{ name: 'edit-project', params: {id: project.id}}">
                    <i class="fas fa-pen-square edit-button"></i>
                </router-link>
                <a href="#" @click.prevent="deleteCurrentProject(project.id)">
                    <i class="fas fa-trash-alt"></i>
                </a>
            </div>
        </div>

        <slide-up-down :active="showCard" :duration="300">
            <div class="card-body">
                <div class="row">
                    <div v-for="(server, index) in project.servers"
                         class="col-md server"
                         :key="index"
                         v-show="serverHasData(server)"
                    >
                        <h6>{{server.type}}</h6>
                        <server-table :server="server" />
                    </div>
                </div>
                <div class="row" v-if="project.notes">
                    <div class="col-md notes">
                        <strong>Notes:</strong>
                        <div v-html="project.notes"></div>
                    </div>
                </div>
            </div>
        </slide-up-down>
    </div>
</template>

<script>
    import ServerTable from './ServerTable'
    import { sync, call } from 'vuex-pathify'

    export default {
        name: "project-card",
        props: ['project'],
        methods: {
            ...call('projects', ['addToOpenProjects', 'removeFromOpenProjects', 'deleteProject']),
            toggleProject() {
                if(this.openProjects.includes(this.project.id)) {
                    this.removeFromOpenProjects(this.project.id)
                } else {
                    this.addToOpenProjects(this.project.id)
                }
            },
            deleteCurrentProject(id) {
                this.$swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this project!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                })
                    .then((result) => {
                        if (result.value) {
                            this.loading = true
                            this.deleteProject(id).then(() => {
                                this.loading = false
                                this.$swal("Deleted!", 'Your project has been deleted.', 'success');
                            })
                        } else {
                            this.$swal("Your project is safe!");
                        }
                    });
            },
            serverHasData(server) {
                return server.url !== null || server.ip_address !== null
            }
        },
        computed: {
            ...sync(['loader/loading', 'projects/openProjects']),
            showCard() {
                return this.openProjects.includes(this.project.id)
            }
        },
        components: {
            ServerTable
        }
    }
</script>

<style scoped>
    .card {
        margin-bottom: 15px;
    }

    .external{
        background-color: #1d68a7;
        color: #ffffff;
    }

    .external a:hover {
        color: #9dd2fb;
    }

    .internal {
        background-color: #006f00;
        color: #ffffff;
    }

    .internal a:hover {
        color: #70abe3;
    }

    .internal a, .external a {
        color: #cccccc;
        font-weight: normal;
    }

    .action-buttons {
        float: right;
        font-size: 1.1rem;
        color: #397da7;
    }

    .action-buttons a {
        margin: 0 3px;
    }

    .notes {
        border-top: #0068ac40 solid 1px;
        margin: 10px 20px;
        padding: 10px 5px;
    }
</style>