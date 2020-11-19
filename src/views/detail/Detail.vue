<template>
    <div>{{iid}}</div>
</template>

<script>
    export default {
        name: "Detail",
        data() {
            return {
                iid: null
            }
        },
        activated() {
            this.iid = this.$route.params.id
            console.log(this.iid);
        }
    }
</script>

<style scoped>

</style>