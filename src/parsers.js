import * as fs from 'node:fs'
import { cwd } from 'node:process'
import path from 'node:path'
import yaml from 'js-yaml'

export const parseJSON = (filepath1, filepath2) => {
  const readFile1 = JSON.parse(fs.readFileSync(path.resolve(cwd(), filepath1)).toString())
  const readFile2 = JSON.parse(fs.readFileSync(path.resolve(cwd(), filepath2)).toString())
  const result = [readFile1, readFile2]
  return result
}

export const parseYAML = (filepath) => {
  try {
    const parsedFile = yaml.load(fs.readFileSync(filepath, 'utf-8'))
    return parsedFile
  }
  catch (error) {
    console.log(error)
    return null
  }
}
