<template>
    <div>
        <div class="alert alert-danger" v-if="error">
            <p>There was an error, unable to sign in with those credentials.</p>
        </div>
        <form class="form-signin" autocomplete="off" @submit.prevent="login" >
            <h1 class="h3 mb-3 font-weight-normal">Agile Element Projects</h1>
            <h6>Please sign in</h6>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus v-model="email">
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="password">
            <button class="btn btn-lg btn-primary btn-block" type="submit">
                Sign in
            </button>
        </form>
        <loader v-if="loading" />
    </div>
</template>

<script>
    import Loader from '../components/Loader.vue'


    export default {
        name: 'login',
        data(){
            return {
                email: null,
                password: null,
                error: false,
                loading: false
            }
        },
        methods: {
            login(){
                this.loading = true

                this.$auth.login({
                    params: {
                        email: this.email,
                        password: this.password
                    },
                    success: () => {
                        this.loading = false
                    },
                    error: () => {
                        this.loading = false
                        this.error = true
                    },
                    rememberMe: true,
                    redirect: '/',
                    fetchUser: true,
                });
            },
        },
        components: {
            Loader
        }
    }
</script>

<style scoped>
    html,
    body {
        height: 100%;
    }

    body {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
    }

    .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: auto;
    }
    .form-signin .checkbox {
        font-weight: 400;
    }
    .form-signin .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }
    .form-signin .form-control:focus {
        z-index: 2;
    }
    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>