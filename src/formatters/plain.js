const stringify = (value) => {
  if (value === null) {
    return 'null'
  }

  if (typeof value === 'object') {
    return '[complex value]'
  }

  if (typeof value === 'string') {
    return `'${value}'`
  }

  return String(value)
}

const buildPath = (path, key) => (path ? `${path}.${key}` : key)

const plain = (tree) => {
  const iter = (nodes, path) => {
    const lines = nodes
      .map((node) => {
        const currentPath = buildPath(path, node.key)

        switch (node.type) {
          case 'added':
            return `Property '${currentPath}' was added with value: ${stringify(node.value)}`
          case 'removed':
            return `Property '${currentPath}' was removed`
          case 'changed':
            return `Property '${currentPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`
          case 'nested':
            return iter(node.children, currentPath)
          case 'unchanged':
            return null
          default:
            throw new Error(`Unknown node type: ${node.type}`)
        }
      })
      .filter(line => line !== null)

    return lines.join('\n')
  }

  return iter(tree, '') + '\n'
}

export default plain
