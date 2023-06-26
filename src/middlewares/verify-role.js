import db from "../models"
export const isAdmin = async (req,res,next)=> {
    const role = req.user.role_code;

    if(role != 'R1'){
        return res.status(400).json({
            err:1,
            mes: 'Require Admin'
        })
    }
    next()
}


export const isAdminOrCreater = async (req,res,next)=> {
    const role = req.user.role_code;

    if(role != 'R1' && role != 'R2'){
        return res.status(400).json({
            err:1,
            mes: 'Require Admin or Creator'
        })
    }
    next()
}

