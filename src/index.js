import parseFiles from '../src/parsers.js'
import { buildTree } from '../src/buildTree.js'
import getFormatter from '../src/formatters/index.js'

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const [obj1, obj2] = parseFiles(filepath1, filepath2)

  const tree = buildTree(obj1, obj2)
  const formatter = getFormatter(formatName)
  return formatter(tree)
}
export default genDiff
