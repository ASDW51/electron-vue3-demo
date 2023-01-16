import { defineConfig,loadEnv,PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from "vite-plugin-electron"
function loadEnvPlugin(): PluginOption {
  return {
    name: 'vite-plugin-load-env',
    config(config, env) {
      console.log(env.mode)
      const root = config.root ?? process.cwd()
      console.log(root)
      const result:Record<string,string> = loadEnv(env.mode, root)
      // Remove the vite-plugin-electron injected env.
      delete result.VITE_DEV_SERVER_URL
      console.log(result)
      let res = {}
      for(let key in result){
          res[`process.env.${key}`] = JSON.stringify(result[key])
          env[key] = JSON.stringify(result[key])
      }
      config.esbuild ??= {}
      config.esbuild.define = {
        ...config.esbuild.define,
        ...res
      }
    },
  }
}
// console.log(process.env) 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron([
      {
        entry:"electron-main/index.ts",
        vite:{
          plugins:[
            loadEnvPlugin()
          ]
        }
      },
      {
        entry:"electron-main/preload.ts",
        onstart(options){
          options.reload()
        }
      }
    ])
  ],
})
