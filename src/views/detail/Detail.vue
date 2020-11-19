<template>
    <div>
        <detail-navbar></detail-navbar>
        <detail-swiper :top-images="topImages"></detail-swiper>
    </div>
</template>

<script>
    import DetailNavbar from "./childComps/DetailNavbar";
    import {getDetail} from "../../network/Detail";
    import DetailSwiper from "./childComps/DetailSwiper";
    export default {
        name: "Detail",
        components: {DetailSwiper, DetailNavbar},
        data() {
            return {
                iid: null,
                topImages: []
            }
        },
        created() {
            this.iid = this.$route.params.id
            getDetail(this.iid).then(res => {
                this.topImages = res.result.itemInfo.topImages
                console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>