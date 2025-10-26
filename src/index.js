import parseFiles from '../src/parsers.js'
import _ from 'lodash'

const getSortedKeys = (files) => {
  const keys = files.flatMap(file => Object.keys(file))
  const uniqKeys = _.uniq(keys)
  const sortedKeys = _.sortBy(uniqKeys)
  return sortedKeys
}

export const genDiff = (filepath1, filepath2) => {
  const [obj1, obj2] = parseFiles(filepath1, filepath2)
  const allKeys = getSortedKeys([obj1, obj2])

  const result = allKeys.flatMap((key) => {
    const inObj1 = key in obj1
    const inObj2 = key in obj2

    if (inObj1 && inObj2) {
      if (obj1[key] === obj2[key]) {
        return [`  ${key}: ${obj1[key]}`]
      }
      else {
        return [
          `- ${key}: ${obj1[key]}`,
          `+ ${key}: ${obj2[key]}`,
        ]
      }
    }
    else if (inObj1) {
      return [`- ${key}: ${obj1[key]}`]
    }
    else {
      return [`+ ${key}: ${obj2[key]}`]
    }
  })
  return `{\n${result.join('\n')}\n}\n`
}
