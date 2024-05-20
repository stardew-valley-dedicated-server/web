import * as path from 'node:path'
import * as fs from 'node:fs'

export default eventHandler(async (event) => {
  const filePath = path.join(process.cwd(), 'public', 'server', 'Data', 'positions.json')
  return await fs.promises.readFile(filePath, 'utf-8')
})
