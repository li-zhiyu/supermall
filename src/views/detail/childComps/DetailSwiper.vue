<template>
    <swiper class="detail-swiper" ref="swiper">
        <swiper-item v-for="item in TopImages">
            <img :src="item" @load="imageLoad">
        </swiper-item>
    </swiper>
</template>

<script>
    import {Swiper,SwiperItem} from "components/common/swiper";
    export default {
        name: "DetailSwiper",
        components: {Swiper,SwiperItem},
        props: {
            TopImages: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                isLoad: false
            }
        },
        methods: {
            imageLoad() {
                if (!this.isLoad) {
                    this.$refs.swiper.addSlide();
                    this.isLoad = true;
                }
            }
        }
    }
</script>

<style scoped>
    .detail-swiper {
        height: 300px;
        overflow: hidden;
    }
</style>