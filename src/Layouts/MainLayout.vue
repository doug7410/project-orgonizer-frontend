<template>
    <div>
        <main-nav></main-nav>
        <div class="container-fluid">
            <div class="row">
                <sidebar></sidebar>
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <message type="danger"></message>
                    <slot></slot>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
    import MainNav from '../components/nav/MainNav'
    import Sidebar from '../components/nav/Sidebar'
    import Message from '../components/Message'

    export default {
        name: 'main-layout',
        components: {
            MainNav,
            Sidebar,
            Message
        }
    }
</script>

<style>
    @import "../styles/dashboard.css";
</style>