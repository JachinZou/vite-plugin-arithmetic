import { resolve, dirname, basename, extname } from 'path'
import { fileURLToPath } from 'url'
import { build } from 'vite'
import plugin from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function run (path) {
  const entry = resolve(__dirname, path)
  const outputName = basename(entry, extname(entry))
  return await build({
    root: __dirname,
    plugins: [
      plugin()
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

const dd = await run('basic/index.js')

console.log(dd[0].output[0].code, '结束')
