import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '32ywkl0n',
    dataset: 'production',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {
    autoUpdates: true,
    appId: 'wo9ut0462haed5ldrp5pwwl1',
  },
  // vite: (config) => {
  //   const root = config.root || process.cwd()
  //   return {
  //     ...config,
  //     build: {
  //       ...config.build,
  //       outDir: `${root}/dist`,
  //     },
  //   }
  // },
})
