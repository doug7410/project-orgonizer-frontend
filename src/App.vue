<template>
    <div>
        <router-view></router-view>
        <loader/>
    </div>

</template>

<script>
    import Loader from './components/Loader.vue'

    export default {
        name: 'app',
        components: {
            Loader
        }
    }
</script>
