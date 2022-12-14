const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./paths');
const getClientEnvironment = require('./env');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin'); 

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';

const env = getClientEnvironment();

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: {}
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // 处理css兼容问题
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env']
        },
      }
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        lessOptions: {
          modifyVars: {
            'primary-color': 'rgb(145, 85, 253)',
            'layout-header-background': 'rgb(255, 255, 255)',
            'antd-layout': 'rgb(255, 255, 255)',
            '@border-color-split': 'rgba(58, 53, 65, 0.12)',
            '@menu-highlight-color': 'rgba(58, 53, 65, 0.87)',
            '@border-radius-base': '6px'
          },
          javascriptEnabled: true,
      }
      }
     
    });
  }
  return loaders;
};


// const getStyleLoaders = (prevLoader, module) => {
//   return [
//     // 生产环境将css单独抽取成文件，开发环境直接只用 style-loader
//     'style-loader',
//     // 开发环境缓存css文件
//     !isEnvProduction && 'cache-loader',
//     {
//       loader: 'css-loader',
//       options: {
//         modules: {
//           localIdentName: isEnvProduction ? '[hash:base64:5]' : '[name]__[local]--[hash:base64:5]',
//            // 驼峰化对象，并保留原始key 比如 userAge user-age都可用
//            exportLocalsConvention: 'camelCaseOnly',
//         },
//         importLoaders: 1,
//       },
//     },
//     {
//       // 处理css兼容问题
//       loader: 'postcss-loader',
//       options: {
//         postcssOptions: {
//           plugins: ['postcss-preset-env']
//         }
//       }
//     },
//     {
//       loader: prevLoader,
//       options: { 
//         lessOptions: {
//           javascriptEnabled: true,
//         }
//       }
//     }
//   ].filter(Boolean)
// }




module.exports =  {
  mode: isEnvProduction ? 'production' : 'development',
  devtool: isEnvProduction ? false : 'cheap-module-source-map',
  entry: {
    index: path.join(paths.appSrc, 'index.tsx'),
  },
  output: {
    path: paths.appBuild,
    filename: isEnvProduction
    ? 'static/js/[name].[contenthash:8].js'
    : 'static/js/[name].js',
    chunkFilename: isEnvProduction ? 'static/js/[name].[contenthash:10].chunk.js' : 'static/js/[name].chunk.js',
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/admin/' // 打包后文件的公共前缀路径
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'], // add .tsx, .ts
    alias: {
      '@': paths.appSrc
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
        }),
        sideEffects: true,
      },
      {
        test: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
          modules: {
            localIdentName: isEnvProduction ? '[hash:base64:5]' : '[name]__[local]--[hash:base64:5]',
             // 驼峰化对象，并保留原始key 比如 userAge user-age都可用
             exportLocalsConvention: 'camelCaseOnly',
          },
        }),
      },
      {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 2,
          },
          'less-loader'
        ),
        sideEffects: true,
      },
      {
        test: lessModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 2,
            modules: {
              localIdentName: isEnvProduction ? '[hash:base64:5]' : '[name]__[local]--[hash:base64:5]',
               // 驼峰化对象，并保留原始key 比如 userAge user-age都可用
               exportLocalsConvention: 'camelCaseOnly',
            },
          },
          'less-loader'
        ),
      },
      {
        test:/.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024, // 小于10kb转base64位
          }
        },
        generator: {
          filename:'images/[name].[hash][ext]', // 文件输出目录和命名
        }
      },
      // ...
      {
        test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'font/[name].[hash][ext]', // 文件输出目录和命名
        },
      },
      {
        test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'media/[name].[hash][ext]', // 文件输出目录和命名
        },
      },

    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.appPublic, 'index.html')
    }),
    isEnvProduction &&
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new webpack.DefinePlugin(env.stringified),
    !isEnvProduction && new ReactRefreshWebpackPlugin(),
    isEnvProduction && new CompressionPlugin(), 	
  ].filter(Boolean),



  optimization: {
    runtimeChunk: true,
    moduleIds: 'deterministic',
    usedExports:true,
    minimize:true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
           parallel: 4,
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // react react-dom react-router-dom 一起打包
        react: {
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          name:'chunk-react',
          // 优先级，打包 react 相关依赖时，不会被打入 node_modules 中的chunk
          priority: 10
        },
        // node_modules 单独打包
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name:'chunk-libs',
          priority: 1
        }
      }
    },
  },

  cache: {
    type: 'filesystem', // 使用文件缓存
  },

  devServer: {
    host: 'localhost',
    port: 8088,
    open: true,
    hot: true,
    // 使用 index.html 代替所有404页面，解决使用H5的history API刷新页面导致404的问题
    historyApiFallback: true,
  },
}
