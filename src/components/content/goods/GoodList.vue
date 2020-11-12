<template>
    <div class="goods">
        <good-item v-for="item in goods" :goods-item="item"></good-item>
    </div>
</template>

<script>
    import GoodItem from "./GoodItem";
    export default {
        name: "GoodList",
        components: {GoodItem},
        props: {
            goods:{
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
.goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>