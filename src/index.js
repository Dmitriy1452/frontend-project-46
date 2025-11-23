import parseFiles from '../src/parsers.js'
import { buildTree } from '../src/buildTree.js'
import stylish from '../src/formatters/stylish.js'

export const genDiff = (filepath1, filepath2, formatter = stylish) => {
  const [obj1, obj2] = parseFiles(filepath1, filepath2)

  const tree = buildTree(obj1, obj2)
  return formatter(tree)
}
