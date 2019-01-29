<template>
    <div :style="{backgroundColor: color}" class="block" v-show="color"></div>
</template>

<script>
    export default {
        name: "color-block",
        props: ['color']
    }
</script>

<style scoped>
    .block {
        width: 15px;
        height: 15px;
        margin: 0 3px;
    }
</style>