import { genDiff } from '../src/index.js'
import { test, expect } from '@jest/globals'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import path from 'node:path'
import * as fs from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturesPath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturesPath(filename), 'utf-8')

test('Comparing two files', () => {
  const file1 = getFixturesPath('file1.json')
  const file2 = getFixturesPath('file2.json')
  const expected = readFile('expected-result.txt')
  const result = genDiff(file1, file2)

  expect(result).toEqual(expected)
})
