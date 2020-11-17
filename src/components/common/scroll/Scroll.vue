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
                default() {
                    return 1
                }
            }
        },
        data() {
            return {
                bs: null
            }
        },
        mounted() {
            setTimeout(()=>{
                //创建scroll对象
                this.bs = new BScroll(this.$refs.wrapper,{
                    click: true,
                    probeType: this.probeType
                })
                console.log(this.bs);
                //监听滚动位置（probeType=3）
                this.bs.on('scroll',(position) => {
                    this.$emit('contentScroll',position);
                })
            },1000)
            this.$nextTick(() => {
            })//$nextTick不好使，不能保证slot内的dom加载完毕后才执行,BScroll需要在dom加载完毕后创建（内部需要计算content的高度）
        },
        methods: {
            scrollTo(x,y,time=500) {
                this.bs.scrollTo(x,y,time)
            }
        }
    }
</script>

<style scoped>

</style>