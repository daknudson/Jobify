import React from 'react'
import { UnAuthenticatedError } from '../errors/index.js'
const checkPermissions = (requestUser, resourceUserId) => {
    if (requestUser.userId === resourceUserId.toString()) return
 throw new UnAuthenticatedError('You must have authorization to do this')
}

export default checkPermissions