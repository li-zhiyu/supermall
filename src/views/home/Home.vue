<template>
    <div>
        <nav-bar class="home-nav">
            <div slot="center">精选</div>
        </nav-bar>
        <home-swiper :banners="banners"/>
        <recommend-view :recommends="recommends"/>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import {getHomeMultiData} from "network/home";

    export default {
        name: "home",
        components: {RecommendView, HomeSwiper, NavBar},
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