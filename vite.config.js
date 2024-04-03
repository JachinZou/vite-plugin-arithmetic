import { builtinModules } from 'module'
import { defineConfig } from 'vite'

import pkg from './package.json'

export default defineConfig({
  build: {
    target: 'node14',
    emptyOutDir: true,
    minify: false,
    lib: {
      entry: ['src/index.js', 'src/calc.js'],
      fileName: format => (format === 'es' ? '[name].mjs' : '[name].js'),
      // name: outputName,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [
        ...builtinModules,
        ...Object.keys(
          'dependencies' in pkg ? pkg.dependencies : {}
        ),
      ]
    }
  },
})
