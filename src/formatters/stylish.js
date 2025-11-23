import _ from 'lodash'

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount)
const currentIndent = (depth, shiftLeft = 2) => ' '.repeat(depth * 4 - shiftLeft)

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    if (value === null) return 'null'
    if (value === '') return ''
    return String(value)
  }

  const lines = Object.entries(value).map(
    ([key, val]) => `${indent(depth + 1)}${key}: ${stringify(val, depth + 1)}`,
  )

  return `{\n${lines.join('\n')}\n${indent(depth)}}`
}

const stylish = (tree) => {
  const iter = (nodes, depth) => {
    const lines = nodes.map((node) => {
      const { key, type } = node

      switch (type) {
        case 'added':
          return `${currentIndent(depth)}+ ${key}: ${stringify(node.value, depth)}`
        case 'removed':
          return `${currentIndent(depth)}- ${key}: ${stringify(node.value, depth)}`
        case 'changed':
          return [
            `${currentIndent(depth)}- ${key}: ${stringify(node.value1, depth)}`,
            `${currentIndent(depth)}+ ${key}: ${stringify(node.value2, depth)}`,
          ].join('\n')
        case 'unchanged':
          return `${currentIndent(depth)}  ${key}: ${stringify(node.value, depth)}`
        case 'nested':
          return `${currentIndent(depth)}  ${key}: ${iter(node.children, depth + 1)}`
        default:
          throw new Error(`Unknown node type: ${type}`)
      }
    })

    return `{\n${lines.join('\n')}\n${indent(depth - 1)}}`
  }

  return iter(tree, 1) + '\n'
}

export default stylish
