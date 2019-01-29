<template>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Agile Element Projects</a>
        <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
                <a href="#" @click.prevent="logout">Logout</a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "main-navigation",
        methods: {
            logout() {
                this.$auth.logout()
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>

</style>