<template>
  <main-layout>
    <project-list />
  </main-layout>
</template>

<script>
    import ProjectList from '../components/project/ProjectList.vue'
    import MainLayout from '../Layouts/MainLayout.vue'

    export default {
        name: 'projects',
        components: {
            MainLayout,
            ProjectList
        }
    }
</script>
 