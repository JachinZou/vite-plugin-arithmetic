import { resolve, dirname, extname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import { simple } from 'acorn-walk'
import { generate } from 'escodegen'

const virtualModuleId = 'virtual:calc'
const resolvedVirtualModuleId = '\0' + virtualModuleId
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const random = Math.random().toString().slice(2, 10)
const methods = {
  '+': `$$add_${random}`,
  '-': `$$sub_${random}`,
  '*': `$$mul_${random}`,
  '/': `$$div_${random}`,
  '+=': `$$add_${random}`,
  '-=': `$$sub_${random}`,
  '*=': `$$mul_${random}`,
  '/=': `$$div_${random}`,
}

function transformCode (code, options) {
  const usedMethods = new Set()
  const ast = this.parse(code, { comment: true })
  const walkOption = {
    BinaryExpression(node) {
      const funName = methods[node.operator]
      if (!funName) return
      usedMethods.add(funName)
      node.type = 'CallExpression'
      node.callee = { type: 'Identifier', name: funName }
      node.arguments = [ node.left, node.right ]
      delete node.left
      delete node.right
    },
    AssignmentExpression(node) {
      const funName = methods[node.operator]
      if (!funName) return
      usedMethods.add(funName)
      const right = node.right
      node.right = {
        type: 'CallExpression',
        operator: node.operator,  // 标记
        callee: { type: 'Identifier', name: funName },
        arguments: [ node.left, right ]
      }
      node.operator = '='
    }
  }
  if (options.consoleCompare) {
    walkOption.CallExpression = (node) => {
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
  }
  simple(ast, walkOption)
  const usedMehtodsList = Array.from(usedMethods).map(func => {
    return `${func.match(/[a-z]+/)[0]} as ${func}`
  })
  const resultCode = `import { ${usedMehtodsList.join(', ')} } from '${virtualModuleId}'\n${generate(ast, { format: { quotes: 'double', indent: { style: '  ' } } })}`
  return resultCode
}

export default function (options = {}) {
  const calcContent = readFileSync(resolve(__dirname, `calc.mjs`), 'utf-8')
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
    transform(code, id) {
      const isScript = /^\.[jt]s/.test(extname(id))
      const isNodeModules = /node_modules/.test(id)
      const isVue = /^\.vue$/.test(extname(id))
      if (id === resolvedVirtualModuleId || (!isScript && !isVue) || isNodeModules) {
        return
      }
      return transformCode.call(this, code, options)
    }
  }
}
