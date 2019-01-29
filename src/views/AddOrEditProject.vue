<template>
    <main-layout>
        <h2>{{ title }}</h2>
        <project-form />
    </main-layout>
</template>

<script>
    import ProjectForm from '../components/project/projectForm/ProjectForm'
    import MainLayout from '../Layouts/MainLayout.vue'

    export default {
        name: "add-or-edit-project",
        components: {
            ProjectForm,
            MainLayout
        },
        computed: {
            title() {
                return this.$route.name.split('-')
                    .map(item => item.charAt(0).toUpperCase() + item.substr(1).toLowerCase())
                    .join(' ')
            }
        }
    }
</script>

<style scoped>

</style>