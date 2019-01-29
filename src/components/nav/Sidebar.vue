<template>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <router-link to="/" class="nav-link active">
                        <span data-feather="home"></span>
                        Project List <span class="sr-only">(current)</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'add-project'}" class="nav-link">
                        <span data-feather="file"></span>
                        Add Project +
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Sidebar"
    }
</script>

<style scoped>

</style>