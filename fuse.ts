import { fusebox } from 'fuse-box'

const fuse = fusebox({
  entry: 'demo/index.tsx',
  target: 'browser',
  devServer: true,
  sourceMap: true,
  webIndex: {
    template: 'demo/index.html'
  }
})

//fuse.runDev()
fuse.runProd()
