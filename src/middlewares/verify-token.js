import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) =>{
    // const token = req.headers.authorization;
    const token = req.signedCookies.jwt;

    if(!token) return res.status(400).json({
        err: 1,
        mes: "Can not get token",
    });
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(400).json({
            err: err.name == "TokenExpiredError" ? err : "Access Token Invalid",
        });

        req.user = user
        next();
    });
}

export default verifyToken