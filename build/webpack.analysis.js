const webpackConfig = require('./webpack.config') // 引入打包配置
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); // 引入webpack打包速度分析插件
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const smp = new SpeedMeasurePlugin(); // 实例化分析插件
const { merge } = require('webpack-merge') // 引入合并webpack配置方法

// hack webpack5 MiniCssExtractPlugin和新版SpeedMeasurePlugin插件冲突，需要先将MiniCssExtractPlugin先提取出来，再追加上去
const miniCssExtractPluginIndex = webpackConfig.plugins.findIndex(
    (e) => e.constructor.name === 'MiniCssExtractPlugin'
)
const miniCssExtractPlugin = webpackConfig.plugins[miniCssExtractPluginIndex]

const smpConfig = smp.wrap(merge(webpackConfig, {
    plugins: [
        new BundleAnalyzerPlugin() // 配置分析打包结果插件
    ]
}))

smpConfig.plugins[miniCssExtractPluginIndex] = miniCssExtractPlugin

module.exports = smpConfig