<template>
    <div :class="['alert', messageClass]" v-if="messageType">
        <a href="#" @click.prevent="clearMessage">
            <i class="fas fa-times close"></i>
        </a>
        <h5>{{ mainMessage }}</h5>
        <p>{{ subMessages }}</p>
    </div>
</template>

<script>
    import { sync } from 'vuex-pathify'

    export default {
        name: "message",
        props: ['type'],
        computed: {
            messageClass() {
                const type = this.messageType === 'error' ? 'danger' : 'sucess'
                return `alert-${type}`
            },
            ...sync('messages', [
                'messageType',
                'mainMessage',
                'subMessages'
            ])
        },
        methods: {
            clearMessage() {
                this.messageType = null
            }
        }
    }
</script>

<style scoped>
    .alert {
        margin-top: 10px;
    }
    .close {
        float: right;
    }
</style>