module.exports = {
    configureWebpack: {
        name:'商城',
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'store': '@/store',
                'views': '@/views',
                'network': '@/network',
                'common': '@/common',
            }
        }
    }
}