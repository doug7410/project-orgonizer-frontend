<template>
    <table class="table table-striped table-sm table-bordered">
        <tbody>
        <tr v-if="server.url">
            <th>Url</th>
            <td>
                <a target="_blank" :href="server.url">{{ server.url }}</a>
                <ul>
                    <li v-if="server.website_username">
                        <strong>Username:</strong> {{ server.website_username}}
                    </li>
                    <li v-if="server.website_password">
                        <div></div>
                        <strong>Password:</strong> <span v-html="password"></span>
                        <toggle-button :id="server.id"  @toggled="showPassword = !showPassword" />
                        <span class="toggle-text">{{ showPassword ? 'hide' : 'show' }}</span>
                    </li>
                </ul>
            </td>
        </tr>
        <tr v-if="server.ip_address">
            <th>SSH Access</th>
            <td>
                <span ref="serverIp">
                    ssh {{server.ssh_user}}@{{server.ip_address}} -i {{server.ssh_key}}
                </span>
                <a href="#" @click.prevent="copyRef('serverIp')">
                    <i class="far fa-copy"></i>
                </a>
            </td>
        </tr>
        <tr v-if="server.directory">
            <th>directory</th>
            <td>
                <span ref="directory">
                    {{ server.directory }}
                </span>
                <a href="#" @click.prevent="copyRef('directory')">
                    <i class="far fa-copy"></i>
                </a>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import ToggleButton from '../../ToggleButton'

    export default {
        name: "server-table",
        data() {
            return {
                showPassword: false
            }
        },
        props: ['server'],
        computed: {
            password(){
                let dots = ' '
                for(let i=0; i<10; i++) {
                    dots += '&#9679;'
                }

                return this.showPassword ? this.server.website_password : dots
            }
        },
        methods: {
            copyRef(ref) {
                const range = document.createRange()
                range.selectNode(this.$refs[ref])
                window.getSelection().removeAllRanges()
                window.getSelection().addRange(range)
                document.execCommand('copy')
            }
        },
        components: {
            ToggleButton
        }
    }
</script>

<style scoped>
    .server ul li {
        list-style: none;
    }

    .server ul {
        margin: 10px 0 5px 0;
        padding-left: 0;
    }
</style>