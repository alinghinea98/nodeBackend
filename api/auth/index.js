import { Router } from 'express'

import { password, token } from '../../services/passport'
import actions from './controller'

const router = new Router()

/**
 * @api {post} /auth Authenticate
 * @apiName Authenticate
 * @apiGroup Auth
 * @apiPermission basic
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {User} user Current user's data.
 * @apiError 401 Invalid credentials.
 **/
router.post('/', password(), actions.login)

/**
 * @api {get} /auth/checkJWT Check JWT Validity
 * @apiName Check JWT Validity
 * @apiGroup Auth
 * @apiPermission token
 * @apiParam {String} access_token access_token.
 * @apiSuccess (Success 200) {String} result OK
 * @apiError 401 Invalid token.
 **/
router.get('/checkJWT', token({ required: true }), actions.checkJWT)

/**
 * @api {get} /auth/renewJWT Renew JWT
 * @apiName Renew JWT
 * @apiGroup Auth
 * @apiPermission token
 * @apiParam {String} access_token access_token.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {User} user Current user's data.
 * @apiError 401 Invalid token.
 **/
router.get('/renewJWT', token({ required: true }), actions.login)
export default router
