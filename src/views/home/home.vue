<template>
    <div>
        <nav-bar class="home-nav">
            <div slot="center">精选</div>
        </nav-bar>
        <home-swiper :banners="banners"/>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper";
    import {getHomeMultiData} from "network/Home";

    export default {
        name: "home",
        components: {HomeSwiper, NavBar},
        data() {
            return {
                banners: [],
                recommends:[]
            }
        },
        created() {
            getHomeMultiData().then(res => {
                    this.banners = res.data.banner.list
                    this.recommends = res.data.recommend.list
                }
            );
        }
    }
</script>

<style scoped>
.home-nav {
    background-color: #ff8198;
}
</style>