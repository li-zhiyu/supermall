<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">精选</div>
        </nav-bar>
        <home-swiper :banners="banners"/>
        <recommend-view :recommends="recommends"/>
        <feature-view/>
        <tab-control :titles="['流行','新款','精选']"/>
        <ul>
            <li>1111</li>
            <li>1111</li>
            <li>1111</li>
            <li>1111</li>
            <li>1111</li>
            <li>1111</li>
            <li>1111</li>
        </ul>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import {getHomeMultiData} from "network/home";
    import FeatureView from "./childComps/FeatureView";
    import TabControl from "../../components/content/tabControl/TabControl";

    export default {
        name: "home",
        components: {TabControl, FeatureView, RecommendView, HomeSwiper, NavBar},
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
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }
    #home {
        margin-top: 44px;
    }
</style>