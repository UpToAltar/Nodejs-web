import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const hashPassword = password => bcrypt.hashSync(password,bcrypt.genSaltSync(7) );

export const register = ({username,email,password}) => new Promise (async (resolve, reject) => {
    try {
        let [user, created] = await db.User.findOrCreate({
            where: {email: email},
            defaults : {
                username:username,
                email: email,
                password: hashPassword(password),
            } 
        })

        const token = created ? jwt.sign({id:user.id, username:user.username, email: user.email, role_code: user.role_code}, process.env.JWT_SECRET , {expiresIn:'2d'}) : null

        const refreshToken = token ? jwt.sign({id:user.id}, process.env.JWT_SECRET_REFRESH_TOKEN , {expiresIn:'7d'}) : null

        resolve({
            err: created ? 0 : 1,
            mes: created ? 'Register successfully' : 'Email is used',
            'access_token': token,
            'refresh_token': refreshToken
        })

        if(refreshToken){
            await db.User.update(
                { refresh_token: refreshToken },
                { where: { id: user.id } }
            );
        }
    } catch (error) {
        reject(error)
    }


})

export const login = ({email,password}) => new Promise (async (resolve, reject) => {
    try {
        let response = await db.User.findOne(
            {
                where: { email: email}
            }
        )

        const checkPassword = response && bcrypt.compareSync(password, response.password)

        const token = checkPassword ? jwt.sign({id:response.id, username:response.username, email: response.email, role_code: response.role_code, avata:response.avata}, process.env.JWT_SECRET , {expiresIn:'2d'}) : null

        const refreshToken = token ? jwt.sign({id:response.id}, process.env.JWT_SECRET_REFRESH_TOKEN , {expiresIn:'7d'}) : null

    
        resolve({
            err: token ? 0 : 1,
            mes: token ? 'Login successfully' : response ? 'Wrong password' : 'Email does not exist',
            role_code: response.role_code,
            'access_token': token,
            'refresh_token': refreshToken
        })

        
        if(refreshToken){
            await db.User.update(
                { refresh_token: refreshToken },
                { where: { id: response.id } }
            );
        }
    } catch (error) {
        reject(error)
    }
})

export const refresh = (rfToken) => new Promise (async (resolve, reject) => {
    try {
        let response = await db.User.findOne({
            where: {refresh_token: rfToken}
        })

        if(response){
            jwt.verify(rfToken, process.env.JWT_SECRET_REFRESH_TOKEN, (err) => {
                if(err){
                    resolve({
                        err:1,
                        mes: 'Refresh token is expired, require login'
                    })
                } else{
                    const accessToken = jwt.sign({id:user.id, email: user.email, role_code: user.role_code}, process.env.JWT_SECRET , {expiresIn:'2d'})
                    resolve({
                        err:accessToken? 0 : 1,
                        mes: accessToken ? 'Create access token successfully' : 'Can not create access token',
                        'access_token': accessToken,
                        'refresh_token': rfToken
                    })
                }

            })
        }
    } catch (error) {
        reject(error)
    }
})