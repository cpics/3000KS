module.exports = {
    transpileDependencies: ['vue-echarts', 'resize-detector'],
    publicPath: 'h5',
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [],
        },
    },
    chainWebpack: config => {
        config.resolve.alias.set('vue$', 'vue/dist/vue.js');
    },
};
