import * as fs from 'node:fs'
import { cwd } from 'node:process'
import path from 'node:path'
import yaml from 'js-yaml'

const parseFiles = (filepath1, filepath2) => {
  const parseSingleFile = (filepath) => {
    const format = path.extname(filepath)
    const absolutePath = path.resolve(cwd(), filepath)
    const data = fs.readFileSync(absolutePath, 'utf-8')

    if (format === '.json') {
      return JSON.parse(data)
    }
    else if (format === '.yml' || format === '.yaml') {
      return yaml.load(data)
    }
    else {
      throw new Error(`Неподдерживаемый формат: ${format}`)
    }
  }

  const file1 = parseSingleFile(filepath1)
  const file2 = parseSingleFile(filepath2)
  return [file1, file2]
}

export default parseFiles
