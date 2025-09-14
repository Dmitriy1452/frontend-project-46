import * as fs from 'node:fs'
import { cwd } from 'node:process'
import path from 'node:path'

export const file = (filepath1, filepath2) => {
    const readFile1 = JSON.parse(fs.readFileSync(path.resolve(cwd(), filepath1)).toString())
    const readFile2 = JSON.parse(fs.readFileSync(path.resolve(cwd(), filepath2)).toString())
    return [readFile1, readFile2]
}
