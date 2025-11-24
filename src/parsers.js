import * as fs from 'node:fs'
import { cwd } from 'node:process'
import path from 'node:path'
import yaml from 'js-yaml'

const parseFiles = (filepath1, filepath2) => {
  const parseSingleFile = (filepath) => {
    const format = path.extname(filepath)
    const absolutePath = path.resolve(cwd(), filepath)
    const data = fs.readFileSync(absolutePath, 'utf-8')

    switch (format) {
      case '.json':
        return JSON.parse(data)
      case '.yml':
      case '.yaml':
        return yaml.load(data)
      default:
        throw new Error(`Unknown format ${format}`)
    }
  }

  const file1 = parseSingleFile(filepath1)
  const file2 = parseSingleFile(filepath2)
  return [file1, file2]
}

export default parseFiles
