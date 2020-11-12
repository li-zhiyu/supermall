<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles"
             class="tab-control-item"
             :class="{active: currentIndex===index}"
             @click="itemClick(index)">
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
        },
        data() {
            return {
                currentIndex: 0
            }
        },
        methods:{
            itemClick(index) {
                this.currentIndex = index;
                this.$emit('tabClick',index);
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
        background-color: #f6f6f6;
    }
    .tab-control-item {
        flex: 1;
    }
    .tab-control-item span {
        padding: 3px;
    }
    .active span {
        color: #ff8198;
        border-bottom: solid 2px;
    }
</style>