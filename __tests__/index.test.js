import { genDiff } from '../src/index.js'
import { describe, test, expect } from '@jest/globals'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import path from 'node:path'
import * as fs from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturesPath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturesPath(filename), 'utf-8')

test('Comparing JSON files', () => {
  const file1 = getFixturesPath('file1.json')
  const file2 = getFixturesPath('file2.json')
  const expected = readFile('expected-result.txt')
  const result = genDiff(file1, file2)

  expect(result).toEqual(expected)
})

describe('Compare YAML files', () => {
  test('Compare with ".yml" extension', () => {
    const file1 = getFixturesPath('file1.yml')
    const file2 = getFixturesPath('file2.yml')
    const expected = readFile('expected-reuslt.txt')
    const result = genDiff(file1, file2)

    expect(result).toEqual(expected)
  })

  test('Compare with ".yaml" extension', () => {
    const file1 = getFixturesPath('file1.yaml')
    const file2 = getFixturesPath('file2.yaml')
    const expected = readFile('expected-result.txt')
    const result = genDiff(file1, file2)

    expect(result).toEqual(expected)
  })
})
