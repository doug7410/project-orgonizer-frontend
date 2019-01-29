<template>
    <form @submit.prevent="saveProject">
        <div class="form-row">
            <div class="form-group col-md-6" v-for="(field, index) in fields" :key="index">
                <label for="name">{{ field.label }}*</label>
                <input class="form-control"
                       id="name"
                       v-model="project[field.name]"
                       :placeholder="field.placeholder"
                />
            </div>
            <div class="form-group col-md-6">
                <label for="name">Notes</label>
                <div><small><i>You can use HTML in this field.</i></small></div>
                <textarea class="form-control" id="name" v-model="project.notes"></textarea>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col-md-6">
                <label class="type">Type*</label>
                <div v-for="(type, index) in projectTypes" class="form-check form-check-inline" :key="index">
                    <input class="form-check-input"
                           type="radio"
                           :id="type"
                           :value="type"
                           v-model="project.type"
                    >
                    <label class="form-check-label" :for="type">{{ type }}</label>
                </div>
            </div>
        </div>
        <div class="form-row">
            <div class="col-md" v-for="(server, index) in serverTypes" :key="index">
                <h6>{{ server | capitalize}} Server</h6>
                <table class="table table-striped table-sm table-bordered">
                    <tbody>
                        <server-form-row
                                v-for="(field, index) in serverFields"
                                :key="index"
                                :input-type="field.type"
                                :heading="field.label"
                                :placeholder="field.placeholder"
                                v-model="project[`${server}Server`][field.name]"
                        />
                    </tbody>
                </table>

            </div>
        </div>
        <div>
            <small>
                <strong>* required</strong>
            </small>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
        <button class="btn btn-danger cancel" @click.prevent="$router.back()">Cancel</button>
    </form>
</template>

<script>
    import {call} from 'vuex-pathify'
    import ServerFormRow from './ServerFormRow'

    export default {
        name: "project-form",
        data() {
            return {
                project: this.emptyProject(),
                fields: [
                    {name: 'name', label: 'Name', placeholder: 'Some Project'},
                    {name: 'repository', label: 'Repository', placeholder: 'https://bitbucket.org/some-project'}
                ],
                projectTypes: ['internal', 'external'],
                serverFields: [
                    {name: 'url', label: 'Url', placeholder: 'http://www.example.com'},
                    {name: 'website_username', label: 'Username', placeholder: 'Admin'},
                    {name: 'website_password', label: 'Password', placeholder: 'password', type: 'password'},
                    {name: 'ip_address', label: 'IP Address', placeholder: '111.222.333.444'},
                    {name: 'directory', label: 'Directory', placeholder: '/var/www/some-project'},
                    {name: 'ssh_user', label: 'SSH User', placeholder: 'forge'},
                    {name: 'ssh_key', label: 'SSH Key', placeholder: '$AGILE_KEY'},
                ],
                serverTypes: ['staging', 'production']
            }
        },
        methods: {
            ...call('projects', [
                'editProject',
                'createProject',
                'fetchProject',
            ]),
            setErrorMessage: call('messages/setErrorMessage'),
            clearErrorMessage: call('messages/clearErrorMessage'),
            saveProject() {
                this.$route.name === 'edit-project' ? this.sendToServer('edit') : this.sendToServer('create')
            },
            sendToServer(actionType) {
                this[`${actionType}Project`](this.project)
                    .then(() => {
                            this.$router.push('/')
                            this.clearErrorMessage()
                        }
                    ).catch(({response: {data: {message, errors}}}) => {
                    this.setErrorMessage({message, errors})
                })
            },
            emptyProject() {
                return {
                    stagingServer: {
                        type: 'staging'
                    },
                    productionServer: {
                        type: 'production'
                    }
                }
            }
        },
        watch: {
            '$route': {
                deep: true,
                handler(route) {
                    if (route.name === 'add-project') {
                        this.project = this.emptyProject()
                    }
                }
            }
        },
        created() {
            if (this.$route.name === 'edit-project') {
                this.fetchProject(this.$route.params.id).then(({data}) => {
                    this.project = data
                })
            } else {
                this.project = this.emptyProject()
            }
        },
        components: {
            ServerFormRow
        }
    }
</script>

<style scoped>
    .btn.cancel {
        margin-left: 10px;
    }

    .type {
        margin-right: 15px;
    }

    label {
        font-weight: bold;
    }

    .form-check-label {
        font-weight: normal;
    }
</style>