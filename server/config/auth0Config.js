import {auth} from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
    audience: "http://localhost:3000/",
    issuerBaseURL: "https://dev-gnfk5ecv4ujqa6nn.eu.auth0.com",
    tokenSigningAlg: "RS256",
})

export default jwtCheck;