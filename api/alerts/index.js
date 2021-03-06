import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'

import { token } from '../../services/passport'
import { actions } from './controller'
import { schema } from './model'

const router = new Router()
router.get('/', token({ required: true }), query(schema.query), actions.get)

router.post('/', token({ required: true }), body(schema.create), actions.create)

router.put('/:id', token({ required: true }), body(schema.update), actions.update)

export default router
