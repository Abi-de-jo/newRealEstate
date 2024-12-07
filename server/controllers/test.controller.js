import jwt from "jsonwebtoken"

export const shouldBeLoggedIn = async (req, res) => {
    console.log(req.agentId)
    res.status(201).json({message: "You are Authenticated"});

}


export const shouldBeAdmin = async (req, res) => {
    const token = req.cookies.token

    if(!token) return res.status(401).json({message : "Not Authentiacted"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if(err) return res.status(401).json({message : "Invalid Token"});
        if(!payload.isAdmin) {
            return res.status(403).json({message : "You are not an Admin"});
            // console.log("Not Admin")
        }
    });

    res.status(201).json({message: "You are Authenticated"});
}