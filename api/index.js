import { Router } from 'express'
import { readdirSync, statSync } from 'fs'
import path from 'path'

const router = new Router()
readdirSync(__dirname)
  .filter(f => !f.startsWith('_'))
  .map(f => ({
    name: f,
    module: path.join(__dirname, f)
  }))
  .filter(a => statSync(a.module).isDirectory())
  .forEach(a => {
    router.use(`/${a.name}`, require(a.module).default)
  })

export default router
