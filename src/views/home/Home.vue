<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">精选</div>
        </nav-bar>
        <scroll class="content"
                ref="content"
                :probe-type="3"
                @contentScroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
            <home-swiper :banners="banners"/>
            <recommend-view :recommends="recommends"/>
            <feature-view/>
            <tab-control class="home-tab-control"
                         :titles="['流行','新款','精选']"
                         @tabClick="tabClick"/>
            <good-list :goods="showGoods"/>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import {getHomeMultiData,getHomeGoods} from "network/home";
    import FeatureView from "./childComps/FeatureView";
    import TabControl from "../../components/content/tabControl/TabControl";
    import GoodList from "../../components/content/goods/GoodList";
    import Scroll from "../../components/common/scroll/Scroll";
    import BackTop from "../../components/content/backTop/BackTop";

    export default {
        name: "home",
        components: {BackTop, Scroll, GoodList, TabControl, FeatureView, RecommendView, HomeSwiper, NavBar},
        data() {
            return {
                banners: [],
                recommends:[],
                goods: {
                    'pop': {page: 0,list: []},
                    'new': {page: 0,list: []},
                    'sell': {page: 0,list: []},
                },
                currentType: 'pop',
                isShowBackTop: false
            }
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        created() {
            //请求首页推荐轮播，推荐等数据
            this.getHomeMultiData();
            //请求商品数据
            this.getHomeGoods('new');
            this.getHomeGoods('pop');
            this.getHomeGoods('sell');
        },
        mounted() {
            const refresh = this.debounce(this.$refs.content.refresh,300);
            const pullUpFinished = this.debounce(this.$refs.content.pullUpFinished,300);
            //监听事件,图片加载完后刷新BScroll里的内容，结束本次上拉，下次上拉才会触发pullingUp
            this.$bus.$on('itemImageLoad',() => {
                if (this.$refs.content) {
                    pullUpFinished();
                    refresh();
                }
            })
        },
        methods: {
            /**
             * 网络请求相关
             */
            getHomeMultiData() {
                getHomeMultiData().then(res => {
                        this.banners = res.data.banner.list
                        this.recommends = res.data.recommend.list
                    }
                )
            },
            getHomeGoods(type) {
                const page = this.goods[type].page+1
                getHomeGoods(type,page).then(res => {
                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page=page
                    // console.log(this.goods[type]);
                })
            },
            /**
             * 事件监听相关
             */
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop';
                        break;
                    case 1:
                        this.currentType = 'new';
                        break;
                    case 2:
                        this.currentType = 'sell';
                        break;
                }
            },
            backClick() {
                this.$refs.content.scrollTo(0,0)
            },
            contentScroll(position) {
                this.isShowBackTop = (-position.y) > 800;
            },
            loadMore() {
                this.getHomeGoods(this.currentType);
            },
            /**
             * 防抖函数
             */
            debounce(func,delay) {
                let timer = null;
                return function(...args) {
                    if (timer) {
                        clearTimeout(timer)
                    }
                    timer = setTimeout(() => {
                        func.apply(this,args)
                    },delay)
                }
            }
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
        height: 100vh;
    }
    .home-tab-control {
        position: sticky;
        top: 44px;
        z-index: 9;
    }
    .content {
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
        overflow: hidden;
    }
</style>