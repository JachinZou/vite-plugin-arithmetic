const { resolve, basename, extname } = require('path')
const { build } = require('vite')
const plugin = require('../dist/index.js')

async function run (path) {
  const entry = resolve(__dirname, path)
  const outputName = basename(entry, extname(entry))
  return await build({
    root: __dirname,
    plugins: [
      plugin({consoleCompare: true})
    ],
    build: {
      write: false,
      minify: true,
      lib: {
        entry,
        fileName: `${outputName}.res`,
        // name: outputName,
        formats: ['es']
      }
    },
  })
}

run('basic/index.js').then(dd => {
  console.log(dd[0].output[0].code, '结束')
})

