<template>
        <tr>
            <th>{{ heading }}</th>
            <td>
                <input :type="inputType"
                       class="form-control form-control-sm"
                       :placeholder="placeholder"
                       :value="value"
                       @input="(e) => $emit('input', e.target.value)"
                >
            </td>
        </tr>
</template>

<script>
    export default {
        name: "server-form-row",
        props: {
            heading: String,
            value: String,
            placeholder: String,
            inputType: {
                type: String,
                default: 'text'
            }
        },
    }
</script>

<style scoped>

</style>