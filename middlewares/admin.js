const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD || "your-admin-key";

function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

    if (decoded) {
        req.userId = decoded.id;
        next()
    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }

}

module.exports = {
    adminMiddleware: adminMiddleware
}