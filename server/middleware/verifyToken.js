import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token

    if(!token) return res.status(401).json({message : "Not Authentiacted"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if(err) return res.status(401).json({message : "Invalid Token"});

        req.agentId = payload.id;

        next();

    });

}
