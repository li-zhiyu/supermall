<template>
    <div class="detail">
        <detail-navbar/>
        <scroll class="content">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
        </scroll>
    </div>
</template>

<script>
    import DetailNavbar from "./childComps/DetailNavbar";
    import {getDetail, Goods, Shop} from "../../network/detail";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import Scroll from "../../components/common/scroll/Scroll";
    export default {
        name: "Detail",
        components: {Scroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavbar},
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {}
            }
        },
        created() {
            this.iid = this.$route.params.id
            getDetail(this.iid).then(res => {
                let data = res.result;
                console.log(data);
                //保存顶部轮播图
                this.topImages = data.itemInfo.topImages
                //保存商品基本信息
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
                //保存店铺信息
                this.shop = new Shop(data.shopInfo);
            })
        }
    }
</script>

<style scoped>
    .detail {
        position: relative;
        z-index: 9;
        background-color: #ffffff;
        height: 100vh;
    }
    .content {
        position: absolute;
        top: 44px;
        left: 0;
        right: 0;
        overflow: hidden;
    }

</style>