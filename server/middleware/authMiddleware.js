import jwt from 'jsonwebtoken'

export const authToken = (req,res,next) => {
    try {
        const token = req.cookies.token
        if (!token) {
           return res.send({status: false , message: 'token not found!'})
        }

        const existUser = jwt.verify(token,"asdvfgqdfge3445454g5y")

        req.userId = existUser.useId
        
        next()

    } catch (error) {
        console.log(error.message);
        res.send({status: false , message: error.message})     
    }
}