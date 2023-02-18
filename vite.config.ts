import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path, { resolve } from 'path'
import SetEnvByCommandArg, { getCommandArgv } from 'vite-plugin-env-command';



// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  // 获取本地环境变量
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  console.log('config-env', process.env)
  return {
    plugins: [
      react(),
      SetEnvByCommandArg({
        key: "NODE_ENV",
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/Images/Icon/svg')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      })],
    build: {
      minify: 'terser', // 默认为esbuild
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境移除console
          drop_debugger: true // 生产环境移除debugger
        }
      }
    },
    server: {
      proxy: {
        "/api": {
          target: process.env.NODE_ENV && process.env.NODE_ENV === 'pro' ? 'prew_api' : process.env.VITE_APP_API,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    publicDir: "public",
    base: './',
    resolve: {
      alias: [//配置别名
        { find: '@', replacement: resolve(__dirname, 'src') }
      ],
      // 情景导出 package.json 配置中的exports字段
      conditions: [],
      // 导入时想要省略的扩展名列表
      // 不建议使用 .vue 影响IDE和类型支持
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
  }
})
