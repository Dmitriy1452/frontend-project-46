import _ from 'lodash'

export const nodeTypes = {
  ADDED: 'added',
  REMOVED: 'removed',
  CHANGED: 'changed',
  UNCHANGED: 'unchanged',
  NESTED: 'nested',
}

const buildTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  const sortedKeys = _.sortBy(_.union(keys1, keys2))

  return sortedKeys.map((key) => {
    const value1 = obj1[key]
    const value2 = obj2[key]

    if (!_.has(obj2, key)) {
      return {
        key,
        type: nodeTypes.REMOVED,
        value: value1,
      }
    }

    if (!_.has(obj1, key)) {
      return {
        key,
        type: nodeTypes.ADDED,
        value: value2,
      }
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: nodeTypes.NESTED,
        children: buildTree(value1, value2),
      }
    }

    if (!_.isEqual(value1, value2)) {
      return {
        key,
        type: nodeTypes.CHANGED,
        value1,
        value2,
      }
    }

    return {
      key,
      type: nodeTypes.UNCHANGED,
      value: value1,
    }
  })
}

export { buildTree }
