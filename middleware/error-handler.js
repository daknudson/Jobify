import { StatusCodes } from "http-status-codes";



const errorHandler = (err, req, res, next) => {
   
const defaultError = {
    statusCodes: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something Went Wrong, try again later'
}
if (err.name === "ValidationError") {
    defaultError.statusCodes = StatusCodes.BAD_REQUEST
    defaultError.msg = Object.values(err.errors).map((item) => item.message).join(',')
}
if(err.code === 11000){
    defaultError.statusCodes = StatusCodes.BAD_REQUEST
    defaultError.msg = `That ${Object.keys(err.keyValue)} is already in use`
}
res.status(defaultError.statusCodes).json({msg: defaultError.msg})
}

export default errorHandler