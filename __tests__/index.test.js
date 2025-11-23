import genDiff from '../src/index.js'
import { describe, test, expect } from '@jest/globals'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import path from 'node:path'
import * as fs from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturesPath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturesPath(filename), 'utf-8')

const expectedStylish = readFile('expected-result.txt')
const expectedPlain = readFile('expected-plain.txt')

describe('Formatters', () => {
  const file1 = getFixturesPath('second-file1.json')
  const file2 = getFixturesPath('second-file2.json')

  describe('stylish format', () => {
    test('should format diff in stylish style', () => {
      const result = genDiff(file1, file2, 'stylish')
      expect(result).toEqual(expectedStylish)
    })

    test('stylish should be default format', () => {
      const result = genDiff(file1, file2)
      expect(result).toEqual(expectedStylish)
    })
  })

  describe('plain format', () => {
    test('should format diff in plain style', () => {
      const result = genDiff(file1, file2, 'plain')
      expect(result).toEqual(expectedPlain)
    })

    test('should handle complex values', () => {
      const result = genDiff(file1, file2, 'plain')

      expect(result).toContain('was added with value: [complex value]')
      expect(result).toContain('was updated. From [complex value] to \'str\'')
    })

    test('should handle nested properties', () => {
      const result = genDiff(file1, file2, 'plain')

      expect(result).toContain('\'common.setting6.doge.wow\'')
      expect(result).toContain('\'common.setting6.ops\'')
    })
  })

  test('should throw error for unknown format', () => {
    expect(() => genDiff(file1, file2, 'unknown')).toThrow('Unknown format: unknown')
  })

  describe('json format', () => {
    test('should format diff in json style', () => {
      const result = genDiff(file1, file2, 'json')

      expect(() => JSON.parse(result)).not.toThrow()

      const parsedResult = JSON.parse(result)
      expect(Array.isArray(parsedResult)).toBe(true)

      const commonNode = parsedResult.find(node => node.key === 'common')
      expect(commonNode).toBeDefined()
      expect(commonNode.type).toBe('nested')
      expect(Array.isArray(commonNode.children)).toBe(true)
    })

    test('should contain all node types', () => {
      const result = genDiff(file1, file2, 'json')
      const parsedResult = JSON.parse(result)

      const nodeTypes = parsedResult.map(node => node.type)
      expect(nodeTypes).toContain('nested')

      const commonNode = parsedResult.find(node => node.key === 'common')
      const commonChildrenTypes = commonNode.children.map(child => child.type)

      expect(commonChildrenTypes).toContain('added')
      expect(commonChildrenTypes).toContain('removed')
      expect(commonChildrenTypes).toContain('changed')
    })
  })
})
