import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import { simple } from 'acorn-walk'
import { generate } from 'escodegen'

// function gen
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default function (options) {
  const virtualModuleId = 'virtual:calc'
  const resolvedVirtualModuleId = '\0' + virtualModuleId
  const calcContent = readFileSync(resolve(__dirname, 'calc.js'), 'utf-8')
  const random = Math.random().toString().slice(2, 10)
  const methods = {
    '+': `$$add_${random}`,
    '-': `$$sub_${random}`,
    '*': `$$mul_${random}`,
    '/': `$$div_${random}`,
  }
  return {
    name: 'vite-plugin-arithmetic',
    resolveId (id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load (id) {
      if (id === resolvedVirtualModuleId) {
        return calcContent
      }
    },
    transform: {
      enforce: 'pre',
      handler (code, id) {
        if (id === resolvedVirtualModuleId) {
          return
        }
        const usedMethods = new Set()
        const ast = this.parse(code)
        simple(ast, {
          // Literal(node) {
          //   console.log('node',node)
          // },
          BinaryExpression(node) {
            const funName = methods[node.operator]
            usedMethods.add(funName)
            node.type = 'CallExpression'
            node.callee = { type: 'Identifier', name: funName }
            node.arguments = [ node.left, node.right ]
            delete node.left
            delete node.right
          },
          CallExpression(node) {
            // console.log('node', node)
            const isConsolLog = node.callee.object?.name === 'console' && node.callee.property?.name === 'log'
            const isLogExpression = node.arguments.some(n => {
              return n.type === 'CallExpression' && n.operator
            })
            if (isConsolLog && isLogExpression) {
              node.arguments.push({
                type: 'Literal',
                value: generate(node),
                raw: `'${generate(node)}'`
              })
            }
          }
        })
        const usedMehtodsList = Array.from(usedMethods).map(func => {
          return `${func.match(/[a-z]+/)[0]} as ${func}`
        })
        const resultCode = `import { ${usedMehtodsList.join(', ')} } from '${virtualModuleId}'\n${generate(ast)}`
        return resultCode
      }
    }
  }
}
