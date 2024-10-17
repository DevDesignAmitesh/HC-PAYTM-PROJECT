const { JWT_SECRET } = require("./config")
const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next){
  const authToken = req.headers.authorization;

  if(!authToken || !authToken.startsWith("Bearer ")){
    return res.status(403).json({})
  }

  const token = authToken.split(" ")[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(403).json({})
  }
}

module.exports = {
  authMiddleware,
}