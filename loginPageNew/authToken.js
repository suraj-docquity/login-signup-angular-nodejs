// accessTokens
const dotenv =require('dotenv')
const jwt = require('jsonwebtoken');
dotenv.config();

function generateAccessToken(userData) {
    
    return jwt.sign(userData,process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}

// refreshTokens
let refreshTokens = []
function generateRefreshToken(userData) {
    const refreshToken =
        jwt.sign(userData, process.env.JWT_SECRET_KEY)
    refreshTokens.push(refreshToken)
    return refreshToken
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}




