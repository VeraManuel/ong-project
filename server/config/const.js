//Should get this with .env file 
const jwtConst = {
    sign: {
        issuer: "Ong-name", //Insert de correct name for ONG
        audience: "the-domain-ong", //Insert the domain of ONG
        expiresIn: "24h",
        algorithm: "RS256"
    },
    verify: {
        issuer: "Ong-name", //Insert de correct name for ONG
        audience: "the-domain-ong", //Insert the domain of ONG
        maxAge: "24h",
        algorithm: "RS256"
    }
}

exports.jwtConst = jwtConst;