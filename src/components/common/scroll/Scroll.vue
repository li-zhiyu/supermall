<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        props: {
            probeType: {
                type: Number,
                default: 1,//如果为数字或者对象要用函数default() {return []}
            },
            pullUpLoad: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                bs: null
            }
        },
        created() {
            //方案三：监听图片加载事件
            this.$bus.$on('itemImageLoad',() => {
                if (!this.bs) {
                    //创建scroll对象
                    this.bs = new BScroll(this.$refs.wrapper,{
                        click: true,//点击事件
                        probeType: this.probeType,//滚动监听
                        pullUpLoad: this.pullUpLoad,//上拉监听
                        pullDownRefresh: false,//下拉监听
                    })
                    console.log(this.bs);
                    //监听滚动位置（probeType=3）
                    this.bs.on('scroll',(position) => {
                        this.$emit('contentScroll',position);
                    });
                    this.bs.on('pullingUp',() => {
                        this.$emit('pullingUp');
                    })
                }
            })
        },
        mounted() {
            //方案一：通过延迟保证dom加载完毕再创建BScroll
            // setTimeout(()=>{
            //     //创建scroll对象
            //     this.bs = new BScroll(this.$refs.wrapper,{
            //         click: true,//点击事件
            //         probeType: this.probeType,//滚动监听
            //         pullUpLoad: this.pullUpLoad,//上拉监听
            //         pullDownRefresh: false,//下拉监听
            //     })
            //     console.log(this.bs);
            //     //监听滚动位置（probeType=3）
            //     this.bs.on('scroll',(position) => {
            //         this.$emit('contentScroll',position);
            //     });
            //     this.bs.on('pullingUp',() => {
            //         this.$emit('pullingUp');
            //     })
            // },1000)
            // //方案二：$nextTick不好使，放弃
            // this.$nextTick(() => {
            // })//$nextTick不好使，不能保证slot内的dom加载完毕后才执行,BScroll需要在dom加载完毕后创建（内部需要计算content的高度）

        },
        methods: {
            scrollTo(x,y,time=500) {
                this.bs && this.bs.scrollTo(x,y,time)
            },
            pullUpFinished() {
                console.log('pullUpFinished');
                this.bs && this.bs.finishPullUp()
            },
            refresh() {
                console.log('refresh');
                this.bs && this.bs.refresh();
            }

        }
    }
</script>

<style scoped>

</style>