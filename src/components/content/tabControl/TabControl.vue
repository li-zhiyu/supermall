<template>
    <div class="tab-control">
        <div v-for="item in titles" class="tab-control-item">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        props: {
            titles: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>

    .tab-control {
        height: 44px;
        line-height: 44px;
        display: flex;
        text-align: center;
        font-size: 15px;
    }
    .tab-control-item {
        flex: 1;
    }
</style>